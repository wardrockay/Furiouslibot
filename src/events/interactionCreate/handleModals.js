const getmodals = require('../../utils/getModals');

module.exports = async (client, interaction) => {
  if (!interaction.isModalSubmit()) return;

  const modals = getmodals();

  try {
    const modalObject = modals.find(
      (cmd) => cmd.name === interaction.customId
    );

    if (!modalObject) return;


    await modalObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this modal: ${error}`);
  }

};
