'use strict';

const parseArgs = text => {
  const reg = /[^\s"]+|"([^"]*)"/g;
  const args = [];

  for (let match; match = reg.exec(text);) {
    args.push(match[1] || match[0]);
  }

  return args.slice(1);
};

module.exports = parseArgs;
