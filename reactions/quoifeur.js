"use strict";

const username = process.env.QUOIFEUR_USERNAME;

const texts = [
  "FEUR",
  "FEEEEEEEEUUUUUUUUR",
  "*FEUR !!!*",
  "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEUR",
  ":b_f::b_e::b_u::b_r::space::exclamation:",
  "```\nF E U R\nE U R F\nU R F E\nR F E U\n```",
  "𝓕𝓮𝓾𝓻.",
  ":b_f:\n:space::b_e::space::space::b_u::space::space::space::b_r:",
  "```\nF E U R\nE\nU\nR\n```",
  "```\n      F E U R\n    / E   / F\n  /   U /   E\nF E U R F E U\nE     F   /\nU     E /\nR F E U\n```",
  "Matuidi Charo",
  ":tulip:",
];

const quoifeur = {
  name: "quoifeur",
  fun: true,
  regexp: /\bquoi[^0-9a-z]*$/i,
  async run([], { web, channel }) {
    if (Math.random() < 0.8) {
      return;
    }

    await web.chat.postMessage({
      channel,
      username,
      text: getText(),
      icon_emoji: ":feur:",
    });
  },
};

const getText = () => {
  return texts[Math.floor(Math.random() * texts.length)];
};

module.exports = quoifeur;
