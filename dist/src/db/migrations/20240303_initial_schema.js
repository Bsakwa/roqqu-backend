"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create Users Table
        yield knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('username').notNullable().unique();
            table.string('email').notNullable().unique();
            table.string('fullName').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
        });
        // Create Addresses Table
        yield knex.schema.createTable('addresses', (table) => {
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
        yield knex.schema.createTable('posts', (table) => {
            table.increments('id').primary();
            table.integer('userId').unsigned().notNullable();
            table.string('title').notNullable();
            table.text('body').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
            table.foreign('userId').references('users.id').onDelete('CASCADE');
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTableIfExists('posts');
        yield knex.schema.dropTableIfExists('addresses');
        yield knex.schema.dropTableIfExists('users');
    });
}
