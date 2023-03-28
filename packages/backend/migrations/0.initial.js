export const up = function (knex) {
  return knex.schema
    .createTable('networks', function (table) {
      table.increments('id');
      table.string('name').notNullable();
      table.string('config_filename').notNullable();
      table.string('network_directory').notNullable();
      table.string('network_provider').notNullable();
      table.string('network_state').notNullable();
    })
    .createTable('template', function (table) {
      table.increments('id');
      table.string('name').notNullable();
      table.string('config_filename').notNullable();
      table.string('config_content').notNullable();
      table.string('network_directory').notNullable();
      table.string('network_provider').notNullable();
      table.string('test_filename').notNullable();
      table.string('test_content').notNullable();
    })
};

export const down = function (knex) {
  // return knex.schema
  //   .dropTable("products")
  //   .dropTable("users");
  return null;
};

export const config = { transaction: true };