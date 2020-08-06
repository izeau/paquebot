'use strict';

const roll = {
  command: '!roll',
  args: [{ name: 'expr', required: true }],
  help: 'Roll the dice!',
  async run([expr], { rtm, channel }) {
    const parsed = expr.match(/^([1-9][0-9]?)?d(2|4|6|8|10|12|20|100)$/);

    if (parsed === null) {
      return;
    }

    const diceCount = Number(parsed[1]) || 1;
    const faceCount = Number(parsed[2]);
    const throws = Array(diceCount);
    let total = 0;

    for (let i = 0; i < diceCount; i += 1) {
      const result = 1 + Math.floor(Math.random() * faceCount);

      throws[i] = mapResult(result, faceCount);
      total += result;
    }

    if (diceCount < 2) {
      await rtm.sendMessage(`:d20: \`${total}\``, channel);
      return;
    }

    await rtm.sendMessage(`:d20: ${throws.join(' + ')} = \`${total}\``, channel);
  },
};

const mapResult = (result, faceCount) => {
  if (result === faceCount) {
    return ':fo_cool:';
  }

  if (result === 1) {
    return ':fo_nope:'
  }

  return `\`${result}\``;
};

module.exports = roll;
