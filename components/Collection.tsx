'use client';

import { useRef, useEffect, useState } from 'react';
import { client, urlFor } from '@/lib/sanity';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  _id: string;
  title: string;
  abstractTitle: string;
  mainImage: any;
  specs: string[];
}

const FALLBACK_PROJECTS = [
  { _id: '1', title: 'Maison Madox', abstractTitle: 'The Holding Co.', mainImage: null, specs: ['Headless', 'WebGL'] },
  { _id: '2', title: 'Flesh & Code', abstractTitle: 'The Avant-Garde', mainImage: null, specs: ['React', 'Three.js'] },
  { _id: '3', title: 'Raw Materials', abstractTitle: 'The Industrial', mainImage: null, specs: ['Next.js', 'GSAP'] },
];

async function getProjects() {
  try {
    return await client.fetch(`*[_type == "project"]{_id, title, abstractTitle, mainImage, specs}`);
  } catch (e) {
    return [];
  }
}

export default function Collection() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProjects().then((data) => {
      if (data && data.length > 0) setProjects(data);
    });
  }, []);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const totalWidth = trackRef.current!.scrollWidth;
      const viewWidth = window.innerWidth;
      gsap.to(trackRef.current, {
        x: () => -(totalWidth - viewWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-void py-24">
      <div className="absolute top-12 left-12 z-10">
        <span className="text-concrete font-data text-xs tracking-widest uppercase">
          03 — The Collection
        </span>
      </div>

      <div ref={trackRef} className="flex h-full items-center gap-24 px-24 w-max">
        {projects.map((project, i) => (
          <div key={project._id} className="relative group w-[30vw] h-[60vh] shrink-0 cursor-pointer"> {/* FIX: shrink-0 */}
            
            {/* FIX: ease-heavy replaces the manual cubic-bezier */}
            <div className="w-full h-full overflow-hidden bg-concrete/10 grayscale group-hover:grayscale-0 transition-all duration-1000 ease-heavy">
              {project.mainImage ? (
                <img 
                  src={urlFor(project.mainImage).url()} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-heavy" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-concrete font-data text-xs uppercase tracking-widest">
                  [ Image Pending ]
                </div>
              )}
            </div>

            <div className="absolute -bottom-12 left-0">
              <h3 className="text-3xl font-voice italic text-bone">
                {project.abstractTitle}
              </h3>
              <p className="text-concrete font-data text-xs uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {project.title} — {project.specs?.[0]}
              </p>
            </div>

            <div className="absolute -top-12 right-0 text-concrete/20 font-voice text-9xl italic pointer-events-none">
              0{i + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}