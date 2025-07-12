import { LoginRequest, SignupRequest, SocialLoginRequest, AuthResponse, ErrorResponse } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

async function handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
        throw new Error((data as ErrorResponse).message || 'An error occurred');
    }

    return data as T;
}

export const authApi = {
    // Regular email/password login
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        return handleResponse<AuthResponse>(response);
    },

    // Regular email/password signup
    signup: async (userData: SignupRequest): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        return handleResponse<AuthResponse>(response);
    },

    // Social login (Google, Facebook, Apple)
    socialLogin: async (data: SocialLoginRequest): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/social-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return handleResponse<AuthResponse>(response);
    },

    // Verify token and get user data
    verifyToken: async (token: string): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return handleResponse<AuthResponse>(response);
    },
}; 