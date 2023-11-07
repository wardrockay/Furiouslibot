const {
  EmbedBuilder,
} = require('discord.js');
const ticketSchema = require('../../schema/ticketSchema')

module.exports = {
  /**
 * @param {Client} client
 * @param {Interaction} interaction
 */
  name: 'ticketDeleteBtn',

  callback: async (client, interaction) => {
    console.log('delete btn pressed')
    await interaction.channel.delete().catch(err => {});

    const dmEmbed = new EmbedBuilder()
    .setTitle(`Ton ticket a été fermé`)
    .setDescription('Merci de nous avoir contacté. Si tu as besoin de quoi que se soit d\'autre, n\'hésite pas à creer un nouveau ticket.')
    .setFooter({text: `ticket dans ${interaction.guild.name}`})
    .setTimestamp()

    await interaction.member.send({embeds: [dmEmbed]}).catch(err => {
      return;
    })

  }
}