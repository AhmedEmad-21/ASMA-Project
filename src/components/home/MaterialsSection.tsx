import React, { useState, useEffect } from 'react';
import Materials from './Materials';

interface MaterialsSectionProps {
    className?: string;
}

const MaterialsSection: React.FC<MaterialsSectionProps> = ({ className }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const materials = [
        {
            title: "MDF Wood",
            description: "High-quality MDF wood resistant to moisture and heat, perfect for modern kitchens",
            imageSrc: "/images/Modern-Kitchen.png",
            imageAlt: "MDF Wood Kitchen",
            materialIcon: "/images/Web-logo.jpeg"
        },
        {
            title: "HDF Wood",
            description: "High-density fiberboard with exceptional durability and hardness, ideal for kitchen cabinets",
            imageSrc: "/images/Modern-Kitchen.png",
            imageAlt: "HDF Wood Kitchen",
            materialIcon: "/images/Web-logo.jpeg"
        },
        {
            title: "Natural Wood",
            description: "Authentic natural wood that gives a luxurious and elegant look to your kitchen",
            imageSrc: "/images/Modern-Kitchen.png",
            imageAlt: "Natural Wood Kitchen",
            materialIcon: "/images/Web-logo.jpeg"
        },
        {
            title: "PVC Wood",
            description: "Water and moisture-resistant PVC wood, perfect for open kitchens",
            imageSrc: "/images/Modern-Kitchen.png",
            imageAlt: "PVC Wood Kitchen",
            materialIcon: "/images/Web-logo.jpeg"
        }
    ];

    return (
        <div className={`container mx-auto px-4 lg:px-16 pt-6 lg:pb-24 pb-20 transition-opacity duration-700 ease-out ${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                    {materials.map((material, index) => (
                        <Materials
                            key={index}
                            title={material.title}
                            description={material.description}
                            imageSrc={material.imageSrc}
                            imageAlt={material.imageAlt}
                            materialIcon={material.materialIcon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MaterialsSection;