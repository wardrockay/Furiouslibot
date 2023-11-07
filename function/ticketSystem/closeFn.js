const {
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    ModalBuilder,
  } = require("discord.js");
  const ticketSchema = require("../../src/schema/ticketSchema");
  
  module.exports = async (client, interaction) =>{
  
      try {
        const data = await ticketSchema.findOne({ guild: interaction.guild.id });
  
        if (!data)
          return await interaction.reply({
            content: "Aucun systeme de ticket configuré. Utilisez /ticket-setup pour activer le bot",
            ephemeral: true,
          });
      } catch (error) {
        console.log(error);
      }
  
      const posChannel = await interaction.guild.channels.cache.find(
        (c) => c.name === `ticket-${interaction.user.id}`
      );
  
      if (!posChannel)
        return await interaction.reply({
          content: `Vous n'avez aucun ticket d'ouvert`,
          ephemeral: true,
        });
        
        const modal = new ModalBuilder()
        .setTitle('Fournissez une solution.')
        .setCustomId('ticketClosureModal')
        
        const solution = new TextInputBuilder()
        .setCustomId('ticketSolution')
        .setRequired(true)
        .setLabel('Quel est la solution au problème ?')
        .setPlaceholder('Fournissez une solution la plus de détaillé possible, cela pourrait vous servir plus tard.')
        .setStyle(TextInputStyle.Paragraph)
  
        const firstActionRaw = new ActionRowBuilder().addComponents(solution)
  
        modal.addComponents(firstActionRaw);
        interaction.showModal(modal)
  };
  