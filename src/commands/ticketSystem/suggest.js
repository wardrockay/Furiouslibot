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
     options:[
         {
             name: 'channel',
             description: 'Le channel dans lequel tu souhaite mettre le system de tickets',
             type: ApplicationCommandOptionType.Channel,
             required: true,
 
         },
         {
             name: 'category',
             description: 'La catégorie dans lequel tu souhaite envoyer les tickets créé',
             type: ApplicationCommandOptionType.Channel,
             required: true,
         },
     ],
     permissionsRequired: [PermissionFlagsBits.Administrator],
 
     callback: async (client, interaction) => {
        interaction.reply({content:'Cette commande est en cours de developpement', ephemeral: true} )
         
     }
 };