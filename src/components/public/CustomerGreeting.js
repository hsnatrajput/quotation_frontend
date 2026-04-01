// src/components/public/CustomerGreeting.js
import React from 'react';
import { motion } from 'framer-motion';

const greetingVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: "easeOut", type: "spring", stiffness: 100 } 
  }
};

const paragraphVariants = {
  hidden: { opacity: 0, x: -80 },
  visible: (i) => ({ 
    opacity: 1, 
    x: 0, 
    transition: { 
      delay: 0.4 + i * 0.3,
      duration: 0.9, 
      ease: "easeOut" 
    } 
  })
};

const imageVariants = {
  hidden: { opacity: 0, x: 100, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { duration: 1.2, ease: "easeOut", delay: 0.5 } 
  }
};

const CustomerGreeting = ({ customerName, siteAddress }) => {
  const name = customerName || 'Valued Customer';
  const address = siteAddress || 'your project location';

  const paragraphs = [
    `Thank you for choosing Air Utilities to power your project at ${address}.`,
    "We truly appreciate the trust you have placed in us. Our team is committed to delivering reliable, high-quality utility solutions with complete transparency and professionalism.",
    "Below is your detailed quotation summary. Every item is clearly listed with pricing and explanations so you can make a confident decision."
  ];

  return (
    <section 
      className="relative bg-gray-700 overflow-hidden"
      data-theme="dark"           // ← IMPORTANT: tells the nav bar this is a dark section
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left - Text */}
          <motion.div 
            className="lg:col-span-7 space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3 
              variants={greetingVariants}
              className="text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight"
            >
              Dear <span style={{ color: '#c9df8a' }}>{name}</span>,
            </motion.h3>

            <div className="space-y-8 max-w-3xl">
              {paragraphs.map((text, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={paragraphVariants}
                  className="text-xl lg:text-2xl text-white leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.8 } }
              }}
              className="text-xl lg:text-2xl text-gray-300 italic pt-6"
            >
              We look forward to working with you.
            </motion.p>
          </motion.div>

          {/* Right - Photo */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-gray-700">
              <img
                src="/assets/greeting.jpg"
                alt="Air Utilities Project"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomerGreeting;