'use strict';

const { getMessage, hasMoreThanOneReaction } = require('../lib/slack.js');
const ky = require('ky-universal');

const TOKEN = process.env.GITLAB_TOKEN;
const GITLAB_HOST = process.env.GITLAB_HOST;

const bug = {
  trigger: 'bug',
  async added({ db, web, type, channel, author, ts }) {
    if (type !== 'message') {
      return;
    }

    const message = await getMessage(web, channel, ts);

    if (hasMoreThanOneReaction(message, 'bug')) {
      return;
    }

    try {
      const project = await getProject(db, channel);
      const milestone = await getMilestone(project);

      if (project === null) {
        await web.chat.postMessage({
          channel,
          as_user: true,
          thread_ts: message.thread_ts || ts,
          text: [
            ':exclamation: I can’t see a project assigned to this channel.',
            'See `!help project`',
          ].join('\n'),
        });

        return;
      }

      const { id, link } = await newIssue(project, milestone, message.text);

      await web.chat.postMessage({
        channel,
        as_user: true,
        thread_ts: message.thread_ts || ts,
        text: `:bug: Issue <${link}|#${id}> was created.`,
      });
    } catch (exception) {
      await web.chat.postMessage({
        channel,
        as_user: true,
        thread_ts: message.thread_ts || ts,
        text: `:cry: Sorry, <@${author}>, but I can’t create the issue.`,
      });
    }
  },
  async removed() { },
};

const getProject = (db, channel) => {
  return new Promise((resolve, reject) => {
    db.get(`select project from projects where channel = $channel`, {
      $channel: channel,
    }, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row == null ? null : row.project);
      }
    });
  });
};

const getMilestone = async (project) => {
  const encoded = encodeURIComponent(project);

  const milestones = await ky(
    `${GITLAB_HOST}/api/v4/projects/${encoded}/milestones`,
    {
      timeout: 1000,
      headers: { authorization: `Bearer ${TOKEN}` },
      searchParams: { state: 'active' },
    },
  ).json();

  return milestones.length > 0 ? milestones[0].id : null;
};

const newIssue = async (project, milestone, text) => {
  const encoded = encodeURIComponent(project);

  const { iid: id, web_url: link } = await ky.post(
    `${GITLAB_HOST}/api/v4/projects/${encoded}/issues`,
    {
      timeout: 1000,
      headers: { authorization: `Bearer ${TOKEN}` },
      json: {
        id: encoded,
        title: getTitle(text),
        description: [text, `_Added via Slack._`].join('\n\n'),
        milestone_id: milestone,
        labels: ['via: slack', 'type: bug'],
      },
    },
  ).json();

  return { id, link };
};

const getTitle = (text) => {
  const [firstLine] = text.split('\n', 1);

  if (firstLine.length <= 120) {
    return firstLine;
  }

  return `${firstLine.split(0, 120)}…`;
};

module.exports = bug;
