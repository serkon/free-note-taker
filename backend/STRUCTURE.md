# Free Note Taker - Backend

NestJS REST API for Free Note Taker, a complete Notion clone.

## Features

- ✅ User Authentication (JWT)
- ✅ Workspace Management
- ✅ Page Hierarchy
- ✅ Rich Blocks (Text, Heading, Lists, Code, etc)
- ✅ Databases & Views
- ✅ Properties & Records
- ✅ Comments & Discussions
- ✅ Page Sharing & Permissions
- ✅ Full-text Search
- ✅ Real-time Updates (WebSocket)
- ✅ Version History (Snapshots)

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis
- **Real-time**: Socket.IO
- **API Docs**: Swagger
- **Testing**: Jest

## Quick Start

```bash
npm install
cp .env.example .env
npm run services:up
npm run db:push
npm run db:seed
npm run start:dev
```

API: http://localhost:3001/api
Docs: http://localhost:3001/api/docs

## Project Structure

```
src/
├── auth/              # Authentication
├── users/             # User management
├── workspaces/        # Workspace CRUD
├── pages/             # Page management
├── blocks/            # Block management
├── databases/         # Database management
├── properties/        # Property types
├── database-records/  # Database records
├── comments/          # Comments
├── pages-share/       # Sharing
├── search/            # Full-text search
├── websocket/         # Real-time updates
├── prisma/            # Database
├── app.module.ts
└── main.ts
```

## Database Commands

```bash
npm run db:studio      # View database
npm run db:migrate     # Create migration
npm run db:push        # Push schema
npm run db:seed        # Seed data
npm run db:reset       # Reset (destructive)
```

## Docker

```bash
npm run services:up    # Start PostgreSQL + Redis
npm run services:stop  # Stop services
```

## Testing

```bash
npm run test           # Run tests
npm run test:watch     # Watch mode
npm run test:cov       # Coverage
```

## Development

```bash
npm run start:dev      # Development server
npm run lint           # Lint
npm run format         # Format code
```

## Production

```bash
npm run build          # Build
npm run start:prod     # Start production
```

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Workspaces
- `GET /api/workspaces`
- `POST /api/workspaces`
- `GET /api/workspaces/:id`
- `PUT /api/workspaces/:id`
- `DELETE /api/workspaces/:id`

### Pages
- `GET /api/pages/workspace/:workspaceId`
- `POST /api/pages`
- `GET /api/pages/:id`
- `GET /api/pages/:id/hierarchy`
- `PUT /api/pages/:id`
- `DELETE /api/pages/:id`

### Blocks
- `GET /api/blocks/page/:pageId`
- `POST /api/blocks`
- `PUT /api/blocks/:id`
- `DELETE /api/blocks/:id`

### Databases
- `GET /api/databases/page/:pageId`
- `POST /api/databases`
- `GET /api/databases/:id`
- `PUT /api/databases/:id`
- `DELETE /api/databases/:id`

### Records
- `GET /api/records/database/:databaseId`
- `POST /api/records`
- `PUT /api/records/:id`
- `DELETE /api/records/:id`

### Comments
- `GET /api/comments/page/:pageId`
- `POST /api/comments`
- `DELETE /api/comments/:id`

### Search
- `GET /api/search?q=query&workspaceId=id`

## WebSocket

```javascript
// Join page
socket.emit('page:join', { pageId, userId })

// Events
socket.on('page:updated', (data) => {})
socket.on('block:created', (block) => {})
socket.on('block:updated', (block) => {})
socket.on('block:deleted', ({ blockId }) => {})
socket.on('presence:updated', (users) => {})
```

## License

MIT
