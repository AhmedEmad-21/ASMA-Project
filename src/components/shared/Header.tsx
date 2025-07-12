'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Main site pages
const mainPages = [
  { name: "About", path: "/About" },
  { name: "Services", path: "/Services" },
  { name: "Gallery", path: "/Design-gallery" },
  { name: "Book Now", path: "/Book-now" },
  { name: "Get 3D Design", path: "/Request-design" },
];

// User menu items - will be shown only when logged in
const userPages = [
  { name: "My Account", path: "/Dashboard", icon: "👤" },
];

export default function Header({
  openModal,
  showLogin,
}: { openModal: () => void; showLogin: () => void }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn] = useState(false); // This will be replaced with actual auth state

  // Handle scroll effect for border and background visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 20);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${pathname === '/'
        ? isScrolled || isMenuOpen
          ? 'bg-[#0C1C2D] shadow-lg border-b border-[#FFA500]' // Orange border
          : 'bg-transparent'
        : isScrolled || isMenuOpen
          ? 'bg-[#0C1C2D] shadow-lg border-b border-[#FFA500]' // Orange border
          : 'bg-[#0C1C2D] shadow-lg'
        }`}
    >
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left Section: Logo and Main Navigation */}
          <div className="flex items-center flex-1">
            {/* Logo */}
            <Link href="/" className="flex items-center ml-2 sm:ml-3">
              <Image
                src="/images/Web-logo.jpeg"
                alt="Logo"
                width={40}
                height={40}
                className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                priority
              />
              <span className="ml-2 mr-4 md:ml-3 text-lg md:text-xl font-bold text-white">ASMA</span>
            </Link>

            {/* Desktop Navigation - Main Pages */}
            <div className="hidden lg:flex items-center ml-2 lg:ml-4">
              {mainPages.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className={`relative px-2 py-2 text-sm lg:text-base font-medium transition-all duration-300
                    ${pathname === page.path
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                    }
                    after:content-[''] after:absolute after:w-[calc(100%-16px)] after:h-0.5 after:bg-white 
                    after:left-2 after:-bottom-0.5 after:scale-x-0 hover:after:scale-x-100 
                    after:transition-transform after:duration-300
                    mx-1
                  `}
                  aria-current={pathname === page.path ? "page" : undefined}
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section: User Menu, Auth Buttons, and Call Now */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Call Now Button - Visible on phone and tablet */}
            <a
              href="tel:+1234567890"
              className="lg:hidden text-white border border-white rounded-lg px-3 md:px-4 py-1.5 md:py-2 text-sm font-medium
                hover:bg-white hover:text-[#0C1C2D] transition-all duration-300"
            >
              Call Now
            </a>

            {/* User Menu - Desktop - Only shown when logged in */}
            {isLoggedIn && (
              <div className="hidden lg:flex items-center space-x-4">
                {userPages.map((page) => (
                  <Link
                    key={page.path}
                    href={page.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300
                      ${pathname === page.path
                        ? "bg-accent text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    `}
                  >
                    {page.icon && <span className="mr-2">{page.icon}</span>}
                    {page.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Auth Buttons - Only shown when not logged in */}
            {!isLoggedIn && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    showLogin();
                    openModal();
                  }}
                  className="text-white border border-white rounded-lg px-3 md:px-4 py-1.5 md:py-2 text-sm lg:text-base font-medium
                    hover:bg-white hover:text-[#0C1C2D] transition-all duration-300"
                >
                  Login
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menu-button lg:hidden text-white p-1.5 focus:outline-none ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen
          ? 'max-h-[500px] opacity-100 visible'
          : 'max-h-0 opacity-0 invisible'
          }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#0C1C2D] rounded-lg mt-2 shadow-lg">
            {/* Main Pages */}
            <div className="mb-4">
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Main Menu
              </h3>
              {mainPages.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transform transition-all duration-300
                    ${pathname === page.path
                      ? "bg-accent text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                    hover:translate-x-2
                  `}
                >
                  {page.name}
                </Link>
              ))}
            </div>

            {/* User Pages - Only shown when logged in */}
            {isLoggedIn && (
              <div>
                <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  My Account
                </h3>
                {userPages.map((page) => (
                  <Link
                    key={page.path}
                    href={page.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transform transition-all duration-300
                      ${pathname === page.path
                        ? "bg-accent text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                      hover:translate-x-2
                    `}
                  >
                    {page.icon && <span className="mr-2">{page.icon}</span>}
                    {page.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}