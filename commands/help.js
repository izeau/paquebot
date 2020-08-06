'use strict';

const help = {
  command: '!help',
  args: [{ name: 'command', required: false }],
  help: 'Print this help message.',
  async run([command], rtm, user, channel, commands) {
    if (command != null) {
      const commandWithBang = command.startsWith('!') ? command : `!${command}`;

      if (commands.has(commandWithBang)) {
        await rtm.sendMessage([
          `*${commands.get(commandWithBang).help}*`,
          '',
          `Usage: ${commandWithBang} ${formatArgs(commands.get(commandWithBang).args)}`
        ].join('\n'), channel);
        return;
      }

      await rtm.sendMessage([
        `*Unknown command: _${command}_*`,
        'Use !help to list available commands.',
        '',
        'Et si t’es pas content tu fais une PR, connard.',
      ].join('\n'), channel);
      return;
    }

    const fullHelp = [
      '*Available commands:*',
      ...[...commands.keys()].sort().map(key => `- _${key}:_ ${commands.get(key).help}`),
      '',
      'Type _!help &lt;command&gt;_ for more details about a particular command.',
    ].join('\n');

    await rtm.sendMessage(fullHelp, channel);
  },
};

const formatArgs = args => {
  return args.map(arg => {
    const before = arg.required ? '&lt;' : '[';
    const after = arg.required ? '&gt;' : ']';
    const rest = arg.rest ? '…' : '';

    return `${before}${arg.name}${rest}${after}`;
  }).join(' ');
};

module.exports = help;
