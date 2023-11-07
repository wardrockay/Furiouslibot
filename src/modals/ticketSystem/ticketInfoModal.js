const {
    ActionRowBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    PermissionsBitField,
  } = require('discord.js');

const ticketSchema = require('../../schema/ticketSchema')

module.exports = {
  /**
 * @param {Client} client
 * @param {Interaction} interaction
 */
  name: 'ticketInfoModal',
  
  callback: async (client, interaction) => {
      console.log('WorksFine')

    const data = await ticketSchema.findOne({ guild: interaction.guild.id})
    

      if(data){

        const emailInput = interaction.fields.getTextInputValue('email')
        const usernameInput = interaction.fields.getTextInputValue('username')
        const reasonInput = interaction.fields.getTextInputValue('reason')

        const posChannel = await interaction.guild.channels.cache.find(c => c.name === `ticket-${interaction.user.id}`)
        if(posChannel) return await interaction.reply({content: `Vous avez déjà un ticket ouvert - ${posChannel}`, ephemeral: true});

        const category = data.channel;

        

        const embed = new EmbedBuilder()
        .setTitle(`Ticket de ${interaction.user.unsername}`)
        .setDescription('Voici le ticket que tu as ouvert')
        .addFields({name: `Email`, value: `${emailInput}`})
        .addFields({name: `username`, value: `${usernameInput}`})
        .addFields({name: `Reason`, value: `${reasonInput}`})
        .addFields({name: `Type`, value: `${data.ticket}`})
        .setFooter({text: `ticket dans ${interaction.guild.name}`})

        const btnDelete = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('ticketDeleteBtn')
            .setLabel('Fermer le ticket')
            .setStyle(ButtonStyle.Danger)
        )

        let channel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.id}`,
            type: ChannelType.GuildText,
            parent: `${category}`,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel]
              },
              {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
              }
            ]
            
        })

        let msg = await channel.send({embeds: [embed], components: [btnDelete]});
        await interaction.reply({content: `ton ticket est ouvert dans ${channel}`, ephemeral: true});
      }
      
  }
}