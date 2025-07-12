'use client';
import React from 'react';

interface FeatureCardProps {
    icon: React.ReactElement<{ className?: string }>; // Ensured icon supports className prop
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="bg-white rounded-2xl p-8 border-2 border-[#FFC04D] shadow-[0_4px_15px_rgba(255,192,77,0.5)] transition-all duration-300 transform h-full flex flex-col lg:border-transparent lg:shadow-none lg:hover:border-[#FFC04D] lg:hover:shadow-[0_4px_15px_rgba(255,192,77,0.5)] lg:hover:scale-105">
            <div className="relative z-10">
                <div className="text-[#FFC04D] mb-6 text-5xl"> {/* Icon styling */}
                    {React.cloneElement(icon, { className: 'text-[#FFC04D] text-5xl' })}
                </div>
                <h3 className="text-2xl font-extrabold text-[#0C1C2D] mb-4"> {/* Title styling */}
                    {title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed flex-grow"> {/* Description styling */}
                    {description}
                </p>
            </div>
        </div>
    );
}

export default React.memo(FeatureCard);