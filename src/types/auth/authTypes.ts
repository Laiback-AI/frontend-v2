export interface AuthResponse {
    token: string;
    user_id: string;
    account_id: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignUpRequest extends LoginRequest {
    account_name: string;
    name: string;
    surname: string;
    is_admin?: boolean;
}

export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    account_name: string;
}