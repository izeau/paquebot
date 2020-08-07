'use strict';

const ky = require('ky-universal');
const { format } = require('date-fns');

const spotify = {
  regexp: /\bspotify:(album|playlist|track):([0-9A-Za-z]+)\b/,
  async run([, type, id], { web, channel }) {
    const info = await getInformation(type, id);

    await web.chat.postMessage({
      channel,
      as_user: true,
      blocks: [formatInfo(info)],
    });
  },
};

let token;

const getInformation = async (type, id) => {
  if (token == null) {
    token = await getToken();
  }

  return ky(`https://api.spotify.com/v1/${type}s/${id}`, {
    headers: { authorization: `Bearer ${token}` },
    hooks: {
      afterResponse: [
        async (request, options, response) => {
          if (response.status !== 403) {
            return;
          }

          token = await getToken();

          request.headers.set('authorization', `Bearer ${token}`);

          return ky(request);
        },
      ],
    },
  }).json();
};

const getToken = async () => {
  const params = new URLSearchParams([['grant_type', 'client_credentials']]);
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const secret = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const { access_token: token } = await ky.post(
    `https://accounts.spotify.com/api/token`,
    {
      body: params,
      headers: { authorization: `Basic ${secret}` },
    }).json();

  return token;
};

const formatInfo = (info) => {
  switch (info.type) {
    case 'album':
      return {
        type: 'section',
        text: {
          type: "mrkdwn",
          text: [
            `*${info.name} — ${info.artists[0].name}*`,
            `Released ${format(new Date(info.release_date), 'PPP')}`,
            info.genres.length > 0 ? `_${info.genres.join(', ')}_` : '',
            `${info.popularity}% popular`,
            `<spotify://${info.type}/${info.id}|Open in Spotify>`,
          ].join('\n'),
        },
        accessory: {
          type: 'image',
          image_url: info.images[0].url,
          alt_text: info.name,
        },
      };

    case 'playlist':
      return {
        type: 'section',
        text: {
          type: "mrkdwn",
          text: [
            `*${info.name} – ${info.owner.display_name}*`,
            info.description ? `_${info.description}_` : '',
            `${info.followers.total} follower(s)`,
            `<spotify://${info.type}/${info.id}|Open in Spotify>`,
          ].join('\n'),
        },
        accessory: {
          type: 'image',
          image_url: info.images[0].url,
          alt_text: info.name,
        },
      };

    case 'track':
      return {
        type: 'section',
        text: {
          type: "mrkdwn",
          text: [
            `*${info.name} — ${info.artists[0].name}*`,
            `Released ${format(new Date(info.album.release_date), 'PPP')}`,
            `${info.popularity}% popular`,
            `<spotify://${info.type}/${info.id}|Open in Spotify>`,
          ].join('\n'),
        },
        accessory: {
          type: 'image',
          image_url: info.album.images[0].url,
          alt_text: info.name,
        },
      };
  }
}

module.exports = spotify;
