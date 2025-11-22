'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // The "Heavy" Physics Configuration
    const lenis = new Lenis({
      duration: 1.5, // Heavy inertia: takes 1.5s to settle
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom ease curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2, // slightly amplifies the user's input
      touchMultiplier: 2,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    // This ensures our "Curtain" animations fire precisely when they should
    lenis.on('scroll', ScrollTrigger.update);

    // The Physics Loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <div className="layout-wrapper">{children}</div>;
}