'use strict';

const texts = [
  'FEUR',
  'FEEEEEEEEUUUUUUUUR',
  '*FEUR !!!*',
  ':b_f::b_e::b_u::b_r::space::exclamation:',
  '```\nF E U R\nE U R F\nU R F E\nR F E U\n```',
  '𝓕𝓮𝓾𝓻.',
];

const quoifeur = {
  regexp: /quoi[^0-9A-Za-z]*$/,
  async run([], { web, channel }) {
    await web.chat.postMessage({
      channel,
      text: getText(),
      icon_emoji: ':feur:',
      username: 'Sébastien Britan',
    });
  },
};

const getText = () => {
  return texts[Math.floor(Math.random() * texts.length)];
};

module.exports = quoifeur;
