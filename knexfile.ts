import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'db.sqlite')
    },
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src/db/seeds')
    },
    useNullAsDefault: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src/db/seeds')
    },
    useNullAsDefault: true
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'db.sqlite')
    },
    migrations: {
      directory: path.join(__dirname, 'src/db/migrations')
    },
    useNullAsDefault: true
  }
};
