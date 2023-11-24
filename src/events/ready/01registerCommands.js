const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
  try {
    const Guilds = client.guilds.cache.map(guild => guild.id);
    for (const Guild of Guilds) {
      const localCommands = getLocalCommands();
      const applicationCommands = await getApplicationCommands(
        client,
        Guild
      );

      for (const localCommand of localCommands) {
        const { name, description, options } = localCommand;

        const existingCommand = await applicationCommands.cache.find(
          (cmd) => cmd.name === name
        );

        if (existingCommand) {
          if (localCommand.deleted) {
            await applicationCommands.delete(existingCommand.id);
            console.log(`🗑 Deleted command "${name}".`);
            continue;
          }

          if (areCommandsDifferent(existingCommand, localCommand)) {
            await applicationCommands.edit(existingCommand.id, {
              description,
              options,
            });

            console.log(`🔁 Edited command "${name}".`);
          }
        } else {
          if (localCommand.deleted) {
            console.log(
              `⏩ Skipping registering command "${name}" as it's set to delete.`
            );
            continue;
          }

          await applicationCommands.create({
            name,
            description,
            options,
          });

          console.log(`👍 Registered command "${name}."`);
        }
      }
      console.log('Commands up to date for server ID: '+Guild);
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};
