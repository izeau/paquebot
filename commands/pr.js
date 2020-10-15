'use strict';

const phrases = [
  [
    'Is that true, $USER? You want to contribute?',
    'Well you can always',
    '<https://github.com/izeau/paquebot|submit a pull request> :heart:',
  ].join(' '),
  [
    'OH MY GOD $USER I CAN’T BELIEVE IT!!!1!1',
    'SURE YOU CAN',
    '<https://github.com/izeau/paquebot|SUBMIT YOUR PULL REQUEST!>',
  ].join(' '),
  [
    '$USER :point_right:',
    'Une PR ? :point_right: <https://github.com/izeau/paquebot|Et paf.>',
  ].join(' '),
  [
    '$USER:',
    ':gne::gnee::gneee: https://github.com/izeau/paquebot :gneee::gnee::gne:',
  ].join(' '),
];

const pr = {
  command: '!pr',
  args: [{ name: 'user', required: true }],
  help: 'Encourage coworkers to contribute.',
  async run([user], { rtm, channel }) {
    if (/^<@U[0-9A-Z]+>$/.test(user)) {
      const phrase = getPhrase().replace('$USER', user);

      await rtm.sendMessage(phrase, channel);
    } else {
      await rtm.sendMessage('Who are you talking to?', channel);
    }
  },
};

const getPhrase = () => {
  return phrases[Math.floor(Math.random() * phrases.length)];
};

module.exports = pr;
