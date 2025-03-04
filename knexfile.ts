import path from 'path';
import dotenv from 'dotenv';
import type { Knex } from 'knex';

dotenv.config();

interface Config {
  [key: string]: Knex.Config;
}

const config: Config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'db.sqlite'),
    },
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src/db/seeds'),
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src/db/seeds'),
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DATABASE_PATH || path.join(__dirname, 'db.sqlite'),
    },
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations'),
    },
    useNullAsDefault: true,
  },
};

export default config;
