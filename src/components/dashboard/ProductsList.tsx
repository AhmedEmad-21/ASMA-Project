'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    image: string;
    purchaseDate: string;
    status: 'active' | 'expired';
}

interface ProductsListProps {
    products: Product[];
}

const ProductStatusBadge: React.FC<{ status: Product['status'] }> = ({ status }) => {
    const statusStyles = {
        active: 'bg-green-100 text-green-800',
        expired: 'bg-red-100 text-red-800'
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
            {status === 'active' ? 'Active' : 'Expired'}
        </span>
    );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex space-x-4">
            <div className="relative h-20 w-20 flex-shrink-0">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 80px, 80px"
                />
            </div>
            <div className="flex-1">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">Purchased on {product.purchaseDate}</p>
                <ProductStatusBadge status={product.status} />
            </div>
        </div>
    </div>
);

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">My Designs</h2>
                <Link
                    href="/Buy-now"
                    className="text-accent hover:text-accent-dark transition-colors duration-200"
                >
                    Browse Designs
                </Link>
            </div>
            <div className="space-y-4">
                {products.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No designs found</p>
                ) : (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductsList; 