"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const db_1 = __importDefault(require("./config/db"));
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app_1.default);
// Test database connection
db_1.default.raw('SELECT 1')
    .then(() => {
    console.log('Database connection successful');
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
});
// Graceful shutdown
const gracefulShutdown = () => {
    console.log('Shutting down gracefully...');
    server.close(() => {
        console.log('HTTP server closed');
        db_1.default.destroy()
            .then(() => {
            console.log('Database connection closed');
            process.exit(0);
        })
            .catch((err) => {
            console.error('Error closing database connection:', err);
            process.exit(1);
        });
    });
    // Force close after 10 seconds
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};
// Listen for shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
