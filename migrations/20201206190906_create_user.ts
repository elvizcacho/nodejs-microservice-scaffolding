import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').notNullable().primary();
    table.string('email', 50).notNullable();
    table.string('firstName', 50).notNullable();
    table.string('lastName', 50).notNullable();
    table.string('phoneNumber', 50).notNullable();
    table.string('password', 50).notNullable();
    table.string('taxNumber', 50).notNullable();
    table.string('vatNumber', 50).notNullable();
    table.string('iban', 50).notNullable();
    table.string('bankName', 50).notNullable();
    table.string('bankAddress', 50).notNullable();
    table.string('bankSwiftCode', 50).notNullable();
    table.string('createdAt', 50).notNullable();
    table.string('updatedAt', 50).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
