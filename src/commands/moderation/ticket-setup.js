const {
   PermissionsBitField,
   EmbedBuilder,
   ChannelType,
   ActionRowBuilder,
   SelectMenuBuilder,
   SlashCommandBuilder
  } = require('discord.js');
const mongoose = require('mongoose');
const ticketSchema = require('../../schema/ticketSchema');


module.exports = {
    /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

    name: 'ticket-setup',
    description: 'Setup the ticket message and system',
    type: 1,
    option:[
        {
            name: 'channel',
            description: 'Le channel dans lequel tu souhaite envoyer les tickets',
            type: 1,
            channel_types: 0,
        },
        {
            name: 'catégorie',
            description: 'La catégorie dans lequel tu souhaite envoyer les tickets',
            type: 1,
            channel_types: 4,
        },
    ],


    callback: async (client, interaction) => {
        interaction.reply("salut")
    }
};