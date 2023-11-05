const { devs, testServer } = require('../../../config.json');
const getMessageComponents = require('../../utils/getMessageComponents');

module.exports = async (client, interaction) => {

  if (!interaction.isAnySelectMenu()) return;

  const MessageComponents = getMessageComponents();
  console.log(interaction.customId)

  try {
    const MessageComponentObject = MessageComponents.find(
      (cmd) => cmd.name === interaction.customId
    );

    if (!MessageComponentObject) return;


    await MessageComponentObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this MessageComponent: ${error}`);
  }

};
