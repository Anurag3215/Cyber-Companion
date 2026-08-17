import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { apiLimiter } from './middlewares/rateLimiter';
import { errorHandler } from './middlewares/errorHandler';

// Load environment variables
dotenv.config();

const app: Application = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Apply rate limiting to all requests
app.use('/api/', apiLimiter);

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Cyber Companion API is running' });
});

import threatRoutes from './routes/threatRoutes';
app.use('/api/threats', threatRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
