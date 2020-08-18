'use strict';

const { readdirSync } = require('fs');

const triggers = new Map();

for (const file of readdirSync('triggers')) {
  if (!file.endsWith('.js')) {
    continue;
  }

  const trigger = require(`../triggers/${file}`);

  triggers.set(trigger.trigger, trigger);
}

module.exports = triggers;
