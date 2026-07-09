# Reno Notice Board

A full-stack Notice Board application built as part of the Reno Platforms Web Development Assignment.

The application supports complete CRUD (Create, Read, Update and Delete) operations for notices, with server-side validation, Prisma ORM, TiDB Cloud database, and deployment on Vercel.

---

## Live Demo

**Vercel Deployment**

https://reno-ops-notice-board-x57q.vercel.app/
---

## GitHub Repository

Replace this with your repository URL:

https://github.com/DheeMach05/RenoOps-Notice-Board

---

## Features

- Create a new notice
- View all notices
- Edit an existing notice
- Delete a notice with confirmation
- Responsive design for desktop and mobile
- Urgent notices displayed with a red badge
- Optional image support for notices
- Server-side validation using Zod
- Persistent storage using TiDB Cloud and Prisma ORM

---

## Tech Stack

### Frontend

- Next.js (Pages Router)
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- Prisma ORM
- Zod Validation

### Database

- TiDB Cloud (MySQL Compatible)

### Deployment

- Vercel

---

## Project Structure

```
components/
    layout/
    notice/

lib/
pages/
    api/
    notices/

prisma/
styles/
types/
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DheeMach05/RenoOps-Notice-Board.git

cd RenoOps-Notice-Board
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create an environment file

Create a `.env` file in the project root.

```
DATABASE_URL=your_tidb_connection_string
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run the application

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/notices | Fetch all notices |
| POST | /api/notices | Create a notice |
| PUT | /api/notices/:id | Update a notice |
| DELETE | /api/notices/:id | Delete a notice |

---

## Validation

Server-side validation is implemented using **Zod**.

Validation includes:

- Required title
- Required body
- Valid publish date
- Valid category
- Valid priority

Validation is performed inside the API routes.

---

## One Improvement With More Time

If I had more time, I would implement:

- Authentication and user roles (Admin/User)
- Notice search and filtering
- Pagination for large datasets
- Image upload using cloud storage instead of image URLs
- Unit and integration tests
- Better error handling and loading states
- Rich text editor for notice descriptions

---

## AI Usage

AI tools were used as a development assistant during this assignment.

Specifically, AI was used to:

- Understand parts of the assignment requirements.
- Troubleshoot development issues and build errors.
- Explain Next.js, Prisma, and TypeScript concepts.
- Review code structure and suggest improvements.
- Assist with debugging deployment and configuration issues.

All implementation decisions, testing, integration, debugging, and final verification were completed manually. AI assistance was used to accelerate development and learning, while ensuring the final code was reviewed and validated before submission.

---

## Assignment Requirements Covered

- Full CRUD functionality
- Next.js Pages Router
- Prisma ORM
- TiDB Cloud database
- REST API
- Server-side validation
- Responsive UI
- Vercel deployment

---

## Author

**Dheemanth Macherla**

GitHub:
https://github.com/DheeMach05
