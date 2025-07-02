import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  CheckCircle, 
  AlertCircle,
  FileText,
  X
} from 'lucide-react';

import { useIntake } from '../../hooks/useIntake';
import { IntakeSchema, IntakeForm, CARD_TEST_DESCRIPTIONS } from '../../types/intake';
import Stepper from './Stepper';
import ToggleCard from '../fields/ToggleCard';
import { generateIntakePDF, downloadPDF, createMailtoLink } from '../pdf/generatePdf';

interface WizardProps {
  onClose: () => void;
}

const Wizard: React.FC<WizardProps> = ({ onClose }) => {
  const { state, updateData, nextStep, prevStep, cleanup } = useIntake();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const {
    control,
    formState: { errors, isValid },
    watch
  } = useForm<IntakeForm>({
    resolver: zodResolver(IntakeSchema),
    defaultValues: state.data,
    mode: 'onChange'
  });

  const formData = watch();

  const stepTitles = [
    'Welcome',
    'Medical History',
    'Medications',
    'Cardiac Tests',
    'Smoking',
    'Family History',
    'Emergency Contact',
    'Additional Notes',
    'Review',
    'Complete'
  ];

  const handleNext = useCallback(() => {
    updateData(formData);
    if (state.currentStep < 9) {
      nextStep();
    }
  }, [formData, updateData, nextStep, state.currentStep]);

  const handlePrev = useCallback(() => {
    updateData(formData);
    prevStep();
  }, [formData, updateData, prevStep]);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const pdfBytes = await generateIntakePDF(formData);
      downloadPDF(pdfBytes);
      createMailtoLink(pdfBytes);
      cleanup();
      setIsComplete(true);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseWizard = () => {
    cleanup();
    onClose();
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Patient Intake Form</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                This secure form collects your cardiovascular health information. All data stays on your device and is never stored online.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-medium text-blue-900">Privacy Notice</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Your information is processed locally and automatically deleted after PDF generation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Medical History</h3>
            <p className="text-gray-600 mb-6">Please select any conditions you currently have or have had in the past:</p>
            
            <Controller
              name="medicalHistory"
              control={control}
              render={({ field }) => (
                <div className="space-y-3">
                  {[
                    { key: 'bp', label: 'High Blood Pressure (Hypertension)' },
                    { key: 'diabetes', label: 'Diabetes (Type 1 or 2)' },
                    { key: 'cholesterol', label: 'High Cholesterol' },
                    { key: 'af', label: 'Atrial Fibrillation (Irregular heartbeat)' },
                    { key: 'osa', label: 'Obstructive Sleep Apnea' }
                  ].map(condition => (
                    <ToggleCard
                      key={condition.key}
                      title={condition.label}
                      checked={field.value?.[condition.key as keyof typeof field.value] || false}
                      onChange={(checked) => 
                        field.onChange({
                          ...field.value,
                          [condition.key]: checked
                        })
                      }
                    />
                  ))}
                </div>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Medications & Allergies</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Medications
              </label>
              <Controller
                name="medications"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="List all medications, dosages, and frequency..."
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Known Allergies
              </label>
              <Controller
                name="allergies"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="List any drug, food, or environmental allergies..."
                  />
                )}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Previous Cardiac Tests & Procedures</h3>
            <p className="text-gray-600 mb-6">Have you had any of these cardiac tests or procedures?</p>
            
            <Controller
              name="tests"
              control={control}
              render={({ field }) => (
                <div className="space-y-3">
                  {[
                    { key: 'echo', label: 'Echocardiogram' },
                    { key: 'holter', label: 'Holter Monitor' },
                    { key: 'angio', label: 'Angiogram/Catheterization' },
                    { key: 'surgery', label: 'Cardiac Surgery' }
                  ].map(test => (
                    <ToggleCard
                      key={test.key}
                      title={test.label}
                      checked={field.value?.[test.key as keyof typeof field.value] || false}
                      onChange={(checked) => 
                        field.onChange({
                          ...field.value,
                          [test.key]: checked
                        })
                      }
                      tooltip={CARD_TEST_DESCRIPTIONS[test.key as keyof typeof CARD_TEST_DESCRIPTIONS]}
                    />
                  ))}
                </div>
              )}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Smoking History</h3>
            
            <Controller
              name="smoking"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <ToggleCard
                    title="Current Smoker"
                    description="I currently smoke cigarettes, cigars, or use tobacco products"
                    checked={field.value?.current || false}
                    onChange={(checked) => 
                      field.onChange({
                        ...field.value,
                        current: checked
                      })
                    }
                  />
                  
                  <ToggleCard
                    title="Past Smoker"
                    description="I used to smoke but have quit"
                    checked={field.value?.past || false}
                    onChange={(checked) => 
                      field.onChange({
                        ...field.value,
                        past: checked
                      })
                    }
                  />

                  {(field.value?.current || field.value?.past) && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year Started
                        </label>
                        <input
                          type="text"
                          value={field.value?.start || ''}
                          onChange={(e) => 
                            field.onChange({
                              ...field.value,
                              start: e.target.value
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., 1995"
                        />
                      </div>
                      
                      {field.value?.past && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Year Stopped
                          </label>
                          <input
                            type="text"
                            value={field.value?.stop || ''}
                            onChange={(e) => 
                              field.onChange({
                                ...field.value,
                                stop: e.target.value
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 2020"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Family History</h3>
            
            <Controller
              name="familyHistory"
              control={control}
              render={({ field }) => (
                <ToggleCard
                  title="Family History of Heart Disease"
                  description="Has anyone in your immediate family (parents, siblings, children) had heart disease before age 65?"
                  checked={field.value || false}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Emergency Contact (Optional)</h3>
            <p className="text-gray-600">Please provide details for someone we can contact in case of emergency:</p>
            
            <Controller
              name="nok"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={field.value?.name || ''}
                      onChange={(e) => 
                        field.onChange({
                          ...field.value,
                          name: e.target.value
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Emergency contact's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship
                    </label>
                    <input
                      type="text"
                      value={field.value?.relation || ''}
                      onChange={(e) => 
                        field.onChange({
                          ...field.value,
                          relation: e.target.value
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Spouse, Parent, Sibling"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={field.value?.phone || ''}
                      onChange={(e) => 
                        field.onChange({
                          ...field.value,
                          phone: e.target.value
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 0412 345 678"
                    />
                    {errors.nok?.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.nok.phone.message}</p>
                    )}
                  </div>
                </div>
              )}
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Additional Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anything else you'd like us to know?
              </label>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any additional symptoms, concerns, or information you think would be helpful for your consultation..."
                  />
                )}
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Review Your Information</h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Medical History Summary */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Medical History</h4>
                <div className="text-sm text-gray-600">
                  {Object.entries(formData.medicalHistory || {}).filter(([, value]) => value).length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {formData.medicalHistory?.bp && <li>High Blood Pressure</li>}
                      {formData.medicalHistory?.diabetes && <li>Diabetes</li>}
                      {formData.medicalHistory?.cholesterol && <li>High Cholesterol</li>}
                      {formData.medicalHistory?.af && <li>Atrial Fibrillation</li>}
                      {formData.medicalHistory?.osa && <li>Sleep Apnea</li>}
                    </ul>
                  ) : (
                    <p>No conditions reported</p>
                  )}
                </div>
              </div>

              {/* Medications */}
              {formData.medications && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Medications</h4>
                  <p className="text-sm text-gray-600">{formData.medications}</p>
                </div>
              )}

              {/* Allergies */}
              {formData.allergies && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Allergies</h4>
                  <p className="text-sm text-gray-600">{formData.allergies}</p>
                </div>
              )}

              {/* Tests */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Previous Tests</h4>
                <div className="text-sm text-gray-600">
                  {Object.entries(formData.tests || {}).filter(([, value]) => value).length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {formData.tests?.echo && <li>Echocardiogram</li>}
                      {formData.tests?.holter && <li>Holter Monitor</li>}
                      {formData.tests?.angio && <li>Angiogram</li>}
                      {formData.tests?.surgery && <li>Cardiac Surgery</li>}
                    </ul>
                  ) : (
                    <p>No previous tests reported</p>
                  )}
                </div>
              </div>

              {/* Family History */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Family History</h4>
                <p className="text-sm text-gray-600">
                  {formData.familyHistory ? 'Yes, family history of heart disease before 65' : 'No family history reported'}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Ready to Generate PDF</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Your information will be compiled into a PDF for download and email attachment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="text-center space-y-6">
            {!isComplete ? (
              <>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Generate Your PDF</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Your intake form is complete. Click below to generate your PDF and prepare it for email.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleGeneratePDF}
                    disabled={isGenerating}
                    className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        <span>Generate PDF & Email</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">All Done!</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Your PDF has been downloaded and your email client should have opened with a pre-filled message. All data has been cleared from your browser.
                  </p>
                </div>
                <button
                  onClick={handleCloseWizard}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (state.currentStep) {
      case 0:
        return true;
      case 1:
        return formData.medicalHistory !== undefined;
      case 8:
        return isValid;
      default:
        return true;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Patient Intake Wizard</h2>
          <button
            onClick={handleCloseWizard}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 border-b border-gray-100">
          <Stepper
            currentStep={state.currentStep}
            totalSteps={10}
            stepTitles={stepTitles}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        {state.currentStep < 9 && (
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <button
              onClick={handlePrev}
              disabled={state.currentStep === 0}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <span className="text-sm text-gray-500">
              Step {state.currentStep + 1} of {stepTitles.length}
            </span>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Wizard;