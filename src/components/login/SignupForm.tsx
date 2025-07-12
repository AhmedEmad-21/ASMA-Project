'use client';
import React, { useState, useEffect, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { authApi } from '@/lib/api';
import Link from 'next/link';

interface SignupFormProps {
    onLoginClick: () => void;
}

const SignupForm = memo(function SignupForm({ onLoginClick }: SignupFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .password-input-container input::-ms-reveal,
            .password-input-container input::-ms-clear,
            input[type="password"]::-webkit-reveal,
            input[type="password"]::-webkit-calendar-picker-indicator {
                display: none !important;
            }
            .password-input-container input::-webkit-contacts-auto-fill-button {
                visibility: hidden;
                display: none !important;
                pointer-events: none;
                position: absolute;
                right: 0;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const handleNext = useCallback(() => {
        if (!formData.name || !formData.email) {
            setError('Please fill in your name and email.');
            return;
        }
        setError('');
        setCurrentStep(2);
    }, [formData.name, formData.email]);

    const handleBack = useCallback(() => {
        setCurrentStep(1);
        setError('');
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const response = await authApi.signup({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            if (response.token) {
                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('user', JSON.stringify(response.user));
                router.push('/Dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to create account');
        } finally {
            setIsLoading(false);
        }
    }, [formData, router]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }, []);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const toggleConfirmPasswordVisibility = useCallback(() => {
        setShowConfirmPassword((prev) => !prev);
    }, []);

    return (
        <div className="w-full space-y-5">
            <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1C2D] mb-2">Create Account</h2>
                <p className="text-gray-600 text-sm sm:text-base">
                    {currentStep === 1 ? 'Tell us about yourself' : 'Choose a secure password'}
                </p>
            </div>
            <form className="mt-6 space-y-4" onSubmit={currentStep === 2 ? handleSubmit : (e) => e.preventDefault()}>
                <div className="space-y-4">
                    {currentStep === 1 && (
                        <>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full h-12 px-3 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 transition-colors duration-200"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    required
                                    className="block w-full h-12 px-3 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 transition-colors duration-200"
                                    placeholder="Enter your email or phone number"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
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
                                        className="block w-full h-12 px-3 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 transition-colors duration-200 pr-10"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {formData.password && (
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative password-input-container">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        className="block w-full h-12 px-3 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 transition-colors duration-200 pr-10"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {formData.confirmPassword && (
                                        <button
                                            type="button"
                                            onClick={toggleConfirmPasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showConfirmPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg mt-4">
                        {error}
                    </div>
                )}

                <div className="flex items-center gap-3 mt-5">
                    {currentStep === 1 && (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl text-base font-medium text-white bg-[#0C1C2D] hover:bg-[#1a2d42] transition-colors duration-200"
                        >
                            Next
                        </button>
                    )}
                    {currentStep === 2 && (
                        <>
                            <button
                                type="button"
                                onClick={handleBack}
                                className="flex-1 py-2.5 px-4 border border-gray-300 rounded-xl text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 flex justify-center py-2.5 px-4 border border-transparent rounded-xl text-base font-medium text-white bg-[#0C1C2D] hover:bg-[#1a2d42] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : 'Create Account'}
                            </button>
                        </>
                    )}
                </div>

                <div className="text-center mt-5">
                    <p className="text-sm text-gray-600">
                        By signing up, you agree to our{' '}
                        <Link href="/terms-of-service" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 no-underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 no-underline">
                            Privacy Policy
                        </Link>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        Already have an account?{' '}
                        <button
                            onClick={onLoginClick}
                            className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 no-underline"
                        >
                            Log in
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
});

export default SignupForm;