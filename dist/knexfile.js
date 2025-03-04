"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path_1.default.join(__dirname, 'db.sqlite'),
        },
        migrations: {
            directory: path_1.default.join(__dirname, 'src/db/migrations'),
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'src/db/seeds'),
        },
        useNullAsDefault: true,
    },
    test: {
        client: 'sqlite3',
        connection: {
            filename: ':memory:',
        },
        migrations: {
            directory: path_1.default.join(__dirname, 'src/db/migrations'),
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'src/db/seeds'),
        },
        useNullAsDefault: true,
    },
    production: {
        client: 'sqlite3',
        connection: {
            filename: path_1.default.join(__dirname, 'db.sqlite'),
        },
        migrations: {
            directory: path_1.default.join(__dirname, 'src/db/migrations'),
        },
        useNullAsDefault: true,
    },
};
exports.default = config;
