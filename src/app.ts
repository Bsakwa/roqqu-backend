import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';
import addressRoutes from './routes/address.routes';
import postRoutes from './routes/post.routes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);
app.use('/addresses', addressRoutes);
app.use('/posts', postRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'User Management API' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
