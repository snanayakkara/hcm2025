import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Car, Train, Bus, Navigation, Fan as Fax, ExternalLink, Search, Route } from 'lucide-react';

const Contact: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [userAddress, setUserAddress] = useState('');
  const [showDirections, setShowDirections] = useState(false);

  const locations = [
    {
      name: "Cabrini Hospital, Malvern",
      address: "Suite 21/183 Wattletree Rd, Malvern VIC 3144",
      phone: "(03) 9509 5009",
      fax: "(03) 9509 6448",
      hours: ["Mon-Fri: 8:30 AM - 5:00 PM", "Sat-Sun: Closed"],
      services: ["Cardiac Consultation", "Coronary angiography", "24 Hour Holter monitoring", "Transoesophageal echocardiography", "Direct cardioversion", "Inpatient services"],
      transport: ["Tram Route 6", "Malvern Station nearby", "On-site parking available"],
      coordinates: { lat: -37.8606, lng: 145.0261 },
      googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8!2d145.026!3d-37.8606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad668d1b5b6b6b1%3A0x5017d681632ccc53!2s183%20Wattletree%20Rd%2C%20Malvern%20VIC%203144%2C%20Australia!5e0!3m2!1sen!2sau!4v1640995200000!5m2!1sen!2sau"
    },
    {
      name: "Heart Clinic Pakenham", 
      address: "44 Main Street, Pakenham VIC 3810",
      phone: "(03) 9509 5009",
      hours: ["Mon-Fri: 9:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM"],
      services: ["Cardiac Consultation", "Echocardiography (resting and stress echo)", "24 Hour Holter Monitoring"],
      transport: ["Pakenham Station", "Bus routes available", "Street parking"],
      coordinates: { lat: -38.0773, lng: 145.4847 },
      googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8!2d145.4847!3d-38.0773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad7a9b1b5b6b6b1%3A0x5017d681632ccc54!2s44%20Main%20St%2C%20Pakenham%20VIC%203810%2C%20Australia!5e0!3m2!1sen!2sau!4v1640995200000!5m2!1sen!2sau"
    },
    {
      name: "Casey Medical Centre, Clyde",
      address: "1s Morison Rd, Clyde VIC 3978",
      phone: "(03) 9509 5009", 
      hours: ["Mon-Fri: 8:30 AM - 5:00 PM", "Sat: By appointment"],
      services: ["Cardiac Consultation", "Echocardiography (resting and stress echo)", "24 Hour Holter Monitoring"],
      transport: ["Cranbourne Line nearby", "Local bus services", "Free parking available"],
      coordinates: { lat: -38.1234, lng: 145.3456 },
      googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8!2d145.3456!3d-38.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad7b9b1b5b6b6b1%3A0x5017d681632ccc55!2s1%20Morison%20Rd%2C%20Clyde%20VIC%203978%2C%20Australia!5e0!3m2!1sen!2sau!4v1640995200000!5m2!1sen!2sau"
    },
    {
      name: "SJOG Hospital Berwick",
      address: "75 Kangan Dv, Berwick VIC 3806", 
      phone: "(03) 9509 5009",
      hours: ["Mon-Fri: 8:00 AM - 6:00 PM", "Emergency services 24/7"],
      services: ["Coronary angiography", "Transoesophageal echocardiography", "Direct cardioversion", "Inpatient services"],
      transport: ["Berwick Station", "Hospital shuttle", "Multi-level parking"],
      coordinates: { lat: -38.0321, lng: 145.3567 },
      googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8!2d145.3567!3d-38.0321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad7c9b1b5b6b6b1%3A0x5017d681632ccc56!2s75%20Kangan%20Dr%2C%20Berwick%20VIC%203806%2C%20Australia!5e0!3m2!1sen!2sau!4v1640995200000!5m2!1sen!2sau"
    }
  ];

  const handleGetDirections = () => {
    if (userAddress.trim()) {
      const destination = encodeURIComponent(locations[selectedLocation].address);
      const origin = encodeURIComponent(userAddress);
      
      // Open Google Maps with directions
      const directionsUrl = `https://www.google.com/maps/dir/${origin}/${destination}`;
      window.open(directionsUrl, '_blank');
      setShowDirections(true);
    } else {
      alert('Please enter your address to get directions');
    }
  };

  const handlePublicTransport = () => {
    if (userAddress.trim()) {
      const destination = encodeURIComponent(locations[selectedLocation].address);
      const origin = encodeURIComponent(userAddress);
      
      // Open Google Maps with public transport directions
      const ptUrl = `https://www.google.com/maps/dir/${origin}/${destination}/@${locations[selectedLocation].coordinates.lat},${locations[selectedLocation].coordinates.lng},15z/data=!3m1!4b1!4m2!4m1!3e3`;
      window.open(ptUrl, '_blank');
    } else {
      alert('Please enter your address to get public transport directions');
    }
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-cream-50 via-white to-primary-50/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-secondary-800 mb-6">
            Visit Our Clinics
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Heart Clinic Melbourne operates across four convenient locations in Melbourne's southeast, making expert cardiac care accessible close to home.
          </p>
        </div>

        {/* Interactive Map Section */}
        <div className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-secondary-200/50">
            <div className="grid lg:grid-cols-3">
              {/* Location List */}
              <div className="lg:col-span-1 p-8 bg-secondary-50/50 border-r border-secondary-200">
                <h3 className="text-xl font-bold text-secondary-800 mb-8">Our Locations</h3>
                <div className="space-y-4">
                  {locations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedLocation(index)}
                      className={`w-full text-left p-6 rounded-2xl transition-all duration-200 ${
                        selectedLocation === index
                          ? 'bg-primary-500 text-white shadow-lg'
                          : 'bg-white hover:bg-primary-50 border border-secondary-200'
                      }`}
                    >
                      <div className="space-y-3">
                        <h4 className={`font-semibold text-lg leading-tight ${
                          selectedLocation === index ? 'text-white' : 'text-secondary-800'
                        }`}>
                          {location.name}
                        </h4>
                        <div className="flex items-start space-x-2">
                          <MapPin className={`w-4 h-4 mt-1 flex-shrink-0 ${
                            selectedLocation === index ? 'text-primary-200' : 'text-secondary-500'
                          }`} />
                          <p className={`text-sm ${
                            selectedLocation === index ? 'text-primary-100' : 'text-secondary-600'
                          }`}>
                            {location.address}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className={`w-4 h-4 ${
                            selectedLocation === index ? 'text-primary-200' : 'text-secondary-500'
                          }`} />
                          <p className={`text-sm ${
                            selectedLocation === index ? 'text-primary-100' : 'text-secondary-600'
                          }`}>
                            {location.phone}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Map */}
              <div className="lg:col-span-2 h-96 lg:h-auto relative">
                <iframe
                  key={selectedLocation} // Force re-render when location changes
                  src={locations[selectedLocation].googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '500px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${locations[selectedLocation].name}`}
                  className="w-full h-full rounded-r-3xl lg:rounded-r-none"
                  onError={(e) => {
                    console.error('Map failed to load:', e);
                    // Fallback: show a placeholder or alternative map
                  }}
                ></iframe>
                
                {/* Fallback content if map fails to load */}
                <div className="absolute inset-0 bg-secondary-100 flex items-center justify-center opacity-0 pointer-events-none" id="map-fallback">
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-secondary-700 mb-2">Map Loading...</h4>
                    <p className="text-secondary-600">
                      {locations[selectedLocation].address}
                    </p>
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(locations[selectedLocation].address)}`, '_blank')}
                      className="mt-4 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Open in Google Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Input and Directions */}
            <div className="p-8 bg-white border-t border-secondary-200">
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-secondary-800 mb-4">Get Directions from Your Location</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Enter your address (e.g., 123 Collins St, Melbourne VIC)"
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleGetDirections();
                        }
                      }}
                      className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleGetDirections}
                      className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2 font-medium"
                    >
                      <Car className="w-4 h-4" />
                      <span>Driving</span>
                    </button>
                    <button
                      onClick={handlePublicTransport}
                      className="bg-sage-500 text-white px-6 py-3 rounded-xl hover:bg-sage-600 transition-colors duration-200 flex items-center space-x-2 font-medium"
                    >
                      <Train className="w-4 h-4" />
                      <span>Public Transport</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Selected Location Details */}
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-secondary-800 mb-4 flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <span>Opening Hours</span>
                  </h4>
                  <div className="space-y-2">
                    {locations[selectedLocation].hours.map((hour, idx) => (
                      <p key={idx} className="text-sm text-secondary-600">{hour}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-secondary-800 mb-4 flex items-center space-x-2">
                    <Train className="w-5 h-5 text-primary-600" />
                    <span>Getting There</span>
                  </h4>
                  <div className="space-y-2">
                    {locations[selectedLocation].transport.map((option, idx) => (
                      <p key={idx} className="text-sm text-secondary-600 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-sage-500 rounded-full"></span>
                        <span>{option}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-secondary-800 mb-4">Services Available</h4>
                  <div className="space-y-2">
                    {locations[selectedLocation].services.slice(0, 3).map((service, idx) => (
                      <p key={idx} className="text-sm text-secondary-600 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                        <span>{service}</span>
                      </p>
                    ))}
                    {locations[selectedLocation].services.length > 3 && (
                      <p className="text-sm text-primary-600 font-medium">
                        +{locations[selectedLocation].services.length - 3} more services
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-secondary-200">
                <button 
                  onClick={() => window.open(`tel:${locations[selectedLocation].phone}`, '_self')}
                  className="flex-1 bg-primary-500 text-white px-8 py-4 rounded-2xl hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {locations[selectedLocation].phone}</span>
                </button>
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(locations[selectedLocation].address)}`, '_blank')}
                  className="flex-1 border border-primary-500 text-primary-600 px-8 py-4 rounded-2xl hover:bg-primary-50 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View on Google Maps</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Contact Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 mb-20 shadow-lg border border-secondary-200/50">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-secondary-800">Main Reception</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-800">Address</p>
                    <p className="text-secondary-600">Suite 21 / 183 Wattletree Rd<br />Malvern, VIC 3144</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-800">Phone</p>
                    <p className="text-secondary-600">(03) 9509 5009</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <Fax className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-800">Fax</p>
                    <p className="text-secondary-600">(03) 9509 6448</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-800">Email</p>
                    <p className="text-secondary-600">reception@heartclinicmelbourne.com.au</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-800">Opening Hours</p>
                    <p className="text-secondary-600">Monday-Friday: 8:30am - 5:00pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-50/80 p-8 rounded-2xl">
              <h4 className="text-xl font-semibold text-secondary-800 mb-6">Contact Our Reception Team</h4>
              <p className="text-secondary-600 mb-8 leading-relaxed">
                Emma and our reception team are here to help you schedule appointments, answer questions, and ensure your visit goes smoothly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.open('tel:(03) 9509 5009', '_self')}
                  className="flex-1 bg-primary-500 text-white px-8 py-4 rounded-2xl hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </button>
                <button 
                  onClick={() => window.open('mailto:reception@heartclinicmelbourne.com.au', '_self')}
                  className="flex-1 border border-primary-500 text-primary-600 px-8 py-4 rounded-2xl hover:bg-primary-50 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Before Your Visit */}
        <div className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-lg border border-secondary-200/50">
          <h3 className="text-3xl font-bold text-secondary-800 mb-8">Before Your Visit</h3>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-secondary-800 text-lg">What to Bring</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                    <span className="text-secondary-700">Medicare card and private health insurance details</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                    <span className="text-secondary-700">Referral letter from your GP</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                    <span className="text-secondary-700">List of current medications</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                    <span className="text-secondary-700">Previous cardiac test results</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-secondary-800 text-lg">Appointment Tips</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-sage-500 rounded-full mt-2"></div>
                    <span className="text-secondary-700">Arrive 15 minutes early</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-sage-500 rounded-full mt-2"></div>
                    <span className="text-secondary-700">Wear comfortable clothing</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-sage-500 rounded-full mt-2"></div>
                    <span className="text-secondary-700">Prepare questions for your doctor</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-sage-500 rounded-full mt-2"></div>
                    <span className="text-secondary-700">Call if you need to reschedule</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;