export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

export interface SocialLoginRequest {
    provider: 'google' | 'facebook' | 'apple';
    token: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        image?: string;
    };
}

export interface ErrorResponse {
    message: string;
    code?: string;
} 