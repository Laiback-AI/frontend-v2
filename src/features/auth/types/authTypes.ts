export interface AuthResponse {
    message: string;
    token: string;
    user_id: number;
    account_id: number;
}

export interface SignUpRequest {
    email: string;
    password: string;
    name: string;
    surname: string;
    account_name: string;
    is_admin: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    account_name: string;
}
