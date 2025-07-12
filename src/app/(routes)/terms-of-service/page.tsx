"use client";

import { LazyMotion, domAnimation, m } from 'framer-motion';
import React, { useEffect, useMemo } from 'react';

export default function TermsOfServicePage() {
    useEffect(() => {
        // Scroll to the top of the page on refresh
        window.scrollTo(0, 0);
    }, []);

    const sections = useMemo(() => [
        {
            title: 'Agreement to Terms',
            content: [
                'By accessing and using ASMA services, you agree to be bound by these Terms of Service.',
                'These terms apply to all users of our website and services.',
                'We reserve the right to modify these terms at any time.',
                'Continued use of our services after changes constitutes acceptance of the new terms.'
            ]
        },
        {
            title: 'Services and Products',
            content: [
                'We provide kitchen design and renovation services.',
                'All designs and products are subject to availability.',
                'We reserve the right to modify or discontinue any service without notice.',
                'Prices are subject to change without prior notice.',
                'Custom designs may require additional time and costs.'
            ]
        },
        {
            title: 'User Responsibilities',
            content: [
                'Provide accurate and complete information.',
                'Maintain the security of your account.',
                'Notify us of any unauthorized access.',
                'Comply with all applicable laws and regulations.',
                'Respect intellectual property rights.'
            ]
        },
        {
            title: 'Payment Terms',
            content: [
                'Payment terms will be specified in individual project agreements.',
                'We accept various payment methods as indicated during checkout.',
                'All prices are in Egyptian Pounds unless otherwise stated.',
                'Payment plans may be available for larger projects.',
                'Refund policies vary by service type.'
            ]
        },
        {
            title: 'Intellectual Property',
            content: [
                'All designs and content are protected by copyright.',
                'Users may not reproduce or distribute our designs without permission.',
                'We retain rights to all design concepts and materials.',
                'Custom designs become client property upon full payment.',
                'We may use project photos for marketing with client consent.'
            ]
        },
        {
            title: 'Limitation of Liability',
            content: [
                'We are not liable for indirect or consequential damages.',
                'Our liability is limited to the amount paid for the service.',
                'We are not responsible for delays beyond our control.',
                'Clients are responsible for maintaining their property.',
                'We provide warranties as specified in project agreements.'
            ]
        },
        {
            title: 'Termination',
            content: [
                'We may terminate services for violation of these terms.',
                'Clients may cancel services according to project agreements.',
                'Cancellation fees may apply as specified in agreements.',
                'We reserve the right to refuse service to anyone.',
                'Termination does not affect accrued rights and obligations.'
            ]
        }
    ], []);

    const lastUpdatedDate = useMemo(() => {
        const date = new Date();
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }, []);

    return (
        <LazyMotion features={domAnimation} strict>
            <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#ffe5d0]">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 bg-gradient-to-r from-[#0C1C2D] to-[#1a2d42]">
                    <div className="absolute inset-0" />
                    <div className="relative container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 lg:pt-16">
                                Terms of Service
                            </h1>
                            <p className="text-xl md:text-2xl mb-8">
                                Please read these terms carefully before using our services.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white via-[#f3f6fa] to-[#e3e8ee] rounded-3xl shadow-lg p-8 md:p-12 border border-[#e0e7ef]/60">
                            <p className="text-gray-600 mb-8">
                                Last updated: {lastUpdatedDate}
                            </p>

                            <div className="space-y-12">
                                {sections.map((section, index) => (
                                    <m.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <h2 className="text-2xl font-bold text-[#0C1C2D] mb-4">
                                            {section.title}
                                        </h2>
                                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                                            {section.content.map((item, idx) => (
                                                <li key={idx} className="ml-4">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </m.div>
                                ))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h2 className="text-2xl font-bold text-[#0C1C2D] mb-4">
                                    Contact Us
                                </h2>
                                <p className="text-gray-600">
                                    If you have any questions about these Terms of Service, please contact us at:
                                </p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-gray-600">
                                        Email: legal@asma.com
                                    </p>
                                    <p className="text-gray-600">
                                        Phone: +20 123 456 7890
                                    </p>
                                    <p className="text-gray-600">
                                        Address: 123 Design Street, Cairo, Egypt
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </LazyMotion>
    );
}