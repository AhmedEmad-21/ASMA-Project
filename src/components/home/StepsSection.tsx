'use client';
import { useState, useRef, useEffect } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Card from '../shared/card';
import Image from "next/image";
import { FaTools, FaDraftingCompass, FaHammer, FaWrench } from 'react-icons/fa'; // Imported suitable icons

type Props = {
  title: string;
  className?: string;
};

const videos = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.w3schools.com/html/movie.mp4',
  'https://samplelib.com/mp4/sample-720p.mp4',
  'https://samplelib.com/mp4/sample-720p.mp4',
];

function StepsSection({ title }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [imagesPosition, setImagesPosition] = useState<{ top: string }>({ top: '10%' });
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const videoDescriptions = [
    'هذا الفيديو يشرح كيفية اختيار التصميم المناسب لمطبخك.',
    'هذا الفيديو يوضح كيفية الحصول على عرض سعر مخصص.',
    'هذا الفيديو يشرح كيفية حجز استشارة مع خبرائنا.',
    'هذا الفيديو يشرح كيفية حجز استشارة مع خبرائنا.',
  ];

  useEffect(() => {
    if (sectionRef.current) {
      const videoElement = sectionRef.current.querySelector('video');
      if (videoElement) {
        const videoTop = videoElement.getBoundingClientRect().top;
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const relativeTop = ((videoTop - sectionTop) / sectionRef.current.offsetHeight) * 100;
        setImagesPosition({ top: `${relativeTop}%` });
      }
    }
  }, []);

  const handleCardClick = (idx: number) => {
    setActiveIndex(idx);
    if (videoRef.current) {
      videoRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="flex flex-col items-center w-full py-12 px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-center text-[#0C1C2D] w-full max-w-7xl text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-wider mb-8 sm:mb-12 ">
          {title}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl mb-8 sm:mb-12">
          {[
            {
              title: 'Consultation',
              description: 'We visit your home to assess your space, take accurate measurements, and understand your kitchen needs.',
              icon: <FaTools className="text-[#FFC04D] text-4xl" />, // Applied Tailwind color
            },
            {
              title: '3D Kitchen Design',
              description: 'Get a personalized 3D kitchen design tailored to your space, style, and budget.',
              icon: <FaDraftingCompass className="text-[#FFC04D] text-4xl" />, // Applied Tailwind color
            },
            {
              title: 'Installation',
              description: 'We build and install your kitchen using high-quality materials and professional fitting.',
              icon: <FaHammer className="text-[#FFC04D] text-4xl" />, // Applied Tailwind color
            },
            {
              title: 'Maintenance',
              description: 'We offer continued support, maintenance, and service visits to keep your kitchen in perfect shape.',
              icon: <FaWrench className="text-[#FFC04D] text-4xl" />, // Applied Tailwind color
            },
          ].map((card, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className={`h-full transition-all duration-200
                ${activeIndex === idx ? 'bg-white shadow-lg rounded-xl' : ''}
              `}
            >
              <Card
                title={card.title}
                description={card.description}
                icon={card.icon} // Passed icon to Card
                className="cursor-pointer transition-all duration-200 h-full p-4 sm:p-6 text-sm"
                active={activeIndex === idx}
                onClick={() => handleCardClick(idx)}
              />
            </m.div>
          ))}
        </div>

        <div ref={sectionRef} className="relative w-full flex flex-col items-center justify-center min-h-[300px] lg:min-h-[500px]">
          {/* البنت على الشمال */}
          <m.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden lg:block -ml-2 sm:-ml-4 lg:-ml-8 mt-48 lg:mt-64"
            style={{
              width: 400,
              height: 550,
              top: imagesPosition.top,
              left: 0,
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
          >
            <Image
              src="/images/Left.png"
              alt="Girl left"
              fill
              style={{ objectFit: "contain" }}
              sizes="300px"
              priority={false}
            />
          </m.div>

          {/* البنت على اليمين */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block -mr-2 sm:-mr-4 lg:-mr-4 mt-48 lg:mt-66.5"
            style={{
              width: 400,
              height: 550,
              top: imagesPosition.top,
              right: 0,
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
          >
            <Image
              src="/images/Right.png"
              alt="Girl right"
              fill
              style={{ objectFit: "contain" }}
              className='ml-6'
              sizes="300px"
              priority={false}
            />
          </m.div>

          {/* الفيديو في النص */}
          <div ref={videoRef} className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto ">
            <p className="mb-4 text-base sm:text-lg text-[#0C1C2D] font-medium text-center">
              {videoDescriptions[activeIndex]}
            </p>
            <video
              key={activeIndex}
              src={videos[activeIndex]}
              controls
              autoPlay
              muted
              loop
              className="w-full rounded-xl shadow-lg lg:mb-12"
              style={{
                maxWidth: '900px',
                minHeight: 180,
              }}
            />
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
}

export default StepsSection;

export type CardProps = {
  title: string;
  description: string;
  icon: React.ReactNode; // Updated to accept ReactNode for icons
  className?: string;
  onClick?: () => void;
  active?: boolean;
};
