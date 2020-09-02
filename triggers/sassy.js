'use strict';

const sassy = {
  trigger: 'spongebob',
  async added({ db, web, user, type, channel, author, ts }) {
    if (type !== 'message') {
      return;
    }

    const message = await getMessage(web, channel, ts);
    await web.chat.postMessage({
      channel,
      user,
      as_user: true,
      thread_ts: message.thread_ts || ts,
      text: `Eh, <@${author}>, c'est toi : « ${mock(
        message,
        author
      )} » :spongebob:`,
    });
  },
  async removed() {},
};

function mock(message = '', author) {
  return message.length && message.length < 120
    ? message
        .split('')
        .map((char) =>
          Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase()
        )
        .join('')
    : mock(`gnagnagna je m'appelle <@${author}>`);
}

module.exports = sassy;
