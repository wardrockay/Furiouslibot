const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
  } = require('discord.js');

  const config = require('../../../config.json');
  
  module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
  
    name: 'leave',
    description: 'Make your bot leave a guild.',
    options: [
      {
        name: 'target-guild',
        description: 'The guild you want to ban.',
        type: ApplicationCommandOptionType.String,
        required: true,
      }
    ],
  
    callback: async (client, interaction) => {
      const targetGuildId = interaction.options.get('target-guild').value;

      await interaction.deferReply();
  
      const targetGuild = await interaction.guilds.cache.get(targetGuildId);

        if (!targetGuild) {
            await interaction.editReply("That guild doesn't exist.");
            return;
        }

        await interaction.editReply(`Leaving guild ${targetGuild.name} (ID: ${targetGuild.id})...`);
        await targetGuild.leave();

        //verifier si le bot est dans le serveur

        const guildsInfo = client.guilds.cache.map(guild => ({
            id: guild.id,
            name: guild.name
          }));

        const guildInfo = guildsInfo.find(guildInfo => guildInfo.id === targetGuildId);
        if (!guildInfo) {
            console.log(`Left guild ${targetGuild.name} (ID: ${targetGuild.id}).`);
            return;
        }else{
            console.log(`Failed to leave guild ${targetGuild.name} (ID: ${targetGuild.id}).`);
            return;
        }
  

  
 
  

    },
  
  
  };
  