'use client'
import dynamic from 'next/dynamic';
import { useState, useEffect, useMemo } from 'react';
import Header from '../components/shared/Header';
import HeroSection from '../components/home/HeroSection';
import StepsSection from '../components/home/StepsSection';
import CTA from '../components/home/CTA';
const Modal = dynamic(() => import('../components/login/Modal'), { ssr: false, loading: () => null });
const MaterialsSection = dynamic(() => import('../components/home/MaterialsSection'), { ssr: false, loading: () => null });
const GalleryPreview = dynamic(() => import('../components/home/GalleryPreview'), { ssr: false, loading: () => null });

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showLogin = () => {};

  // Placeholder images for the gallery preview
  const galleryImages = [
    '/images/Modern-Kitchen.png',
    '/images/login.jpg',
    '/images/Web-title.png',
    // Add more image paths as needed
  ];

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  // Scroll to the top of the page on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Memoize AuthModalContent only when modal is open
  const AuthModalContent = useMemo(
    () =>
      isModalOpen
        ? dynamic(() => import('../components/login/AuthModalContent'), { ssr: false, loading: () => null })
        : null,
    [isModalOpen]
  );

  return (
    <div className="no-padding">
      {/* Buttons to trigger the modal - You might want to integrate these into a header later */}
      {/* <div className="flex justify-center gap-4 py-4">
        <button
          onClick={() => {
            showLogin();
            openModal();
          }}
          className="px-4 py-2 bg-[#D4AF37] text-[#0C1C2D] font-bold rounded hover:bg-[#c0a134] transition duration-200"
        >
          Login
        </button>
        <button
          onClick={() => {
            showSignup();
            openModal();
          }}
          className="px-4 py-2 bg-[#0C1C2D] text-white font-bold rounded hover:bg-[#2a3b4c] transition duration-200"
        >
          Sign Up
        </button>
      </div> */}

      <Header openModal={openModal} showLogin={showLogin} />

      <HeroSection
        src="/images/Modern-Kitchen.png"
        header="Your dream kitchen starts here"
        subHeader="Transform your cooking space with our expert design and installation services"
      // className="mb-16 lg:mb-24"
      />

      {/* Steps Section with full-width background */}
      <div className="w-full bg-[#f8fafc] pt-16 lg:pt-20 border-b-2" style={{borderBottom: '2px solid', borderImage: 'linear-gradient(to right, #FFA600, #FFC04D) 1'}}>
        <StepsSection
          title="We make high quality modern kitchens people love to spend all time in"
          className="py-20 lg:py-24"
        />
      </div>

      {/* Gallery Preview Section */}
      <div className="w-full border-b-2" style={{borderBottom: '2px solid', borderImage: 'linear-gradient(to right, #FFA600, #FFC04D) 1'}}>
        {/* Lazy load GalleryPreview */}
        {GalleryPreview && <GalleryPreview images={galleryImages} />}
      </div>

      {/* Materials Section with full-width background */}
      <div className="w-full bg-[#f8fafc] border-b-2" style={{borderBottom: '2px solid', borderImage: 'linear-gradient(to right, #FFA600, #FFC04D) 1'}}>
        <header className="container mx-auto px-4 py-12 pt-16 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0C1C2D] mb-4">
            Premium Materials for Your Kitchen
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of high-quality materials designed to elevate your kitchen&#39;s style and functionality.
          </p>
        </header>
        {/* Lazy load MaterialsSection */}
        {MaterialsSection && <MaterialsSection />}
      </div>

      <CTA />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {AuthModalContent && <AuthModalContent onClose={closeModal} />}
        </Modal>
      )}
    </div>
  );
}
