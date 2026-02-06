// src/components/public/FooterPublic.js
import React from 'react';

const FooterPublic = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1 – Company info & copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-4">
              Air Utilities Ltd
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Reliable utility solutions for homes and businesses across the UK — electricity, gas, water, smart metering & more.
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Air Utilities Ltd. All rights reserved.
            </p>
          </div>

          {/* Column 2 – Quick contact */}
          <div className="text-center">
            <h4 className="text-xl font-semibold text-white mb-6">
              Get in Touch
            </h4>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:01611234567" className="hover:text-white transition">
                  0161 123 4567
                </a>
              </p>

              <p className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:info@airutilities.co.uk" className="hover:text-white transition">
                  info@airutilities.co.uk
                </a>
              </p>

              <p className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <a href="https://www.airutilities.co.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  www.airutilities.co.uk
                </a>
              </p>
            </div>
          </div>

          {/* Column 3 – Quick links */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">Contact Us</a>
              </li>
            </ul>

            {/* Social icons (optional – add real links later) */}
            <div className="mt-10 flex justify-center md:justify-end gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 3.203.229.228 3.204.072 7.054.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.157 3.85 3.132 6.825 6.982 6.982C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 3.85-.157 6.825-3.132 6.982-6.982.058-1.28.072-1.688.072-4.948 0-3.259-.014-3.667-.072-4.947-.157-3.85-3.132-6.825-6.982-6.982C15.668.014 15.259 0 12 0z"/>
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                </svg>
              </a>
              {/* Add LinkedIn, Twitter/X, etc. if needed */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPublic;