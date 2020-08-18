'use strict';

const ky = require('ky-universal');

const bundlephobia = {
  name: 'bundlephobia',
  regexp: /https:\/\/(?:www.)?npmjs.com\/(?:package\/)?((?:@[0-9A-Za-z_-]+\/)?[0-9A-Za-z_-]+)/,
  async run([, name], { rtm, channel }) {
    const uri = `https://bundlephobia.com/api/size?package=${name}`;

    try {
      const {
        dependencyCount,
        gzip,
        size,
        version,
      } = await ky(uri, { timeout: 1000, }).json();

      const details = `https://bundlephobia.com/result?p=${name}@${version}`;

      await rtm.sendMessage([
        `*${name}@${version}*`,
        `${dependencyCount} dependencies`,
        `${format(size)} (minified)`,
        `${format(gzip)} (gzipped)`,
        `<${details}|Details>`,
      ].join(' — '), channel);
    } catch (exception) {
      await rtm.sendMessage(
        `_Unable to get information about ${name}._`,
        channel,
      );
    }
  },
};

const format = (size) => {
  if (size > 1048576) {
    return `${(size / 1048576).toFixed(1)} MiB`;
  }

  if (size > 1024) {
    return `${(size / 1024).toFixed(1)} kiB`;
  }

  return `${size} B`;
};

module.exports = bundlephobia;
