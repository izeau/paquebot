'use strict';

const { stringify } = require('querystring');

const lmgtfy = {
  command: '!lmgtfy',
  args: [{ name: 'query', required: true, rest: true }],
  help: 'Let me Google that for you.',
  async run([...query], { rtm, channel }) {
    if (query.length < 1) {
      return;
    }

    rtm.sendMessage(`<https://lmgtfy.com/?${stringify({ q: query.join(' ') })}|:crocleft::crocright:>`, channel);
  },
};

module.exports = lmgtfy;
