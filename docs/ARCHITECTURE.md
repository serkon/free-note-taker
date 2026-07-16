# 🏗️ Architecture - Free Note Taker

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      Client (Web Browser)                        │
│                     Next.js + React + TailwindCSS                │
└────────────────┬────────────────────────────────────┬────────────┘
                 │ HTTP REST API                       │ WebSocket
                 │ TanStack Query + Fetch API         │ Socket.IO
                 │                                     │
┌────────────────▼─────────────────────────────────────▼────────────┐
│                      Backend API Server                           │
│                         NestJS                                    │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Auth        │  │   Pages      │  │  Databases   │           │
│  │   Module      │  │   Module     │  │   Module     │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Blocks      │  │   Properties │  │   Search     │           │
│  │   Module      │  │   Module     │  │   Module     │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Sharing     │  │   Comments   │  │ WebSocket    │           │
│  │   Module      │  │   Module     │  │   Module     │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└────────────────┬────────────────────────────────────┬────────────┘
                 │ Prisma ORM                          │
                 │                                     │
┌────────────────▼──────────────┐  ┌──────────────────▼──────────┐
│     PostgreSQL Database       │  │   Redis Cache & Queue       │
│  - Users & Auth               │  │  - Session Cache            │
│  - Pages & Hierarchy          │  │  - Real-time Updates        │
│  - Blocks & Content           │  │  - Job Queue (BullMQ)       │
│  - Databases & Properties     │  │  - Search Index             │
│  - Share & Permissions        │  │                             │
│  - Comments & History         │  │                             │
└───────────────────────────────┘  └─────────────────────────────┘
```

## Database Schema

### Core Tables

#### Users
```sql
users
├── id (UUID, PK)
├── email (unique)
├── password (hashed)
├── name
├── avatar
├── created_at
└── updated_at
```

#### Workspaces
```sql
workspaces
├── id (UUID, PK)
├── owner_id (FK → users)
├── name
├── description
├── icon
├── created_at
└── updated_at
```

#### Pages
```sql
pages
├── id (UUID, PK)
├── workspace_id (FK → workspaces)
├── parent_id (FK → pages, self-referencing for hierarchy)
├── created_by (FK → users)
├── title
├── icon
├── cover_image
├── order (for sorting)
├── is_public (boolean)
├── created_at
└── updated_at
```

#### Blocks
```sql
blocks
├── id (UUID, PK)
├── page_id (FK → pages)
├── type (enum: text, heading, list, image, etc)
├── content (JSON)
├── order
├── created_by (FK → users)
├── created_at
└── updated_at
```

#### Databases
```sql
databases
├── id (UUID, PK)
├── page_id (FK → pages)
├── name
├── description
├── created_at
└── updated_at
```

#### Database Records
```sql
db_records
├── id (UUID, PK)
├── database_id (FK → databases)
├── values (JSONB - property values)
├── created_at
└── updated_at
```

#### Properties
```sql
properties
├── id (UUID, PK)
├── database_id (FK → databases)
├── name
├── type (enum: text, number, select, date, etc)
├── config (JSON)
├── order
├── created_at
└── updated_at
```

#### Page Shares
```sql
page_shares
├── id (UUID, PK)
├── page_id (FK → pages)
├── shared_with_user_id (FK → users, nullable)
├── shared_with_email (email, nullable)
├── permission (enum: view, edit, full_access)
├── expires_at
├── created_at
└── updated_at
```

#### Comments
```sql
comments
├── id (UUID, PK)
├── page_id (FK → pages)
├── block_id (FK → blocks, nullable)
├── user_id (FK → users)
├── content
├── resolved (boolean)
├── created_at
└── updated_at
```

#### Page History (Snapshots)
```sql
page_snapshots
├── id (UUID, PK)
├── page_id (FK → pages)
├── content (JSONB - full page state)
├── created_by (FK → users)
├── description
├── created_at
└── updated_at
```

## API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/me
```

### Workspaces
```
GET    /api/workspaces
POST   /api/workspaces
GET    /api/workspaces/:id
PUT    /api/workspaces/:id
DELETE /api/workspaces/:id
```

### Pages
```
GET    /api/pages/workspace/:workspaceId
POST   /api/pages
GET    /api/pages/:id
PUT    /api/pages/:id
DELETE /api/pages/:id
GET    /api/pages/:id/hierarchy
```

