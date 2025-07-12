'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import GalleryFilter from '@/components/gallery/GalleryFilter';
import { motion, AnimatePresence } from 'framer-motion';

// Define the Project interface
interface Project {
    id: string;
    imageUrl: string;
    title: string;
    category: string;
}

// Placeholder data - Replace with API call later
const placeholderProjects = [
    { id: '1', imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg', title: 'Project 1', category: 'Kitchen' },
    { id: '2', imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg', title: 'Project 2', category: 'Bathroom' },
    { id: '3', imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg', title: 'Project 3', category: 'Bedroom' },
    { id: '4', imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg', title: 'Project 4', category: 'Kitchen' },
    { id: '5', imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg', title: 'Project 5', category: 'Living Room' },
    { id: '6', imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg', title: 'Project 6', category: 'Bathroom' },
    { id: '7', imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg', title: 'Project 7', category: 'Bedroom' },
    { id: '8', imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg', title: 'Project 8', category: 'Living Room' },
    { id: '9', imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg', title: 'Project 9', category: 'Kitchen' },
    { id: '10', imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg', title: 'Project 10', category: 'Bathroom' },
    { id: '11', imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg', title: 'Project 11', category: 'Bedroom' },
    { id: '12', imageUrl: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg', title: 'Project 12', category: 'Living Room' },
];

const DesignGalleryPage: React.FC = React.memo(() => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [thumbnails, setThumbnails] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All categories');

    useEffect(() => {
        setProjects(placeholderProjects);
        setError(null);
        setLoading(false);
    }, []);

    const openModal = useCallback((imageUrl: string, relatedImages: string[]) => {
        setSelectedImage(imageUrl);
        setThumbnails(relatedImages);
    }, []);
    const closeModal = useCallback(() => {
        setSelectedImage(null);
        setThumbnails([]);
    }, []);

    useEffect(() => {
        document.body.style.overflow = selectedImage ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [selectedImage]);

    const filteredProjects = useMemo(() => (
        selectedCategory === 'All categories'
            ? projects
            : projects.filter(project => project.category === selectedCategory)
    ), [projects, selectedCategory]);

    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.05,
                ease: 'easeInOut',
            },
        },
    }), []);

    const itemVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.15,
                ease: 'easeOut',
            },
        },
    }), []);

    // Scroll to the top of the page on refresh
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-16 md:pt-20 px-2 sm:px-6">
            <div className="container mx-auto px-0 py-8">
                <h1 className="text-3xl mt-24 md:text-4xl font-bold text-center text-[#0C1C2D] mb-4">
                    Our Latest Projects
                </h1>

                <GalleryFilter
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {loading && <div className="text-center text-gray-600">Loading projects...</div>}
                {error && <div className="text-center text-red-500">Error: {error}</div>}

                {!loading && !error && filteredProjects.length > 0 && (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        <AnimatePresence mode="wait">
                            {filteredProjects.map(project => (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants}
                                    className="relative group overflow-hidden rounded-lg"
                                    onClick={() => openModal(project.imageUrl, [
                                        'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
                                        'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
                                        'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
                                    ])}
                                >
                                    <Image
                                        className="h-auto max-w-full rounded-lg cursor-pointer transition-transform duration-500 group-hover:scale-110"
                                        src={project.imageUrl}
                                        alt={project.title}
                                        width={400}
                                        height={400}
                                        style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                                        priority
                                    />
                                    {selectedCategory === 'All categories' && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-white text-lg font-semibold text-center px-2">{project.category}</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {!loading && !error && filteredProjects.length === 0 && (
                    <div className="text-center text-gray-600">No projects found.</div>
                )}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-6 transition-opacity duration-500"
                    onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-full h-[60vw] min-h-[180px] sm:h-[400px] md:h-[600px] md:w-[1000px] lg:h-[700px] lg:w-[1000px] flex justify-center items-center bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out"
                        style={{ maxHeight: '80vh' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={selectedImage}
                                alt="Enlarged Project Image"
                                className="object-cover rounded-xl"
                                fill
                                sizes="(max-width: 1024px) 100vw, 1200px"
                            />
                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-4">
                            {thumbnails.map((thumbnail, index) => (
                                <div
                                    key={index}
                                    className="relative w-14 h-14 sm:w-20 sm:h-20 cursor-pointer rounded-md overflow-hidden"
                                    onClick={() => setSelectedImage(thumbnail)}
                                >
                                    <Image
                                        src={thumbnail}
                                        alt={`Thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover transition-all duration-300 border-2 border-transparent hover:border-[#FFA600] rounded-md"
                                        sizes="56px, 80px"
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gray-900/80 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl font-light hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            onClick={closeModal}
                            aria-label="Close Modal"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

DesignGalleryPage.displayName = 'DesignGalleryPage';

export default DesignGalleryPage;