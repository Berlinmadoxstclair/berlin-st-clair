'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CinematicPreloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    const timer = setTimeout(() => {
      tl.to(textRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.5,
        ease: "cubic-bezier(0.25, 1, 0.5, 1)",
        onComplete: () => setIsComplete(true),
      });

    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isComplete) return null;

  return (
    <div 
      ref={containerRef}
      // FIX: z-[9999] -> z-9999
      className="fixed inset-0 z-9999 flex items-center justify-center bg-void"
    >
      <p 
        ref={textRef}
        className="text-concrete font-data text-xs uppercase tracking-[0.3em] animate-pulse"
      >
        Initializing Environment...
      </p>
    </div>
  );
}