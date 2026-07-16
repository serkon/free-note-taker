# 📚 Free Note Taker API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

All endpoints (except `/auth/register` and `/auth/login`) require JWT token in the Authorization header:

```bash
Authorization: Bearer <JWT_TOKEN>
```

## Error Handling

All errors follow this format:

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

## Endpoints

### Authentication

#### Register

```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "token": "jwt-token"
}
```

#### Login

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {...},
  "token": "jwt-token"
}
```

#### Get Current User

```
GET /auth/me
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Workspaces

#### List Workspaces

```
GET /workspaces
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "My Workspace",
    "description": "My workspace description",
    "icon": "📝",
    "ownerId": "uuid",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Create Workspace

```
POST /workspaces
```

**Request Body:**
```json
{
  "name": "New Workspace",
  "description": "Optional description",
  "icon": "📝"
}
```

#### Get Workspace

```
GET /workspaces/:id
```

#### Update Workspace

```
PUT /workspaces/:id
```

#### Delete Workspace

```
DELETE /workspaces/:id
```

### Pages

#### List Pages in Workspace

```
GET /pages/workspace/:workspaceId
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Page Title",
    "icon": "📄",
    "workspaceId": "uuid",
    "parentId": null,
    "order": 0,
    "isPublic": false,
    "children": []
  }
]
```

#### Create Page

```
POST /pages
```

**Request Body:**
```json
{
  "workspaceId": "uuid",
  "title": "New Page",
  "parentId": "uuid-or-null",
  "icon": "📄"
}
```

#### Get Page

```
GET /pages/:id
```

#### Get Page Hierarchy

```
GET /pages/:id/hierarchy
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Page",
  "children": [
    {
      "id": "uuid",
      "title": "Child Page",
      "children": []
    }
  ]
}
```

#### Update Page

```
PUT /pages/:id
```

#### Delete Page

```
DELETE /pages/:id
```

### Blocks

#### List Blocks in Page

```
GET /blocks/page/:pageId
```

**Response:**
```json
[
  {
    "id": "uuid",
    "pageId": "uuid",
    "type": "heading",
    "content": {
      "level": 1,
      "text": "Heading"
    },
    "order": 0,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Create Block

```
POST /blocks
```

**Request Body:**
```json
{
  "pageId": "uuid",
  "type": "text",
  "content": {
    "text": "Block content"
  },
  "order": 0
}
```

#### Update Block

```
PUT /blocks/:id
```

#### Delete Block

```
DELETE /blocks/:id
```

### Databases

#### List Databases in Page

```
GET /databases/page/:pageId
```

#### Create Database

```
POST /databases
```

**Request Body:**
```json
{
  "pageId": "uuid",
  "name": "Tasks",
  "description": "My tasks"
}
```

#### Get Database

```
GET /databases/:id
```

#### Update Database

```
PUT /databases/:id
```

#### Delete Database

```
DELETE /databases/:id
```

### Properties

#### List Properties

```
GET /properties/database/:databaseId
```

#### Create Property

```
POST /properties
```

**Request Body:**
```json
{
  "databaseId": "uuid",
  "name": "Status",
  "type": "select",
  "config": {
    "options": [
      { "id": "1", "name": "Todo", "color": "red" },
      { "id": "2", "name": "Done", "color": "green" }
    ]
  },
  "order": 0
}
```

### Database Records

#### List Records

```
GET /records/database/:databaseId
```

#### Create Record

```
POST /records
```

**Request Body:**
```json
{
  "databaseId": "uuid",
  "values": {
    "property-id": "value"
  }
}
```

#### Update Record

```
PUT /records/:id
```

#### Delete Record

```
DELETE /records/:id
```

### Search

#### Search

```
GET /search?q=query&workspaceId=uuid
```

**Response:**
```json
{
  "pages": [...],
  "blocks": [...],
  "databases": [...]
}
```

### Comments

#### List Comments

```
GET /comments/page/:pageId
```

#### Create Comment

```
POST /comments
```

**Request Body:**
```json
{
  "pageId": "uuid",
  "blockId": "uuid-or-null",
  "content": "Comment text"
}
```

#### Update Comment

```
PUT /comments/:id
```

#### Delete Comment

```
DELETE /comments/:id
```

### Sharing

#### List Shares

```
GET /shares/page/:pageId
```

#### Create Share

```
POST /shares
```

**Request Body:**
```json
{
  "pageId": "uuid",
  "sharedWithUserId": "uuid-or-null",
  "sharedWithEmail": "email-or-null",
  "permission": "view"
}
```

#### Delete Share

```
DELETE /shares/:id
```

## WebSocket Events

### Join Page

```javascript
socket.emit('page:join', {
  pageId: 'uuid',
  userId: 'uuid'
});
```

### Page Updated

```javascript
socket.on('page:updated', (data) => {
  // Handle page update
});
```

### Block Events

```javascript
// Block created
socket.on('block:created', (block) => {});

// Block updated
socket.on('block:updated', (block) => {});

// Block deleted
socket.on('block:deleted', ({ blockId }) => {});
```

### Presence

```javascript
socket.on('presence:updated', (users) => {
  // List of users currently viewing the page
});
```
