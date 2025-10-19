import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsTransitioning(true);
      
      // Wait for transition to complete before updating content
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <>
      {/* Transition Overlay - Diagonal Wipe Effect */}
      <div
        className={`fixed inset-0 z-[100] pointer-events-none transition-transform duration-800 ease-in-out ${
          isTransitioning ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Multiple diagonal stripes for interesting effect */}
        <div className="absolute inset-0 bg-white transform -skew-x-12 origin-top-left" 
             style={{ 
               animation: isTransitioning ? "slideInDiagonal 0.8s ease-in-out" : "none",
               animationDelay: "0s"
             }}
        ></div>
        <div className="absolute inset-0 bg-black transform -skew-x-12 origin-top-left" 
             style={{ 
               animation: isTransitioning ? "slideInDiagonal 0.8s ease-in-out" : "none",
               animationDelay: "0.1s"
             }}
        ></div>
        <div className="absolute inset-0 bg-white transform -skew-x-12 origin-top-left" 
             style={{ 
               animation: isTransitioning ? "slideInDiagonal 0.8s ease-in-out" : "none",
               animationDelay: "0.2s"
             }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-white to-black transform -skew-x-12 origin-top-left" 
             style={{ 
               animation: isTransitioning ? "slideInDiagonal 0.8s ease-in-out" : "none",
               animationDelay: "0.3s"
             }}
        ></div>
      </div>

      {/* Circular Reveal Effect */}
      <div
        className={`fixed inset-0 z-[99] pointer-events-none flex items-center justify-center ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
        style={{ transition: "opacity 0.3s ease-in-out" }}
      >
        <div
          className="bg-black rounded-full"
          style={{
            width: isTransitioning ? "300vmax" : "0",
            height: isTransitioning ? "300vmax" : "0",
            transition: "width 0.8s ease-in-out, height 0.8s ease-in-out",
          }}
        ></div>
      </div>

      {/* Content with fade effect */}
      <div
        className={`transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>

      <style>{`
        @keyframes slideInDiagonal {
          0% {
            transform: translateX(-120%) skewX(-12deg);
          }
          50% {
            transform: translateX(0%) skewX(-12deg);
          }
          100% {
            transform: translateX(120%) skewX(-12deg);
          }
        }

        @keyframes circleExpand {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(20);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

