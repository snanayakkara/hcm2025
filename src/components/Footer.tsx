import React from 'react';
import { useMobileDetection } from '../hooks/useMobileDetection';

const Footer: React.FC = () => {
  const { isMobile } = useMobileDetection();

  // Only show on desktop - mobile has its own navigation
  if (isMobile) {
    return null;
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Clinic Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Heart Clinic Melbourne</h3>
            <p className="text-gray-600 mb-4">
              Expert cardiac care with telehealth, interventional procedures, and comprehensive heart care services.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📍 183 Wattletree Rd, Malvern VIC 3144</p>
              <p>📞 (03) 9509 5009</p>
              <p>🌐 doxy.me/hcm21</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#about" className="hover:text-primary-600 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-primary-600 transition-colors">Services</a></li>
              <li><a href="#doctors" className="hover:text-primary-600 transition-colors">Our Doctors</a></li>
              <li><a href="#contact" className="hover:text-primary-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Telehealth Consultations</li>
              <li>Interventional Cardiology</li>
              <li>Cardiac Imaging</li>
              <li>Preventive Care</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2025 Heart Clinic Melbourne. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="tel:+61395095009" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
              Emergency: (03) 9509 5009
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;