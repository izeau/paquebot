"use strict";

const pourcombien = {
  command: "!pourcombien",
  args: [{ name: "expr", required: true }],
  help: "Pour combien?",
  async run([expr], { rtm, channel }) {
    const parsed = expr.match(/^([1-9][0-9]?)$/);

    if (parsed === null) {
      return;
    }

    const combien = Number(parsed[1]) || 1;
    const combien1 = Math.floor(Math.random() * combien);
    const combien2 = Math.floor(Math.random() * combien);

    if (combien1 === combien2)
      await rtm.sendMessage(
        `:alert::alert::alert::alert: Pour ${combien}: ${combien1} - ${combien2} :alert::alert::alert::alert:`,
        channel
      );
    else {
      await rtm.sendMessage(
        `:fo_nok: Pour ${combien}: ${combien1} - ${combien2} :fo_nok:`,
        channel
      );
    }
  },
};

module.exports = pourcombien;
