const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = ["variable.js"]) => {
  let localCommands = [];

  const commandCategories = getAllFiles(
    path.join(__dirname, '..', 'commands'),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
      const commandObject = require(commandFile);

      if (exceptions.includes(commandObject.name)) {
        console.log('hello');
        continue;
      }

      localCommands.push(commandObject);
    }
  }

  return localCommands;
};
