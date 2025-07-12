import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingLabelProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export const FloatingLabel: React.FC<FloatingLabelProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-lg
          transition-colors duration-200 outline-none
          dark:bg-slate-800/50 dark:border-slate-600
          ${error 
            ? 'border-red-400 focus:border-red-500' 
            : 'border-slate-300 focus:border-emerald-500 dark:focus:border-emerald-400'
          }
        `}
        required={required}
      />
      <motion.label
        initial={false}
        animate={{
          y: isFloating ? -28 : 0,
          scale: isFloating ? 0.85 : 1,
          color: error ? '#ef4444' : isFocused ? '#059669' : '#64748b'
        }}
        className={`
          absolute left-4 pointer-events-none origin-left
          transition-colors duration-200 font-medium
          ${isFloating ? 'bg-white dark:bg-slate-900 px-1' : ''}
        `}
        style={{ top: isFloating ? 12 : 12 }}
      >
        {label} {required && '*'}
      </motion.label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};