'use strict';

const flip = {
  command: '!flip',
  args: [],
  help: '(╯°□°)╯︵ ┻━┻',
  async run([], { rtm, channel }) {
    await rtm.sendMessage('(╯°□°)╯︵ ┻━┻', channel);
  },
};

module.exports = flip;
