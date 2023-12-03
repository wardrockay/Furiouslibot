const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
  // Map both guild ID and name
  const guildsInfo = client.guilds.cache.map(guild => ({
    id: guild.id,
    name: guild.name
  }));

  const localCommands = getLocalCommands();

  for (const guildInfo of guildsInfo) {
    console.log(`------------------------------${guildInfo.name}------------------------------`);
    try {
      const applicationCommands = await getApplicationCommands(client, guildInfo.id);
      
      console.log(`Processing guild: ${guildInfo.name} (ID: ${guildInfo.id})`);

      for (const localCommand of localCommands) {
        const { name, description, options } = localCommand;

        const existingCommand = applicationCommands.cache.find(
          (cmd) => cmd.name === name
        );

        if (existingCommand) {
          if (localCommand.deleted) {
            await applicationCommands.delete(existingCommand.id);
            console.log(`🗑 Deleted command "${name}" in guild ${guildInfo.name} (ID: ${guildInfo.id}).`);
            continue;
          }

          if (areCommandsDifferent(existingCommand, localCommand)) {
            await applicationCommands.edit(existingCommand.id, {
              description,
              options,
            });

            console.log(`🔁 Edited command "${name}" in guild ${guildInfo.name} (ID: ${guildInfo.id}).`);
          }
        } else {
          if (localCommand.deleted) {
            console.log(`⏩ Skipping registering command "${name}" in guild ${guildInfo.name} (ID: ${guildInfo.id}) as it's set to delete.`);
            continue;
          }

          await applicationCommands.create({
            name,
            description,
            options,
          });

          console.log(`👍 Registered command "${name}" in guild ${guildInfo.name} (ID: ${guildInfo.id}).`);
        }
      }
      console.log(`Commands up to date for guild: ${guildInfo.name} (ID: ${guildInfo.id})`);
    } catch (error) {
      console.error(`Error processing guild ${guildInfo.name} (ID: ${guildInfo.id}): ${error.message}`);
    }
  }
};
