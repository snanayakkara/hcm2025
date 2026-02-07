import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller, Path } from 'react-hook-form';
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
import Button from '../ui/Button';
import { IntakeSchema, IntakeForm, CARD_TEST_DESCRIPTIONS } from '../../types/intake';
import Stepper from './Stepper';
import ToggleCard from '../fields/ToggleCard';

interface WizardProps {
  onClose: () => void;
}

const Wizard: React.FC<WizardProps> = ({ onClose }) => {
  const { state, updateData, nextStep, prevStep, cleanup } = useIntake();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const {
    control,
    formState: { errors },
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
    'Emergency Contact',
    'Additional Notes',
    'Review',
    'Complete'
  ];

  const handleNext = useCallback(() => {
    updateData(formData);
    if (state.currentStep < stepTitles.length - 1) {
      nextStep();
    }
  }, [formData, updateData, nextStep, state.currentStep, stepTitles.length]);

  const handlePrev = useCallback(() => {
    updateData(formData);
    prevStep();
  }, [formData, updateData, prevStep]);

  const handleStepClick = useCallback((targetStep: number) => {
    updateData(formData);
    // Allow navigation to any step (you could add validation here if needed)
    const stepDiff = targetStep - state.currentStep;
    if (stepDiff > 0) {
      for (let i = 0; i < stepDiff; i++) {
        nextStep();
      }
    } else if (stepDiff < 0) {
      for (let i = 0; i < Math.abs(stepDiff); i++) {
        prevStep();
      }
    }
  }, [formData, updateData, nextStep, prevStep, state.currentStep]);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const { generateIntakePDF, downloadPDF, createMailtoLink } = await import('../pdf/generatePdf');
      const pdfBytes = await generateIntakePDF(formData);
      downloadPDF(pdfBytes);
      createMailtoLink(pdfBytes);
      cleanup();
      setIsComplete(true);
    } catch (error) {
      console.error('PDF generation failed:', error);
      // Show user-friendly error message
      alert('PDF generation failed. This may be due to special characters in your form data. Please review your entries and try again.');
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
            <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Patient Summary</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                This secure form collects your cardiovascular health information. All data stays on your device and is never stored online.
              </p>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-teal-600 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-medium text-teal-900">Privacy Notice</h4>
                  <p className="text-sm text-teal-800 mt-1">
                    Your information is stored only on your computer, and automatically deleted after you finish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Medical History</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Medical History */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical Conditions</h4>
                  <p className="text-gray-600 mb-4">Please select any conditions you currently have or have had in the past:</p>
                  
                  <Controller
                    name="medicalHistory"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-3">
                        {[
                          { key: 'bp', label: 'High Blood Pressure (Hypertension)', icon: '/images/icons/blood-pressure.svg' },
                          { key: 'diabetes', label: 'Diabetes (Type 1 or 2)', icon: '/images/icons/diabetes.svg' },
                          { key: 'cholesterol', label: 'High Cholesterol', icon: '/images/icons/blood-drop.svg' },
                          { key: 'af', label: 'Atrial Fibrillation (Irregular heartbeat)', icon: '/images/icons/heart-cardiogram.svg' },
                          { key: 'osa', label: 'Obstructive Sleep Apnea', icon: '/images/icons/cpap-masks.svg' }
                        ].map(condition => (
                          <ToggleCard
                            key={condition.key}
                            title={
                              <div className="flex items-center space-x-2">
                                <img 
                                  src={condition.icon} 
                                  alt={condition.label}
                                  className="w-5 h-5 text-teal-600"
                                  style={{ filter: 'invert(21%) sepia(77%) saturate(1342%) hue-rotate(211deg) brightness(97%) contrast(94%)' }}
                                />
                                <span>{condition.label}</span>
                              </div>
                            }
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
              </div>

              {/* Right Column - Smoking & Family History */}
              <div className="space-y-6">
                {/* Smoking History Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Smoking History</h4>
                  
                  <Controller
                    name="smoking"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-4">
                        <ToggleCard
                          title={
                            <div className="flex items-center space-x-2">
                              <img 
                                src="/images/icons/smoking.svg" 
                                alt="Current Smoker"
                                className="w-5 h-5"
                                style={{ filter: 'invert(21%) sepia(77%) saturate(1342%) hue-rotate(211deg) brightness(97%) contrast(94%)' }}
                              />
                              <span>Current Smoker</span>
                            </div>
                          }
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
                          title={
                            <div className="flex items-center space-x-2">
                              <img 
                                src="/images/icons/smoking-cessation.svg" 
                                alt="Past Smoker"
                                className="w-5 h-5"
                                style={{ filter: 'invert(21%) sepia(77%) saturate(1342%) hue-rotate(211deg) brightness(97%) contrast(94%)' }}
                              />
                              <span>Past Smoker</span>
                            </div>
                          }
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
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-4">
                            <h5 className="font-medium text-yellow-900">Smoking Details</h5>
                            <div className="grid grid-cols-1 gap-4">
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
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="e.g., 2020"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>

                {/* Family History Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Family History</h4>
                  
                  <Controller
                    name="familyHistory"
                    control={control}
                    render={({ field }) => (
                      <ToggleCard
                        title={
                          <div className="flex items-center space-x-2">
                            <img 
                              src="/images/icons/elderly.svg" 
                              alt="Family History"
                              className="w-5 h-5"
                              style={{ filter: 'invert(21%) sepia(77%) saturate(1342%) hue-rotate(211deg) brightness(97%) contrast(94%)' }}
                            />
                            <span>Family History of Heart Disease</span>
                          </div>
                        }
                        description="Has anyone in your immediate family (parents, siblings, children) had heart disease before age 65?"
                        checked={field.value || false}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
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
                <div className="space-y-6">
                  {[
                    { key: 'echo', label: 'Echocardiogram' },
                    { key: 'holter', label: 'Holter Monitor' },
                    { key: 'angio', label: 'Coronary Angiogram' },
                    { key: 'surgery', label: 'Heart Surgery' }
                  ].map(test => (
                    <div key={test.key} className="space-y-4">
                      <ToggleCard
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
                      
                      {/* Conditional fields for this specific test */}
                      {field.value?.[test.key as keyof typeof field.value] && (
                        <div className="ml-6 bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
                          <h5 className="font-medium text-blue-900">{test.label} Details</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Where was this test performed?
                              </label>
                              <Controller
                                name={`${test.key}Location` as Path<IntakeForm>}
                                control={control}
                                render={({ field: locationField }) => (
                                  <input
                                    type="text"
                                    {...locationField}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="e.g., Alfred Hospital, Cabrini Malvern"
                                  />
                                )}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Approximate date
                              </label>
                              <Controller
                                name={`${test.key}Date` as Path<IntakeForm>}
                                control={control}
                                render={({ field: dateField }) => (
                                  <input
                                    type="text"
                                    {...dateField}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="e.g., March 2023"
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        );

      case 4:
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
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

      case 5:
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Any additional symptoms, concerns, or information you think would be helpful for your consultation..."
                  />
                )}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col h-full space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Review Your Information</h3>
            
            <div className="flex-1 space-y-4 overflow-y-auto">
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

              {/* Smoking History */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Smoking History</h4>
                <div className="text-sm text-gray-600">
                  {formData.smoking?.current || formData.smoking?.past ? (
                    <div className="space-y-1">
                      {formData.smoking?.current && <p>Current smoker</p>}
                      {formData.smoking?.past && <p>Past smoker</p>}
                      {formData.smoking?.start && <p>Started: {formData.smoking.start}</p>}
                      {formData.smoking?.stop && <p>Stopped: {formData.smoking.stop}</p>}
                    </div>
                  ) : (
                    <p>No smoking history</p>
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
                    <div className="space-y-2">
                      {formData.tests?.echo && (
                        <div className="pl-4 border-l-2 border-blue-200">
                          <p className="font-medium">Echocardiogram</p>
                          {(formData.echoLocation || formData.echoDate) && (
                            <div className="text-xs text-gray-500 mt-1">
                              {formData.echoLocation && <p>Location: {formData.echoLocation}</p>}
                              {formData.echoDate && <p>Date: {formData.echoDate}</p>}
                            </div>
                          )}
                        </div>
                      )}
                      {formData.tests?.holter && (
                        <div className="pl-4 border-l-2 border-blue-200">
                          <p className="font-medium">Holter Monitor</p>
                          {(formData.holterLocation || formData.holterDate) && (
                            <div className="text-xs text-gray-500 mt-1">
                              {formData.holterLocation && <p>Location: {formData.holterLocation}</p>}
                              {formData.holterDate && <p>Date: {formData.holterDate}</p>}
                            </div>
                          )}
                        </div>
                      )}
                      {formData.tests?.angio && (
                        <div className="pl-4 border-l-2 border-blue-200">
                          <p className="font-medium">Angiogram</p>
                          {(formData.angioLocation || formData.angioDate) && (
                            <div className="text-xs text-gray-500 mt-1">
                              {formData.angioLocation && <p>Location: {formData.angioLocation}</p>}
                              {formData.angioDate && <p>Date: {formData.angioDate}</p>}
                            </div>
                          )}
                        </div>
                      )}
                      {formData.tests?.surgery && (
                        <div className="pl-4 border-l-2 border-blue-200">
                          <p className="font-medium">Cardiac Surgery</p>
                          {(formData.surgeryLocation || formData.surgeryDate) && (
                            <div className="text-xs text-gray-500 mt-1">
                              {formData.surgeryLocation && <p>Location: {formData.surgeryLocation}</p>}
                              {formData.surgeryDate && <p>Date: {formData.surgeryDate}</p>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>No previous tests reported</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-teal-900">Ready to Generate PDF</h4>
                  <p className="text-sm text-teal-800 mt-1">
                    Your information will be compiled into a PDF for download and email attachment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
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
                    Your pre-review form is complete. Click below to generate your PDF and prepare it for email.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-lg mx-auto">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div className="text-left">
                        <h4 className="font-medium text-amber-800">Important</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          The PDF will be downloaded to your device and an email will open automatically. 
                          <strong> You will need to manually attach the downloaded PDF file to the email</strong> before sending it to the clinic.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="primary"
                    size="large"
                    onClick={handleGeneratePDF}
                    disabled={isGenerating}
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
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">All Done!</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-4">
                    Your PDF has been downloaded and your email client should have opened with a pre-filled message.
                  </p>
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 max-w-lg mx-auto">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <div className="text-left">
                        <h4 className="font-medium text-teal-800">Next Steps</h4>
                        <p className="text-sm text-teal-700 mt-1">
                          1. Check your Downloads folder for the PDF file<br/>
                          2. Attach the PDF to the email that opened<br/>
                          3. Send the email to complete your referral
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-4">
                    All data has been cleared from your browser for privacy.
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
      case 6:
        // For review step, check if essential fields are filled rather than strict validation
        return formData.medicalHistory !== undefined && 
               formData.tests !== undefined && 
               formData.smoking !== undefined && 
               formData.familyHistory !== undefined;
      default:
        return true;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] overflow-hidden flex flex-col"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Patient Summary</h2>
          <button
            onClick={handleCloseWizard}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <Stepper
            currentStep={state.currentStep}
            totalSteps={8}
            stepTitles={stepTitles}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Content - Fixed height with scroll */}
        <div className="flex-1 p-6 overflow-y-auto min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        {state.currentStep < 7 && (
          <div className="flex items-center justify-between p-6 border-t border-gray-200 flex-shrink-0">
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

            <Button
              variant="primary"
              size="medium"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Wizard;
