exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('students', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('age').notNullable();
      table.string('course').notNullable();
      table.string('regid').notNullable().unique(); // Assuming each student has a unique registration ID
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('students')
    .dropTableIfExists('users');
};
