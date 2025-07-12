'use client';

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

import FilterSidebar from '@/components/book-now/FilterSidebar';
import ProductCard from '@/components/book-now/ProductCard';
import ShoppingCart from '@/components/book-now/ShoppingCart';
import ContactForm from '@/components/book-now/ContactForm';

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
}

// Sample product data (replace with actual data fetching)
const initialProducts: Product[] = [
    {
        id: 1,
        name: 'Modern Kitchen Unit',
        price: '$500',
        image: '/images/villa1.jpg',
        description: 'A sleek and modern kitchen unit perfect for contemporary homes.'
    },
    {
        id: 2,
        name: 'Classic Kitchen Unit',
        price: '$350',
        image: '/images/apartment1.jpg',
        description: 'Traditional design with modern functionality.'
    },
    {
        id: 3,
        name: 'Premium Kitchen Unit',
        price: '$600',
        image: '/images/office1.jpg',
        description: 'High-end kitchen unit with premium materials.'
    },
    {
        id: 4,
        name: 'Compact Kitchen Unit',
        price: '$450',
        image: '/images/villa2.jpg',
        description: 'Space-efficient design for smaller kitchens.'
    },
    {
        id: 5,
        name: 'Luxury Kitchen Unit',
        price: '$300',
        image: '/images/apartment2.jpg',
        description: 'Luxurious design with high-quality finishes.'
    },
    {
        id: 6,
        name: 'Custom Kitchen Unit',
        price: '$550',
        image: '/images/commercial1.jpg',
        description: 'Fully customizable kitchen unit to your specifications.'
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08, // أسرع
            delayChildren: 0.05
        }
    }
};

const item = {
    hidden: {
        opacity: 0,
        x: -30,
        scale: 0.95
    },
    show: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 18
        }
    },
    exit: {
        opacity: 0,
        x: 30,
        scale: 0.95,
        transition: {
            duration: 0.15
        }
    }
};

export default function BookNow() {
    const [selectedType, setSelectedType] = useState('');
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [hasCartOpenedAutomatically, setHasCartOpenedAutomatically] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef<HTMLDivElement>(null);
    const initialMousePosition = useRef({ x: 0, y: 0 });
    const isClick = useRef(true);

    // Load selected products and auto-open state from sessionStorage on mount
    useEffect(() => {
        const storedProducts = sessionStorage.getItem('selectedProducts');
        if (storedProducts) {
            try {
                const parsedProducts = JSON.parse(storedProducts);
                if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
                    setSelectedProducts(parsedProducts);
                }
            } catch {
                setSelectedProducts([]);
            }
        }
        const storedAutoOpenState = sessionStorage.getItem('hasCartOpenedAutomatically');
        if (storedAutoOpenState) {
            setHasCartOpenedAutomatically(JSON.parse(storedAutoOpenState));
        }
    }, []);

    // Save auto-open state to sessionStorage
    useEffect(() => {
        sessionStorage.setItem('hasCartOpenedAutomatically', JSON.stringify(hasCartOpenedAutomatically));
    }, [hasCartOpenedAutomatically]);

    // Set initial position for cart button
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

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Memoize filtered products
    const filteredProducts = useMemo(() => {
        if (selectedType === 'All') return initialProducts;
        const lowerCaseType = selectedType.toLowerCase();
        return initialProducts.filter(product =>
            product.name.toLowerCase().includes(lowerCaseType) ||
            product.description.toLowerCase().includes(lowerCaseType)
        );
    }, [selectedType]);

    // Memoize handlers
    const handleProductSelect = useCallback((product: Product) => {
        setSelectedProducts(prev => {
            const exists = prev.some(p => p.id === product.id);
            const newProducts = exists ? prev.filter(p => p.id !== product.id) : [...prev, product];
            sessionStorage.setItem('selectedProducts', JSON.stringify(newProducts));
            if (newProducts.length > 0 && !hasCartOpenedAutomatically) {
                setIsCartOpen(true);
                setHasCartOpenedAutomatically(true);
            }
            return newProducts;
        });
    }, [hasCartOpenedAutomatically]);

    const handleRemoveProduct = useCallback((productId: number) => {
        setSelectedProducts(prev => {
            const newProducts = prev.filter(p => p.id !== productId);
            sessionStorage.setItem('selectedProducts', JSON.stringify(newProducts));
            return newProducts;
        });
    }, []);

    const handleClearCart = useCallback(() => {
        setSelectedProducts([]);
        sessionStorage.removeItem('selectedProducts');
        setIsCartOpen(false);
    }, []);

    // Cart drag handlers
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
        if (isClick.current) setIsCartOpen(true);
        isClick.current = true;
    }, []);

    return (
        <LazyMotion features={domAnimation} strict>
            <div className="relative min-h-screen flex flex-col lg:flex-row">
                {/* Sidebar: يسار الصفحة في الشاشات الكبيرة */}
                <aside className="lg:sticky lg:top-0 w-full lg:w-72 xl:w-80 flex-shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 z-20 h-auto lg:h-screen flex flex-col">
                    <FilterSidebar
                        selectedType={selectedType}
                        onSelectType={setSelectedType}
                        className="pt-20 sm:pt-24 md:pt-28 lg:pt-0 h-full"
                    />
                </aside>
                {/* Units Section: يمين الصفحة في الشاشات الكبيرة */}
                <main className="flex-1 flex flex-col px-4 py-4 lg:px-8">
                    <div className="p-4 sm:p-6 lg:p-8 mt-2">
                        <m.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-2xl sm:text-3xl font-bold text-[#0C1C2D] mb-6 sm:mb-8 text-center sm:text-left pt-10 lg:pt-20"
                        >
                            Complete your needs at the lowest price
                        </m.h1>
                        <m.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                        >
                            <AnimatePresence mode="wait">
                                {filteredProducts.map((product) => (
                                    <m.div
                                        key={product.id}
                                        variants={item}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        layout
                                        className="w-full h-[400px]"
                                    >
                                        <ProductCard
                                            {...product}
                                            onBuyClick={() => handleProductSelect(product)}
                                            isSelected={selectedProducts.some(p => p.id === product.id)}
                                        />
                                    </m.div>
                                ))}
                            </AnimatePresence>
                        </m.div>
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
                        <ShoppingCart
                            selectedProducts={selectedProducts}
                            onRemoveProduct={handleRemoveProduct}
                            isOpen={isCartOpen}
                            onClose={() => setIsCartOpen(false)}
                            onClearCart={handleClearCart}
                        />
                        {/* Contact Form - Show after cart */}
                        {showForm && (
                            <ContactForm
                                selectedUnits={selectedProducts}
                                onRemoveUnit={handleRemoveProduct}
                                onSubmit={() => {
                                    setShowForm(false);
                                    setSelectedProducts([]);
                                }}
                                onBack={() => setShowForm(false)}
                            />
                        )}
                    </div>
                </main>
            </div>
        </LazyMotion>
    );
}
