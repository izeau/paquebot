'use strict';

const { RTMClient } = require('@slack/rtm-api');
const { readdirSync } = require('fs');

const token = process.env.SLACK_TOKEN;
const rtm = new RTMClient(token);

const panic = exception => {
  process.stderr.write(exception.stack);
  process.exit(1);
};

process.on('uncaughtException', panic);
process.on('unhandledRejection', panic);

const commands = new Map();

for (const file of readdirSync('commands')) {
  if (!file.endsWith('.js')) {
    continue;
  }

  const command = require(`./commands/${file}`);

  commands.set(command.command, command);
}

rtm.start();

rtm.on('message', async ({ type, channel, user, text }) => {
  if (!text || !text.startsWith('!')) {
    return;
  }

  const [command] = text.match(/^![0-9a-z]{0,32}/);
  const args = parseArgs(text);

  if (!commands.has(command)) {
    await commands.get('!help').run([command], rtm, user, channel, commands);
    return;
  }

  commands.get(command).run(args, rtm, user, channel, commands);
});

const parseArgs = text => {
  const reg = /[^\s"]+|"([^"]*)"/g;
  const args = [];

  for (let match; match = reg.exec(text);) {
    args.push(match[1] || match[0]);
  }

  return args.slice(1);
};
