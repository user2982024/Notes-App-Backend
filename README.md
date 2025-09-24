Notes App Backend

A secure and scalable backend for a Notes Application, built with Node.js, Express, and MongoDB.
It provides user authentication, authorization, and CRUD operations for managing notes.

Features

User Authentication (JWT-based login & signup)

Security Best Practices

Helmet for HTTP headers

Rate limiting to prevent abuse

Mongo sanitize & XSS-cleaning

Notes Management (Create, Read, Update, Delete)

CORS Enabled (configurable via .env)

MongoDB Integration

Centralized Error Handling

Tech Stack

Node.js (runtime)

Express.js (framework)

MongoDB + Mongoose (database)

JWT (authentication)

bcrypt.js (password hashing)

Helmet, Rate-Limit, Mongo-Sanitize, XSS-Clean (security)

Morgan (logging)

📂 Project Structure
Backend/
│── models/           # Mongoose models (User, Note)
│── routes/           # Express route handlers
│── middlewares/      # Auth & validation middleware
│── utils/            # Database connection
│── server.js         # Entry point
│── .env              # Environment variables (ignored by Git)
│── .gitignore        # Sensitive files ignored

⚙️ Setup & Installation

Clone the repository

git clone https://github.com/<your-username>/Notes-App-Backend.git
cd Notes-App-Backend


Install dependencies

npm install


Create .env file in root

MONGO_URI=mongodb://127.0.0.1:27017/myNotes
PORT=5000
JWT_SECRET=your_strong_secret_key
CLIENT_URL=http://localhost:3000
NODE_ENV=development


Run the server

npm start


or with nodemon:

npm run dev

🔑 API Endpoints
Users

POST /api/users/signup → Register a new user

POST /api/users/login → Login & get JWT

📝 Notes

GET /api/notes → Get all notes (auth required)

POST /api/notes → Create a note

PUT /api/notes/:id → Update a note

DELETE /api/notes/:id → Delete a note

🔒 Security

.env file is never committed (see .gitignore).

JWT secrets & database URIs are stored securely in .env.

Common vulnerabilities mitigated via Helmet, XSS-clean, and Mongo Sanitize.
