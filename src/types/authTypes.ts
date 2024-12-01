// Common structure for login response
export interface AuthResponse {
  token: string;
  user: User;
}

// Separate structure for sign-up response
export interface SignUpResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    name: string;  // No undefined
    password?: string; // Only in sign-up
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}
