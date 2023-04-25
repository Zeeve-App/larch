exports.up = function (knex) {
  return knex.schema
    .createTable('networks', function (table) {
      table.string('name').primary();
      table.string('type').notNullable();
      table.string('config_filename').notNullable();
      table.string('config_content').notNullable();
      table.string('network_directory').notNullable();
      table.string('network_provider').notNullable();
      table.string('network_state').default(null);
      table.string('test_filename').default(null);
      table.string('test_content').default(null);
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at');
    })
    .createTable('template', function (table) {
      table.string('id').notNullable().primary();
      table.string('name').notNullable();
      table.string('config_filename').notNullable();
      table.string('config_content').notNullable();
      table.string('network_provider').notNullable();
      table.string('test_filename').notNullable();
      table.string('test_content').notNullable();
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at');
    })
    .createTable('exec_run', function (table) {
      table.string('id').notNullable().primary();
      table.string('intention').notNullable();
      table.string('related_id').default(null);
      table.string('command').notNullable();
      table.string('std_error').default(null);
      table.string('std_output').default(null);
      table.integer('status_code').default(null);
      table.timestamp('created_at').notNullable();
    })
    .createTable('user_operation', function (table) {
      table.string('id').notNullable().primary();
      table.string('operation').notNullable();
      table.string('operation_detail').default(null);
      table.timestamp('created_at').notNullable();
    });
};

exports.down = function (knex) {
  // return knex.schema
  //   .dropTable("products")
  //   .dropTable("users");
  return null;
};

exports.config = { transaction: true };