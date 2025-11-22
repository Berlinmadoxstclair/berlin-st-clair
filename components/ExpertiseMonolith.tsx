'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';

const SERVICE_DATA = [
  { 
    title: 'DECOUPLED ENGINEERING', 
    id: 'decoupled', 
    value: "Architecture separates the head (frontend) from the body (CMS) for unbreakable speed and security." 
  },
  { 
    title: 'DIGITAL ARCHITECTURE', 
    id: 'architecture', 
    value: "Beyond UI/UX. We craft hyper-specific environments, ensuring every user interaction is a deliberate, cinematic event." 
  },
  { 
    title: 'DIGITAL CONCIERGE', 
    id: 'concierge', 
    value: "We do not 'host.' We govern. Continuous monitoring and white-glove service ensure atmospheric integrity." 
  },
];

export default function ExpertiseMonolith() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const curtainRef = useRef(null);

  const activeData = SERVICE_DATA.find(s => s.id === activeService);

  const handleOpen = (serviceId: string) => {
    setActiveService(serviceId);
    setIsModalOpen(true);

    gsap.fromTo(curtainRef.current, {
      x: '100%',
    }, {
      x: '0%',
      duration: 0.01,
      onComplete: () => {
        gsap.to(curtainRef.current, {
          x: '100%',
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    });
  };

  const handleClose = () => {
    gsap.to(curtainRef.current, {
      x: '0%',
      duration: 0.8,
      ease: 'power3.in',
      onComplete: () => {
        setActiveService(null);
        setIsModalOpen(false);
        gsap.set(curtainRef.current, { x: '100%' }); 
      }
    });
  };

  return (
    <section className="min-h-screen relative flex flex-col justify-center items-start px-12 py-32">
      <span className="text-concrete font-data text-xs tracking-widest uppercase mb-16">
        02 — Expertise
      </span>

      <div className="w-full max-w-4xl">
        {SERVICE_DATA.map((service) => (
          <div 
            key={service.id} 
            className="border-b border-bone/20 last:border-b-0 cursor-pointer overflow-hidden"
            onClick={() => handleOpen(service.id)}
          >
            <h3 className="text-7xl font-voice italic text-bone py-10 transition-colors duration-300 hover:text-concrete">
              {service.title}
            </h3>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 w-full h-full bg-void z-40 flex items-center justify-center p-8 transition-opacity duration-300"
        >
          <div className="relative z-50 text-center max-w-lg">
            <h4 className="text-5xl md:text-7xl font-voice italic mb-8 text-bone">
                {activeData ? activeData.title : ''}
            </h4>
            <p className="text-concrete font-data text-base leading-relaxed mb-12">
                {activeData ? activeData.value : ''}
            </p>

            <button 
                onClick={handleClose} 
                className="text-xs font-data uppercase tracking-widest border border-concrete/50 px-6 py-3 hover:border-bone transition-colors duration-300"
            >
                [ RETURN TO THE VOID ]
            </button>
          </div>
        </div>
      )}

      <div 
        ref={curtainRef}
        // FIX: z-[100] -> z-100
        className="fixed inset-0 w-full h-full bg-void z-100 transform translate-x-full"
      />
    </section>
  );
}