const {
    PermissionFlagsBits,
   } = require('discord.js');
 const mongoose = require('mongoose');
 const ticketSchema = require('../../schema/ticketSchema');
 
 
 module.exports = {
     /**
    * @param {Client} client
    * @param {Interaction} interaction
    */
 
     name: 'ticket-disable',
     description: 'Disable the ticket system',
     type: 1,
     permissionsRequired: [PermissionFlagsBits.Administrator],
 
     callback: async (client, interaction) => {
        ticketSchema.deleteMany({guild: interaction.guild.id}, async (err, data) => {
            await interaction.reply({content: "Your ticket system has been removed", ephemeral: true})
        })

     }
 };