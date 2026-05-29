# Authentication

## POST /api/v1/auth/register

Register a new user.

**Auth Required:** No

### Request
```json
{
    "email": "rei@gmail.com",
    "password": "qwertyuiop"
}
```

### Response
```json
{
    "id": "uuid",
    "email": "rei@gmail.com",
    "createdAt": "timestamp"
}
```

### Status Codes

* 201 Created
* 400 Bad Request

---

## POST /api/v1/auth/login

Authenticate user and return JWT.

**Auth Required:** No

### Request

```json
{
  "email": "rei@gmail.com",
  "password": "password123"
}
```

### Response

```json
{
    "token": "token",
    "user": {
        "id": "uuid",
        "email": "rei@gmail.com",
        "createdAt": "timestamp"
    }
}
```

### Status Codes

* 200 OK
* 401 Unauthorized
* 404 Not Found

---

## GET /api/v1/auth/me

Get current user details.

**Auth Required:** Yes

### Headers

```
Authorization: Bearer <token>
```

### Response

```json
{
    "id": "uuid",
    "email": "rei@gmail.com",
    "createdAt": "timestamp"
}
```

### Status Codes

* 200 OK
* 401 Unauthorized

---

# Alerts

**Auth Required:** Yes (for all `/alerts` endpoints)

### Headers

Authorization: `Bearer <token>`

## GET /api/v1/alerts

Get all alerts for the logged-in user.

### Response

```json
[
  {
    "id": "uuid",
    "coinId": "bitcoin",
    "type": "price_threshold",
    "operator": ">",
    "value": "70000",
    "cooldownSeconds": 1800,
    "isActive": true,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
]
```

### Status Codes
* 200 OK
* 401 Unauthorized

---

## POST /api/v1/alerts

Create a new price alert.

### Request
```json
{
    "coinId": "bitcoin",
    "type": "price_threshold",
    "operator": ">",
    "value": 70000,
    "cooldownSeconds": 1800
}
```

### Response
```json
{
    "id": "uuid",
    "coinId": "bitcoin",
    "type": "price_threshold",
    "operator": ">",
    "value": "70000",
    "cooldownSeconds": 1800,
    "isActive": true,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
}
```

### Status codes

* 201 Created
* 400 Bad Request
* 401 Unauthorized

---

## PATCH /api/v1/alerts/:id

Update an alert. Send only the fields that need to be updated.

### Request
```json
{
    "operator": "<",
    "value": 65000,
    "cooldownSeconds": 1800,
    "isActive": true
}
```

### Response
```json
{
    "id": "uuid",
    "coinId": "bitcoin",
    "type": "price_threshold",
    "operator": "<",
    "value": "65000",
    "cooldownSeconds": 1800,
    "isActive": true,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
}
```

### Status codes

* 200 OK
* 400 Bad Request
* 401 Unauthorized
* 404 Not Found

---

## DELETE /api/v1/alerts/:id

Delete an alert owned by the logged-in user.

### Response
```json
{
    "message": "Alert deleted successfully"
}
```

### Status codes
* 200 OK
* 401 Unauthorized
* 404 Not Found

---