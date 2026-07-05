import 'dotenv/config';
import { createApp } from './app';
import { connectDatabase } from './config/db';

const PORT = process.env.PORT ?? 3001;

// Connect to MongoDB
connectDatabase();

const app = createApp();

app.listen(PORT, () => {
  console.log(`TODO LIST API is running on http://localhost:${PORT}`);
  console.log(`API Status: http://localhost:${PORT}/api/v1/health`);
});

// Prevent Node process from crashing
// when database connection is lost
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception thrown:', error);
});

export default app;