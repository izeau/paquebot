const ky = require('ky-universal');

const { CMC_KEY } = process.env;

const ROOT_API = 'https://pro-api.coinmarketcap.com';
const symbols = {
  BTC: '₿',
  ETH: 'Ξ',
  XTZ: 'ꜩ',
  GRT: '⌗',
  DOT: '●',
  EUR: '€',
  USD: '$',
  GPB: '£',
};

function getSymbol(slug) {
  return symbols[slug];
}

async function cmcFetch(url, data, method = 'GET') {
  console.log(`Fetching ${method}: ${url}`);

  return ky(`${ROOT_API}/${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-CMC_PRO_API_KEY': CMC_KEY,
    },
  }).json();
}

async function fetchCoinPrices(slugs = 'bitcoin,ethereum', fiat = 'EUR') {
  const info = await cmcFetch(
    `v1/cryptocurrency/quotes/latest?slug=${slugs}&convert=${fiat}&skip_invalid=true`
  );

  if (info.status.error_code !== 0) {
    return [];
  }

  const prices = Object.keys(info.data).map((key) => {
    const coin = info.data[key];

    return `*${coin.name}* (${
      getSymbol(coin.symbol) || coin.symbol
    }): ${coin.quote[fiat].price.toFixed(2)}${getSymbol(fiat)}`;
  });

  return prices;
}

module.exports = {
  fetchCoinPrices,
};
