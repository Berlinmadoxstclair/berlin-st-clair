'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useRef, ReactNode, useEffect } from 'react';
import gsap from 'gsap';

export default function TransitionWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const transitionCurtain = useRef(null);

  const animateOut = (href: string) => {
    gsap.to(transitionCurtain.current, {
      y: '0%', 
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        router.push(href);
      },
    });
  };

  useEffect(() => {
    gsap.to(transitionCurtain.current, {
      y: '-100%',
      duration: 0.8,
      ease: 'power3.out',
    });
  }, [pathname]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');

      if (href && href.startsWith('/') && href.length > 1 && !href.includes('#')) {
        e.preventDefault();
        animateOut(href);
      }
    };

    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', handleLinkClick);
    });

    return () => {
      document.querySelectorAll('a').forEach((link) => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);

  return (
    <>
      {children}
      {/* FIX: z-[10000] -> z-10000 */}
      <div 
        ref={transitionCurtain}
        className="fixed top-0 left-0 w-full h-full bg-void z-10000 transform -translate-y-full"
      />
    </>
  );
}