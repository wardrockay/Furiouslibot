const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
  let modals = [];
  
  const modalCategories = getAllFiles(
    path.join(__dirname, '..', 'modals'),
    true
  );
  for (const modalCategory of modalCategories) {
    const modalFiles = getAllFiles(modalCategory);

    for (const modalFile of modalFiles) {
      const modalObject = require(modalFile);
      if (exceptions.includes(modalObject.name)) {
        continue;
      }

      modals.push(modalObject);
    }
  }

  return modals;
};
