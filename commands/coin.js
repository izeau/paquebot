'use strict';

const { fetchCoinPrices } = require('../lib/cmc');
const allowedFiats = ['EUR', 'USD', 'GPB'];

const coin = {
  command: '!coin',
  args: [
    { name: 'coins', required: false },
    { name: 'fiat', required: false },
  ],
  help:
    'Latest prices from specific coins in fiats. Defaults to *bitcoin,ethereum* in *EUR*',
  async run([coins = 'bitcoin,ethereum', fiat = 'EUR'], { rtm, channel }) {
    if (coins.split(',').length > 5) {
      await rtm.sendMessage(
        "5 coins allowed otherwise you'll burn my API limits you greedy boi.",
        channel
      );
    }

    if (allowedFiats.indexOf(fiat) === -1) {
      await rtm.sendMessage(
        'EUR, USD or GPB allowed, because I said so.',
        channel
      );
    }

    const latestPrices = await fetchCoinPrices(coins, fiat);

    if (!latestPrices.length) {
      return;
    }
    await rtm.sendMessage(latestPrices.join('\n'), channel);
  },
};

module.exports = coin;
