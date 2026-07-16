# 📝 Free Note Taker - A Complete Notion Clone

> A fully-featured, open-source alternative to Notion. Built with modern tech stack and designed to be 100% free to host and use.

## ✨ Features

### Core Functionality
- 📄 **Pages & Hierarchy** - Create nested pages with unlimited depth
- 📊 **Databases** - Create structured data with multiple views (table, board, calendar, gallery)
- 🧩 **Rich Blocks** - Text, headings, lists, code, quotes, images, embeds, dividers
- 🏷️ **Properties & Types** - Text, number, select, multiselect, date, checkbox, formula, relation
- 🔍 **Filtering & Sorting** - Filter and sort database views
- 🏷️ **Tags & Labels** - Organize with tags and color labels

### Collaboration
- 👥 **User Accounts** - Sign up, login, profiles
- 🔗 **Sharing** - Share pages with links and permissions
- 📝 **Comments** - Comment on pages and blocks
- 🔔 **Real-time Updates** - WebSocket-based live collaboration

### Advanced Features
- 🔍 **Full-text Search** - Search across all pages and databases
- 📦 **Snapshots** - Version history and rollback
- 🎨 **Theming** - Light/dark mode and custom themes
- 📱 **Responsive** - Mobile-friendly UI
- ⚡ **Performance** - Optimized for speed with caching

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: Socket.IO for WebSocket
- **Queue**: BullMQ with Redis
- **Auth**: JWT
- **Search**: PostgreSQL Full-text Search

### Frontend
- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: TailwindCSS
- **Rich Editor**: TipTap
- **State Management**: TanStack Query + Zustand
- **Components**: Radix UI + Headless UI

### Infrastructure
- **Local Dev**: Docker Compose
- **Database**: PostgreSQL (free tier available)
- **Cache**: Redis (free tier available)
- **API Hosting**: Railway or Render (free tier)
- **Frontend Hosting**: Vercel (free tier)

## 📁 Project Structure

```
free-note-taker/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication & JWT
│   │   ├── users/          # User management
│   │   ├── pages/          # Page CRUD & hierarchy
│   │   ├── blocks/         # Block management
│   │   ├── databases/      # Database & views
│   │   ├── properties/     # Property types
│   │   ├── search/         # Full-text search
│   │   ├── share/          # Sharing & permissions
│   │   ├── notifications/  # Real-time notifications
│   │   ├── websocket/      # Socket.IO handlers
│   │   ├── queue/          # Job processing
│   │   └── main.ts         # Entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Sample data
│   ├── test/               # Tests
│   └── docker-compose.yml  # Local PostgreSQL & Redis
│
├── frontend/                # Next.js App
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── dashboard/      # Main dashboard
│   │   ├── auth/           # Login/signup
│   │   └── page/[id]/      # Page editor
│   ├── components/
│   │   ├── Editor/         # Rich text editor
│   │   ├── Database/       # Database views
│   │   ├── Sidebar/        # Navigation
│   │   └── ui/             # Reusable UI components
│   ├── lib/                # Utilities
│   ├── hooks/              # Custom React hooks
│   └── styles/             # Global styles
│
└── docs/                    # Documentation
    ├── API.md              # API documentation
    ├── SETUP.md            # Installation guide
    └── ARCHITECTURE.md     # System design
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Local Development

```bash
# Clone the repo
git clone https://github.com/serkon/free-note-taker.git
cd free-note-taker

# Install dependencies
npm install
npm --prefix backend install
npm --prefix frontend install

# Start services (PostgreSQL, Redis)
npm run services:up

# Setup database
npm run db:push
npm run db:seed

# Start both backend and frontend
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Prisma Studio**: http://localhost:5555

### Production Deployment

#### Deploy Backend
```bash
# Option 1: Railway (recommended)
# 1. Connect repo to railway.app
# 2. Set environment variables
# 3. Deploy

# Option 2: Render
# 1. Connect repo to render.com
# 2. Create PostgreSQL service
# 3. Deploy
```

#### Deploy Frontend
```bash
# Vercel
# 1. Connect repo to vercel.com
# 2. Set NEXT_PUBLIC_API_URL
# 3. Deploy
```

## 📖 Documentation

- [📋 API Documentation](./docs/API.md)
- [🔧 Setup Guide](./docs/SETUP.md)
- [🏗️ Architecture](./docs/ARCHITECTURE.md)
- [📚 Database Schema](./backend/prisma/schema.prisma)

## 🔑 Environment Variables

### Backend (.env)
```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/free_note_taker

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=http://localhost:3001
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Notion](https://notion.so)
- Built with [NestJS](https://nestjs.com), [Next.js](https://nextjs.org), [TailwindCSS](https://tailwindcss.com)
- Community contributions and feedback

## 📞 Support

- 📧 Email: support@freenotetaker.com
- 🐛 Issues: [GitHub Issues](https://github.com/serkon/free-note-taker/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/serkon/free-note-taker/discussions)

---

**Made with ❤️ by the Free Note Taker community**
