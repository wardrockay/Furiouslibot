require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose');


const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {

  try {
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB')
    

  } catch (error) {
    console.log(`error: ${error}`)
  }

})();

eventHandler(client);

client.login(process.env.DISCORD_TOKEN);
