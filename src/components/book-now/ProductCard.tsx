'use client';
import React from 'react';
import { m } from 'framer-motion';
import Image from 'next/image';

interface ProductCardProps {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
    onBuyClick?: (id: number) => void;
    isSelected?: boolean;
}

function ProductImage({ src, alt }: { src: string; alt: string }) {
    return (
        <m.div
            className="relative w-full h-64 overflow-hidden rounded-t-lg"
            whileHover={{ scale: 1.05 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </m.div>
    );
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, description, onBuyClick, isSelected }) => {
    return (
        <m.div
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl w-full h-[400px] flex flex-col ${isSelected ? 'ring-2 ring-[#F7931E]' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                mass: 1
            }}
            whileHover={{
                y: -5,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                }
            }}
        >
            <ProductImage src={image} alt={name} />
            <div className="p-5 flex flex-col flex-grow">
                <m.h3
                    className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 100
                    }}
                >
                    {name}
                </m.h3>
                <m.p
                    className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 100
                    }}
                >
                    {description}
                </m.p>
                <div className="flex justify-between items-center mt-auto">
                    <m.span
                        className="text-[#0C1C2D] font-bold text-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.4,
                            type: "spring",
                            stiffness: 100
                        }}
                    >
                        {price}
                    </m.span>
                    <m.button
                        onClick={() => onBuyClick?.(id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isSelected
                            ? 'bg-[#F7931E] text-white'
                            : 'bg-[#F7931E] text-white hover:bg-[#F9A94A]'
                            }`}
                        whileHover={{
                            scale: 1.05,
                            transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 10
                            }
                        }}
                        whileTap={{
                            scale: 0.95,
                            transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 10
                            }
                        }}
                    >
                        {isSelected ? 'Selected' : 'Select'}
                    </m.button>
                </div>
            </div>
        </m.div>
    );
};

ProductCard.displayName = 'ProductCard';

export default ProductCard;