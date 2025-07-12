'use client';
import React, { useState, useEffect, memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { authApi } from '@/lib/api';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

interface LoginFormProps {
    onSignupClick: () => void;
}

const LoginForm = memo(function LoginForm({ onSignupClick }: LoginFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Effect to add CSS for hiding default browser password reveal icon
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .password-input-container input::-ms-reveal,
            .password-input-container input::-ms-clear {
                display: none;
            }
            .password-input-container input::-webkit-contacts-auto-fill-button {
                visibility: hidden;
                display: none !important;
                pointer-events: none;
                position: absolute;
                right: 0;
            }
            /* Further attempts to hide Chrome's built-in icon */
            input[type="password"]::-webkit-reveal,
            input[type="password"]::-webkit-calendar-picker-indicator {
                display: none !important;
            }
        `;
        document.head.appendChild(style);

        // Clean up the style tag when the component unmounts
        return () => {
            document.head.removeChild(style);
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await authApi.login(formData);

            // Store the token and user data
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user));

            router.push('/Dashboard');
        } catch (err: any) {
            setError(err.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    }, [formData, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full space-y-5">
            <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1C2D] mb-2">Log In</h2>
                <p className="text-gray-600 text-sm sm:text-base">Sign in to access your account</p>
            </div>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            required
                            className="block w-full h-12 px-3 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400  transition-colors duration-200"
                            placeholder="Enter your email or phone number"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative password-input-container">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                className="block w-full h-12 px-3 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {formData.password && (
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 "
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg mt-4">
                        {error}
                    </div>
                )}

                <div className="mt-5">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl text-base font-medium text-white bg-[#0C1C2D] hover:bg-[#1a2d42] focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : 'Sign In'}
                    </button>
                </div>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                            onClick={onSignupClick}
                            className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 no-underline"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
});

export default LoginForm;