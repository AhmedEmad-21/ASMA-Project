'use client';

import { ReactNode, memo, useEffect } from 'react';
import Image from 'next/image';
import AuthModalContent from './AuthModalContent';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

const Modal = memo(function Modal({ isOpen, onClose, children }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            // Prevent scrolling and interaction with other elements
            document.body.style.overflow = 'hidden';
            document.body.style.pointerEvents = 'none';
            // Enable interaction only with the modal
            const modal = document.querySelector('.modal-content');
            if (modal) {
                (modal as HTMLElement).style.pointerEvents = 'auto';
            }
        } else {
            // Restore normal behavior when modal is closed
            document.body.style.overflow = '';
            document.body.style.pointerEvents = '';
        }

        return () => {
            // Cleanup: restore normal behavior
            document.body.style.overflow = '';
            document.body.style.pointerEvents = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-out"
            onClick={onClose}
        >
            <div
                className="modal-content bg-white rounded-xl shadow-2xl w-[500px] max-w-4xl h-[625px] max-h-[95vh] flex relative overflow-hidden transform transition-all duration-300 ease-out scale-95 opacity-0 lg:w-4xl"
                onClick={(e) => e.stopPropagation()}
                style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'scale(1)' : 'scale(0.95)', filter: 'none' }}
            >
                {/* Left Section with Image and Title */}
                <div
                    className="hidden lg:flex w-2.25/5 p-6 sm:p-8 flex-col items-start justify-start relative"
                    style={{
                        backgroundImage: 'url("/images/login.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
                        <div className="flex items-center space-x-3">
                            <Image
                                src="/images/Web-logo.jpeg"
                                alt="ASMA Title"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </div>
                        <h1 className="text-center text-2xl text-[#0C1C2D] sm:text-lg font-[900]">Design and build your dream kitchen</h1>
                    </div>
                </div>

                {/* Right Section with Forms */}
                <div className="w-full lg:w-3/5 p-6 sm:p-8">
                    <button
                        className="absolute top-4 right-5.5 text-gray-500 hover:text-gray-700 text-2xl transition-colors focus:outline-none opacity-80 hover:opacity-100"
                        onClick={onClose}
                        aria-label="Close Modal"
                    >
                        X
                    </button>
                    {children || <AuthModalContent onClose={onClose} />}
                </div>
            </div>

            <style jsx global>{`
                html, body {
                    transition: filter 0.3s ease-out;
                }
                .modal-open body {
                    filter: blur(4px);
                }
            `}</style>
        </div>
    );
});

export default Modal;