import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

export function createApp(): Application {
  const app = express();

  // Middlewares
  app.use(cors({
    // [NOTE]: I disable cors for testing
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
  }));
  app.use(express.json());

  // Health check
  app.get('/api/v1/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Routes

  // 404 Route
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });

  // Global error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  });

  return app;
}
