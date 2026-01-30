# User Authentication System - Backend

A secure Node.js + Express.js backend for user authentication with JWT tokens, password encryption, and OTP-based password reset functionality.

## Features

- User registration with email validation and strong password requirements
- User login with JWT token-based sessions
- Secure password hashing using bcryptjs
- Password reset via OTP sent to registered email
- Protected routes with JWT middleware
- User profile update and account deletion
- MongoDB database integration with Mongoose
- CORS enabled for frontend communication

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password encryption
- **jsonwebtoken** - JWT token generation
- **nodemailer** - Email service for OTP delivery
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## Project Structure

```
backend/
├── models/
│   └── User.js              # Mongoose User schema
├── routes/
│   └── auth.js              # Authentication routes
├── middleware/
│   └── authMiddleware.js    # JWT verification middleware
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables (not in git)
└── .gitignore               # Git ignore file
```

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following:
```
MONGO_URI=mongodb://localhost:27017/db
JWT_SECRET=your-secret-key-here
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

## Running the Server

Start the server:
```bash
npm start
```

Or use nodemon for development:
```bash
npm install -g nodemon
nodemon server.js
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### 1. Register User
**POST** `/api/auth/register`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

Response:
```json
{
  "message": "User registered successfully"
}
```

#### 2. Login User
**POST** `/api/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### 3. Forgot Password (Send OTP)
**POST** `/api/auth/forgot-password`

Request:
```json
{
  "email": "john@example.com"
}
```

Response:
```json
{
  "message": "If the account exists, an OTP was sent."
}
```

#### 4. Verify OTP
**POST** `/api/auth/verify-otp`

Request:
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

Response:
```json
{
  "message": "OTP verified"
}
```

#### 5. Reset Password
**POST** `/api/auth/reset-password`

Request:
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePass123!"
}
```

Response:
```json
{
  "message": "Password reset successfully"
}
```

#### 6. Protected Route (Requires JWT)
**GET** `/api/protected`

Headers:
```
Authorization: Bearer your-jwt-token
```

Response:
```json
{
  "message": "Access granted"
}
```

#### 7. Update User Profile (Protected)
**PUT** `/api/auth/update`

Headers:
```
Authorization: Bearer your-jwt-token
```

Request:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

Response:
```json
{
  "message": "Profile updated successfully"
}
```

#### 8. Delete Account (Protected)
**DELETE** `/api/auth/delete`

Headers:
```
Authorization: Bearer your-jwt-token
```

Response:
```json
{
  "message": "Account deleted successfully"
}
```

## Password Requirements

Passwords must contain:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

Example: `SecurePass123!`

## Email Configuration (Gmail)

1. Enable 2-Step Verification on your Gmail account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
3. Use this app password in the `EMAIL_PASS` environment variable

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  resetOtpHash: String,
  resetOtpExpires: Date,
  __v: Number
}
```

## Middleware

### authMiddleware.js
Verifies JWT token from Authorization header and attaches user info to request.

```javascript
const token = req.headers.authorization.replace("Bearer ", "");
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `500` - Server Error

## Security Features

✅ Password encryption with bcryptjs (10 salt rounds)
✅ JWT token-based authentication
✅ Email validation
✅ Strong password requirements
✅ OTP-based password reset
✅ Protected routes with middleware
✅ Environment variables for sensitive data
✅ CORS protection

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or update `MONGO_URI` with your cloud database

**Email Service Error:**
- Verify `EMAIL_USER` and `EMAIL_PASS` are correct
- Use Gmail App Password, not regular password
- Check 2-Step Verification is enabled

**JWT Token Invalid:**
- Tokens expire after 1 hour
- User must login again to get a new token

## Contributing

This is a student project. Modifications welcome for learning purposes.

## License

ISC
