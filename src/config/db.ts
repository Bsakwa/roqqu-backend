import config from '../../knexfile';
import type { Knex } from 'knex';

// Define the Environment type
type Environment = 'development' | 'production' | 'test';

// Get the environment (default to 'development' if not set)
const environment: Environment = (process.env.NODE_ENV as Environment) || 'development';

// Access the configuration
const connectionConfig: Knex.Config = config[environment];

// Export the Knex instance
const db: Knex = require('knex')(connectionConfig);
export default db;
