import React from 'react';
import { Heart, Phone, Mail, MapPin, Clock, Fan as Fax } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Locations & Services' },
    { id: 'doctors', label: 'Our Doctors' },
    { id: 'reception-team', label: 'Reception Team' },
    { id: 'patients', label: 'Patient Info' },
    { id: 'education', label: 'Learning Library' },
    { id: 'contact', label: 'Contact' },
  ];

  const locations = [
    {
      name: "Cabrini Hospital, Malvern",
      address: "Suite 21/183 Wattletree Rd, Malvern VIC 3144",
      phone: "(03) 9509 5009"
    },
    {
      name: "Heart Clinic Pakenham", 
      address: "44 Main Street, Pakenham",
      phone: "(03) 9509 5009"
    },
    {
      name: "Casey Medical Centre, Clyde",
      address: "1s Morison Rd, Clyde",
      phone: "(03) 9509 5009"
    },
    {
      name: "SJOG Hospital Berwick",
      address: "75 Kangan Dv, Berwick", 
      phone: "(03) 9509 5009"
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Clinic Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Heart Clinic</h3>
                <p className="text-gray-400">Melbourne</p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Comprehensive cardiovascular services across four convenient locations in Melbourne's southeast, providing expert cardiac care close to home.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">(03) 9509 5009</span>
              </div>
              <div className="flex items-center space-x-3">
                <Fax className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">(03) 9509 6448</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">reception@heartclinicmelbourne.com.au</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Locations */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Our Locations</h4>
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-white font-medium text-sm">{location.name}</p>
                  <p className="text-gray-400 text-sm">{location.address}</p>
                  <p className="text-blue-400 text-sm">{location.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Services & Hours */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <p>• Cardiac Consultation</p>
              <p>• Echocardiography</p>
              <p>• 24 Hour Holter Monitoring</p>
              <p>• Coronary Angiography</p>
              <p>• Cardioversion</p>
              <p>• Inpatient Services</p>
            </div>

            <div className="space-y-3">
              <h5 className="font-semibold flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Opening Hours</span>
              </h5>
              <div className="text-gray-300 text-sm space-y-1">
                <p>Monday-Friday: 8:30am - 5:00pm</p>
                <p>Saturday-Sunday: Closed</p>
                <p>Emergency: 24/7 at hospital locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>&copy; 2024 Heart Clinic Melbourne. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Medical Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-center text-white">
            <p className="font-semibold">
              Medical Emergency? Call 000 immediately or go to your nearest hospital emergency department.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;