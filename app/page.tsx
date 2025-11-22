import LiquidHero from "@/components/LiquidHero";
import Collection from "@/components/Collection";
import BackgroundVideo from "@/components/BackgroundVideo";
import MagneticWrapper from "@/components/MagneticWrapper";
import ExpertiseMonolith from "@/components/ExpertiseMonolith";
import Atelier from "@/components/Atelier";
import { submitInquiry } from "@/app/actions";

export default function Home() {
  return (
    <main className="relative w-full bg-void min-h-screen selection:bg-bone selection:text-void">
      
      {/* SECTION 1: THE FOYER */}
      <section className="h-screen w-full relative flex flex-col justify-center items-center">
        <BackgroundVideo /> 
        <div className="absolute inset-0 w-full h-full z-10">
          <LiquidHero />
        </div>
        <div className="absolute bottom-12 z-20">
          <button className="text-concrete text-sm font-data tracking-[0.3em] uppercase hover:text-bone transition-colors duration-500">
            [ Enter The Void ]
          </button>
        </div>
      </section>

      {/* SECTION 2: THE PHILOSOPHY */}
      <section id="philosophy" className="relative w-full py-32 px-6 md:px-12 flex flex-col md:flex-row gap-12 border-t border-white/5">
        <div className="w-full md:w-[30%] flex flex-col justify-start">
          <span className="text-concrete font-data text-xs tracking-widest uppercase mb-4">
            01 — The Philosophy
          </span>
          <div className="w-px h-32 bg-concrete/30"></div>
        </div>

        <div className="w-full md:w-[70%]">
          <h2 className="text-4xl md:text-6xl font-voice italic text-bone leading-[1.1]">
            "I am not just a developer; I am an architect of the digital ether. 
            My work exists at the intersection of logic and emotion."
          </h2>
          <p className="mt-8 text-concrete font-data text-sm leading-relaxed max-w-md">
            We do not build for the present; we design for the timeless. 
            Rejecting the template in favor of the environment.
          </p>
        </div>
      </section>
      
      {/* SECTION 3: EXPERTISE */}
      <div id="expertise">
        <ExpertiseMonolith /> 
      </div>

      {/* SECTION 4: THE ATELIER */}
      <Atelier />

      {/* SECTION 5: THE COLLECTION */}
      <div id="collection">
        <Collection />
      </div>

      {/* SECTION 6: THE GATE */}
      <section id="inquire" className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-32 border-t border-white/5 bg-void">
        
        <div className="mb-20">
          <h2 className="text-[4rem] md:text-[8rem] font-voice italic text-bone leading-[0.9]">
            Private Inquiry
          </h2>
          <p className="text-concrete font-data tracking-widest mt-4 uppercase text-sm">
            Accepting Q4 Commissions
          </p>
        </div>

        <form action={submitInquiry} className="w-full max-w-2xl flex flex-col gap-12">
          
          <div className="relative group">
            <input 
              name="name"
              type="text" 
              required
              placeholder="IDENTITY" 
              className="w-full bg-transparent border-b border-concrete/30 py-4 text-bone font-data tracking-widest outline-none focus:border-bone transition-colors duration-500 placeholder:text-concrete/50"
            />
          </div>

          <div className="relative group">
            <input 
              name="email"
              type="email" 
              required
              placeholder="SIGNAL" 
              className="w-full bg-transparent border-b border-concrete/30 py-4 text-bone font-data tracking-widest outline-none focus:border-bone transition-colors duration-500 placeholder:text-concrete/50"
            />
          </div>

          <div className="pt-12">
            <MagneticWrapper>
              <button 
                type="submit"
                className="group relative px-8 py-4 border border-bone/20 hover:border-bone transition-colors duration-700 rounded-full overflow-hidden"
              >
                <span className="relative z-10 text-xs font-data tracking-[0.2em] text-bone uppercase group-hover:text-void transition-colors duration-500">
                  Request Access
                </span>
                <div className="absolute inset-0 bg-bone transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>
              </button>
            </MagneticWrapper>
          </div>
        </form>
      </section>
    </main>
  );
}