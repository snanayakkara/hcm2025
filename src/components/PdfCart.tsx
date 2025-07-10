import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Download, Mail, X, Trash2, FileText } from 'lucide-react';
import { usePdfSelection } from '../contexts/PdfSelectionContext';
import { generateLearningLibraryPDF, downloadPDF, createLearningLibraryMailtoLink } from './pdf/generatePdf';

// Import the procedure journeys data
import { procedureJourneys } from '../data/procedureJourneys';

const PdfCart: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const { 
    selectedProcedures, 
    removeProcedure, 
    clearSelection,
    isGeneratingPdf,
    setIsGeneratingPdf
  } = usePdfSelection();

  const handleGeneratePdf = async () => {
    if (selectedProcedures.size === 0) return;
    
    try {
      setIsGeneratingPdf(true);
      
      // Convert selected procedure IDs to procedure data
      const procedureData = Array.from(selectedProcedures).map(id => {
        const procedure = procedureJourneys[id as keyof typeof procedureJourneys];
        return procedure ? {
          name: procedure.name,
          description: procedure.description,
          summary: procedure.summary,
          needToKnow: procedure.needToKnow,
          steps: procedure.steps,
          image: (procedure as any)?.image
        } : null;
      }).filter((item): item is NonNullable<typeof item> => item !== null);

      if (procedureData.length === 0) {
        throw new Error('No valid procedures found');
      }

      const pdfBytes = await generateLearningLibraryPDF(procedureData);
      downloadPDF(pdfBytes, 'heart-clinic-procedures.pdf');
      
      // Show success message
      showToast('PDF generated successfully!');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      showToast('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleEmailPdf = async () => {
    if (selectedProcedures.size === 0 || !emailAddress) return;
    
    try {
      setIsGeneratingPdf(true);
      
      // Convert selected procedure IDs to procedure data
      const procedureData = Array.from(selectedProcedures).map(id => {
        const procedure = procedureJourneys[id as keyof typeof procedureJourneys];
        return procedure ? {
          name: procedure.name,
          description: procedure.description,
          summary: procedure.summary,
          needToKnow: procedure.needToKnow,
          steps: procedure.steps,
          image: (procedure as any)?.image
        } : null;
      }).filter((item): item is NonNullable<typeof item> => item !== null);

      if (procedureData.length === 0) {
        throw new Error('No valid procedures found');
      }

      const pdfBytes = await generateLearningLibraryPDF(procedureData);
      const procedureNames = procedureData.map(p => p?.name || '').filter(Boolean);
      
      createLearningLibraryMailtoLink(pdfBytes, procedureNames);
      
      showToast('Email application opened with PDF attached!');
      setShowEmailInput(false);
      setEmailAddress('');
      
    } catch (error) {
      console.error('Error generating PDF for email:', error);
      showToast('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const getProcedureName = (id: string) => {
    const procedure = procedureJourneys[id as keyof typeof procedureJourneys];
    return procedure?.name || id;
  };

  return (
    <div className="relative">
      {/* Main Cart Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 transition-colors relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ShoppingCart className="w-6 h-6" />
        {selectedProcedures.size > 0 && (
          <span className="absolute -top-2 -right-2 bg-accent-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {selectedProcedures.size}
          </span>
        )}
      </motion.button>

      {/* Expanded Cart Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-secondary-200 w-80 max-h-96 overflow-hidden"
          >
            <div className="p-4 border-b border-secondary-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-secondary-800 flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>PDF Cart ({selectedProcedures.size})</span>
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="max-h-48 overflow-y-auto">
              {Array.from(selectedProcedures).map((procedureId) => (
                <div
                  key={procedureId}
                  className="px-4 py-3 border-b border-secondary-100 last:border-b-0 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm text-secondary-800 truncate">
                      {getProcedureName(procedureId)}
                    </div>
                  </div>
                  <button
                    onClick={() => removeProcedure(procedureId)}
                    className="text-secondary-400 hover:text-red-500 ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-secondary-200 space-y-2">
              {showEmailInput ? (
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-secondary-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEmailPdf}
                      disabled={isGeneratingPdf || !emailAddress}
                      className="flex-1 bg-primary-600 text-white py-2 px-3 rounded text-sm hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Email</span>
                    </button>
                    <button
                      onClick={() => setShowEmailInput(false)}
                      className="px-3 py-2 text-secondary-600 hover:text-secondary-800 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleGeneratePdf}
                    disabled={isGeneratingPdf || selectedProcedures.size === 0}
                    className="flex-1 bg-primary-600 text-white py-2 px-3 rounded text-sm hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF'}</span>
                  </button>
                  <button
                    onClick={() => setShowEmailInput(true)}
                    disabled={isGeneratingPdf || selectedProcedures.size === 0}
                    className="px-3 py-2 text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <button
                onClick={clearSelection}
                className="w-full py-2 px-3 text-red-600 hover:text-red-700 text-sm flex items-center justify-center space-x-1"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PdfCart;