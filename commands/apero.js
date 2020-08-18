'use strict';

const { randomIndex } = require('../lib/random');
const { computeMinutes, convertMinutesToTime } = require('../lib/time');

const apero = {
  command: '!apero',
  args: [],
  help: ":robald: Est-ce que c'est l'heure de l'apéro ? :beers:",
  async run([], { rtm, channel }) {
    let msg = '';
    const now = new Date();
    const nowHours = new Date().getHours();

    if (nowHours < 7) {
      msg = 'Bah ?? Tu devrais déjà être en train de picoler non ? :cot:';
    } else if (nowHours < 10) {
      msg = 'Euh, il est pas un peut tôt pour ça ?';
    } else if (nowHours === 12) {
      msg = 'Boah... Une petite pinte à midi ça passe. :beer:';
    } else if (nowHours < 18) {
      const aperoTime = new Date();
      aperoTime.setHours(18);
      aperoTime.setMinutes(0);
      aperoTime.setSeconds(0);
      aperoTime.setMilliseconds(0);

      msg = `Patience, c'est pas encore l'apéro. Plus que ${convertMinutesToTime(
        computeMinutes(now, aperoTime)
      )}.`;
    } else if (nowHours < 22) {
      const apero = [
        "WOUHOU C'EST L'APÉRO FAITES PÉTER LES PINTES ! :ilikethat:",
        "C'est enfin l'apéro ! Go Java ? :crocleft::crocright:",
        "Patience, c'est pas encore l'ap– JK C'EST PARTI ON SE PÈTE LA RACE :beer:",
        'A-PÉ-RO ! A-PÉ-RO ! A-PÉ-RO !',
        "Sérieux vous pensez qu'à picoler non ? Vous avez essayé le jus d'abricot ?",
      ];

      msg = randomIndex(apero);
    } else {
      msg = ':yelling: Kestufou encore au bureau toi ?? Va picoler !';
    }

    await rtm.sendMessage(msg, channel);
  },
};

module.exports = apero;
