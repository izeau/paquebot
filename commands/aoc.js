"use strict";

const ky = require("ky-universal");

const { AOC_LEADERBOARD_ID, AOC_SESSION_ID } = process.env;

const nameToRepo = {
  izeau: "<https://git.rednet.io/jdupouy/advent-of-code-2020/|izeau>",
  thodubois: "<https://git.rednet.io/tdubois/advent-of-code-2020/|thodubois>",
  frenchfal: "<https://git.rednet.io/bfalligan/advent-of-code-2020/|frenchfal>"
}

const aoc = {
  command: "!aoc",
  args: [],
  help: "Outputs the current Advent of Code leaderboard.",
  async run([], { rtm, channel }) {
    try {
      const leaderboard = await ky(
        `https://adventofcode.com/2020/leaderboard/private/view/${AOC_LEADERBOARD_ID}.json`,
        {
          headers: { cookie: `session=${AOC_SESSION_ID}` },
          timeout: 1000,
        }
      ).json();

      const scores = Object.values(leaderboard.members).sort((a, b) => a.stars - b.stars);

      await rtm.sendMessage(
        scores
          .map(({ stars, name }) => `- ${nameToRepo[name] || name} (${stars} :star:)`)
          .concat(
            "",
            "Join the <https://adventofcode.com/2020/|Advent of Code> leaderboard! Enter the code: `1008654-380532fb`."
          )
          .join("\n"),
        channel
      );
    } catch (err) {
      if (err instanceof ky.TimeoutError) {
        rtm.sendMessage("_Unable to fetch latest AoC leaderboard (timeout)_", channel);
      } else if (err instanceof ky.HTTPError) {
        rtm.sendMessage("_Unable to fetch latest AoC leaderboard (HTTP error code: ${err.response.status})_", channel);
      } else {
        throw err;
      }
    }
  },
};

module.exports = aoc;
