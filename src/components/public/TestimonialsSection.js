// src/components/public/TestimonialsSection.js
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    number: "01",
    title: "Request For Information",
    description: "Client provides project details and constraints.",
    quote: "Smooth metering install, responsive support.",
    name: "Sarah Thompson",
    role: "Commercial Property Manager",
    image: "/assets/test1.jpg",
  },
  {
    id: 2,
    number: "02",
    title: "Quotation",
    description: "Full compliant quote, priced competitively.",
    quote: "Reliable supply, no hidden charges.",
    name: "Mark Reynolds",
    role: "Facilities Director",
    image: "/assets/test2.jpg",
  },
  {
    id: 3,
    number: "03",
    title: "Design Stage",
    description: "Draft designs prepared for approval.",
    quote: "Quick upgrade, bills reduced 18%.",
    name: "David & Lisa Patel",
    role: "Homeowners",
    image: "/assets/test3.jpg",
  },
  {
    id: 4,
    number: "04",
    title: "Construction",
    description: "Formal programme of works and mobilisation.",
    quote: "Efficient delivery, on-time completion.",
    name: "James Carter",
    role: "Operations Manager",
    image: "/assets/test4.jpg",
  },
  {
    id: 5,
    number: "05",
    title: "Construction",
    description: "Formal programme of works and mobilisation.",
    quote: "Efficient delivery, on-time completion.",
    name: "James Carter",
    role: "Operations Manager",
    image: "/assets/test5.jpg",
  },
  {
    id: 6,
    number: "06",
    title: "Construction",
    description: "Formal programme of works and mobilisation.",
    quote: "Efficient delivery, on-time completion.",
    name: "James Carter",
    role: "Operations Manager",
    image: "/assets/test6.jpg",
  },
  {
    id: 7,
    number: "07",
    title: "Construction",
    description: "Formal programme of works and mobilisation.",
    quote: "Efficient delivery, on-time completion.",
    name: "James Carter",
    role: "Operations Manager",
    image: "/assets/test7.jpg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const TestimonialsSection = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      const timer = setTimeout(checkScroll, 300);
      return () => {
        ref.removeEventListener('scroll', checkScroll);
        clearTimeout(timer);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="mb-12 md:mb-16 pl-8 md:pl-12 lg:pl-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-600">
            What our client says
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Cards */}
          <div
            ref={scrollRef}
            className="
              flex overflow-x-auto gap-6 pb-0 snap-x snap-mandatory scrollbar-hide scroll-smooth
              pl-16 sm:pl-32 md:pl-64 lg:pl-96 xl:pl-[12%] 2xl:pl-[15%]
              pr-0
            "
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>

            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                className="flex-none w-[280px] md:w-[340px] snap-start"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -12, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-gray-700 rounded-none overflow-hidden shadow-md h-full flex flex-col">
                  <div className="relative p-6 pb-4">
                    <span className="absolute top-4 right-6 text-5xl font-black"
                     style={{ color: '#c9df8a' }}
                    > 
                      {t.number}
                    </span>

                    <div className="mt-12">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                        {t.title}
                      </h3>
                      <p className="mt-2 text-gray-200 text-sm md:text-base leading-tight">
                        {t.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-4 flex-grow">
                    <p className="text-gray-200 text-sm md:text-base leading-relaxed italic">
                      “{t.quote}”
                    </p>
                    <div className="mt-3">
                      <p className="font-medium text-white text-sm">
                        {t.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  <div className="h-40 overflow-hidden mt-auto">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Arrows BELOW the cards – centered, green theme */}
          <div className="flex justify-center gap-8 mt-6">
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.3 }}
                onClick={scrollLeft}
                className="bg-gray-600 hover:bg-gray-500 text-lime-400 rounded-full p-4 shadow-md focus:outline-none"
                aria-label="Previous"
              >
                <svg className="w-8 h-8" fill="none" stroke="#c9df8a" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            )}

            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.3 }}
                onClick={scrollRight}
                className="bg-gray-600 hover:bg-gray-500 text-lime-400 rounded-full p-4 shadow-md focus:outline-none"
                aria-label="Next"
              >
                <svg className="w-8 h-8" fill="none" stroke="#c9df8a" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;