### Blocks
```
GET    /api/blocks/page/:pageId
POST   /api/blocks
PUT    /api/blocks/:id
DELETE /api/blocks/:id
```

### Databases
```
GET    /api/databases/:pageId
POST   /api/databases
GET    /api/databases/:id
PUT    /api/databases/:id
DELETE /api/databases/:id
```

### Database Records
```
GET    /api/databases/:id/records
POST   /api/databases/:id/records
PUT    /api/records/:id
DELETE /api/records/:id
```

### Properties
```
GET    /api/databases/:id/properties
POST   /api/databases/:id/properties
PUT    /api/properties/:id
DELETE /api/properties/:id
```

### Search
```
GET    /api/search?q=query&workspaceId=id
```

### Sharing
```
GET    /api/pages/:id/shares
POST   /api/pages/:id/shares
DELETE /api/shares/:id
```

### Comments
```
GET    /api/comments/page/:pageId
POST   /api/comments
DELETE /api/comments/:id
```

## Real-time Updates (WebSocket)

### Socket Events

**Page Updates**
```javascript
// Client sends
socket.emit('page:join', { pageId: 'xxx' })

// Server broadcasts to all clients viewing the page
socket.on('page:updated', (data) => {})
socket.on('block:created', (data) => {})
socket.on('block:updated', (data) => {})
socket.on('block:deleted', (data) => {})
```

**Database Updates**
```javascript
socket.emit('database:join', { databaseId: 'xxx' })
socket.on('record:created', (data) => {})
socket.on('record:updated', (data) => {})
socket.on('record:deleted', (data) => {})
```

**Presence (Who's online)**
```javascript
socket.on('presence:updated', (users) => {})
```

## Authentication Flow

```
1. User registers/logs in
   ↓
2. Backend validates credentials
   ↓
3. Generate JWT token
   ↓
4. Return token to frontend
   ↓
5. Frontend stores token in httpOnly cookie
   ↓
6. Frontend sends token in Authorization header for subsequent requests
   ↓
7. Backend validates token using JWT middleware
   ↓
8. Grant access to protected resources
```

## State Management (Frontend)

### Data Fetching (TanStack Query)
- Caches API responses
- Automatic refetching
- Background synchronization

### Client State (Zustand)
- UI state (sidebar open/closed)
- Current workspace/page selection
- Editor state

### Real-time State (Socket.IO)
- Live page/database updates
- Presence information
- Notifications

## Performance Optimizations

### Backend
- **Database Indexing**: Indexes on frequently queried columns
- **Query Optimization**: Eager loading relationships
- **Caching**: Redis for sessions and search results
- **Rate Limiting**: Prevent abuse
- **Pagination**: Large result sets

### Frontend
- **Code Splitting**: Route-based code splitting
- **Image Optimization**: Next.js Image component
- **CSS Optimization**: TailwindCSS purging
- **Data Fetching**: Server-side rendering for initial load
- **Virtual Scrolling**: Large lists

## Security

### Backend
- JWT authentication
- Password hashing (bcrypt)
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention (Prisma ORM)
- XSS protection

### Frontend
- HTTPS only
- Secure cookies (httpOnly, Secure, SameSite)
- Content Security Policy
- CSRF tokens for state-changing operations

## Deployment Architecture

```
┌──────────────┐
│  Vercel      │  Frontend (Next.js)
│  (Free Tier) │
└──────────────┘

┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  Railway/    │      │  Neon.tech   │      │  Redis Cloud │
│  Render      │──────│  (Free Tier) │      │  (Free Tier) │
│  (Free Tier) │      │  PostgreSQL  │      │              │
│  Backend     │      └──────────────┘      └──────────────┘
└──────────────┘
```

## Development Workflow

1. **Feature Branch**: `git checkout -b feature/my-feature`
2. **Make Changes**: Develop locally with `npm run dev`
3. **Test**: Run tests with `npm test`
4. **Commit**: `git commit -m 'Add feature'`
5. **Push**: `git push origin feature/my-feature`
6. **PR**: Create pull request on GitHub
7. **Review & Merge**: Once approved, merge to main
8. **Deploy**: Automatically deployed via CI/CD
