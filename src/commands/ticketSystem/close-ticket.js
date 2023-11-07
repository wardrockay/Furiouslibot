const {
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
} = require("discord.js");
const ticketSchema = require("../../schema/ticketSchema");
const closeFn = require("../../../function/ticketSystem/closeFn");

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

  name: "close-ticket",
  description: "Donner une solution et fermer le ticket",
  type: 1,

  callback: async (client, interaction) => {
    closeFn(client, interaction);
  }
};
