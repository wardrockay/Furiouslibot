const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
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
  }
}