// Requests
export interface RegisterRequest {
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

// Responses
export interface LoginResponse {
    token: string;
    user: User;
}

// Public user shape
export interface User {
    id: string;
    email: string;
    createdAt: string;
}

// Internal DB user
export interface DbUser {
    id: string;
    email: string;
    password_hash: string;
    created_at: string;
}