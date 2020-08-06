'use strict';

const WIRT = `
W   W W    W
W   W   WW WW
W W W W W  W
 WWW  W W  W
`;

const wirt = {
  command: '!wirt',
  args: [],
  help: 'Wirt?',
  async run([], { rtm, channel }) {
    const text = WIRT.replace(/ /g, ':space:').replace(/W/g, getBlock());

    rtm.sendMessage(text, channel);
  },
};

const getBlock = () => {
  const r = Math.random();

  if (r < .01) return ':poop:';
  if (r < .05) return ':gnee:';
  if (r < .20) return ':wirt:';

  return ':stew:';
};

module.exports = wirt;
