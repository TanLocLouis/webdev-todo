import 'dotenv/config';
import mongoose from 'mongoose';
import { Task } from '../models/Task';
import { connectDatabase } from '../config/db';

const mockTasks = [
  {
    title: 'Design database schema',
    description: 'Create Mongoose models for Task entity and define connection configuration.',
    completed: true,
  },
  {
    title: 'Implement REST endpoints',
    description: 'Build GET, POST, PUT, DELETE, and PATCH /toggle endpoints for tasks.',
    completed: true,
  },
  {
    title: 'Setup input validation',
    description: 'Add express-validator schemas to validate ObjectIds and request query parameters.',
    completed: true,
  },
  {
    title: 'Refactor React UI',
    description: 'Extract ToastNotification, TaskItem, SearchInput, LimitSelector, and StatsDashboard into child components.',
    completed: true,
  },
  {
    title: 'Write automated unit tests',
    description: 'Implement integration test cases for backend task APIs using Jest and Supertest.',
    completed: true,
  },
  {
    title: 'Prepare project documentation',
    description: 'Add deployment instructions, MongoDB configuration, and API reference guidelines.',
    completed: true,
  },
  {
    title: 'Integrate Redux Toolkit',
    description: 'Set up global state management for tasks handling fetching, updating, and UI slices.',
    completed: false,
  },
  {
    title: 'Setup CI/CD pipeline',
    description: 'Create GitHub Actions workflows to run compile tests and publish docker images.',
    completed: false,
  },
  {
    title: 'Setup Docker Compose',
    description: 'Write docker-compose.yml config to run Node backend and MongoDB container.',
    completed: true,
  },
  {
    title: 'Implement user auth',
    description: 'Configure JWT cookie authentication guards for routes security.',
    completed: false,
  },
  {
    title: 'Optimize database indexes',
    description: 'Apply indexes on Task search criteria fields like title and completed.',
    completed: true,
  },
  {
    title: 'Create API documentation',
    description: 'Build interactive Swagger interface documentation for developers.',
    completed: false,
  },
  {
    title: 'Fix CORS headers',
    description: 'Resolve browser origin credentials restrictions for production clients.',
    completed: true,
  },
  {
    title: 'Implement theme switcher',
    description: 'Add Dark and Light layout theme modes utilizing CSS variables.',
    completed: false,
  },
  {
    title: 'Add localization support',
    description: 'Integrate i18next translating labels into multiple languages.',
    completed: false,
  },
  {
    title: 'Implement drag-and-drop',
    description: 'Support task reordering by integrating react-beautiful-dnd.',
    completed: false,
  },
  {
    title: 'Write Cypress end-to-end tests',
    description: 'Build browser-level validation tests for interactive user workflows.',
    completed: false,
  },
  {
    title: 'Setup Sentry monitoring',
    description: 'Install error capturing agents logging production server crashes.',
    completed: true,
  },
  {
    title: 'Configure Redis caching',
    description: 'Cache task list responses with automated invalidation on mutations.',
    completed: false,
  },
  {
    title: 'Perform UX research',
    description: 'Perform mock testing sessions to optimize form and pagination interactions.',
    completed: false,
  },
];

async function seed() {
  try {
    console.log('Connecting to database...');
    await connectDatabase();

    console.log('Clearing existing tasks...');
    await Task.deleteMany({});

    console.log('Inserting mock tasks...');
    const inserted = await Task.insertMany(mockTasks);
    console.log(`Successfully seeded ${inserted.length} tasks!`);
  } catch (error) {
    console.error('Failed to seed database:', error);
  } finally {
    console.log('Closing database connection...');
    await mongoose.connection.close();
    console.log('Done.');
    process.exit(0);
  }
}

seed();
