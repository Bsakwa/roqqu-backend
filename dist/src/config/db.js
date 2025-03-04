"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knexfile_1 = __importDefault(require("../../knexfile"));
// Get the environment (default to 'development' if not set)
const environment = process.env.NODE_ENV || 'development';
// Access the configuration
const connectionConfig = knexfile_1.default[environment];
// Export the Knex instance
const db = require('knex')(connectionConfig);
exports.default = db;
