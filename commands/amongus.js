'use strict';

const { randomIndex } = require('../lib/random');
const { computeMinutes, convertMinutesToTime } = require('../lib/time');

const apero = {
  command: '!amongus',
  args: [],
  help: ":among_us: P'tit Among Us ? :among_us:",
  async run([], { rtm, channel }) {
    let msg = '';
    const now = new Date();
    const nowHours = new Date().getHours();

    if (nowHours >= 0 && nowHours < 12) {
      const gameTime = new Date();
      gameTime.setHours(12);
      gameTime.setMinutes(0);
      gameTime.setSeconds(0);
      gameTime.setMilliseconds(0);

      msg = `Prépare ton couteau :impostor:, on go dans ${convertMinutesToTime(
        computeMinutes(now, gameTime)
      )}.`;
    } else if (nowHours === 12 || nowHours === 13) {
      const gamePrompt = [
        "GO GO GO :among_us: :impostor:",
        "C'est le moment de se faire tuer par @Katchou",
        "Un bon crewmate tu seras, les imposteurs tu demasqueras !",
        "Jsuis à Electrical, je viens de réparer les lights, vous êtes où ?",
      ];

      msg = randomIndex(gamePrompt);
    } else {
      msg = 'Un peu tard pour aujourd\'hui :among_us_dead:, on se fait ça demain ?';
    }

    await rtm.sendMessage(msg, channel);
  },
};

module.exports = apero;
