export const up = function (knex) {
  return knex.schema
    .createTable('networks', function (table) {
      table.string('id').notNullable();;
      table.string('name').notNullable();
      table.string('config_filename').notNullable();
      table.string('config_content').notNullable();
      table.string('network_directory').notNullable();
      table.string('network_provider').notNullable();
      table.string('network_state').notNullable();
      table.string('test_filename').default(null);
      table.string('test_content').default(null);
    })
    .createTable('template', function (table) {
      table.string('id').notNullable();;
      table.string('name').notNullable();
      table.string('config_filename').notNullable();
      table.string('config_content').notNullable();
      table.string('network_directory').notNullable();
      table.string('network_provider').notNullable();
      table.string('test_filename').notNullable();
      table.string('test_content').notNullable();
    })
    .createTable('exec_run', function (table) {
      table.string('id').notNullable();
      table.string('command').notNullable();
      table.string('std_error').default(null);
      table.string('std_output').default(null);
      table.integer('status_code').default(null);
    });
};

export const down = function (knex) {
  // return knex.schema
  //   .dropTable("products")
  //   .dropTable("users");
  return null;
};

export const config = { transaction: true };