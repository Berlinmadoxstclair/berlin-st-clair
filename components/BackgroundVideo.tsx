'use client';

// Note: Use a standard <video> element, which relies on the browser.

export default function BackgroundVideo() {
  return (
    <div className="absolute inset-0 z-0">
        <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-20" // Reduced opacity for visual subtlety
        >
            {/* Source for modern browsers (Chrome, Firefox) */}
            <source src="/video/hero-loop.webm" type="video/webm" />
            
            {/* Source for older and Safari/IE browsers */}
            <source src="/video/hero-loop.mp4" type="video/mp4" />
            
            {/* Fallback text if video formats aren't supported */}
            Your browser does not support our video format.
        </video>
    </div>
  );
}