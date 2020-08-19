'use strict';

const combien = {
  name: 'combien',
  regexp: /combien de[^\n.?]*\?/i,
  async run([], { web, channel }) {
    await web.chat.postMessage({
      channel,
      text: ':eyebrows:',
      icon_emoji: ':bahtous:',
      username: 'Bah tous',
    });
  },
};

module.exports = combien;
