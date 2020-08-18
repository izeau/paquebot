'use strict';

const sqlite3 = require('sqlite3');
const { RTMClient } = require('@slack/rtm-api');
const { WebClient } = require('@slack/web-api');

const db = new sqlite3.Database('paquebot.db', sqlite3.OPEN_READWRITE);

const panic = require('./lib/panic.js')({ db });
const commands = require('./lib/commands.js');
const triggers = require('./lib/triggers.js');
const reactions = require('./lib/reactions.js');
const parseArgs = require('./lib/parse-args.js');

process.on('uncaughtException', panic);
process.on('unhandledRejection', panic);

const token = process.env.SLACK_TOKEN;
const rtm = new RTMClient(token);
const web = new WebClient(token);

rtm.start();

rtm.on('reaction_added', ({ reaction, user, item_user: author, item: { type, channel, ts } }) => {
  if (!triggers.has(reaction)) {
    return;
  }

  triggers.get(reaction).added({ db, web, rtm, user, type, channel, author, ts });
});

rtm.on('reaction_removed', ({ reaction, user, item_user: author, item: { type, channel, ts } }) => {
  if (!triggers.has(reaction)) {
    return;
  }

  triggers.get(reaction).removed({ db, web, rtm, user, type, channel, author, ts });
});

rtm.on('message', async ({ channel, user, text }) => {
  if (!text) {
    return;
  }

  if (!text.startsWith('!')) {
    for (const reaction of reactions) {
      const match = reaction.regexp.exec(text);

      if (match) {
        await reaction.run(match, { db, web, rtm, user, channel, commands });
        return;
      }
    }

    return;
  }

  const [command] = text.match(/^![0-9a-z]{0,32}/);
  const args = parseArgs(text);

  if (!commands.has(command)) {
    await commands.get('!help').run([command], { rtm, channel, commands });
    return;
  }

  commands.get(command).run(args, { db, web, rtm, user, channel, commands });
});
