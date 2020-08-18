'use strict';

const { readdirSync } = require('fs');

const reactions = [];

for (const file of readdirSync('reactions')) {
  if (!file.endsWith('.js')) {
    continue;
  }

  const reaction = require(`../reactions/${file}`);

  reactions.push(reaction);
}

module.exports = reactions;
