export interface Order {
    id: string;
    userId: string;
    status: 'pending' | 'processing' | 'completed';
    total: number;
    date: string;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
} 