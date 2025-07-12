'use client';
import React from 'react';
import { Order } from '@/types/order';

interface OrdersListProps {
    orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            </div>
            <div className="divide-y divide-gray-200">
                {orders.map((order) => (
                    <div key={order.id} className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                    Order #{order.id}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {new Date(order.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${order.status === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : order.status === 'processing'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Total</span>
                                <span className="font-medium text-gray-900">
                                    ${order.total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersList; 