import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps, stepTitles }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-start justify-between">
        {Array.from({ length: totalSteps }, (_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <motion.div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${index < currentStep 
                    ? 'bg-green-500 text-white' 
                    : index === currentStep 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-200' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
                initial={{ scale: 0.8 }}
                animate={{ scale: index === currentStep ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>
              <div className={`
                mt-2 text-xs text-center w-20 h-8 flex items-center justify-center leading-tight
                ${index === currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'}
              `}>
                <span className="px-1">
                  {stepTitles[index]}
                </span>
              </div>
            </div>
            {index < totalSteps - 1 && (
              <div className={`
                flex-1 h-0.5 mx-2 mt-4
                ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;