'use strict';

const username = process.env.QUOIFEUR_USERNAME;

const texts = [
  'FEUR',
  'FEEEEEEEEUUUUUUUUR',
  '*FEUR !!!*',
  ':b_f::b_e::b_u::b_r::space::exclamation:',
  '```\nF E U R\nE U R F\nU R F E\nR F E U\n```',
  '𝓕𝓮𝓾𝓻.',
];

const quoifeur = {
  name: 'quoifeur',
  regexp: /quoi[^0-9A-Za-z]*$/,
  async run([], { web, channel }) {
    await web.chat.postMessage({
      channel,
      username,
      text: getText(),
      icon_emoji: ':feur:',
    });
  },
};

const getText = () => {
  return texts[Math.floor(Math.random() * texts.length)];
};

module.exports = quoifeur;
