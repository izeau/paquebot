'use strict';

const reactions = [
  'uwu',
  'owo',
  ':point_right::point_left:',
  ':heart::heart::heart:',
  ':heart_eyes:',
];

const goodBot = {
  name: 'good-bot',
  regexp: /\bgood bot\b/i,
  async run([], { rtm, user, channel }) {
    await rtm.sendMessage([
      getReaction(),
      '',
      `Thank you, <@${user}>!`,
    ].join('\n'), channel);
  },
};

const getReaction = () => {
  return reactions[Math.floor(Math.random() * reactions.length)];
};

module.exports = goodBot;
