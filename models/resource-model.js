const db = require('../data/dbConfig.js');

const resourceModel = (module.exports = {});

resourceModel.find = function(id) {
  if (id)
    return db(`resource`)
      .where(`resource_id`, id)
      .first();
  return db(`resource`);
};

resourceModel.add = async function(resource) {
  const [id] = await db(`resource`).insert({ ...resource });
  return resourceModel.find(id);
};
