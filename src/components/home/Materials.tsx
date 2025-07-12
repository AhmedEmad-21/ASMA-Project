import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MaterialsProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    materialIcon: string;
    reverseLayout?: boolean;
}

const Materials: React.FC<MaterialsProps> = ({ title, description, imageSrc, imageAlt, materialIcon, reverseLayout }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the fade-in animation after the component mounts
        setIsVisible(true);
    }, []);

    // Placeholder for logo source - Replace with your actual logo path

    return (
        <div className={`flex flex-col items-center py-0 px-0 font-sans lg:flex-row lg:justify-center lg:items-center lg:py-0 lg:px-0 my-0 transition-opacity duration-700 ease-out ${reverseLayout ? 'lg:flex-row-reverse' : ''} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-start text-left mb-0 lg:mb-0 flex-1 max-w-xl bg-[#f0f0f0] p-6 rounded-lg shadow-md lg:flex-row lg:items-start relative min-h-[550px]">
                <div className="flex flex-col w-full flex-grow pr-1/3">
                        <Image
                            src={materialIcon}
                            alt={`${title} material icon`}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain mb-2"
                            loading="lazy"
                        />
                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl leading-tight">{title}</h1>
                    <p className="text-base text-gray-600 max-w-lg leading-relaxed md:text-lg mb-4">
                        {description}
                    </p>
                    <Link href="/contact-us" className="text-[#0C1C2D] hover:underline font-semibold">
                        Learn More
                    </Link>
                </div>
                <div className="absolute right-0 bottom-0 w-4/5 h-1/2">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="w-full h-full object-cover block rounded-lg shadow-lg"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 80vw"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Materials;
