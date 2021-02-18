'use strict';

const koin = {
  command: '!koin',
  args: [],
  help: ':duck:',
  async run([], { rtm, channel }) {
    await rtm.sendMessage('\\_o<', channel);
  },
};

module.exports = koin;
