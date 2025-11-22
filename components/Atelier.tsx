'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CARD_DATA = [
  { 
    id: 1, 
    label: "01 / THE BLUEPRINT", 
    title: "The Blueprint (Design)", 
    copy: "We reject templates. We build environments. Our process begins with a blank sheet, ensuring a bespoke digital architecture that matches your brand ethos.",
    color: 'bg-concrete/20' 
  },
  { 
    id: 2, 
    label: "02 / THE BUILD", 
    title: "The Build (Engineering)", 
    copy: "Headless architecture for unbreakable security. We leverage Next.js and GSAP to deliver a kinetic environment built for speed and long-term stability.",
    color: 'bg-concrete/10' 
  },
  { 
    id: 3, 
    label: "03 / THE CUSTODY", 
    title: "The Custody (Concierge)", 
    copy: "We do not 'host.' We govern. Continuous monitoring and updates, ensuring your digital flagship remains performant, secure, and visually flawless.",
    color: 'bg-concrete/5' 
  },
];

export default function Atelier() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(el => el) as HTMLDivElement[];
    if (cards.length < CARD_DATA.length) return;

    const ctx = gsap.context(() => {
      // FIX 1: EXTREME TIGHTNESS (60vh total)
      // The animation happens very quickly, and the release is immediate.
      const totalPinDuration = 60; 

      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: `+=${totalPinDuration}vh`, 
        scrub: 1, 
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalPinDuration}vh`,
          scrub: true,
        }
      });

      // SEGMENT 1: THE SPLIT
      tl.to(cards[0], {
        xPercent: 35, 
        rotation: 2, 
        scale: 0.95,
        duration: 1,
        ease: "power1.inOut",
      }, "split")
      
      .to(cards[1], {
        xPercent: -35, 
        rotation: -2,
        scale: 0.95,
        duration: 1,
        ease: "power1.inOut",
      }, "split")

      // SEGMENT 2: THE HALF-DROP
      .to(cards[2], {
        xPercent: -35, 
        yPercent: 55, 
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [cardsRef.current.length]);

  return (
    // FIX 2: Reduced container height to bare minimum (160vh) to prevent dead space
    <section ref={sectionRef} id="atelier" className="relative w-full min-h-[160vh] bg-void"> 
      
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
        
        {CARD_DATA.map((card, index) => (
          <div
            key={card.id}
            ref={el => { cardsRef.current[index] = el; }} 
            className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-[60vw] h-[60vh] max-w-3xl max-h-[700px] 
              border border-concrete/50 backdrop-blur-sm shadow-2xl
              p-12 flex flex-col justify-between 
              ${card.color}
            `}
            style={{ 
              zIndex: 30 - index,
              willChange: 'transform', 
              left: `${55 + (index * 1)}%`, 
              transform: `translate3d(-50%, -50%, 0)`, 
            }}
          >
            <p className="card-label text-concrete font-data tracking-widest uppercase text-sm">
              {card.label}
            </p>
            <div>
              <h2 className="text-4xl md:text-5xl font-voice italic text-bone mb-6">
                {card.title}
              </h2>
              <p className="text-sm md:text-base text-bone/80 font-data leading-relaxed">
                {card.copy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}