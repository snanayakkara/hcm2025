import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface ToggleCardProps {
  title: string | React.ReactNode;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  tooltip?: string;
  disabled?: boolean;
}

const ToggleCard: React.FC<ToggleCardProps> = ({
  title,
  description,
  checked,
  onChange,
  tooltip,
  disabled = false
}) => {
  return (
    <motion.div
      className={`
        relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
        ${checked 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={() => !disabled && onChange(!checked)}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <div className="font-medium text-gray-900">{title}</div>
            {tooltip && (
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 w-64">
                  {tooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
        <div className="ml-4">
          <div className={`
            w-5 h-5 rounded border-2 flex items-center justify-center
            ${checked 
              ? 'bg-blue-600 border-blue-600' 
              : 'border-gray-300 bg-white'
            }
          `}>
            {checked && (
              <motion.svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.1 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ToggleCard;