'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { FaRuler, FaTools, FaPaintRoller } from 'react-icons/fa';
import { MdDesignServices, MdOutlineArchitecture, MdOutlineKitchen } from 'react-icons/md';
import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation, m } from 'framer-motion';

const ServiceCard = dynamic(() => import('@/components/services/ServiceCard'), { ssr: false });
const ProcessStep = dynamic(() => import('@/components/services/ProcessStep'), { ssr: false });

export default function ServicesPage() {
    useEffect(() => {
        // Scroll to the top of the page on refresh
        window.scrollTo(0, 0);
    }, []);

    const services = [
        {
            icon: <MdOutlineKitchen className="w-12 h-12" />,
            title: 'Kitchen Design',
            description: 'Custom kitchen designs that combine functionality with aesthetic appeal.',
            features: [
                '3D Design Visualization',
                'Space Optimization',
                'Material Selection',
                'Color Coordination'
            ]
        },
        {
            icon: <MdDesignServices className="w-12 h-12" />,
            title: 'Interior Design',
            description: 'Complete interior design solutions for your kitchen and living spaces.',
            features: [
                'Layout Planning',
                'Style Consultation',
                'Furniture Selection',
                'Lighting Design'
            ]
        },
        {
            icon: <FaRuler className="w-12 h-12" />,
            title: 'Custom Measurements',
            description: 'Precise measurements and space planning for optimal kitchen functionality.',
            features: [
                'Detailed Measurements',
                'Space Analysis',
                'Traffic Flow Planning',
                'Storage Solutions'
            ]
        },
        {
            icon: <FaTools className="w-12 h-12" />,
            title: 'Installation',
            description: 'Professional installation services for all kitchen components.',
            features: [
                'Cabinet Installation',
                'Appliance Setup',
                'Plumbing & Electrical',
                'Quality Assurance'
            ]
        },
        {
            icon: <MdOutlineArchitecture className="w-12 h-12" />,
            title: 'Renovation',
            description: 'Complete kitchen renovation services to transform your space.',
            features: [
                'Structural Changes',
                'Modern Upgrades',
                'Material Replacement',
                'Complete Makeovers'
            ]
        },
        {
            icon: <FaPaintRoller className="w-12 h-12" />,
            title: 'Finishing & Detailing',
            description: 'Attention to detail in every aspect of your kitchen project.',
            features: [
                'Custom Finishes',
                'Hardware Selection',
                'Color Matching',
                'Final Touches'
            ]
        }
    ];

    const processSteps: { number: string; title: string; description: string }[] = [
        {
            number: '01',
            title: 'Site Visit & Consultation',
            description: 'We visit your home to assess your space, take accurate measurements, and understand your kitchen needs before starting the design process.'
        },
        {
            number: '02',
            title: '3D Kitchen Design',
            description: 'Get a personalized 3D kitchen design tailored to your space, style, and budget. Visualize it before it\'s built!'
        },
        {
            number: '03',
            title: 'Manufacturing & Installation',
            description: 'We build and install your kitchen using high-quality materials and professional fitting to bring your dream kitchen to life.'
        },
        {
            number: '04',
            title: 'After-Sales Support',
            description: 'We offer continued support, maintenance, and service visits to keep your kitchen in perfect shape.'
        }
    ];

    return (
        <LazyMotion features={domAnimation} strict>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section
                    className="relative pt-32 pb-20 bg-gradient-to-r from-[#0C1C2D] to-[#1a2d42]"
                >
                    <div className="absolute inset-0" />
                    <div className="relative container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 lg:pt-16">
                                Kitchen Design Services
                            </h1>
                            <p className="text-xl md:text-2xl mb-8">
                                Transform your kitchen into a masterpiece of design and functionality
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section
                    className="py-20 px-6 md:px-12 lg:px-20"
                >
                    <div className="container mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0C1C2D] mb-12">
                            Our Design Process
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="h-full transition-all duration-200 flex justify-center items-center will-change-transform"
                                >
                                    <ServiceCard {...service} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <m.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="py-20 px-6 md:px-12 lg:px-20 bg-gray-100"
                >
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {processSteps.map((step, index) => (
                                <m.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                                    className="flex justify-center items-center"
                                >
                                    <ProcessStep {...step} />
                                </m.div>
                            ))}
                        </div>
                    </div>
                </m.section>

                {/* CTA Section */}
                <m.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="py-20 bg-gradient-to-r from-pink-500 to-red-500 shadow-lg mb-12"
                >
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Transform Your Kitchen?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Let&#39;s create your dream kitchen together. Schedule a free consultation today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/ContactUs"
                                className="inline-block bg-white text-[#0C1C2D] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                            >
                                Schedule Consultation
                            </Link>
                            <Link
                                href="/Design-gallery"
                                className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300"
                            >
                                View Our Gallery
                            </Link>
                        </div>
                    </div>
                </m.section>
            </div>
        </LazyMotion>
    );
}
