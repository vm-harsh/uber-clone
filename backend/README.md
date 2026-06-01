# Backend API Documentation

## `POST /users/auth/register`

Creates a new user account.

### Description
This endpoint validates the incoming user details, checks whether the email is already in use, hashes the password, creates the user, and returns a JWT token for the new account.

### Request Body
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Validation Rules
- `firstName` must be at least 3 characters long
- `lastName` is optional
- `email` must be a valid email address
- `password` must be at least 6 characters long

### Status Codes
- `201 Created` - User created successfully
- `400 Bad Request` - Validation error, user already exists, or user creation failed
- `500 Internal Server Error` - Unexpected server error

### Example Success Response
```json
{
  "message": "User Created Successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "newUser": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "$2b$10$hashedpasswordvalue",
    "socketId": null,
    "_id": "665a3f2b8c1d2a00123abc45",
    "createdAt": "2026-06-01T12:00:00.000Z",
    "updatedAt": "2026-06-01T12:00:00.000Z"
  }
}
```

### Example Validation Error Response
```json
{
  "errors": [
    {
      "type": "field",
      "value": "jo",
      "msg": "FirstName must be atleast 3 characters long",
      "path": "firstName",
      "location": "body"
    }
  ]
}
```

## `POST /users/auth/login`

Authenticates an existing user and returns a JWT token.

### Description
This endpoint validates the incoming credentials, checks whether the user exists, compares the password against the stored hash, and returns the user data along with a JWT token on success.

### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Validation Rules
- `email` must be a valid email address
- `password` must be at least 6 characters long

### Status Codes
- `200 OK` - User logged in successfully
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Email or password is incorrect
- `500 Internal Server Error` - Unexpected server error

### Example Success Response
```json
{
  "message": "User Login Successfully",
  "user": {
    "_id": "665a3f2b8c1d2a00123abc45",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "$2b$10$hashedpasswordvalue",
    "socketId": null,
    "createdAt": "2026-06-01T12:00:00.000Z",
    "updatedAt": "2026-06-01T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Example Error Response
```json
{
  "message": "email or password incorrect"
}
```
