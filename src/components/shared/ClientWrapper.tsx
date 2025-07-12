'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for Header and Footer (client-side only)
const Header = dynamic(() => import('./Header'), { ssr: false, loading: () => null });
const Footer = dynamic(() => import('./Footer'), { ssr: false, loading: () => null });

// Load Modal dynamically to improve performance
const Modal = dynamic(() => import('../login/Modal'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-24 h-24 rounded-full border-4 border-[#F7931E] border-t-transparent animate-spin" />
    </div>
  ),
});

type Props = {
  children: React.ReactNode;
};

export default function ClientWrapper({ children }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(false);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header openModal={openModal} showLogin={openModal} />
      <main className="min-h-screen">
        {children}
      </main>
      {/* Always show Footer */}
      <Footer />
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
    </>
  );
}