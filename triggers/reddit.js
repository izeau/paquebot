'use strict';

const { getMessage, hasMoreThanOneReaction } = require('../lib/slack.js');
const { name: NAME, version: VERSION } = require('../package.json');
const ky = require('ky-universal');

const {
  REDDIT_USERNAME: USERNAME,
  REDDIT_PASSWORD: PASSWORD,
  REDDIT_APP_ID: APP_ID,
  REDDIT_APP_SECRET: APP_SECRET,
  REDDIT_SUBREDDIT: SUBREDDIT,
} = process.env;

const USER_AGENT = `${NAME}/${VERSION} by Izeau`;

let token;

const reddit = {
  trigger: 'reddit',
  async added({ web, type, channel, ts }) {
    if (type !== 'message') {
      return;
    }

    const message = await getMessage(web, channel, ts);

    if (hasMoreThanOneReaction(message, 'reddit')) {
      return;
    }

    const link = extractLink(message.text);

    if (link === null) {
      return;
    }

    try {
      const post = await submitLink(link);

      await web.chat.postMessage({
        channel,
        as_user: true,
        thread_ts: message.thread_ts || ts,
        text: `:reddit: <${post.link}|${post.title}>`,
      });
    } catch (exception) {
      console.log(exception);
      await web.chat.postMessage({
        channel,
        as_user: true,
        thread_ts: message.thread_ts || ts,
        text: `:boom: Nooooo! I can’t post this to Reddit :cry:`,
      });
    }
  },
  async removed() { },
};

const extractLink = text => {
  const matches = /<(https?:\/\/[^|>]+)[|>]/.exec(text);

  return matches === null ? null : matches[1];
};

const submitLink = async (url) => {
  const html = await ky.get(url, { timeout: 2000 }).text();
  const matches = /<title>([^<]+)<\/title>/.exec(html);
  const title = matches === null ? url : matches[1];

  const { json: { data: { url: link } } } = await ky.post(
    'https://oauth.reddit.com/api/submit',
    {
      timeout: 2000,
      headers: {
        authorization: token,
        'user-agent': USER_AGENT,
      },
      body: new URLSearchParams({
        title,
        url,
        api_type: 'json',
        sr: SUBREDDIT,
        kind: 'link',
      }),
      hooks: {
        afterResponse: [
          async (request, options, response) => {
            if (response.status !== 403) {
              return;
            }

            token = await getToken();
            request.headers.set('authorization', token);

            return ky(request);
          },
        ],
      },
    }
  ).json();

  return { link, title };
};

const getToken = async () => {
  const pass = Buffer.from(`${APP_ID}:${APP_SECRET}`).toString('base64');

  const { token_type: type, access_token: token } = await ky.post(
    'https://www.reddit.com/api/v1/access_token',
    {
      timeout: 1000,
      headers: {
        authorization: `Basic ${pass}`,
        'user-agent': USER_AGENT,
      },
      body: new URLSearchParams({
        grant_type: 'password',
        username: USERNAME,
        password: PASSWORD,
        scope: 'submit',
      }),
    }
  ).json();

  return `${type} ${token}`;
};

module.exports = reddit;
