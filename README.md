# Authentication and Todo Backend

A simple Node.js backend for user authentication and todo management.

## Features

- User registration
- User login with JWT authentication
- Protected todo routes for each user
- Create, read, update, delete todos
- Local JSON file persistence

## Setup

1. Copy `.env.example` to `.env`.
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm run dev
```

Or for production:

```bash
npm start
```

## Default configuration

```env
PORT=4000
JWT_SECRET=ChangeThisSecretKey
```

## API Endpoints

### Auth

- `POST /auth/register`
  - Body: `{ name, email, password }`
- `POST /auth/login`
  - Body: `{ email, password }`
  - Response: `{ token }`

### Todos (protected)

Include header: `Authorization: Bearer <token>`

- `GET /todos`
- `POST /todos`
  - Body: `{ title, description? }`
- `GET /todos/:id`
- `PUT /todos/:id`
  - Body: `{ title?, description?, completed? }`
- `DELETE /todos/:id`

## Notes

- This backend uses a simple JSON file store in `data/db.json`.
- Do not commit the `.env` file or `data/db.json`.
