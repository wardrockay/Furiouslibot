const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
  let MessageComponents = [];
  
  const MessageComponentCategories = getAllFiles(
    path.join(__dirname, '..', 'messageComponents'),
    true
  );
  for (const MessageComponentCategory of MessageComponentCategories) {
    const MessageComponentFiles = getAllFiles(MessageComponentCategory);

    for (const MessageComponentFile of MessageComponentFiles) {
      const MessageComponentObject = require(MessageComponentFile);
      if (exceptions.includes(MessageComponentObject.name)) {
        continue;
      }

      MessageComponents.push(MessageComponentObject);
    }
  }

  return MessageComponents;
};
