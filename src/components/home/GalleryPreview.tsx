import Button from '../shared/btn';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface GalleryPreviewProps {
    images: string[];
    className?: string;
}

const GalleryPreview: React.FC<GalleryPreviewProps> = ({ images, className }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const touchStartX = useRef<number | null>(null);

    // Effect to prevent body scrolling when modal is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImage]);

    // Effect for auto-sliding
    useEffect(() => {
        if (isAutoPlaying && !isHovering) {
            intervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % images.length);
            }, 3000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [images.length, isHovering, isAutoPlaying]);

    const openModal = (imageSrc: string) => {
        setSelectedImage(imageSrc);
        setIsAutoPlaying(false);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsAutoPlaying(true);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
        setIsAutoPlaying(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        setIsAutoPlaying(false);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        touchStartX.current = null;
    };

    return (
        // استخدم div بعرض كامل الصفحة مع background
        <div className={`w-full bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#ffe5d0]`}>
            <section className={`container mx-auto px-0 md:px-0 py-12 text-center ${className}`}>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0C1C2D] mb-12 tracking-tight px-6 lg:pt-8">Explore Our Projects</h2>

                {/* Carousel for medium and small screens */}
                <div
                    className="lg:hidden relative w-full mb-12"
                    onMouseEnter={() => {
                        setIsHovering(true);
                        setIsAutoPlaying(false);
                    }}
                    onMouseLeave={() => {
                        setIsHovering(false);
                        setIsAutoPlaying(true);
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl">
                        {images.slice(0, 3).map((image, index) => (
                            <div
                                key={index}
                                className={`absolute w-full h-full transition-all duration-700 ease-in-out ${currentSlide === index
                                    ? 'opacity-100 transform translate-x-0'
                                    : 'opacity-0 transform translate-x-full'
                                    }`}
                            >
                                <Image
                                    src={image}
                                    alt={`Project Image ${index + 1}`}
                                    fill
                                    priority={index === 0}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Slide indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.slice(0, 3).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentSlide(index);
                                    setIsAutoPlaying(false);
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Slider controls */}
                    <button
                        type="button"
                        className="absolute top-1/2 start-4 transform -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={prevSlide}
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="absolute top-1/2 end-4 transform -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={nextSlide}
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Grid layout for large screens */}
                <div className="hidden lg:grid grid-cols-3 gap-8 mb-12 max-w-screen-xl mx-auto">
                    {images.slice(0, 3).map((image, index) => (
                        <div
                            key={index}
                            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                            onClick={() => openModal(image)}
                        >
                            <Image
                                src={image}
                                alt={`Project Image ${index + 1}`}
                                width={480}
                                height={320}
                                priority={index === 0}
                                loading={index === 0 ? 'eager' : 'lazy'}
                                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-medium tracking-wide">View Project</p>
                            </div>
                        </div>
                    ))}
                </div>

                <Link href="/Design-gallery">
                    <Button>
                        View All Projects
                    </Button>
                </Link>

                {/* Image Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 transition-opacity duration-500"
                        onClick={closeModal}
                    >
                        <div
                            className="relative max-w-4xl h-[600px] lg:w-4xl max-h-[95vh] bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Enlarged Project Image"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                                {images.slice(0, 3).map((thumbnail, index) => (
                                    <div
                                        key={index}
                                        className="relative w-20 h-20 cursor-pointer border-2 border-transparent hover:border-[#FFA600] rounded-md overflow-hidden"
                                        onClick={() => setSelectedImage(thumbnail)}
                                    >
                                        <Image
                                            src={thumbnail}
                                            alt={`Thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                className="absolute top-4 right-4 bg-gray-900/80 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-light hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                onClick={closeModal}
                                aria-label="Close Modal"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default GalleryPreview;