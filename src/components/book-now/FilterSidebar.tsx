'use client';
import React, { useCallback, memo } from 'react';

// Define the width for the fixed sidebar on large screens
const sidebarWidthClass = 'lg:w-72';

interface FilterSidebarProps {
    selectedType: string;
    onSelectType: (type: string) => void;
    className?: string; // Allow custom className for padding etc.
}

const FilterSidebar = memo(function FilterSidebar({ selectedType, onSelectType, className }: FilterSidebarProps) {
    const handleTypeSelect = useCallback((type: string) => {
        onSelectType(type);
    }, [onSelectType]);

    const filterOptions = [
        { id: 'all', label: 'All', type: 'type' },
        { id: 'kitchen-units', label: 'Kitchen Units', type: 'type' },
        { id: 'shaker', label: 'Shaker', type: 'type' },
        { id: 'flat-panel', label: 'Flat-Panel', type: 'type' },
        { id: 'glass-front', label: 'Glass-Front', type: 'type' },
        { id: 'thermofoil', label: 'Thermofoil', type: 'type' },
        { id: 'melamine', label: 'Melamine', type: 'type' },
        { id: 'custom', label: 'Custom', type: 'type' },
        { id: 'pull-out', label: 'Pull-Out', type: 'type' },
        { id: 'corner', label: 'Corner Units', type: 'type' },
        { id: 'pantry', label: 'Pantry Units', type: 'type' },
        { id: 'base', label: 'Base Cabinets', type: 'type' },
        { id: 'name', label: 'Base name', type: 'type' },
        { id: 'eman', label: 'name Cabinets', type: 'type' },
    ];

    return (
        <>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #4B5563;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background-color: #0C1C2D;
                }
            `}</style>

            {/* Mobile Filter Buttons */}
            <div className={`lg:hidden ${className || ''}`}>
                <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                    {filterOptions.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => handleTypeSelect(option.label)}
                            className={`text-base font-medium px-5 py-2.5 text-center me-3 mb-3 rounded-full focus:ring-4 focus:outline-none ${
                                selectedType === option.label
                                    ? 'text-white bg-[#F7931E] border-[#F7931E] hover:bg-[#F7931E] hover:text-white'
                                    : 'text-[#0C1C2D] border border-[#0C1C2D] hover:bg-[#F7931E] hover:text-white hover:border-[#F7931E]'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop sidebar - Only visible on large screens */}
            <div className={`hidden lg:flex lg:flex-col bg-[#0C1C2D] text-white ${sidebarWidthClass} min-h-screen`}>
                <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200">
                    <div className="flex flex-1 flex-col pt-5 pb-4 px-2">
                        <nav className="mt-0 flex-1 space-y-1">
                            <div className="mt-22 mb-2 text-white">
                                <div className="text-lg font-semibold text-center w-full">Select Unit</div>
                            </div>
                            <div className={`space-y-1 ${filterOptions.length > 12 ? 'max-h-[calc(100vh-150px)] overflow-y-auto custom-scrollbar' : ''}`}>
                                {filterOptions.map((option, idx) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleTypeSelect(option.label)}
                                        className={`group flex items-center justify-center rounded-md px-3 py-2 text-base font-medium w-full ${
                                            selectedType === option.label
                                                ? 'bg-[#F7931E] text-white'
                                                : 'text-white hover:bg-[#F7931E] hover:text-white focus:bg-[#F7931E] focus:text-white'
                                        } ${idx === filterOptions.length - 1 ? 'mb-8' : ''}`} // استخدم margin-bottom للزر الأخير فقط
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
});

FilterSidebar.displayName = 'FilterSidebar';

export default FilterSidebar;