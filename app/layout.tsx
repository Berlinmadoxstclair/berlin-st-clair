import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import GhostNavigation from "@/components/GhostNavigation";
import CinematicPreloader from "@/components/CinematicPreloader";
import CustomCursor from "@/components/CustomCursor";
import TransitionWrapper from "@/components/TransitionWrapper"; // <-- CORRECTED IMPORT

// The Voice: Editorial, Cinematic
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-voice"
});

// The Data: Technical, Precision
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500"],
  variable: "--font-data"
});

export const metadata: Metadata = {
  title: "Berlin St. Clair Studios",
  description: "Cinematic Minimalism. High-Fidelity Interaction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${montserrat.variable} font-sans bg-void text-bone`}>
        
        {/* 1. The Preloader (Blocks Content Loading) */}
        <CinematicPreloader />
        
        {/* 2. The Custom Cursor (Fixed Position) */}
        <CustomCursor /> 
        
        {/* 3. The Physics Layer (Smooth Scroll) */}
        <SmoothScroll>
          
          {/* 4. The Interface (Ghost Menu) */}
          <GhostNavigation />
          
          {/* 5. The Page Transition Engine (Wraps all content) */}
          <TransitionWrapper>
            {children}
          </TransitionWrapper>
          
        </SmoothScroll>
      </body>
    </html>
  );
}