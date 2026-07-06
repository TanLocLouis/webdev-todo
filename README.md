# TODO LIST
- This is a simple `TODO LIST` web app allows users to create and manage tasks.

# DEMO
https://webdev-todo-itiv.vercel.app

![](./docs/Screenshot_20260706_122926.png)

# Features
- Show tasks list.
- Add new tasks.
- Edit tasks.
- Delete tasks.
- Mark tasks as completed.
- Search and filter by status.

# Technical requirements
- Pagination.
- Unit test.
- Docker.
- Live review.

# Techstack
## Frontend
- ReactJS.
- TailwindCSS.
- Typescript.

## Backend
- NodeJS.
- ExpressJS.

## Database
- MongoDB.

# Installation

## 🐳 Docker Deployment (Recommended)

To run the application using Docker, follow these steps:

### 1. Start MongoDB Container
Run the MongoDB container separately:
```bash
docker compose -f docs/MongoDB/docker-compose.yml up -d
```

### 2. Start Application Services
Start the frontend and backend services via the root Docker-Compose:
```bash
docker compose up -d
```
This will build and start:
- **Backend Service** at `http://localhost:3001`
- **Frontend Service** at `http://localhost:5173`

### 3. Seed Mock Tasks
To seed the database with 20 mock tasks:
```bash
docker compose exec backend npm run db:seed
```

---

## 💻 Local setup (Local Machine)

To run the project directly on your local system, follow these steps:

### 1. Database Configuration
Start the MongoDB container first:
```bash
docker compose -f docs/MongoDB/docker-compose.yml up -d
```

### 2. Configure Environment Variables
* **Backend**:
  Create a `backend/.env` file:
  ```env
  PORT=3001
  MONGODB_URI="mongodb://root:webdev-t-list@localhost:27017/todo-list?authSource=admin"
  FRONTEND_URL="http://localhost:5173"
  ```
* **Frontend**:
  Create a `frontend/.env` file:
  ```env
  VITE_API_URL="http://localhost:3001"
  ```

### 3. Install & Start Backend
Navigate to the `backend` directory, install dependencies, and start the development server:
```bash
cd backend
npm install
npm run db:seed  # Seeds 20 mock tasks
npm run dev
```

### 4. Install & Start Frontend
Navigate to the `frontend` directory, install dependencies, and start the Vite dev server:
```bash
cd ../frontend
npm install
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

# Unit test
- All Unit tests is in `/src/__tests__` folder.
- The Unit tests will test tasks service.
- To run test in `/backend` folder.
```
npm run test
```

# Contribution