const db = require('../data/dbConfig.js');

const taskModel = (module.exports = {});

taskModel.find = function(id) {
  if (id)
    return db('task')
      .join(`project`, `task.project_id`, `project.project_id`)
      .select(
        `task.task_id`,
        `task.description`,
        `task.notes`,
        `task.completed`,
        `project.name as project_name`,
        `project.description as project_description`,
      )
      .where(`task_id`, id)
      .first();
  return db(`task`)
    .join(`project`, `task.project_id`, `project.project_id`)
    .select(
      `task.task_id`,
      `task.description`,
      `task.notes`,
      `task.completed`,
      `project.name as project_name`,
      `project.description as project_description`,
    );
};

taskModel.add = async function(task) {
  const [id] = await db('task').insert({ ...task });
  return taskModel.find(id);
};
