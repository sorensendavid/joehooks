const Discord = require('discord.js');
const client = new Discord.Client();

export const message = (message) => {
  client.login(process.env.DISCORD_TOKEN);
  client.channels.get('646643147362926592').send(message)
}

