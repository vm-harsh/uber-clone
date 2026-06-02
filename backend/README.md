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

## `GET /users/profile`

Returns the authenticated user's profile.

### Description
This protected endpoint returns the current user information from `req.user`. It requires a valid JWT (typically sent in the `token` cookie set during user login). The route is protected by `authMiddleware`.

### Request
- Method: `GET`
- Path: `/users/profile`
- Authentication: required

### Status Codes
- `200 OK` - User profile returned successfully
- `401 Unauthorized` - Missing or invalid token (handled by `authMiddleware`)
- `500 Internal Server Error` - Unexpected server error

### Example Success Response
```json
{
  "user": {
    "_id": "665a3f2b8c1d2a00123abc45",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "createdAt": "2026-06-01T12:00:00.000Z",
    "updatedAt": "2026-06-01T12:00:00.000Z"
  }
}
```

## `GET /users/auth/logout`

Logs out the authenticated user by clearing the token cookie and blacklisting the current token.

### Description
This protected endpoint stores the current token in the `blackListToken` collection, clears the `token` cookie, and returns a success message.

### Request
- Method: `GET`
- Path: `/users/auth/logout`
- Authentication: required

### Status Codes
- `200 OK` - User logged out successfully
- `401 Unauthorized` - Missing or invalid token (handled by `authMiddleware`)
- `500 Internal Server Error` - Unexpected server error

### Example Success Response
```json
{
  "message": "User Logout Successfully"
}
```

## `POST /captain/auth/register`

Creates a new captain account.

### Description
This endpoint validates the incoming captain details, checks whether the email is already in use, hashes the password, creates the captain with vehicle information, and returns a JWT token for the new account.

### Request Body
```json
{
  "firstName": "Alex",
  "lastName": "Driver",
  "email": "alex.driver@example.com",
  "password": "secret123",
  "status": "active",
  "vehicle": {
    "color": "black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Validation Rules
- `firstName` must be at least 3 characters long
- `email` must be a valid email address
- `password` must be at least 6 characters long
- `vehicle.plate` must be at least 3 characters long
- `vehicle.color` must be at least 3 characters long
- `vehicle.capacity` must be a number greater than or equal to 1
- `vehicle.vehicleType` must be one of `car`, `bike`, or `auto`

### Status Codes
- `201 Created` - Captain created successfully
- `400 Bad Request` - Validation error, captain already exists, or captain creation failed
- `500 Internal Server Error` - Unexpected server error

### Example Success Response
```json
{
  "message": "Captain Created Successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "fullName": {
      "firstName": "Alex",
      "lastName": "Driver"
    },
    "email": "alex.driver@example.com",
    "password": "$2b$10$hashedpasswordvalue",
    "socketId": null,
    "status": "active",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "_id": "665a3f2b8c1d2a00123abc45",
    "createdAt": "2026-06-02T12:00:00.000Z",
    "updatedAt": "2026-06-02T12:00:00.000Z"
  }
}
```

### Example Validation Error Response
```json
{
  "errors": [
    {
      "type": "field",
      "value": "ab",
      "msg": "FirstNme must be atleast 3 characters long",
      "path": "firstName",
      "location": "body"
    }
  ]
}
```

## `POST /captain/auth/login`

Authenticates an existing captain and returns a JWT token.

### Description
This endpoint validates the incoming credentials, checks whether the captain exists, compares the password against the stored hash, and returns the captain data along with a JWT token on success. The token is also set in an `httpOnly` cookie named `token`.

### Request Body
```json
{
  "email": "alex.driver@example.com",
  "password": "secret123"
}
```

### Validation Rules
- `email` must be a valid email address
- `password` must be at least 6 characters long

### Status Codes
- `200 OK` - Captain logged in successfully
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Email or password is incorrect
- `500 Internal Server Error` - Unexpected server error

### Example Success Response
```json
{
  "message": "captain Login Successfully",
  "captain": {
    "_id": "665a3f2b8c1d2a00123abc45",
    "fullName": {
      "firstName": "Alex",
      "lastName": "Driver"
    },
    "email": "alex.driver@example.com",
    "password": "$2b$10$hashedpasswordvalue",
    "socketId": null,
    "status": "active",
    "location": {
      "lat": 28.6139,
      "lon": 77.209
    },
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2026-06-02T12:00:00.000Z",
    "updatedAt": "2026-06-02T12:00:00.000Z"
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

## `GET /captain/profile`

Returns the authenticated captain profile.

### Description
This protected endpoint returns the current captain information from `req.captain`. It requires a valid JWT (typically sent in the `token` cookie set during captain login). The route is protected by `captainAuthMiddleware`.

### Request
- Method: `GET`
- Path: `/captain/profile`
- Authentication: required

### Status Codes
- `200 OK` - Captain profile returned successfully
- `401 Unauthorized` - Missing or invalid token (handled by `captainAuthMiddleware`)
- `500 Internal Server Error` - Unexpected server error

### Example Success Response
```json
{
  "captain": {
    "_id": "665a3f2b8c1d2a00123abc45",
    "fullName": {
      "firstName": "Alex",
      "lastName": "Driver"
    },
    "email": "alex.driver@example.com",
    "socketId": null,
    "status": "active",
    "location": {
      "lat": 28.6139,
      "lon": 77.209
    },
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2026-06-02T12:00:00.000Z",
    "updatedAt": "2026-06-02T12:00:00.000Z"
  }
}
```

## `GET /captain/auth/logout`

Logs out the authenticated captain by clearing the token cookie and blacklisting the current token.

### Description
This protected endpoint clears the `token` cookie, stores the current token in the `blackListToken` collection, and returns a success message.

### Request
- Method: `GET`
- Path: `/captain/auth/logout`
- Authentication: required

### Status Codes
- `200 OK` - Captain logged out successfully
- `401 Unauthorized` - Missing or invalid token (handled by `captainAuthMiddleware`)
- `500 Internal Server Error` - Unexpected server error

### Example Success Response
```json
{
  "message": "Captain Logout Successfully"
}
```
