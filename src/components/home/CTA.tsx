'use client';
import Link from 'next/link';
import Button from '../shared/btn';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// تحميل KitchenCalculator ديناميكيًا
const KitchenCalculator = dynamic(() => import('./KitchenCalculator'), { ssr: false, loading: () => null });

function CTA() {
    // حساب السنة الحالية باستخدام useMemo
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    return (
        <LazyMotion features={domAnimation} strict>
            <m.div
                initial={{ opacity: 0, scale: 0.95, y: 60 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[#0C1C2D] py-12 px-4 sm:py-16 sm:px-6 lg:py-20 rounded-2xl flex flex-col items-center gap-8 bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#ffe5d0]"
            >
                {/* Main Heading Section */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center max-w-6xl mx-auto"
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-wider mb-4">
                        Ready to Transform Your Kitchen into a Masterpiece ?
                    </h1>
                    <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-700 max-w-3xl mx-auto">
                        The World&#39;s Leading Home Design Software of {currentYear}
                    </h2>
                </m.div>

                {/* Quick Actions Section */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-6xl mx-auto"
                >
                    <div className="flex justify-center items-center w-full sm:w-auto sm:mx-auto">
                        <Link href='/Request-design' aria-label="Get 3D Design">
                            <Button>
                                Get 3D Design
                            </Button>
                        </Link>
                    </div>
                </m.div>

                {/* Calculator Section */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="w-full max-w-6xl mx-auto"
                >
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            Start your journey and find out your initial kitchen cost
                        </h3>
                        <p className="text-gray-600">
                            Calculate your kitchen cost in seconds
                        </p>
                    </div>
                    {/* Only render KitchenCalculator if window is defined */}
                    {typeof window !== 'undefined' && <KitchenCalculator />}
                </m.div>
            </m.div>

            {/* Ready-Made Units Section - Full Width */}
            <div className="w-full bg-gradient-to-r from-pink-500 to-red-500 shadow-lg mb-12">
                <div className="container mx-auto px-4 text-center py-10 sm:py-16 md:py-20 lg:py-18">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Explore Our Premium Ready-Made Home Units
                    </h3>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Choose from our wide selection of high-quality, pre-designed Home units and request an order. We will contact you immediately.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/Book-now"
                            className="inline-block bg-white text-[#0C1C2D] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                        >
                            View Collection
                        </Link>
                        <Link
                            href="/Design-gallery"
                            className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300"
                        >
                            View Our Gallery
                        </Link>
                    </div>
                </div>
            </div>
        </LazyMotion>
    );
}

export default CTA;