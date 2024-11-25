# MatchPro API Documentation

This document outlines the API endpoints and data structures used in the MatchPro platform.

## Authentication

All authenticated endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Authentication Endpoints

#### Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "name": "John Doe"
}

Response (200 OK):
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt_token"
}
```

#### Sign In
```http
POST /auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}

Response (200 OK):
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt_token"
}
```

## Resume Management

### Resume Endpoints

#### Create Resume
```http
POST /api/resumes
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Software Engineer Resume",
  "personalInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "San Francisco, CA"
  },
  "experience": [
    {
      "company": "Tech Corp",
      "position": "Senior Developer",
      "startDate": "2020-01",
      "endDate": "2023-01",
      "description": "Led development of cloud infrastructure..."
    }
  ],
  "education": [
    {
      "institution": "University of Technology",
      "degree": "BS Computer Science",
      "graduationDate": "2019-05"
    }
  ],
  "skills": ["JavaScript", "React", "Node.js"]
}

Response (201 Created):
{
  "id": "resume_id",
  "title": "Software Engineer Resume",
  "created_at": "2023-12-20T00:00:00Z",
  ...
}
```

#### Get Resume
```http
GET /api/resumes/:id
Authorization: Bearer <token>

Response (200 OK):
{
  "id": "resume_id",
  "title": "Software Engineer Resume",
  "personalInfo": {...},
  "experience": [...],
  "education": [...],
  "skills": [...]
}
```

#### Update Resume
```http
PUT /api/resumes/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Updated Resume Title",
  ...
}

Response (200 OK):
{
  "id": "resume_id",
  "title": "Updated Resume Title",
  ...
}
```

#### Delete Resume
```http
DELETE /api/resumes/:id
Authorization: Bearer <token>

Response (204 No Content)
```

## Job Matching

### Job Search Endpoints

#### Search Jobs
```http
GET /api/jobs/search?query=software+engineer&location=san+francisco
Authorization: Bearer <token>

Response (200 OK):
{
  "jobs": [
    {
      "id": "job_id",
      "title": "Senior Software Engineer",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "description": "...",
      "requirements": [...],
      "matchScore": 0.85
    }
  ],
  "total": 100,
  "page": 1,
  "perPage": 20
}
```

#### Get Job Details
```http
GET /api/jobs/:id
Authorization: Bearer <token>

Response (200 OK):
{
  "id": "job_id",
  "title": "Senior Software Engineer",
  "company": "Tech Corp",
  "location": "San Francisco, CA",
  "description": "...",
  "requirements": [...],
  "benefits": [...],
  "postedDate": "2023-12-01T00:00:00Z"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "message": "Detailed error message",
  "code": "INVALID_REQUEST"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token",
  "code": "INVALID_TOKEN"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions",
  "code": "INSUFFICIENT_PERMISSIONS"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Resource not found",
  "code": "RESOURCE_NOT_FOUND"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred",
  "code": "INTERNAL_ERROR"
}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```
