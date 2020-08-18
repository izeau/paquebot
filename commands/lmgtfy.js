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

    const q = query.join(' ');
    const uri = `https://lmgtfy.com/?${stringify({ q })}`;

    rtm.sendMessage(`<${uri}|Need some help?>`, channel);
  },
};

module.exports = lmgtfy;
