# SoundVibe Backend API

RESTful backend service for **SoundVibe** built with **NestJS**, **TypeORM**, **MySQL**, and **JWT Authentication**.

## Tech Stack
- **Framework:** NestJS (Node.js / TypeScript)
- **Database & ORM:** MySQL (XAMPP) + TypeORM
- **Authentication:** JWT (`@nestjs/jwt`, `passport-jwt`) + `bcryptjs`
- **Validation:** `class-validator` & `class-transformer`

## Prerequisites
- Node.js (v18+ LTS)
- XAMPP (MySQL & Apache)

## Setup & Installation
1. **Clone the repository:**
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd soundvibe-backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=
   DB_DATABASE=soundvibe_db
   JWT_SECRET=your_jwt_secret_key
   ```
4. **Database Setup:**
   Start MySQL in XAMPP, open `http://localhost/phpmyadmin`, create a database named `soundvibe_db`, and optionally import `soundvibe_db.sql`.
5. **Run the Server:**
   ```bash
   npm run start:dev
   ```
   The API will run at `http://localhost:3000/api/v1`.

## Core API Endpoints (`/api/v1`)
- **Auth:** `POST /auth/register`, `POST /auth/login`
- **Users:** `GET /users`, `GET /users/:id`, `DELETE /users/:id` *(Protected)*
- **Artists:** `GET /artists`, `GET /artists/:id`, `POST /artists`, `PATCH /artists/:id`, `DELETE /artists/:id`
- **Tracks:** `GET /tracks`, `GET /tracks/:id`, `POST /tracks`, `PATCH /tracks/:id`, `DELETE /tracks/:id`
- **Podcasts:** `GET /podcasts`, `GET /podcasts/:id`, `POST /podcasts`, `PATCH /podcasts/:id`, `DELETE /podcasts/:id`
- **Playlists:** `GET /playlists`, `GET /playlists/:id`, `POST /playlists`, `PATCH /playlists/:id`, `DELETE /playlists/:id`
