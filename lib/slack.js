'use strict';

const getMessage = async (web, channel, ts) => {
  const { messages: [parent] } = await web.conversations.history({
    channel,
    latest: ts,
    limit: 1,
    inclusive: true,
  });

  if (parent.ts === ts) {
    return parent;
  }

  const { messages } = await web.conversations.replies({
    channel,
    ts: parent.ts,
  });

  return messages.find(message => message.ts === ts);
};

const hasMoreThanOneReaction = (message, name) => {
  const reactions = message.reactions.find(reaction => reaction.name === name);

  return reactions.count > 1;
};

module.exports = {
  getMessage,
  hasMoreThanOneReaction,
};
