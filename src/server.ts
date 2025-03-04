import app from './app';
import http from 'http';
import db from './config/db';

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Test database connection
db.raw('SELECT 1')
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
    
    db.destroy()
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
