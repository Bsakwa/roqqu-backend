import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create Users Table
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('fullName').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  // Create Addresses Table
  await knex.schema.createTable('addresses', (table) => {
    table.increments('id').primary();
    table.integer('userId').unsigned().notNullable().unique();
    table.string('street').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('country').notNullable();
    table.string('zipCode').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    
    table.foreign('userId').references('users.id').onDelete('CASCADE');
  });

  // Create Posts Table
  await knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.integer('userId').unsigned().notNullable();
    table.string('title').notNullable();
    table.text('body').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    
    table.foreign('userId').references('users.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('posts');
  await knex.schema.dropTableIfExists('addresses');
  await knex.schema.dropTableIfExists('users');
}
