'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Image from 'next/image';

export default function ContactUsPage() {
  useEffect(() => {
    // Scroll to the top of the page on refresh
    window.scrollTo(0, 0);
  }, []);

  type FormFields = {
    name: string;
    email: string;
    subject: string;
    message: string;
  };

  const [formData, setFormData] = useState<FormFields>({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(null), 3000);
    } else {
      setFormStatus('error');
    }
  }, [formData]);

  const socialLinks = useMemo(
    () => [
      { icon: FaTwitter, href: 'https://twitter.com' },
      { icon: FaLinkedin, href: 'https://linkedin.com' },
      { icon: FaGithub, href: 'https://github.com' },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#ffe5d0] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <LazyMotion features={domAnimation}>
        <m.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-10 mt-20"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FF7519] to-[#FF4D00] drop-shadow-lg lg:pt-14 pt-10 md:pt-12">
            Contact Our Team
          </h1>
          <p className="mt-5 text-lg sm:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            We&apos;re here to help you. Reach out for project inquiries, support, or partnership opportunities.
          </p>
        </m.header>

        {/* Main Content */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
        >
          {/* Contact Info & Map Section */}
          <section className="space-y-8 flex flex-col justify-between">
            {/* Contact Info */}
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="bg-white/90 p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col gap-6"
            >
              <h2 className="text-3xl font-bold text-[#0C1C2D] mb-4">Contact Information</h2>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <span className="bg-[#FF7519]/10 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-[#FF7519] text-2xl" />
                  </span>
                  <span className="text-gray-800 font-medium">123 Innovation Street, San Francisco, CA 94105, USA</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-[#FF7519]/10 p-3 rounded-full">
                    <FaPhoneAlt className="text-[#FF7519] text-2xl" />
                  </span>
                  <span className="text-gray-800 font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-[#FF7519]/10 p-3 rounded-full">
                    <FaEnvelope className="text-[#FF7519] text-2xl" />
                  </span>
                  <span className="text-gray-800 font-medium">support@company.com</span>
                </div>
              </div>
              {/* Social Media Links */}
              <div className="mt-6 flex gap-5">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#FF7519] transition-colors duration-200 bg-gray-100 p-3 rounded-full shadow hover:scale-110"
                  >
                    <social.icon className="text-2xl" />
                  </a>
                ))}
              </div>
            </m.div>

            {/* Map */}
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
              className="w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xl border border-gray-100 mt-2"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509423!2d-122.419415684681!3d37.77492977975933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f0f0f0f0%3A0x0!2zMzfCsDQ2JzMwLjAiTiAxMjLCsDI1JzEwLjAiVw!5e0!3m2!1sen!2sus!4v1633024800000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Company Location"
              ></iframe>
            </m.div>
          </section>

          {/* Contact Form Section */}
          <m.section
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="bg-white/95 p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-[#0C1C2D] mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {([
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name', required: true },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true },
                { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Enter the subject', required: false },
              ] as const).map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof FormFields]}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7519] focus:border-transparent shadow-sm transition-all duration-200"
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7519] focus:border-transparent resize-none shadow-sm transition-all duration-200"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
              {formStatus && (
                <m.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-sm font-medium ${formStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {formStatus === 'success' ? 'Message sent successfully!' : 'Please fill in all required fields.'}
                </m.p>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FF7519] to-[#FFB300] text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-[#FFB300] hover:to-[#FF7519] focus:outline-none focus:ring-2 focus:ring-[#FFB300] focus:ring-offset-2 transition-all duration-300 text-lg tracking-wide"
              >
                Send Message
              </button>
            </form>
          </m.section>
        </m.div>

        {/* Why Contact Us Section */}
        <m.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-5xl mx-auto mt-20 mb-8"
        >
          <div className="bg-gradient-to-r from-[#FF7519]/10 to-[#FF4D00]/10 rounded-2xl shadow p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-[#0C1C2D] mb-4">Why Contact Us?</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
                <li>Free consultation for your project</li>
                <li>Expert advice from our design team</li>
                <li>Quick response within 24 hours</li>
                <li>Support in English & Arabic</li>
                <li>Confidentiality and privacy guaranteed</li>
              </ul>
            </div>
            <Image
              src="/images/Modern-Kitchen.png"
              alt="Contact Us Illustration"
              width={160}
              height={160}
              className="w-40 h-40 object-cover rounded-xl shadow-lg border-2 border-[#FF7519]/30 bg-white"
              loading="lazy"
            />
          </div>
        </m.section>
      </LazyMotion>

      {/* Footer Note */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} ASMA Kitchens. All rights reserved.</p>
      </footer>
    </div>
  );
}