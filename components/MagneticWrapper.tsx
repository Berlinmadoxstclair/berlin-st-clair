'use client';

import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

const DAMPING_FACTOR = 0.6; // Controls the strength of the "pull"

export default function MagneticWrapper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { x, y } = position;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      
      // Calculate center of the button wrapper
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance from cursor to center
      const offsetX = clientX - centerX;
      const offsetY = clientY - centerY;

      // Apply the magnetic pull
      setPosition({
        x: offsetX * DAMPING_FACTOR,
        y: offsetY * DAMPING_FACTOR,
      });
    }
  };

  const handleMouseLeave = () => {
    // Reset position to center with spring motion
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block" // Crucial for wrapper size
    >
      {children}
    </motion.div>
  );
}