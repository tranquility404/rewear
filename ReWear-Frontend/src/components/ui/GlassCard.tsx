import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = false,
  onClick
}) => {
  return (
    <motion.div
      className={`
        bg-white/20 backdrop-blur-sm border border-white/30
        rounded-xl shadow-lg dark:bg-slate-800/30 dark:border-slate-700/50
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -2, scale: 1.02 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};