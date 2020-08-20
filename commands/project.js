'use strict';

const project = {
  command: '!project',
  args: [{ name: 'project name', required: false }],
  help: 'Assign a GitLab project to the channel.',
  async run([project], { db, rtm, channel }) {
    if (project == null) {
      const assigned = await getProject(db, channel);

      if (assigned === null) {
        await rtm.sendMessage(
          `_This channel has no project assigned._`,
          channel,
        );
      } else {
        await rtm.sendMessage(
          `_The ${assigned} project is assigned to this channel._`,
          channel,
        );
      }

      return;
    }

    if (!isFormatted(project)) {
      await rtm.sendMessage(`_Uncorrectly formatted project name._`, channel);
      return;
    }

    db.run(`
      insert or replace into projects (channel, project)
      values ($channel, $project)
    `, {
      $channel: channel,
      $project: project,
    }, async (error) => {
      if (error) {
        await rtm.sendMessage(`_Unable to set project._`, channel);
      } else {
        await rtm.sendMessage([
          '_Project assigned to the channel._',
          'Use the :bug: reaction to create a new issue.',
        ].join('\n'), channel);
      }
    });
  },
};

const getProject = (db, channel) => {
  return new Promise((resolve, reject) => {
    db.get(`select project from projects where channel = $channel`, {
      $channel: channel,
    }, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row == null ? null : row.project);
      }
    });
  });
};

const isFormatted = project => {
  return /(?:[0-9A-Za-z_-]\/)+[0-9A-Za-z_-]+/.test(project);
};

module.exports = project;
