
A modern, minimal note-taking app built with React + Zustand. Fast, reactive, and keyboard-first.

## Features
- **Instant UI** - Optimistic updates with Zustand for zero-latency feel
- **Auto-save** - Debounced saving so you never lose a thought
- **Smart Navigation** - Auto-redirect to home when last note is deleted
- **Responsive** - Clean UI that works on desktop & mobile
- **Smart Navigation** - Auto-redirect to home when the last note is deleted
- **Secure Auth** - JWT hybrid system using short-lived access tokens + httpOnly refresh tokens

## Tech Stack

### **Frontend**
| Tech | Usage |
| --- | --- |
| **React 19** | UI library with React Compiler optimizations |
| **shadcn/ui** | Headless components + TailwindCSS for styling |
| **Zustand** | Lightweight global state management |
| **Axios** | HTTP client with AbortController support |
| **Framer Motion** | Micro-interactions & smooth animations |
| **BlockNote** | Notion-like rich text editor with slash commands |
| **Lucide React** | Icon set, consistent & tree-shakeable |
| **React Router v6** | Client-side routing |

### **Backend**
| Tech | Usage |
| --- | --- |
| **Express.js** | REST API server |
| **PostgreSQL** | Relational database for notes & users |
| **JWT + Session Hybrid** | Access token + refresh token for secure auth |
| **bcrypt** | Password hashing |
| **Zod** | Runtime validation for request bodies |


## Getting Started
### 1. Clone & Install
```bash
git clone https://github.com/username/note-app.git
cd notiz
pnpm install
```

### 2. Setting Up Database

#### 1. Make sure PostgreSQL is installed and running
#### 2. Create a new database, then run this SQL:

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  password    TEXT NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE refresh_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token       TEXT UNIQUE NOT NULL,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at  TIMESTAMP NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      text NOT NULL,
  content    text,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```
> You can also find this schema at `server/src/db/schema.sql`

### 3. Environment Variables

#### Backend: `apps/server/.env`
Create `.env` inside `apps/server/`
```env
PORT=3000
HOST=localhost
DATABASE_URL=postgresql://user:password@localhost:5432/notiz
JWT_ACCESS=your_jwt_access_secret_key_here
JWT_REFRESH=your_jwt_refresh_secret_key_here
```

#### Frontend: `apps/client/.env`
Not required for dev mode since it uses Vite proxy by default.

For production build, create `.env` inside `apps/client/`:
VITE_API_URL=https://your-api-url.com
> If `VITE_API_URL` is not set, it defaults to using Vite proxy in dev mode.

### 4. Configure Vite Proxy

Update `apps/client/vite.config.js` to match your backend port:
```javascript 
export default defineConfig({
  // ...
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Change to your backend port
        changeOrigin: true,
      },
    },
  },
})
```
### 5. Run the App

From project root:
# Start frontend
```bash
pnpm --filter client dev
```

# Start backend in another terminal
```bash
pnpm --filter server dev
```
Or run manually:
```bash 
cd apps/client && pnpm dev
cd apps/server && pnpm dev
Frontend runs at `http://localhost:5173`  
Backend runs at `http://localhost:3000`
```
