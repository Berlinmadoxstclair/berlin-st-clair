'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function GhostNavigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleActivity = () => {
      if (isHovered) return;
      setIsVisible(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 500);
    };

    window.addEventListener('wheel', handleActivity);
    window.addEventListener('touchmove', handleActivity);

    return () => {
      window.removeEventListener('wheel', handleActivity);
      window.removeEventListener('touchmove', handleActivity);
      clearTimeout(timeoutId);
    };
  }, [isHovered]);

  return (
    <nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed top-8 right-8 z-50 
        transition-opacity duration-700 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <ul className="flex flex-col items-end gap-2">
        {['Philosophy', 'Expertise', 'Collection', 'Inquire'].map((item, i) => (
          <li key={item} className="group relative overflow-hidden cursor-pointer">
            <Link href={`#${item.toLowerCase()}`} className="block">
              <span className="text-xs font-data tracking-[0.2em] text-bone/70 group-hover:text-bone transition-colors duration-300 uppercase">
                {`0${i + 1} — ${item}`}
              </span>
              {/* FIX: h-[1px] -> h-px */}
              <span className="absolute bottom-0 right-0 w-full h-px bg-bone transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}