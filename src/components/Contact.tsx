import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Car, Train, Bus, Navigation, Fan as Fax, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);

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
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8234567890123!2d145.0261!3d-37.8606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDUxJzM4LjIiUyAxNDXCsDAyJzM0LjAiRQ!5e0!3m2!1sen!2sau!4v1234567890123!5m2!1sen!2sau"
    },
    {
      name: "Heart Clinic Pakenham", 
      address: "44 Main Street, Pakenham",
      phone: "(03) 5941 4777",
      hours: ["Mon-Fri: 9:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM"],
      services: ["Cardiac Consultation", "Echocardiography (resting and stress echo)", "24 Hour Holter Monitoring"],
      transport: ["Pakenham Station", "Bus routes available", "Street parking"],
      coordinates: { lat: -38.0773, lng: 145.4847 },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8234567890123!2d145.4847!3d-38.0773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDA0JzM4LjMiUyAxNDXCsDI5JzA1LjAiRQ!5e0!3m2!1sen!2sau!4v1234567890123!5m2!1sen!2sau"
    },
    {
      name: "Casey Medical Centre, Clyde",
      address: "1s Morison Rd, Clyde",
      phone: "(03) 5991 0777", 
      hours: ["Mon-Fri: 8:30 AM - 5:00 PM", "Sat: By appointment"],
      services: ["Cardiac Consultation", "Echocardiography (resting and stress echo)", "24 Hour Holter Monitoring"],
      transport: ["Cranbourne Line nearby", "Local bus services", "Free parking available"],
      coordinates: { lat: -38.1234, lng: 145.3456 },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8234567890123!2d145.3456!3d-38.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDA3JzI0LjIiUyAxNDXCsDIwJzQ0LjEiRQ!5e0!3m2!1sen!2sau!4v1234567890123!5m2!1sen!2sau"
    },
    {
      name: "SJOG Hospital Berwick",
      address: "75 Kangan Dv, Berwick", 
      phone: "(03) 8768 1200",
      hours: ["Mon-Fri: 8:00 AM - 6:00 PM", "Emergency services 24/7"],
      services: ["Coronary angiography", "Transoesophageal echocardiography", "Direct cardioversion", "Inpatient services"],
      transport: ["Berwick Station", "Hospital shuttle", "Multi-level parking"],
      coordinates: { lat: -38.0321, lng: 145.3567 },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8234567890123!2d145.3567!3d-38.0321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDAyJzA3LjYiUyAxNDXCsDIxJzI0LjEiRQ!5e0!3m2!1sen!2sau!4v1234567890123!5m2!1sen!2sau"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Visit Our Clinics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Heart Clinic Melbourne operates across four convenient locations in Melbourne's southeast, making expert cardiac care accessible close to home.
          </p>
        </div>

        {/* Interactive Map Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-3">
              {/* Location List */}
              <div className="lg:col-span-1 p-6 bg-gray-50 border-r border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Our Locations</h3>
                <div className="space-y-4">
                  {locations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedLocation(index)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                        selectedLocation === index
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white hover:bg-blue-50 border border-gray-200'
                      }`}
                    >
                      <div className="space-y-2">
                        <h4 className={`font-semibold ${
                          selectedLocation === index ? 'text-white' : 'text-gray-900'
                        }`}>
                          {location.name}
                        </h4>
                        <div className="flex items-start space-x-2">
                          <MapPin className={`w-4 h-4 mt-1 flex-shrink-0 ${
                            selectedLocation === index ? 'text-blue-200' : 'text-gray-500'
                          }`} />
                          <p className={`text-sm ${
                            selectedLocation === index ? 'text-blue-100' : 'text-gray-600'
                          }`}>
                            {location.address}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className={`w-4 h-4 ${
                            selectedLocation === index ? 'text-blue-200' : 'text-gray-500'
                          }`} />
                          <p className={`text-sm ${
                            selectedLocation === index ? 'text-blue-100' : 'text-gray-600'
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
              <div className="lg:col-span-2 h-96 lg:h-auto">
                <iframe
                  src={locations[selectedLocation].mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${locations[selectedLocation].name}`}
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Selected Location Details */}
            <div className="p-6 bg-white border-t border-gray-200">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Opening Hours</span>
                  </h4>
                  <div className="space-y-1">
                    {locations[selectedLocation].hours.map((hour, idx) => (
                      <p key={idx} className="text-sm text-gray-600">{hour}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Train className="w-5 h-5 text-blue-600" />
                    <span>Getting There</span>
                  </h4>
                  <div className="space-y-1">
                    {locations[selectedLocation].transport.map((option, idx) => (
                      <p key={idx} className="text-sm text-gray-600 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        <span>{option}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Services Available</h4>
                  <div className="space-y-1">
                    {locations[selectedLocation].services.slice(0, 3).map((service, idx) => (
                      <p key={idx} className="text-sm text-gray-600 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        <span>{service}</span>
                      </p>
                    ))}
                    {locations[selectedLocation].services.length > 3 && (
                      <p className="text-sm text-blue-600 font-medium">
                        +{locations[selectedLocation].services.length - 3} more services
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call {locations[selectedLocation].phone}</span>
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Contact Information */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Main Reception</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">Suite 21 / 183 Wattletree Rd<br />Malvern, VIC 3144</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">(03) 9509 5009</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Fax className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Fax</p>
                    <p className="text-gray-600">(03) 9509 6448</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">reception@heartclinicmelbourne.com.au</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Opening Hours</p>
                    <p className="text-gray-600">Monday-Friday: 8:30am - 5:00pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Our Reception Team</h4>
              <p className="text-gray-600 mb-6">
                Emma and Michelle are here to help you schedule appointments, answer questions, and ensure your visit goes smoothly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Before Your Visit */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Before Your Visit</h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">What to Bring</h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">Medicare card and private health insurance details</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">Referral letter from your GP</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">List of current medications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">Previous cardiac test results</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Appointment Tips</h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">Arrive 15 minutes early</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">Wear comfortable clothing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">Prepare questions for your doctor</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">Call if you need to reschedule</span>
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