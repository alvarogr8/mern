# MERN TODO List App

A full-stack TODO list app built with MongoDB, Express, React and Node.js — all in TypeScript.

## Structure

```
database/       # MongoDB (docker-compose for local development)
nodejs-server/  # Express + TypeScript REST API
react-client/   # React 19 + TypeScript client (Vite)
```

## Prerequisites

- Node.js 20+ and npm
- A MongoDB instance, one of:
  - Docker (`docker compose up -d` from `database/`)
  - A local MongoDB Community Server install
  - A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (use its connection string as `MONGO_URI`)

## 1. Database

If you have Docker installed:

```bash
cd database
docker compose up -d
```

This starts MongoDB on `mongodb://127.0.0.1:27017/tododb`. Otherwise, point `MONGO_URI` (see below) at your own MongoDB instance.

## 2. Backend (nodejs-server)

```bash
cd nodejs-server
npm install
cp .env.example .env   # adjust MONGO_URI / PORT / CLIENT_URL if needed
npm run dev            # starts the API on http://localhost:5000
```

REST API:

| Method | Route            | Description                     |
| ------ | ---------------- | ------------------------------- |
| GET    | `/api/todos`     | List all todos                  |
| POST   | `/api/todos`     | Create a todo `{ title }`       |
| PATCH  | `/api/todos/:id` | Update `{ title?, completed? }` |
| DELETE | `/api/todos/:id` | Delete a todo                   |

## 3. Frontend (react-client)

```bash
cd react-client
npm install
npm run dev             # starts the app on http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:5000`, so the client works out of the box against the backend above. To point at a different API host (e.g. in production), set `VITE_API_URL` (see `.env.example`).

## Build for production

```bash
# backend
cd nodejs-server && npm run build && npm start

# frontend
cd react-client && npm run build && npm run preview
```
