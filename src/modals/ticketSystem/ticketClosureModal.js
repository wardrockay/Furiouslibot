const {
    ActionRowBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    PermissionsBitField,
  } = require('discord.js');

const ticketSchema = require('../../schema/ticketSchema')

module.exports = {
  /**
 * @param {Client} client
 * @param {Interaction} interaction
 */
  name: 'ticketClosureModal',
  
  callback: async (client, interaction) => {
    await interaction.channel.delete().catch(err => {});

    const dmEmbed = new EmbedBuilder()
    .setTitle(`Ton ticket a été fermé`)
    .setDescription('Merci de nous avoir contacté. Si tu as besoin de quoi que se soit d\'autre, n\'hésite pas à creer un nouveau ticket.')
    .setFooter({text: `ticket dans ${interaction.guild.name}`})
    .setTimestamp()

    await interaction.reply('Je vais supprimer ce channel')

    await interaction.member.send({embeds: [dmEmbed]}).catch(err => {
      return;
    })

  }
}