# User Authentication System - MERN Stack

A secure, full-stack authentication system built with MongoDB, Express, React, and Node.js featuring JWT-based authentication, bcrypt password encryption, and protected routes.

## Tech Stack

**Frontend:** React, React Router, Axios, Tailwind CSS, shadcn/ui  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, bcrypt, JWT

## Features

- User registration and login with JWT authentication
- Password encryption with bcrypt
- Protected routes and user profile management
- Email confirmation and password reset
- Form validation and error handling  

## Project Structure

```
user-authentication/
├── frontend/          # React application
│   ├── src/
│   │   ├── pages/      # Login, Register, Dashboard, etc.
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/           # Express server
│   ├── middleware/     # Auth middleware
│   ├── models/         # User schema
│   ├── routes/         # API routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Backend

```bash
cd backend
npm install

# Create .env file
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key
PORT=5000

npm start  # Runs on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm start  # Runs on http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/register` | No |
| POST | `/api/auth/login` | No |
| GET | `/api/auth/profile` | Yes |
| PUT | `/api/auth/profile` | Yes |
| DELETE | `/api/auth/delete` | Yes |

## Authentication Flow

1. User registers with email and password
2. Password is hashed with bcrypt and stored in MongoDB
3. User logs in and receives a JWT token
4. Token is stored in localStorage
5. Authenticated requests include the token in the Authorization header
6. Protected routes validate the token before granting access

## Security

- Passwords hashed with bcrypt
- JWT-based authentication
- Protected route middleware
- Environment variables for sensitive data  

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Verify `.env` connection string and IP whitelist in MongoDB Atlas |
| JWT token not working | Check localStorage storage and verify JWT_SECRET matches backend |
| CORS errors | Ensure backend CORS is configured and frontend API URL is correct |

## License

MIT License

---

**Last Updated:** February 2026
