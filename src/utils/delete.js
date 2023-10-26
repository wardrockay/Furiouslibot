const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../../config.json');
const result = require('dotenv').config();
if (result.error) {
  throw result.error;
}
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// ...



// for global commands
rest.put(Routes.applicationCommands("1166353851092316242"), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);