'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Project {
    mainImage: string;
    relatedImages: string[];
    title: string;
}

interface GalleryGridProps {
    projects: Project[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ projects }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [thumbnails, setThumbnails] = useState<string[]>([]);

    const openModal = (mainImage: string, relatedImages: string[]) => {
        setSelectedImage(mainImage);
        setThumbnails(relatedImages);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setThumbnails([]);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                {projects.map((project) => (
                    <div
                        key={project.title}
                        className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
                        onClick={() => openModal(project.mainImage, project.relatedImages)}
                    >
                        <Image
                            src={project.mainImage}
                            alt={project.title}
                            width={400}
                            height={300}
                            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-lg font-medium tracking-wide">View Project</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 transition-opacity duration-500"
                    onClick={closeModal}
                >
                    <div
                        className="relative max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="Enlarged Project Image"
                            width={800}
                            height={600}
                            className="w-full h-96 object-cover"
                            priority
                        />
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                            {thumbnails.map((thumbnail, index) => (
                                <div
                                    key={index}
                                    className="relative w-20 h-20 cursor-pointer border-2 border-transparent hover:border-[#FFA600] rounded-md overflow-hidden"
                                    onClick={() => setSelectedImage(thumbnail)}
                                >
                                    <Image
                                        src={thumbnail}
                                        alt={`Thumbnail ${index + 1}`}
                                        width={80}
                                        height={80}
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            className="absolute top-4 right-4 bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl"
                            onClick={closeModal}
                            aria-label="Close Modal"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default GalleryGrid;