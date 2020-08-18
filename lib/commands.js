'use strict';

const { readdirSync } = require('fs');

const commands = new Map();

for (const file of readdirSync('commands')) {
  if (!file.endsWith('.js')) {
    continue;
  }

  const command = require(`../commands/${file}`);

  commands.set(command.command, command);
}

module.exports = commands;
