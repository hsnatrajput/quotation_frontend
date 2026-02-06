import React, { useRef, useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Thompson",
    role: "Commercial Property Manager",
    company: "Thompson Retail Group",
    image: "/assets/test1.jpg",
    text: "Air Utilities transformed our energy setup across five sites. Smart metering installation was seamless, and the ongoing support is genuinely responsive. Bills are now predictable — a huge relief.",
  },
  {
    id: 2,
    name: "Mark Reynolds",
    role: "Facilities Director",
    company: "Reynolds Manufacturing Ltd",
    image: "/assets/test2.jpg",
    text: "We switched from our previous provider after constant issues. Air Utilities delivered exactly what they promised: reliable gas & electric supply, clear reporting, and no hidden charges. Professional from start to finish.",
  },
  {
    id: 3,
    name: "David & Lisa Patel",
    role: "Homeowners",
    company: "N/A",
    image: "/assets/test3.jpg",
    text: "The whole-house smart meter upgrade was quick and tidy. We now understand our usage properly and have already reduced our bills by 18%. The team even explained everything clearly — no jargon!",
  },
  {
    id: 4,
    name: "James Carter",
    role: "Operations Manager",
    company: "Carter Logistics",
    image: "/assets/test4.jpg",
    text: "EV charging points + solar integration done on time and on budget. Their engineers were knowledgeable and courteous. Energy costs dropped significantly in the first quarter — highly recommended.",
  },
  {
    id: 5,
    name: "Emma Wilson",
    role: "Head of Sustainability",
    company: "Wilson Hotels Group",
    image: "/assets/test5.jpg",
    text: "Air Utilities helped us achieve our net-zero targets with efficient water & energy monitoring. Reporting is excellent and their advice has saved us thousands annually. A real partner, not just a supplier.",
  },
  {
    id: 6,
    name: "Robert Khan",
    role: "Business Owner",
    company: "Khan Convenience Stores",
    image: "/assets/test6.jpg",
    text: "After years of overpaying, we moved everything to Air Utilities. Installation was fast, communication clear, and savings appeared immediately. Best decision we made for the business.",
  },
  {
    id: 7,
    name: "Laura Bennett",
    role: "Property Developer",
    company: "Bennett Developments",
    image: "/assets/test7.jpg",
    text: "Multiple new-build projects — all utilities coordinated perfectly. Smart meters pre-installed, handover smooth. Their team really understands developers’ timelines and needs.",
  },
  {
    id: 8,
    name: "Michael Green",
    role: "Engineering Manager",
    company: "Green Industrial Park",
    image: "/assets/test8.jpg",
    text: "Large-scale gas & electric upgrade across industrial units. Professional project management, minimal disruption, and post-install support is outstanding. Exactly the level of service we needed.",
  },
];

const TestimonialsSection = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10); // small buffer
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      checkScroll(); // initial check
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            What Our Clients Say
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from businesses and homeowners who trust us with their utilities.
          </p>
        </div>

        {/* Horizontal scroll wrapper */}
        <div className="relative">
          {/* Left arrow – shown only when can scroll left */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-4 z-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll left"
            >
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Hide scrollbar in WebKit */}
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-none w-[320px] sm:w-[360px] md:w-[400px] snap-start"
              >
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 flex-grow">
                      “{testimonial.text}”
                    </p>

                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-600 text-base">
                        {testimonial.role}
                        {testimonial.company !== "N/A" && `, ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow – shown only when can scroll right */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-4 z-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll right"
            >
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;