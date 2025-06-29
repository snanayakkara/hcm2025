import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, FileText, Search } from 'lucide-react';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqData = [
    {
      category: 'general',
      question: 'What are your operating hours?',
      answer: 'Our main clinic at Cabrini Hospital Malvern is open Monday-Friday 8:30am-5:00pm. Other locations have varying hours - Pakenham is open Monday-Friday 9:00am-5:00pm and Saturday 9:00am-1:00pm. Please call your preferred location to confirm specific hours.'
    },
    {
      category: 'general',
      question: 'Do I need a referral to see a cardiologist?',
      answer: 'Yes, you need a referral from your GP or another specialist to see our cardiologists. This ensures Medicare rebates are available and helps us understand your medical history and the reason for your visit.'
    },
    {
      category: 'general',
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring your Medicare card, private health insurance details, referral letter from your GP, a list of current medications, and any previous cardiac test results or reports.'
    },
    {
      category: 'billing',
      question: 'Do you accept Medicare?',
      answer: 'Yes, we accept Medicare and offer bulk billing for eligible patients. We also work with most private health insurance funds for gap-free or reduced gap consultations. To make it easier for you, we can process your Medicare claims on the spot at the end of your appointment.'
    },
    {
      category: 'billing',
      question: 'What are the consultation fees?',
      answer: 'Consultation fees vary depending on the type and length of appointment. We offer Medicare rebates for the consultations, and work with private health insurers for our procedures. Our reception team can provide specific fee information when booking.'
    },
    {
      category: 'symptoms',
      question: 'When should I be concerned about chest pain?',
      answer: 'Seek immediate medical attention (call 000) if you experience  chest pain, especially if accompanied by shortness of breath, nausea, sweating, or pain radiating to your arm, neck, or jaw. For persistent or recurring chest discomfort, consult your GP for evaluation.'
    },
    {
      category: 'symptoms',
      question: 'What are common symptoms of heart disease?',
      answer: 'Common symptoms include chest pain or discomfort, shortness of breath, fatigue, irregular heartbeat, swelling in legs or ankles, and dizziness. However, some people may have no symptoms, which is why regular check-ups are important.'
    },
    {
      category: 'conditions',
      question: 'What is atrial fibrillation?',
      answer: 'Atrial fibrillation (AF) is an irregular heart rhythm where the upper chambers of the heart beat chaotically. This can cause symptoms like palpitations, fatigue, and shortness of breath, and increases the risk of stroke.'
    },
    {
      category: 'conditions',
      question: 'What is coronary artery disease?',
      answer: 'Coronary artery disease occurs when the major blood vessels that supply your heart become damaged or diseased. It\'s usually caused by plaque buildup in the arteries, which can reduce blood flow to the heart muscle.'
    },
    {
      category: 'procedures',
      question: 'What happens during an echocardiogram?',
      answer: 'An echocardiogram is a painless test that uses sound waves to create pictures of your heart. A technician will apply gel to your chest and move a probe around to capture images of your heart\'s chambers, valves, and blood flow.'
    },
    {
      category: 'procedures',
      question: 'How should I prepare for a stress test?',
      answer: 'Wear comfortable exercise clothing and shoes. Avoid eating, drinking caffeine, or smoking for 3 hours before the test. Continue taking your medications unless specifically told otherwise by your doctor.'
    },
    {
      category: 'procedures',
      question: 'What is a Holter monitor?',
      answer: 'A Holter monitor is a small, portable device that records your heart\'s electrical activity for 24-48 hours. You wear it while going about your normal daily activities to detect irregular heart rhythms that might not show up during a short ECG.'
    }
  ];

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
            viewport={{ once: true }}
          >
            <FileText className="w-5 h-5 text-primary-500" />
            <span className="text-secondary-600 font-medium">Frequently Asked Questions</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-secondary-800 mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Common Questions
          </motion.h2>
          <motion.p 
            className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions and answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-secondary-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
              }`}
            >
              All Questions
            </button>
            <button
              onClick={() => setSelectedCategory('general')}
              className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                selectedCategory === 'general'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setSelectedCategory('billing')}
              className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                selectedCategory === 'billing'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
              }`}
            >
              Billing
            </button>
            <button
              onClick={() => setSelectedCategory('symptoms')}
              className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                selectedCategory === 'symptoms'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
              }`}
            >
              Symptoms
            </button>
            <button
              onClick={() => setSelectedCategory('conditions')}
              className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                selectedCategory === 'conditions'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
              }`}
            >
              Conditions
            </button>
            <button
              onClick={() => setSelectedCategory('procedures')}
              className={`px-6 py-3 rounded-xl text-sm transition-all duration-200 ${
                selectedCategory === 'procedures'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200'
              }`}
            >
              Procedures
            </button>
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div 
          className="max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {filteredFAQs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-secondary-200/50 overflow-hidden hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                className="w-full p-8 text-left flex items-center justify-between hover:bg-secondary-50/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-secondary-800 pr-4">{faq.question}</h3>
                <ChevronDown className={`w-5 h-5 text-secondary-500 transition-transform duration-200 flex-shrink-0 ${
                  expandedFAQ === index ? 'rotate-180' : ''
                }`} />
              </button>
              {expandedFAQ === index && (
                <motion.div 
                  className="px-8 pb-8 border-t border-secondary-100"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-secondary-600 leading-relaxed pt-6">{faq.answer}</p>
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
          className="mt-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Still Have Questions?
          </h3>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Our friendly reception team is here to help answer any questions you may have about our services or procedures.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-primary-600 px-10 py-4 rounded-2xl hover:bg-primary-50 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold text-lg">
              <span>Call (03) 9509 5009</span>
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-2xl hover:bg-white hover:text-primary-600 transition-colors duration-200 font-semibold text-lg">
              Send Email
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
