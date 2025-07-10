import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  BookOpen,
  FileText
} from 'lucide-react';
import { ProcedureFaq } from '../utils/parseFaqData';

interface DeepDiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  procedureFaq: ProcedureFaq | null;
  procedureName: string;
}

const DeepDiveModal: React.FC<DeepDiveModalProps> = ({ 
  isOpen, 
  onClose, 
  procedureFaq, 
  procedureName 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = procedureFaq?.faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Debug logging
  React.useEffect(() => {
    if (isOpen) {
      console.log('Deep Dive Modal opened');
      console.log('Procedure Name:', procedureName);
      console.log('Procedure FAQ:', procedureFaq);
      console.log('FAQ Count:', procedureFaq?.faqs?.length || 0);
    }
  }, [isOpen, procedureName, procedureFaq]);


  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Deep Dive</h2>
                  <p className="text-white/90 text-lg">{procedureName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions and answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[60vh]" id="deep-dive-content">
            {!procedureFaq ? (
              <div className="p-8 text-center">
                <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No detailed information available
                </h3>
                <p className="text-gray-500">
                  We're working on adding detailed information for this procedure.
                </p>
              </div>
            ) : filteredFaqs.length === 0 ? (
              <div className="p-8 text-center">
                <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or browse all questions below.
                </p>
              </div>
            ) : (
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''} found
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setExpandedFaqs(filteredFaqs.map((_, index) => index))}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Expand All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => setExpandedFaqs([])}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Collapse All
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => {
                    const isExpanded = expandedFaqs.includes(index);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800 pr-4">
                              {faq.question}
                            </h3>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 bg-white border-t border-gray-200">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                This information is for educational purposes only. Always consult with your healthcare provider.
              </p>
              <button
                onClick={onClose}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeepDiveModal;