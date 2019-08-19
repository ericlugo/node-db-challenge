const tables = {
  p: `project`,
  r: `resource`,
  t: `task`,
  pr: `project_resource`,
};

exports.up = function(knex) {
  return knex.schema
    .createTable(tables.p, (tbl) => {
      tbl.increments(`${tables.p}_id`);
      tbl.string(`name`, 128).notNullable();
      tbl.string(`description`);
      tbl
        .boolean(`completed`)
        .notNullable()
        .defaultTo(false);
    })
    .createTable(tables.r, (tbl) => {
      tbl.increments(`${tables.r}_id`);
      tbl.string(`name`, 128).notNullable();
      tbl.string(`description`);
    })
    .createTable(tables.t, (tbl) => {
      tbl.increments(`${tables.t}_id`);
      tbl.string(`description`).notNullable();
      tbl.string(`notes`);
      tbl
        .boolean(`completed`)
        .notNullable()
        .defaultTo(false);
      tbl
        .integer(`${tables.p}_id`)
        .unsigned()
        .notNullable()
        .references(`${tables.p}_id`)
        .inTable(tables.p)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable(tables.pr, (tbl) => {
      tbl.increments(`${tables.pr}_id`);
      tbl
        .integer(`${tables.p}_id`)
        .unsigned()
        .notNullable()
        .references(`${tables.p}_id`)
        .inTable(tables.p);
      tbl
        .integer(`${tables.r}_id`)
        .unsigned()
        .notNullable()
        .references(`${tables.r}_id`)
        .inTable(tables.r);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists(tables.p)
    .dropTableIfExists(tables.r)
    .dropTableIfExists(tables.t)
    .dropTableIfExists(tables.pr);
};
