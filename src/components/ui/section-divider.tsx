import React from "react";
import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "simple" | "decorative" | "gradient";
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  variant = "decorative", 
  className = "" 
}) => {
  const variants = {
    simple: (
      <div className={`w-full h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent ${className}`} />
    ),
    decorative: (
      <div className={`flex items-center justify-center py-8 ${className}`}>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-purple-mid"></div>
          <motion.div 
            className="w-3 h-3 bg-purple-mid rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-purple-mid"></div>
        </div>
      </div>
    ),
    gradient: (
      <div className={`relative py-12 ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white px-6">
            <motion.div 
              className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  };

  return variants[variant];
};

export default SectionDivider; 