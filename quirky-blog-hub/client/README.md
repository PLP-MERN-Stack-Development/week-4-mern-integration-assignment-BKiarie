# Quirky Blog Hub

A modern, full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features
- User registration and login (JWT authentication)
- Create, edit, and delete blog posts
- Upload featured images for posts
- Categorize posts and filter by category
- Comment on blog posts
- Pagination, search, and filtering for posts
- Responsive, clean UI

## Tech Stack
- **Frontend:** React (Vite), TypeScript, React Router, Axios
- **Backend:** Node.js, Express.js, Mongoose, MongoDB
- **Authentication:** JWT, bcryptjs
- **File Uploads:** Multer

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB

### Installation
1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd quirky-blog-hub
   ```
2. **Install server dependencies:**
   ```sh
   cd server
   npm install
   ```
3. **Install client dependencies:**
   ```sh
   cd ../client
   npm install
   ```
4. **Set up environment variables:**
   - Copy `.env.example` to `.env` in both `client/` and `server/` and fill in the values.

### Running the App
1. **Start the backend server:**
   ```sh
   cd server
   npm run dev
   ```
2. **Start the frontend client:**
   ```sh
   cd ../client
   npm run dev
   ```
3. **Open your browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

## Folder Structure
```
quirky-blog-hub/
  client/   # React front-end
  server/   # Express/Mongoose back-end
```

## API Endpoints
- `POST   /api/auth/register` — Register a new user
- `POST   /api/auth/login` — Login and receive JWT
- `GET    /api/posts` — List all posts
- `GET    /api/posts/:id` — Get a single post
- `POST   /api/posts` — Create a post (auth required)
- `PUT    /api/posts/:id` — Edit a post (auth required)
- `DELETE /api/posts/:id` — Delete a post (auth required)
- `POST   /api/posts/:id/comments` — Add a comment
- `GET    /api/categories` — List categories
- `POST   /api/categories` — Create a category (auth required)

## License
MIT 