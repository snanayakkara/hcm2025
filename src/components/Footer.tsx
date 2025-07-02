import React, { useState } from 'react';
import { Phone, Mail, Clock, Printer, X } from 'lucide-react';

const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<null | 'privacy' | 'terms' | 'disclaimer'>(null);
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
    { id: 'education', label: 'Library' },
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
              <div className="bg-white p-2 rounded-full">
                <img 
                  src="/images/hcm3d2.png" 
                  alt="Heart Clinic Melbourne Logo" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Heart Clinic</h3>
                <p className="text-gray-400">Melbourne</p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Comprehensive cardiovascular services across three convenient locations in Melbourne's southeast, providing expert cardiac care close to home.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">(03) 9509 5009</span>
              </div>
              <div className="flex items-center space-x-3">
                <Printer className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">(03) 9509 6448</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 break-words">reception@heartclinicmelbourne.com.au</span>
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
              <p>&copy; {new Date().getFullYear()} Heart Clinic Melbourne. Website designed and created by Dr. Shane Nanayakkara. Last updated {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <button
                onClick={() => setModalType('privacy')}
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setModalType('terms')}
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setModalType('disclaimer')}
                className="hover:text-white transition-colors duration-200"
              >
                Medical Disclaimer
              </button>
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
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-xl max-w-xl w-full p-8 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'privacy' && (
              <>
                <h3 className="text-xl font-bold mb-4">Privacy Policy</h3>
                <p className="text-sm text-gray-700 leading-relaxed space-y-4">
                  Heart Clinic Melbourne complies with the Australian Privacy Act&nbsp;1988 (Cth) and the
                  Australian Privacy Principles.  We collect only the information necessary to provide
                  high‑quality cardiac care, securely store it on Australian servers, and never disclose
                  it to third parties except where required for your treatment, by law, or with your
                  explicit consent.  You may request access to your personal information or ask for it
                  to be corrected at any time by contacting our reception team.  Full details of our
                  data‑handling practices, retention periods, My Health Record use and complaint
                  process are available on request.
                </p>
              </>
            )}

            {modalType === 'terms' && (
              <>
                <h3 className="text-xl font-bold mb-4">Website&nbsp;Terms&nbsp;of&nbsp;Service</h3>
                <p className="text-sm text-gray-700 leading-relaxed space-y-4">
                  This website is provided by Heart Clinic Melbourne for general information about our
                  services.  By browsing, you agree not to rely on the content as medical advice, to use
                  the site lawfully under the laws of Victoria, and not to reproduce or distribute any
                  material without written permission.  We aim for accuracy but make no warranties that
                  the content is complete or up‑to‑date.  To the extent permitted by Australian
                  Consumer Law, we exclude liability for loss arising from your use of the site.  We may
                  update these terms at any time without notice.
                </p>
              </>
            )}

            {modalType === 'disclaimer' && (
              <>
                <h3 className="text-xl font-bold mb-4">Medical Disclaimer</h3>
                <p className="text-sm text-gray-700 leading-relaxed space-y-4">
                  Information on this website is of a general nature and is not a substitute for
                  individual medical advice.  It should not be used to diagnose, treat, cure or prevent
                  any condition.  Always consult your GP, cardiologist or call <strong>000</strong> in
                  an emergency.  Heart Clinic Melbourne does not accept responsibility for any loss
                  caused by reliance on the information provided here.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;