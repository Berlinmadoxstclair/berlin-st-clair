'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticWrapper from '@/components/MagneticWrapper';

export default function NotFound() {
  const titleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    
    tl.to(titleRef.current, {
      skewX: 20,
      duration: 0.1,
      ease: "power4.inOut",
    })
    .to(titleRef.current, {
      skewX: -20,
      duration: 0.1,
      ease: "power4.inOut",
    })
    .to(titleRef.current, {
      skewX: 0,
      duration: 0.1,
      ease: "power4.inOut",
    })
    .to(titleRef.current, {
      opacity: 0.5,
      duration: 0.05,
      yoyo: true,
      repeat: 5,
    });

  }, []);

  return (
    <main className="h-screen w-full bg-void flex flex-col items-center justify-center relative overflow-hidden selection:bg-concrete selection:text-void">
      
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative z-10 text-center">
        <h1 
            ref={titleRef}
            className="text-[12rem] md:text-[20rem] font-voice italic text-concrete leading-none select-none opacity-20"
        >
            404
        </h1>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <p className="text-bone font-data tracking-[0.5em] text-sm md:text-base uppercase mb-12">
                Signal Lost in the Ether
            </p>
            
            <MagneticWrapper>
                <Link href="/">
                    {/* FIX: hover:border-bone/100 -> hover:border-bone */}
                    <button className="group relative px-8 py-4 border border-bone/20 hover:border-bone transition-colors duration-700 rounded-full overflow-hidden">
                        <span className="relative z-10 text-xs font-data tracking-[0.2em] text-bone uppercase group-hover:text-void transition-colors duration-500">
                        Return to Origin
                        </span>
                        <div className="absolute inset-0 bg-bone transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>
                    </button>
                </Link>
            </MagneticWrapper>
        </div>
      </div>

      <div className="absolute bottom-12 text-concrete/30 font-data text-[10px] tracking-widest uppercase">
        System Failure / Architecture Unstable
      </div>
    </main>
  );
}