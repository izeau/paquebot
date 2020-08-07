'use strict';

const swears = [
  'amiral de bateau-lavoir',
  'amiral de bateau-lavoir',
  'analphabète diplômé',
  'apprenti-dictateur à la noix de coco',
  "astronaute d'eau douce",
  'bachi-bouzouk',
  'bachi-bouzouk de tonnerre de Brest',
  'bachi-bouzouk des Carpathes',
  'bayadère de carnaval',
  'bayadère de carnaval',
  'boit-sans-soif',
  'bougres d’extrait de crétins des Alpes',
  'bulldozer à réaction',
  'chouette mal empaillée',
  'cigare volant',
  'cloche à fromage',
  'coloquinte à la graisse de hérisson',
  'coloquinte à la graisse de hérisson',
  'cornichon',
  "crème d'emplâtre à la graisse de hérisson",
  'cyrano à quatre pattes',
  'cyrano à quatre pattes',
  'diable',
  'diable de zouave',
  'diplodocus',
  'ectoplasme de moule à gaufres',
  'ectoplasme à roulettes',
  "extrait d'hydrocarbure",
  'extrait de cornichon',
  'face de brute',
  'fatma de prisunic',
  'faux jeton à la sauce tartare',
  'fieffé menteur',
  'flibustier',
  'garde-côtes à la mie de pain',
  'hurluberlu',
  'jocrisse',
  'jus de poubelle',
  'loup-garou à la graisse de renoncule',
  'loup-garou à la graisse de renoncule',
  "macchabée d'eau de vaisselle",
  'marchand de tapis',
  'mitrailleur à bavette',
  'mouchard',
  'moules à gaufres',
  'mérinos mal peigné',
  'olibrius',
  'ostrogoth',
  'papou des Carpates',
  'papou des Carpathes',
  'patagon de zoulous',
  'petit cornichon',
  'phénomène de moule à gaufres de tonnerre de Brest',
  'phénomène de tonnerre de Brest',
  'porc-épic mal embouché',
  'porc-épic mal embouché',
  "sauvage d'aérolithe de tonnerre de Brest",
  'simili-martien à la graisse de cabestan',
  'sombre oryctérope',
  'tchouck-tchouck-nougat',
  'traîne-potence',
  "zouave d'anthropopithèques",
  'zouave interplanétaire',
];

const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
const prefixes = ['Bougre', 'Espèce', 'Saleté'];

const haddock = {
  command: '!haddock',
  args: [{ name: 'text', required: false, rest: true }],
  help: 'Insult your coworker. !haddock [name]',
  async run([...text], { rtm, channel }) {
    await rtm.sendMessage(insult(text.join(' ')), channel);
  },
};
function randomIndex(arr) {
  return arr[Math.trunc(Math.random() * arr.length)];
}

const insult = (text = '') => {
  const swear = randomIndex(swears);
  const prefix = randomIndex(prefixes);
  const link = vowels.indexOf(swear[0]) === -1 ? 'de ' : "d'";

  return text.length < 1
    ? `${prefix} ${link}${swear}`
    : `${text}, ${prefix.toLowerCase()} ${link}${swear}`;
};

module.exports = haddock;
