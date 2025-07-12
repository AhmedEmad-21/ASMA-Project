'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import UserProfile from '@/components/dashboard/UserProfile';
import OrdersList from '@/components/dashboard/OrdersList';
import PurchasedProducts from '@/components/dashboard/PurchasedProducts';
import type { Order } from '@/types/order';
import type { Product } from '@/types/product';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  
  const [orders] = useState<Order[]>([]);
  const [purchasedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await authApi.verifyToken(token);
        setUser(response.user);

        // Example: Fetch user's orders
        // try {
        //   const ordersData = await authApi.getUserOrders(response.user.id);
        //   setOrders(ordersData);
        // } catch (ordersErr) {
        //   console.error('Failed to fetch user orders:', ordersErr);
        // }

        // Example: Fetch user's purchased products
        // try {
        //   const productsData = await authApi.getPurchasedProducts(response.user.id);
        //   setPurchasedProducts(productsData);
        // } catch (productsErr) {
        //   console.error('Failed to fetch purchased products:', productsErr);
        // }

        // Example: Fetch user profile details
        // try {
        //   const profileData = await authApi.getUserProfile(response.user.id);
        //   // Assuming profileData contains { avatar, joinDate }
        //   setUser(prevUser => ({ ...prevUser, ...profileData })); // Merge profile data into user state
        // } catch (profileErr) {
        //   console.error('Failed to fetch user profile:', profileErr);
        // }

      } catch (err: unknown) {
        let errorMessage = 'Failed to verify authentication';
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        // Clear invalid token
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        router.push('/Login');
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    router.push('/Login');
  };

  useEffect(() => {
    // Scroll to the top of the page on refresh
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0C1C2D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Authentication Error</p>
          <p>{error}</p>
          <button
            onClick={() => router.push('/Login')}
            className="mt-4 px-4 py-2 bg-[#0C1C2D] text-white rounded-lg hover:bg-[#1a2d42] transition duration-150 ease-in-out"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-[#0C1C2D]">ASMA Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0C1C2D] rounded-lg hover:bg-[#1a2d42] transition duration-150 ease-in-out"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {user && (
          <div className="px-4 py-6 sm:px-0 mb-6">
            <UserProfile
              name={user.name}
              email={user.email}
              avatar={user.avatar || '/default-avatar.jpg'}
              joinDate={user.joinDate || 'N/A'}
            />
          </div>
        )}

        {user && (
          <div className="px-4 py-6 sm:px-0 mb-6">
            <OrdersList orders={orders} />
          </div>
        )}

        {user && (
          <div className="px-4 py-6 sm:px-0 mb-6">
            <PurchasedProducts products={purchasedProducts} />
          </div>
        )}

        {user && (
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-[#0C1C2D] mb-4">Welcome to Your Dashboard</h2>
              <p className="text-gray-600">
                This is your personal dashboard where you can manage your account and access ASMA&#39;s features.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}