'use strict';

const pilf = {
  command: '!pilf',
  args: [],
  help: '┬─┬ノ(ಠ_ಠノ)',
  async run([], { rtm, channel }) {
    await rtm.sendMessage('┬─┬ノ(ಠ_ಠノ)', channel);
  },
};

module.exports = pilf;
