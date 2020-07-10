'use strict';

const roll = {
  command: '!roll',
  args: [{ name: 'expr', required: true }],
  help: 'Roll the dice!',
  async run([expr], rtm, user, channel) {
    const parsed = expr.match(/^([1-9][0-9]?)?d(2|4|6|8|10|12|20|100)$/);

    if (parsed === null) {
      return;
    }

    const [, diceCount = 1, faceCount] = parsed;
    const throws = Array(diceCount);
    let total = 0;

    for (let i = 0; i < diceCount; i += 1) {
      throws[i] = 1 + Math.floor(Math.random() * faceCount);
      total += throws[i];
    }

    if (diceCount < 2) {
      await rtm.sendMessage(`:d20: \`${total}\``, channel);
      return;
    }

    await rtm.sendMessage(`:d20: \`${throws.join('` + `')}\` = \`${total}\``, channel);
  },
};

module.exports = roll;
