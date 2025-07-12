'use client';
import React from 'react';
import { Product } from '@/types/product';

interface PurchasedProductsProps {
    products: Product[];
}

const PurchasedProducts: React.FC<PurchasedProductsProps> = ({ products }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Purchased Products</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group relative rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                            <div className="mt-2 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                    ${product.price.toFixed(2)}
                                </p>
                                <span className="text-xs text-gray-500">
                                    Purchased on {new Date(product.purchaseDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchasedProducts; 