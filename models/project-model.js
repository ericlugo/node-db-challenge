const db = require('../data/dbConfig.js');

const projectModel = (module.exports = {});

projectModel.find = function(id) {
  if (id)
    return db(`project`)
      .where(`project_id`, id)
      .first();
  return db(`project`);
};

projectModel.add = async function(project) {
  const [id] = await db(`project`).insert({ ...project });
  return projectModel.find(id);
};
