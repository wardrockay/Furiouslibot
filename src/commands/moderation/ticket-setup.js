const {
   PermissionsBitField,
   EmbedBuilder,
   ChannelType,
   ActionRowBuilder,
   SelectMenuBuilder,
   SlashCommandBuilder
  } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

    name: 'ticket',
    description: 'Poste un ticket de demande de support.',
    type: 1,

    callback: async (client, interaction) => {
        interaction.reply("salut")
    }
};