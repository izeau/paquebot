'use strict';

const ky = require('ky-universal');

const meteo = {
  command: '!meteo',
  args: [{ name: 'City', required: false, rest: true }],
  help: 'Show current weather in _city_ (default: Paris).',
  async run([...name], { rtm, channel }) {
    const city = name.join(' ') || 'Paris';

    try {
      const {
        status,
        temperature,
        feelsLike,
        humidity,
      } = await getWeather(city);

      await rtm.sendMessage([
        `*Weather report for ${city}:*`,
        `${status} – ${temperature}°C _(feels like ${feelsLike}°C with ${humidity}% humidity)_`,
      ].join('\n'), channel);
    } catch (exception) {
      console.log(exception)
      await rtm.sendMessage(`_Unable to get weather info._`, channel);
    }
  },
};

const getWeather = async (city) => {
  const uri = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;

  const { current_condition: [info] } = await ky(uri, {
    timeout: 1000,
  }).json();

  return {
    temperature: info.temp_C,
    feelsLike: info.FeelsLikeC,
    humidity: info.humidity,
    status: info.weatherDesc[0].value,
  };
};

module.exports = meteo;
