"use strict";

const texts = [
  "Jaune ! Comme un Ricard servi avant d'aller manger…",
  "Jaune ! Avé deux trois glaçons au fond d'un verre à pied…",
  "Jaune ! Et deux volumes d'eau, je l'aime bien tassé…",
  "Jaune ! Avé quelques olives pour bien l'accompagner…",
  "Jaune ! Avé deux trois copains la convivialité…",
  "Jaune ! Pour refaire le monde quand je suis bien pété…",
  "Jaune ! Je l'aime tellement c'est mon petit péché…",
  "Jaune ! En trempant des croissants au petit-déjeuner…",
  "Jaune ! Comme le feu des gitans autour des poulaillers…",
  "Jaune ! Comme le maillot d'Indurain sur les Champs-Élysées…",
  "Jaune ! Comme l'auto de La Poste qu'amène le courrier…",
  "Jaune ! Comme le blanc de mes yeux quand je suis défoncé…",
];

const jaune = {
  command: "!jaune",
  args: [],
  help: "Jaune !",
  async run([], { rtm, channel }) {
    await rtm.sendMessage(getText(), channel);
  },
};

const getText = () => {
  return texts[Math.floor(Math.random() * texts.length)];
};

module.exports = jaune;
