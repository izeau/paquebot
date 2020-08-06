'use strict';

const sixtyNine = {
  command: '!69',
  args: [],
  help: 'Nice.',
  async run([], { rtm, channel }) {
    await rtm.sendMessage('𝓝𝓲𝓬𝓮.', channel);
  },
};

module.exports = sixtyNine;
