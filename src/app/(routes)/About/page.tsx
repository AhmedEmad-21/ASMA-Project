'use client';

import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaAward, FaUsers, FaTools, FaHeart, FaShieldAlt } from 'react-icons/fa';
import { MdDesignServices, MdOutlineArchitecture } from 'react-icons/md';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import StatCard from '@/components/about/StatCard';
import FeatureCard from '@/components/about/FeatureCard';

// نقل البيانات الثابتة خارج الدالة
const stats = [
    { number: '500', label: 'Projects Completed' },
    { number: '15', label: 'Years Experience' },
    { number: '1000', label: 'Happy Clients' },
    { number: '50', label: 'Team Members' }
];
const features = [
    {
        icon: <MdDesignServices className="w-12 h-12" />,
        title: 'Expert Design',
        description: 'Our team of experienced designers creates stunning kitchen layouts that maximize space and functionality.'
    },
    {
        icon: <FaTools className="w-12 h-12" />,
        title: 'Quality Craftsmanship',
        description: 'We use only the finest materials and employ skilled craftsmen to ensure exceptional quality.'
    },
    {
        icon: <MdOutlineArchitecture className="w-12 h-12" />,
        title: 'Innovative Solutions',
        description: 'We stay ahead of trends and incorporate innovative solutions to create modern, efficient kitchens.'
    },
    {
        icon: <FaHeart className="w-12 h-12" />,
        title: 'Customer Satisfaction',
        description: 'Your satisfaction is our priority. We work closely with you to bring your vision to life.'
    }
];
const values = [
    {
        icon: <FaAward className="w-12 h-12" />,
        title: 'Uncompromising Quality',
        description: 'We are committed to using premium materials and precise techniques to deliver kitchens that stand the test of time.'
    },
    {
        icon: <MdDesignServices className="w-12 h-12" />,
        title: 'Innovation in Design',
        description: 'We continuously explore new trends and technologies to offer creative and functional design solutions.'
    },
    {
        icon: <FaUsers className="w-12 h-12" />,
        title: 'Client-Centric Approach',
        description: 'Your vision is our priority. We listen, collaborate, and tailor our services to meet your unique needs and desires.'
    },
    {
        icon: <FaShieldAlt className="w-12 h-12" />,
        title: 'Integrity & Transparency',
        description: 'We conduct our business with honesty, fairness, and full transparency in pricing and project progress.'
    }
];

export default function AboutPage() {
    useEffect(() => {
        // Scroll to the top of the page on refresh
        window.scrollTo(0, 0);
    }, []);

    // تحسين: useMemo للـ renderedStats
    const renderedStats = useMemo(() => stats.map((stat, index) => (
        <StatCard key={index} number={<span className="text-black">{stat.number}<span className="text-[#FFC04D]">+</span></span>} label={stat.label} />
    )), []);

    return (
        <LazyMotion features={domAnimation} strict>
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section
                    className="relative pt-32 pb-20 bg-gradient-to-r from-[#0C1C2D] to-[#1a2d42]"
                >
                    <div className="absolute inset-0 " />
                    <div className="relative container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 lg:pt-16">
                                About ASMA Kitchens
                            </h1>
                            <p className="text-xl md:text-2xl mb-8">
                                Crafting exceptional kitchen experiences since 2008
                            </p>
                        </div>
                    </div>
                </section>

                {/* Company Story */}
                <section
                    className="py-20 px-4 sm:px-6 lg:px-8 w-full flex justify-center items-center"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full px-4 sm:px-6 lg:px-8">
                        <div className="relative h-[400px] rounded-xl overflow-hidden">
                            <Image
                                src="/about/company.jpg"
                                alt="ASMA Kitchens Workshop"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="text-center px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0C1C2D] mb-6">
                                Our Story
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Founded in 2008, ASMA Kitchens has been at the forefront of kitchen design and renovation in the region.
                                We combine traditional craftsmanship with modern innovation to create kitchens that are both beautiful and functional.
                            </p>
                            <p className="text-gray-600">
                                Our commitment to quality and customer satisfaction has made us the preferred choice for homeowners
                                looking to transform their kitchens into spaces they love.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <m.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8 w-full flex justify-center items-center"
                >
                    <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0C1C2D] mb-12">
                            Why Choose Us
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-4 sm:px-6 lg:px-8">
                            {features.map((feature, index) => (
                                <m.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
                                    className="will-change-transform"
                                >
                                    <FeatureCard {...feature} />
                                </m.div>
                            ))}
                        </div>
                    </div>
                </m.section>

                {/* Stats */}
                <m.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="py-20 bg-white px-4 sm:px-6 lg:px-8 w-full flex justify-center items-center"
                >
                    <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full px-4 sm:px-6 lg:px-8">
                            {renderedStats}
                        </div>
                    </div>
                </m.section>

                {/* Our Core Values Section */}
                <m.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="py-20 bg-gray-100 px-4 sm:px-6 lg:px-8 w-full flex justify-center items-center"
                >
                    <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0C1C2D] mb-12">
                            Our Core Values
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-4 sm:px-6 lg:px-8">
                            {values.map((value, index) => (
                                <m.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                                >
                                    <FeatureCard {...value} />
                                </m.div>
                            ))}
                        </div>
                    </div>
                </m.section>

                {/* CTA Section */}
                <m.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="py-16 bg-gradient-to-r from-pink-500 to-red-500 shadow-lg mb-12 px-4 sm:px-6 lg:px-8 w-full flex justify-center items-center"
                >
                    <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Start Your Kitchen Project?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Let&#39;s create your dream kitchen together. Schedule a free consultation today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/Contact"
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

