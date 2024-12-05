/**
 * Represents a user in the system.
 * Contains all necessary user information returned by the backend.
 */
export interface User {
    id: number;           // Unique identifier for the user
    email: string;        // User's email address
    name: string;         // User's first name
    surname: string;      // User's last name
    account_name: string; // User's account/username
}

/**
 * Represents the data required for a login request.
 * Used when sending login credentials to the backend.
 */
export interface LoginRequest {
    email: string;    // User's email for login
    password: string; // User's password
}

/**
 * Represents the data required for a sign-up request.
 * Used when registering a new user in the system.
 */
export interface SignUpRequest {
    email: string;        // User's email address
    password: string;     // User's chosen password
    name: string;         // User's first name
    surname: string;      // User's last name
    account_name: string; // User's chosen account/username
    is_admin?: boolean;   // Optional flag to indicate if user is an admin
}

/**
 * Represents the response from authentication endpoints (login/signup).
 * Contains both the authentication token and user information.
 */
export interface AuthResponse {
    token: string;        // JWT or session token for authentication
    user_id: number;      // User's unique identifier
    email: string;        // User's email address
    name: string;         // User's first name
    surname: string;      // User's last name
    account_name: string; // User's account/username
}