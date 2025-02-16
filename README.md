# 📒 Note-Taking App - Frontend

This is the frontend of the Note-Taking App built with React, Redux, Material UI, and TypeScript.

## 🚀 Features

- User authentication (JWT-based login & registration)

- Create, update, delete, and manage notes

- Responsive UI with Material UI components

- Feature-Sliced Design (FSD) architecture

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/Alexasky/note-taking-app-frontend.git
cd note-taking-app-frontend

```

### 2️⃣ Install Dependencies

```
yarn install  # Or use npm install

```

### 3️⃣ Create a .env File

```
Create a .env file in the root directory and add:

API_URL_BASE=http://localhost:5000/api

```

### 4️⃣ Start the Development Server

```
yarn start  # Or use npm start

```

The app will be available at http://localhost:5173.

---

## 🔗 API Configuration

This app communicates with the backend for authentication and note management. Make sure your backend is running.

-Backend Repository: https://github.com/Alexasky/note-taking-app-backend.git

### 📝 API Endpoints Used:

- POST /auth/register - Register a new user

- POST /auth/login - Login user and receive access token

- GET /notes/:userId - Fetch user notes

- POST /note/create - Create a new note

- PUT /note/:noteId - Update a note

- DELETE /note/:noteId - Delete a note
