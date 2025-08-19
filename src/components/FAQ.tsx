import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, FileText, Search, Phone, Mail } from 'lucide-react';
import { useMobileDetection } from '../hooks/useMobileDetection';
import { faqData } from '../data/faqData';
import Button from './ui/Button';
import { DEFAULT_VIEWPORT } from '../lib/motion';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const { isMobile } = useMobileDetection();


  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-32 bg-gradient-to-br from-secondary-50 via-white to-primary-50/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div 
            className="inline-flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-secondary-200/50 shadow-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={DEFAULT_VIEWPORT}
          >
            <FileText className="w-5 h-5 text-primary-500" />
            <span className="text-secondary-600 font-medium">Frequently Asked Questions</span>
          </motion.div>
          
          <motion.h2 
            className={`${isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-bold text-secondary-800 mb-8 leading-tight`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={DEFAULT_VIEWPORT}
          >
            Common Questions
          </motion.h2>
          <motion.p 
            className={`${isMobile ? 'text-lg' : 'text-xl'} text-secondary-600 max-w-3xl mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={DEFAULT_VIEWPORT}
            transition={{ delay: 0.1 }}
          >
            Find answers to the most common questions about our services, procedures, and patient care.
          </motion.p>
        </div>

        {/* Search and Filter */}
        <motion.div 
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={DEFAULT_VIEWPORT}
          transition={{ delay: 0.2 }}
        >
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions and answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 ${isMobile ? 'py-4 min-h-[44px]' : 'py-4'} border border-secondary-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm`}
            />
          </div>

          <div className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-wrap justify-center gap-3'}`}>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`${isMobile ? 'px-6 py-4 min-h-[44px]' : 'px-6 py-3'} rounded-xl text-sm transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
              }`}
            >
              All Questions
            </button>
            <button
              onClick={() => setSelectedCategory('general')}
              className={`${isMobile ? 'px-6 py-4 min-h-[44px]' : 'px-6 py-3'} rounded-xl text-sm transition-all duration-200 ${
                selectedCategory === 'general'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setSelectedCategory('billing')}
              className={`${isMobile ? 'px-6 py-4 min-h-[44px]' : 'px-6 py-3'} rounded-xl text-sm transition-all duration-200 ${
                selectedCategory === 'billing'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
              }`}
            >
              Billing
            </button>
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div 
          className="max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={DEFAULT_VIEWPORT}
          transition={{ delay: 0.3 }}
        >
          {filteredFAQs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-secondary-200/50 overflow-hidden hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={DEFAULT_VIEWPORT}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                className={`w-full ${isMobile ? 'p-6 min-h-[44px]' : 'p-8'} text-left flex items-center justify-between hover:bg-secondary-50/50 transition-colors duration-200`}
              >
                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-secondary-800 pr-4`}>{faq.question}</h3>
                <ChevronDown className={`w-5 h-5 text-secondary-500 transition-transform duration-200 flex-shrink-0 ${
                  expandedFAQ === index ? 'rotate-180' : ''
                }`} />
              </button>
              {expandedFAQ === index && (
                <motion.div 
                  className={`${isMobile ? 'px-6 pb-6' : 'px-8 pb-8'} border-t border-secondary-100`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.question.includes('Where can I learn more') ? (
                    <div className="pt-6 space-y-4">
                      <div 
                        className="text-secondary-600 leading-relaxed"
                      >
                        {faq.answer}
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="text-secondary-600 leading-relaxed pt-6"
                    >
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredFAQs.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-secondary-200/50 p-12 max-w-lg mx-auto">
              <Search className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-800 mb-2">No questions found</h3>
              <p className="text-secondary-600">
                Try adjusting your search terms or selecting a different category.
              </p>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div 
          className={`mt-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl ${isMobile ? 'p-8' : 'p-12'} text-center`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={DEFAULT_VIEWPORT}
          transition={{ delay: 0.4 }}
        >
          <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-6`}>
            Still Have Questions?
          </h3>
          <p className={`text-primary-100 ${isMobile ? 'mb-6' : 'mb-8'} max-w-2xl mx-auto ${isMobile ? 'text-base' : 'text-lg'} leading-relaxed`}>
            Our friendly reception team is here to help answer any questions you may have about our services or procedures.
          </p>
          <div className="flex flex-col gap-4 justify-center">
            <Button 
              variant="white"
              size="large"
              icon={Phone}
              href="tel:(03) 9509 5009"
              isMobile={isMobile}
            >
              Call (03) 9509 5009
            </Button>
            <Button 
              variant="outline-white"
              size="large"
              icon={Mail}
              onClick={() => window.location.href = 'mailto:reception@heartclinicmelbourne.com.au'}
              isMobile={isMobile}
            >
              Send Email
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
