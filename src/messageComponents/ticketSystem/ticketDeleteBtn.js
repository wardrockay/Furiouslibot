const {
  EmbedBuilder,
} = require('discord.js');
const ticketSchema = require('../../schema/ticketSchema');
const closeFn = require('../../../function/ticketSystem/closeFn');

module.exports = {
  /**
 * @param {Client} client
 * @param {Interaction} interaction
 */
  name: 'ticketDeleteBtn',

  callback: async (client, interaction) => {
    closeFn(client, interaction)
  }
}