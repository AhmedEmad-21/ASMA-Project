'use client';

import React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
    imageUrl: string;
    title: string;
    // Add other potential fields like category, description if needed later
    onImageClick?: (imageUrl: string) => void;
}

// Assuming itemVariants is imported or defined elsewhere and accessible:
// import { itemVariants } from './GalleryGrid'; // Example import if in shared file

const ProjectCard: React.FC<ProjectCardProps> = ({
    imageUrl,
    title,
    onImageClick,
}) => {
    return (
        <div
            className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#ffe5d0]"
            onClick={() => onImageClick?.(imageUrl)}
        >
            <div className="w-full h-64 relative">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
            </div>
            {/* Optional: Overlay with title on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold text-center px-2">{title}</p>
            </div>
        </div>
    );
};

export default ProjectCard;