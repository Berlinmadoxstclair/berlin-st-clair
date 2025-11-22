'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect } from 'react';

const CURSOR_SPRING = {
  stiffness: 150,
  damping: 10,
  mass: 0.1,
};

export default function CustomCursor() {
  const mouseX = useSpring(0, CURSOR_SPRING);
  const mouseY = useSpring(0, CURSOR_SPRING);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 8);
      mouseY.set(e.clientY - 8);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      // FIX: z-[1000] -> z-1000
      className="fixed z-1000 h-4 w-4 rounded-full border-2 border-bone/70 pointer-events-none"
      style={{
        translateX: mouseX,
        translateY: mouseY,
      }}
    />
  );
}