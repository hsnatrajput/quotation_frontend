// src/components/public/CompanyIntro.js
import React from 'react';
import { motion } from 'framer-motion';

const CompanyIntro = () => {
  const headlineVariants = {
    hidden: { opacity: 0, y: 120 },
    visible: { opacity: 1, y: 0 },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, x: 140 },
    visible: { opacity: 1, x: 0 },
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  return (
    <section className="relative bg-white pt-8 md:pt-12 lg:pt-6 pb-10 md:pb-12 lg:pb-16 overflow-hidden">
      <div className="w-full px-0">
        <motion.div
          className="space-y-16 md:space-y-24 lg:space-y-32"  // ← Reduced vertical spacing → feels "a little bit upward"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Headline – left-aligned with left offset */}
          <motion.h2
            variants={headlineVariants}
            transition={{ duration: 1.3, ease: 'easeOut' }}
            className="
              pl-10 sm:pl-16 md:pl-24 lg:pl-32 xl:pl-40 2xl:pl-48
              pr-6 md:pr-12 lg:pr-24 
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              font-serif font-semibold
              text-neutral-900 
              leading-[1.1] 
              tracking-[0.04em] md:tracking-[0.08em] lg:tracking-[0.10em] xl:tracking-[0.12em]
              text-left
              mt-0               // ← explicitly remove any top margin
            "
          >
            Redefining multi utility delivery
            <br className="hidden sm:block" />
            with speed, clarity, and relentless
            <br />
            execution.
          </motion.h2>

          {/* Paragraph block – moved a bit more right + smaller text size */}
          <motion.div
            variants={paragraphVariants}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="
              pl-32 sm:pl-48 md:pl-72 lg:pl-[20%] xl:pl-[28%] 2xl:pl-[32%]
              pr-6 sm:pr-12 md:pr-16 lg:pr-24 xl:pr-32 
              text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl
              text-neutral-700 leading-relaxed font-light 
              space-y-4 lg:space-y-6           // ← made even tighter
              text-left
              mt-0                             // ← remove top margin
              pt-0                             // ← remove any internal top padding if exists
            "
          >
            <p className="mt-0">               {/* ← force no top margin on first <p> */}
              Air Utilities delivers agile, cost-effective utility solutions with transparency, speed, and tenacity, setting a
              <br className="hidden sm:block" />
              new standard in a traditionally slow-moving sector. Backed by strong leadership and strategic partnerships,
              <br className="hidden sm:block" />
              we drive operational excellence and unlock commercial advantage for our clients in Manchester and beyond.
            </p>

            <p className="mt-4 lg:mt-6">       {/* ← controlled spacing between paragraphs */}
              Positioned for long-term success, we stay ahead by tackling complex challenges
              <br className="hidden sm:block" />
              with speed, precision, and purpose, an approach that sets us apart in the utilities industry.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyIntro;