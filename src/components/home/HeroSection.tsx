'use client'
import Image from 'next/image'
import Button from '../shared/btn';
import { useEffect, useState } from 'react';
import Link from 'next/link'

interface HeroParams {
    src: string;
    header: string;
    subHeader: string;
    className?: string;
}

function HeroSection({ src, header, subHeader, className }: HeroParams) {
    // Animation states
    const [showHeader, setShowHeader] = useState(false);
    const [showSubHeader, setShowSubHeader] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const t1 = setTimeout(() => setShowHeader(true), 200);
        const t2 = setTimeout(() => setShowSubHeader(true), 600);
        const t3 = setTimeout(() => setShowBtn(true), 1000);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [isMounted]);

    // الحل: لا ترندر أي محتوى متحرك إلا بعد mount
    if (!isMounted) {
        return (
            <section
                className={`relative w-full h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden ${className}`}
                aria-label="Hero Section"
            >
                <Image
                    src={src}
                    alt={header}
                    fill
                    className="object-cover fixed"
                    priority
                    sizes="100vw"
                    quality={80}
                    loading="eager"
                    draggable={false}
                />
            </section>
        );
    }

    return (
        <section
            className={`relative w-full h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden ${className}`}
            aria-label="Hero Section"
            style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}
        >
            <Image
                src={src}
                alt={header}
                fill
                className="object-cover fixed w-full h-full"
                priority
                sizes="100vw"
                quality={80}
                loading="eager"
                draggable={false}
            />
            <div
                className="absolute inset-0 bg-[#0C1C2D]/10  flex flex-col items-start justify-center z-10 px-4 sm:px-8 md:px-10 select-none"
            >
                <div
                    className="
                        w-full
                        max-w-xs
                        sm:max-w-md
                        md:max-w-lg
                        lg:max-w-xl
                        xl:max-w-2xl
                        ml-0 md:ml-10
                    "
                >
                    <h1
                        className={`
                            text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg text-left
                            font-[Inter,sans-serif]
                            transition-all duration-700
                            ${showHeader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                        `}
                        style={{
                            letterSpacing: '2px',
                            lineHeight: '1.15',
                        }}
                    >
                        {header}
                    </h1>
                    <h3
                        className={`
                            text-white text-base sm:text-lg md:text-2xl font-medium mb-6 drop-shadow text-left
                            font-[Inter,sans-serif]
                            transition-all duration-700 delay-200
                            ${showSubHeader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                        `}
                        style={{
                            letterSpacing: '1px',
                            lineHeight: '1.5',
                        }}
                    >
                        {subHeader}
                    </h3>
                    <div
                        className={`
                            transition-all duration-700 delay-300
                            ${showBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                        `}
                    >
                        <Link href="/Request-design">
                            <Button className="text-base sm:text-lg md:text-2xl px-6 sm:px-8 py-3 sm:py-4 font-bold shadow-lg font-[Inter,sans-serif]">
                                Start Your Journey
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;