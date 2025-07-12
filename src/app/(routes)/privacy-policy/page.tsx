"use client";

import { LazyMotion, domAnimation, m } from 'framer-motion';
import React, { useEffect, useMemo } from 'react';

export default function PrivacyPolicyPage() {
    useEffect(() => {
        // Scroll to the top of the page on refresh
        window.scrollTo(0, 0);
    }, []);

    const sections = useMemo(() => [
        {
            title: 'Information We Collect',
            content: [
                'Personal information (name, email, phone number)',
                'Address and location information',
                'Design preferences and requirements',
                'Payment information',
                'Communication history'
            ]
        },
        {
            title: 'How We Use Your Information',
            content: [
                'To provide and improve our services',
                'To communicate with you about your projects',
                'To process payments and transactions',
                'To send you updates and marketing materials (with your consent)',
                'To comply with legal obligations'
            ]
        },
        {
            title: 'Information Sharing',
            content: [
                'We do not sell your personal information',
                'We may share information with service providers who assist in our operations',
                'We may disclose information when required by law',
                'We maintain strict confidentiality with all client information'
            ]
        },
        {
            title: 'Data Security',
            content: [
                'We implement appropriate security measures to protect your information',
                'We regularly review and update our security practices',
                'We use encryption for sensitive data transmission',
                'We maintain secure servers and systems'
            ]
        },
        {
            title: 'Your Rights',
            content: [
                'Access your personal information',
                'Correct inaccurate information',
                'Request deletion of your information',
                'Opt-out of marketing communications',
                'File a complaint about our data practices'
            ]
        },
        {
            title: 'Cookies and Tracking',
            content: [
                'We use cookies to improve your browsing experience',
                'You can control cookie settings in your browser',
                'We use analytics to understand website usage',
                'We respect Do Not Track signals'
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
                    <div className="absolute inset-0 " />
                    <div className="relative container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 lg:pt-16">
                                Privacy Policy
                            </h1>
                            <p className="text-xl md:text-2xl mb-8">
                                Your privacy is important to us. Learn how we protect and manage your information.
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
                                    If you have any questions about our Privacy Policy, please contact us at:
                                </p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-gray-600">
                                        Email: privacy@asma.com
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