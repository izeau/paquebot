'use strict';

const { getMessage } = require('../lib/slack.js');

const sassy = {
  trigger: 'spongebob',
  async added({ web, rtm, type, channel, author, ts }) {
    if (type !== 'message') {
      return;
    }

    const message = await getMessage(web, channel, ts);
    const mocked = mock(message.text, author);

    await rtm.sendMessage(
      `Eh, <@${author}>, c'est toi : « ${mocked} » :spongebob:`,
      channel,
    );
  },
  async removed() { },
};

function mock(message = '', author) {
  return message.length && message.length < 120
    ? message
      .split('')
      .map((char) =>
        Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase()
      )
      .join('')
    : `${mock('gnagnagna je m\'appelle')} <@${author}>`;
}

module.exports = sassy;
