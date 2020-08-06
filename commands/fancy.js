'use strict';

const fancy = {
  command: '!fancy',
  args: [{ name: 'text', required: true, rest: true }],
  help: '𝓘’𝓶:space:𝓼𝓸:space:𝓯𝓪𝓷𝓬𝔂,:space:𝔂𝓸𝓾:space:𝓬𝓪𝓷’𝓽:space:𝓮𝓿𝓮𝓷.',
  async run([...text], { rtm, channel }) {
    if (text.length < 1) {
      return;
    }

    await rtm.sendMessage(fancier(text.join(' ')), channel);
  },
};

const fancier = text => {
  return text.replace(/:[1-9A-Za-z_-]+:|[A-Z]/g, char => {
    if (char.length > 1) {
      return char;
    }

    return String.fromCodePoint(0x1D4D0 - 65 + char.charCodeAt(0));
  }).replace(/:[1-9A-Za-z_-]+:|[a-z]/g, char => {
    if (char.length > 1) {
      return char;
    }

    return String.fromCodePoint(0x1D4EA - 97 + char.charCodeAt(0));
  }).replace(/ /g, ':space:');
};

module.exports = fancy;
