'use strict';

const ky = require('ky-universal');
const { formatISO, subDays } = require('date-fns');

const covid = {
  command: '!covid',
  args: [],
  help: 'The latest updates on the global pandemic.',
  async run([], { rtm, channel }) {
    const yesterday = formatISO(subDays(new Date(), 1), { representation: 'date' });

    try {
      const parsed = await ky('https://covid-api.com/api/reports', {
        headers: { accept: 'application/json' },
        searchParams: { iso: 'FRA', date: yesterday },
        timeout: 1000,
      }).json();

      const stats = parsed.data.find(({ region }) => region.province === "");

      rtm.sendMessage([
        `*COVID-19 report for ${stats.region.name}:*`,
        '',
        `_Active cases:_ ${stats.active} (${sign(stats.active_diff)})`,
        `_Deaths:_ ${stats.deaths} (${sign(stats.deaths_diff)})`,
      ].join('\n'), channel);
    } catch (err) {
      if (err instanceof ky.TimeoutError) {
        rtm.sendMessage('_Unable to fetch latest COVID-19 data (timeout)_', channel);
      } else if (err instanceof ky.HTTPError) {
        rtm.sendMessage(
          '_Unable to fetch latest COVID-19 data (HTTP error code: ${err.response.status})_',
          channel
        );
      } else {
        throw err;
      }
    }
  },
};

const sign = val => val < 0 ? val : `+${val}`;

module.exports = covid;
