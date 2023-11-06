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
     description: 'Désactiver systeme de ticket',
     type: 1,
     permissionsRequired: [PermissionFlagsBits.Administrator],

    
 
     callback: async (client, interaction) => {

        try {
            const data = await ticketSchema.deleteMany({guild: interaction.guild.id});
            if(data){
                await interaction.reply({content: "Votre systeme de ticket à été désinstallé", ephemeral: true})
            }
         } catch (error) {
            console.log(error)
         }



     }
 };