# 🔧 Setup Guide - Free Note Taker

## Prerequisites

- **Node.js**: v18 or higher ([Download](https://nodejs.org))
- **Docker**: Latest version ([Download](https://www.docker.com/products/docker-desktop))
- **Git**: Latest version ([Download](https://git-scm.com))
- **npm** or **yarn**: Comes with Node.js

## Local Development Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/serkon/free-note-taker.git
cd free-note-taker
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
npm --prefix backend install

# Install frontend dependencies
npm --prefix frontend install
```

### Step 3: Start Docker Services

```bash
# Start PostgreSQL and Redis
npm run services:up

# Verify services are running
docker ps
```

You should see:
- `free-note-taker-postgres` (PostgreSQL)
- `free-note-taker-redis` (Redis)

### Step 4: Setup Database

```bash
# Create database schema
npm run db:push

# Seed database with sample data
npm run db:seed
```

### Step 5: Environment Variables

#### Backend (.env)

Create `backend/.env`:

```
# Database
DATABASE_URL=postgresql://admin:password@localhost:5432/free_note_taker

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001

# Node Environment
NODE_ENV=development

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### Frontend (.env.local)

Create `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=http://localhost:3001
```

### Step 6: Start Development Servers

#### Option A: Both at once

```bash
npm run dev
```

#### Option B: Separately

```bash
# Terminal 1 - Backend
npm run api:dev

# Terminal 2 - Frontend
npm run web:dev
```

### Step 7: Access the App

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **API Docs**: http://localhost:3001/api/docs (Swagger)
- **Prisma Studio**: http://localhost:5555

## Database Management

### View Database with Prisma Studio

```bash
npm run db:studio
```

Opens http://localhost:5555 - visual database browser

### Create Migration

```bash
# In backend folder
npm run db:push
```

### Reset Database

⚠️ **WARNING**: This deletes all data!

```bash
npm run db:reset
```

## Docker Commands

### Manage Services

```bash
# Start services
npm run services:up

# Stop services
npm run services:stop

# Remove services
npm run services:down

# View logs
docker-compose -f backend/docker-compose.yml logs -f
```

### Restart Everything

```bash
npm run services:down && npm run services:up && npm run db:push
```

## Testing

```bash
# Backend tests
npm --prefix backend run test

# Backend tests watch mode
npm --prefix backend run test:watch

# Backend coverage
npm --prefix backend run test:cov
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process (macOS/Linux)
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Error

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check logs
docker-compose -f backend/docker-compose.yml logs postgres

# Restart PostgreSQL
docker-compose -f backend/docker-compose.yml restart postgres
```

### Redis Connection Error

```bash
# Check if Redis is running
docker ps | grep redis

# Test Redis connection
docker exec free-note-taker-redis redis-cli ping
```

### Clear Cache

```bash
# Clear npm cache
npm cache clean --force

# Clear node_modules and reinstall
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
npm --prefix backend install
npm --prefix frontend install
```

## Building for Production

```bash
# Build both backend and frontend
npm run build

# Build backend only
npm --prefix backend run build

# Build frontend only
npm --prefix frontend run build
```

## Next Steps

- Read [Architecture Documentation](./ARCHITECTURE.md)
- Review [API Documentation](./API.md)
- Check [Backend README](../backend/README.md)
- Check [Frontend README](../frontend/README.md)
