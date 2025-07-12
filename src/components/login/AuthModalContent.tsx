'use client';

import { useState, useCallback, memo } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { authApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AuthModalContentProps {
    onClose: () => void;
}

const AuthModalContent = memo(function AuthModalContent({ onClose }: AuthModalContentProps) {
    const router = useRouter();
    const [currentView, setCurrentView] = useState<'initial' | 'login' | 'signup'>('initial');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailContinue = useCallback(() => {
        setCurrentView('login');
    }, []);

    const handleSignupClick = useCallback(() => {
        setCurrentView('signup');
    }, []);

    const handleLoginClick = useCallback(() => {
        setCurrentView('login');
    }, []);

    const handleBackToInitial = useCallback(() => {
        setCurrentView('initial');
    }, []);

    const handleSocialLogin = useCallback(async (provider: 'google' | 'facebook' | 'apple') => {
        setIsLoading(true);
        setError('');

        try {
            let token: string;
            switch (provider) {
                case 'google':
                    token = 'google_token';
                    break;
                case 'facebook':
                    token = 'facebook_token';
                    break;
                case 'apple':
                    token = 'apple_token';
                    break;
                default:
                    throw new Error('Invalid provider');
            }

            const response = await authApi.socialLogin({ provider, token });
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user));
            onClose();
            router.push('/Dashboard');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || `Failed to login with ${provider}`);
            } else {
                setError(`Failed to login with ${provider}`);
            }
        } finally {
            setIsLoading(false);
        }
    }, [onClose, router]);

    return (
        <div className="relative flex flex-col items-center justify-center w-full text-center p-4 sm:p-6">
            {/* Back Button for Login and Signup Views */}
            {(currentView === 'login' || currentView === 'signup') && (
                <button
                    onClick={handleBackToInitial}
                    className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 text-xl transition-colors duration-200"
                    aria-label="Go back"
                >
                    <FaArrowLeft />
                </button>
            )}

            {/* Main Content */}
            <div className="w-full max-w-md mx-auto pt-6 space-y-6">
                {currentView === 'initial' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1C2D] mb-4">Welcome to ASMA</h2>
                        <p className="text-gray-600 text-sm sm:text-base mb-6">
                            Choose how you want to sign in or create an account.
                        </p>

                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg mb-6">
                                {error}
                            </div>
                        )}

                        {/* Social Login Buttons and Email Continue */}
                        <div className="space-y-4">

                            {/* Social Login Buttons */}
                            <button
                                onClick={() => handleSocialLogin('google')}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl text-base font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FcGoogle className="h-5 w-5 mr-3" />
                                <span className='mr-0.5'> Google</span>
                            </button>
                            <button
                                onClick={() => handleSocialLogin('facebook')}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl text-base font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaFacebook className="h-5 w-5 mr-3 text-blue-600 ml-5" />
                                Facebook
                            </button>
                            <button
                                onClick={() => handleSocialLogin('apple')}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl text-base font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaApple className="h-5 w-5 mr-3 text-gray-800 " />
                                <span className='mr-2'> Apple</span>
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-2 bg-white text-sm text-gray-500">or continue with</span>
                                </div>
                            </div>

                            {/* Continue with Email Button */}
                            <button
                                onClick={handleEmailContinue}
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-base font-medium text-white bg-[#0C1C2D] hover:bg-[#1a2d42] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue with Email
                            </button>
                        </div>

                        {/* Don't have account / Terms */}
                        <p className="text-sm text-gray-600 mt-6">
                            Don&#39;t have an account?{' '}
                            <button onClick={handleSignupClick} className="text-blue-600 hover:text-blue-800 font-medium no-underline transition-colors duration-200">
                                Sign up
                            </button>
                        </p>
                        <p className="text-xs text-gray-500 mt-4">
                            By continuing, you agree to ASMA&#39;s{' '}
                            <Link href="/terms-of-service" className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 no-underline">Terms of Use</Link>{' '}
                            and{' '}
                            <Link href="/privacy-policy" className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 no-underline">Privacy Policy</Link>.
                        </p>
                    </div>
                )}

                {currentView === 'login' && (
                    <LoginForm onSignupClick={handleSignupClick} />
                )}

                {currentView === 'signup' && (
                    <SignupForm onLoginClick={handleLoginClick} />
                )}
            </div>
        </div>
    );
});

export default AuthModalContent;