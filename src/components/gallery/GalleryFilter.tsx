'use client';

import React from 'react';

interface GalleryFilterProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const GalleryFilter: React.FC<GalleryFilterProps> = ({
    selectedCategory,
    onSelectCategory,
}) => {
    const categories = ['All categories', 'Kitchen', 'Bathroom', 'Bedroom', 'Living Room'];

    const handleCategoryClick = (category: string) => {
        onSelectCategory(category);
    };

    return (
        <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
            {categories.map(category => (
                <button
                    key={category}
                    type="button"
                    className={
                        `text-base font-medium px-5 py-2.5 text-center me-3 mb-3 rounded-full focus:ring-4 focus:outline-none
                        ${selectedCategory === category
                            ? 'text-white bg-[#F7931E] border-[#F7931E] hover:bg-[#F7931E] hover:text-white'
                            : 'text-[#0C1C2D] border border-[#0C1C2D] hover:bg-[#F7931E] hover:text-white hover:border-[#F7931E]'
                        } focus:outline-none focus:ring-0`
                    }
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default GalleryFilter; 