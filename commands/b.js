'use strict';

const b = {
  command: '!b',
  args: [{ name: 'text', required: true, rest: true }],
  help: 'Enlarge your text.',
  async run([...text], { rtm, channel }) {
    if (text.length < 1) {
      return;
    }

    await rtm.sendMessage(enlarge(text.join(' ')), channel);
  },
};

const enlarge = text => {
  return text.toLowerCase().replace(/:[1-9a-z_-]+:|[a-z0-9!? -]/g, char => {
    if (char.length > 1) {
      return char;
    }

    switch (char) {
      case '!': return ':exclamation:';
      case '?': return ':question:';
      case ' ': return ':space:';
      case '0': return ':zero:';
      case '1': return ':one:';
      case '2': return ':two:';
      case '3': return ':three:';
      case '4': return ':four:';
      case '5': return ':five:';
      case '6': return ':six:';
      case '7': return ':seven:';
      case '8': return ':eight:';
      case '9': return ':nine:';
      default: return `:b_${char}:`;
    }
  });
};

module.exports = b;
