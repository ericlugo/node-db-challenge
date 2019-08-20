exports.up = function(knex) {
  return knex.schema
    .createTable(`project`, (tbl) => {
      tbl.increments(`project_id`);
      tbl.string(`name`, 128).notNullable();
      tbl.string(`description`);
      tbl.boolean(`completed`).defaultTo(false);
    })
    .createTable(`resource`, (tbl) => {
      tbl.increments(`resource_id`);
      tbl.string(`name`, 128).notNullable();
      tbl.string(`description`);
    })
    .createTable(`task`, (tbl) => {
      tbl.increments(`task_id`);
      tbl.string(`description`).notNullable();
      tbl.string(`notes`);
      tbl.boolean(`completed`).defaultTo(false);
      tbl
        .integer(`project_id`)
        .unsigned()
        .notNullable()
        .references(`project_id`)
        .inTable(`project`)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable(`project_resource`, (tbl) => {
      tbl.increments(`project_resource_id`);
      tbl
        .integer(`project_id`)
        .unsigned()
        .notNullable()
        .references(`project_id`)
        .inTable(`project`)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer(`resource_id`)
        .unsigned()
        .notNullable()
        .references(`resource_id`)
        .inTable(`resource`)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists(`project`)
    .dropTableIfExists(`resource`)
    .dropTableIfExists(`task`)
    .dropTableIfExists(`project_resource`);
};
