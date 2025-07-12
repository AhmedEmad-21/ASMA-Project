'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ContactForm from '@/components/book-now/ContactForm';

const ShoppingCart = dynamic(() => import('@/components/book-now/ShoppingCart'), {
    ssr: false,
    loading: () => null // لا يتم تحميله إلا عند الحاجة
});


interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
}

// Remove Arabic governorates, keep only English
const EGYPT_GOVS = [
  'Cairo', 'Giza', 'Alexandria', 'Dakahlia', 'Red Sea', 'Beheira', 'Fayoum', 'Gharbia',
  'Ismailia', 'Menoufia', 'Minya', 'Qalyubia', 'New Valley', 'Suez', 'Aswan',
  'Assiut', 'Beni Suef', 'Port Said', 'Damietta', 'Sharqia', 'South Sinai', 'Kafr El Sheikh',
  'Matrouh', 'Luxor', 'Qena', 'North Sinai', 'Sohag'
];

export default function ContactPage() {
    const router = useRouter();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    // State and ref for dragging
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef<HTMLDivElement>(null);
    const initialMousePosition = useRef({ x: 0, y: 0 });
    const isClick = useRef(true);

    // Load selected products from sessionStorage
    useEffect(() => {
        const storedProducts = sessionStorage.getItem('selectedProducts');
        if (storedProducts) {
            try {
                const parsedProducts = JSON.parse(storedProducts);
                if (parsedProducts.length > 0) {
                    setSelectedProducts(parsedProducts);
                }
            } catch (error) {
                console.error('Error parsing stored products:', error);
                setSelectedProducts([]);
            }
        }
    }, []);

    // Set initial position on mount and window resize
    useEffect(() => {
        const setInitialPosition = () => {
            if (dragRef.current) {
                setPosition({
                    x: window.innerWidth - dragRef.current.offsetWidth - 20,
                    y: window.innerHeight - dragRef.current.offsetHeight - 20
                });
            }
        };
        setInitialPosition();
        window.addEventListener('resize', setInitialPosition);
        return () => window.removeEventListener('resize', setInitialPosition);
    }, []);

    // Save selected products to sessionStorage whenever they change
    useEffect(() => {
        if (selectedProducts.length > 0) {
            sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
        } else {
            sessionStorage.removeItem('selectedProducts');
        }
    }, [selectedProducts]);

    const handleRemoveProduct = useCallback((productId: number) => {
        setSelectedProducts(prev => {
            const newProducts = prev.filter(p => p.id !== productId);
            if (newProducts.length === 0) {
                sessionStorage.removeItem('selectedProducts');
            }
            return newProducts;
        });
    }, []);

    const handleClearCart = useCallback(() => {
        setSelectedProducts([]);
        sessionStorage.removeItem('selectedProducts');
        setIsCartOpen(false);
    }, []);

    // Mouse event handlers for dragging
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!dragRef.current) return;
        setIsDragging(true);
        isClick.current = true;
        initialMousePosition.current = { x: e.clientX, y: e.clientY };
        const startX = e.clientX - position.x;
        const startY = e.clientY - position.y;
        const handleMouseMove = (e: MouseEvent) => {
            if (Math.abs(e.clientX - initialMousePosition.current.x) > 5 || Math.abs(e.clientY - initialMousePosition.current.y) > 5) {
                isClick.current = false;
            }
            const newX = e.clientX - startX;
            const newY = e.clientY - startY;
            const maxX = window.innerWidth - (dragRef.current?.offsetWidth || 0);
            const maxY = window.innerHeight - (dragRef.current?.offsetHeight || 0);
            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY))
            });
        };
        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [position.x, position.y]);

    const handleCartIconClick = useCallback(() => {
        if (isClick.current) {
            setIsCartOpen(true);
        }
        isClick.current = true;
    }, []);

    // Memoize selectedProducts for ShoppingCart
    const memoizedProducts = useMemo(() => selectedProducts, [selectedProducts]);

    // تعديل ContactFormData ليشمل جميع الحقول المطلوبة بشكل صحيح
    interface ContactFormData {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        gov: string;
        message: string;
        units: Product[];
    }

    const handleContactFormSubmit = useCallback((formData: ContactFormData) => {
        // Send formData to backend here
        console.log('Form submitted:', formData);
        alert('Thank you for your submission!');
        router.push('/');
    }, [router]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e0e7ef] py-16 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl mx-auto mb-10">
            {/* Info section before the form */}
            <div className="mb-12 text-center flex flex-col items-center gap-3">
              
              
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0C1C2D] mb-1 lg:pt-28 md:pt-12 pt-10">Reserve Your Unit Now</h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">Fill in your details and our team will contact you to help you choose the best unit and explain all available offers and details.</p>
            </div>
            <LazyMotion features={domAnimation}>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-0 border-0 shadow-none bg-transparent"
                >
                    <h2 className="text-3xl font-bold text-[#0C1C2D] mb-8 text-center">Contact Information</h2>
                    <ContactForm
                        selectedUnits={selectedProducts}
                        onRemoveUnit={handleRemoveProduct}
                        onSubmit={handleContactFormSubmit}
                        onBack={() => router.back()}
                        egyptGovs={EGYPT_GOVS}
                    />
                </m.div>
            </LazyMotion>
          </div>
            {/* Cart Button - Always visible */}
            <div
                ref={dragRef}
                className="fixed z-40"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    cursor: isDragging ? 'grabbing' : 'grab',
                    touchAction: 'none'
                }}
                onMouseDown={handleMouseDown}
                onClick={handleCartIconClick}
            >
                <button
                    className="bg-[#0C1C2D] text-white p-4 rounded-full shadow-lg hover:bg-[#1a2d42] transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {selectedProducts.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {selectedProducts.length}
                        </span>
                    )}
                </button>
            </div>
            {/* Shopping Cart */}
            {isCartOpen && (
                <ShoppingCart
                    selectedProducts={memoizedProducts}
                    onRemoveProduct={handleRemoveProduct}
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    onClearCart={handleClearCart}
                />
            )}
        </div>
    );
}
