'use client';
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

export default function Footer() {
    const currentYear = useMemo(() => new Date().getFullYear(), []); // Use useMemo to avoid hydration issues

    return (
        <footer className="w-full bg-[#F9F9F9] text-gray-900 py-24 border-t border-[#FFC04D] shadow-[0_-2px_5px_rgba(255,192,77,0.3)]">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-12">
                {/* Logo & About */}
                <div className="flex-1 min-w-[200px] mb-8 md:mb-0">
                    <div className="flex items-center mb-4">
                        <Image
                            src="/images/Web-logo.jpeg"
                            alt="Logo"
                            width={48}
                            height={48}
                            className="rounded-full"
                            priority={false}
                        />
                        <span className="ml-3 text-xl font-bold text-gray-900">ASMA</span>
                    </div>
                    <p className="text-gray-700 text-sm max-w-xs">
                        ASMA is your trusted partner for modern design, innovation, and quality. We help you create your dream space with ease and style.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex-[2] grid grid-cols-2 sm:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-5 text-base">Company</h3>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li>
                                <Link
                                    href="/About"
                                    className="relative inline-block text-base font-medium transition-all duration-300 hover:text-[#D4AF37]
                                        after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#D4AF37]
                                        after:left-0 after:-bottom-0.5 after:scale-x-0 hover:after:scale-x-100
                                        after:origin-left after:transition-transform after:duration-300"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/Services"
                                    className="relative inline-block text-base font-medium transition-all duration-300 hover:text-[#D4AF37]
                                        after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#D4AF37]
                                        after:left-0 after:-bottom-0.5 after:scale-x-0 hover:after:scale-x-100
                                        after:origin-left after:transition-transform after:duration-300"
                                >
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/Design-gallery"
                                    className="relative inline-block text-base font-medium transition-all duration-300 hover:text-[#D4AF37]
                                        after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#D4AF37]
                                        after:left-0 after:-bottom-0.5 after:scale-x-0 hover:after:scale-x-100
                                        after:origin-left after:transition-transform after:duration-300"
                                >
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-5 text-base">Support</h3>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li>
                                <Link
                                    href="/Request-design"
                                    className="relative inline-block text-base font-medium transition-all duration-300 hover:text-[#D4AF37]
                                        after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#D4AF37]
                                        after:left-0 after:-bottom-0.5 after:scale-x-0 hover:after:scale-x-100
                                        after:origin-left after:transition-transform after:duration-300"
                                >
                                    Get 3D Design
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/ContactUs"
                                    className="relative inline-block text-base font-medium transition-all duration-300 hover:text-[#D4AF37]
                                        after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#D4AF37]
                                        after:left-0 after:-bottom-0.5 after:scale-x-0 hover:after:scale-x-100
                                        after:origin-left after:transition-transform after:duration-300"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-5 text-base">Legal</h3>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="relative inline-block text-base font-medium transition-all duration-300 hover:text-[#D4AF37]
                                        after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#D4AF37]
                                        after:left-0 after:-bottom-0.5 after:scale-x-0 hover:after:scale-x-100
                                        after:origin-left after:transition-transform after:duration-300"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-service"
                                    className="relative inline-block text-base font-medium transition-all duration-300 hover:text-[#D4AF37]
                                        after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#D4AF37]
                                        after:left-0 after:-bottom-0.5 after:scale-x-0 hover:after:scale-x-100
                                        after:origin-left after:transition-transform after:duration-300"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* WhatsApp & Facebook */}
                <div className="flex-1 min-w-[180px] flex flex-col items-start md:items-end gap-4">
                    <div className="flex flex-col gap-3">
                        <a
                            href="https://wa.me/201234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-green-400 transition-colors duration-300"
                        >
                            <Image
                                src="/icones/whatsapp.svg"
                                alt="WhatsApp"
                                width={40}
                                height={40}
                                className="transition-colors duration-300 group-hover:brightness-110 " />
                            +20 123 456 7890
                        </a>
                        <a
                            href="https://wa.me/201098765432"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-green-400 transition-colors duration-300 "
                        >
                            <Image
                                src="/icones/whatsapp.svg"
                                alt="WhatsApp"
                                width={40}
                                height={40}
                                className="transition-colors duration-300 group-hover:brightness-110 " />
                            +20 109 876 5432
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 group transition-colors duration-300"
                        >
                            <Image
                                src="/icones/facebook.svg"
                                alt="Facebook"
                                width={28}
                                height={28}
                                className=" ml-2.25 mr-1 transition-colors duration-300 group-hover:brightness-110 "
                            />
                            <span className="group-hover:text-blue-400 transition-colors duration-300">Facebook</span>
                        </a>
                    </div>
                    <div className="text-xs text-gray-500 mt-4 md:mt-8">
                        &copy; {currentYear} ASMA. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
