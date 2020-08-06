'use strict';

const tm = {
  trigger: 'tm',
  async added({ db, web, user, type, channel, author, ts }) {
    if (type !== 'message') {
      return;
    }

    const message = await getMessage(web, channel, ts);

    db.run(`
      insert into bestof (
        ts,
        added_by,
        author,
        message
      ) values (
        $ts,
        $user,
        $author,
        $message
      )
    `, {
      $ts: ts,
      $user: user,
      $author: author,
      $message: message.text,
    }, async (error) => {
      if (error) {
        if (error.code === 'SQLITE_CONSTRAINT') return;
        throw error;
      }

      await web.chat.postMessage({
        channel,
        user,
        as_user: true,
        thread_ts: message.thread_ts || ts,
        text: `:tada: Congrats, <@${author}>! Your message has been added to the _!bestof_.`,
      });
    });
  },
  async removed({ db, web, type, channel, ts }) {
    if (type !== 'message') return;

    const message = await getMessage(web, channel, ts);

    if (message.reactions) {
      if (message.reactions.find(reaction => reaction.name === 'tm')) {
        return
      }
    }

    db.run(`
      delete from bestof
      where
        ts = $ts
    `, { $ts: ts });
  },
};

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

module.exports = tm;
