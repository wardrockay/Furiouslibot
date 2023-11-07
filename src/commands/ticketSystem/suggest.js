const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
   } = require('discord.js');
 const mongoose = require('mongoose');
 const ticketSchema = require('../../schema/ticketSchema');
 
 module.exports = {
     /**
    * @param {Client} client
    * @param {Interaction} interaction
    */
 
     name: 'suggest',
     description: 'participe activement à l\'amélioration du bot. Soumets tes idées et suggestions directement au développeur !',
     type: 1,
 
     callback: async (client, interaction) => {
        interaction.reply({content:'Cette commande est en cours de developpement', ephemeral: true} )
         
     }
 };