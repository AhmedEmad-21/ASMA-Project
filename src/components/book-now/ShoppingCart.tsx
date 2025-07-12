import React from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
}

interface ShoppingCartProps {
    selectedProducts: Product[];
    onRemoveProduct: (productId: number) => void;
    isOpen: boolean;
    onClose: () => void;
    onClearCart: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
    selectedProducts,
    onRemoveProduct,
    isOpen,
    onClose,
    onClearCart
}) => {
    const router = useRouter();

    const handleProceedToCheckout = () => {
        // Only store in sessionStorage if we're not already on the Contact page
        if (!window.location.pathname.includes('/Contact')) {
            sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
            onClose();
            router.push('/Contact');
        } else {
            onClose();
        }
    };

    return (
        <LazyMotion features={domAnimation}>
            {/* Shopping Cart Panel */}
            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed right-0 top-0 h-full w-[70%] sm:w-[400px] bg-white shadow-xl z-50"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="text-xl font-semibold text-[#0C1C2D]">Selected Units</h2>
                                {selectedProducts.length > 0 && (
                                    <button
                                        onClick={onClearCart}
                                        className="text-sm font-medium text-red-600 hover:text-red-800"
                                    >
                                        Clear Cart
                                    </button>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {selectedProducts.length === 0 ? (
                                    <div className="text-center text-gray-500 py-8">
                                        No units selected yet
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {selectedProducts.map((product) => (
                                            <m.div
                                                key={product.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                                            >
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-[#0C1C2D]">{product.name}</h3>
                                                    <p className="text-sm text-gray-600">{product.price}</p>
                                                </div>
                                                <button
                                                    onClick={() => onRemoveProduct(product.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </m.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="border-t p-4">
                                <div className="flex mb-4">
                                    <span className="text-lg font-semibold text-[#0C1C2D] pr-2">Total Units:</span>
                                    <span className="text-lg font-semibold text-[#0C1C2D]">{selectedProducts.length}</span>
                                </div>
                                <button
                                    onClick={handleProceedToCheckout}
                                    disabled={selectedProducts.length === 0}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${selectedProducts.length === 0
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-[#0C1C2D] text-white hover:bg-[#1a2d42]'
                                        }`}
                                >
                                    Proceed to Contact Form
                                </button>
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </LazyMotion>
    );
};

export default ShoppingCart;