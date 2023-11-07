const {

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
  name: 'ticketTopicSelector',

  callback: async (client, interaction) => {

      const modal = new ModalBuilder()
      .setTitle('Donne nous plus d\'information')
      .setCustomId('ticketInfoModal')

      const email = new TextInputBuilder()
      .setCustomId('email')
      .setRequired(true)
      .setLabel('Saisi ton adresse mail')
      .setPlaceholder('Entre une adresse mail valide')
      .setStyle(TextInputStyle.Short)

      const username = new TextInputBuilder()
      .setCustomId('username')
      .setRequired(true)
      .setLabel('Saisi ton username')
      .setPlaceholder('username')
      .setStyle(TextInputStyle.Short)

      const reason = new TextInputBuilder()
      .setCustomId('reason')
      .setRequired(true)
      .setLabel('Saisi la raison de l\'ouverture de se ticket')
      .setPlaceholder('reason')
      .setStyle(TextInputStyle.Short)

      const firstActionRaw = new ActionRowBuilder().addComponents(email)
      const secondActionRaw = new ActionRowBuilder().addComponents(username)
      const thirdActionRaw = new ActionRowBuilder().addComponents(reason)

      modal.addComponents(firstActionRaw, secondActionRaw, thirdActionRaw);

      interaction.showModal(modal)

      let choices;
      choices = interaction.values;

      const result = choices.join('');

      try {
        const data = await ticketSchema.findOne({guild: interaction.guild.id})

        if(data){
          const filter = {guild: interaction.guild.id};
          const update = {ticket: result};
  
          ticketSchema.updateOne(filter, update, {
            new: true
          }).then(value => {
            console.log(value)
          })
        }else{
          console.log('aucun ticket trouvé')
        }
        

    } catch (error) {
        console.log(error);
    }
  }
}