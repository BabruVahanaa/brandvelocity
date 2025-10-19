import { useState } from "react";

export default function FlagHoist() {
  const [isHoisted, setIsHoisted] = useState(false);

  const handleHoist = () => {
    setIsHoisted(!isHoisted);
  };

  return (
    <div className="flex justify-center animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
      <div className="relative w-48 h-64 md:w-64 md:h-80 cursor-pointer group" onClick={handleHoist}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1abc9c]/20 via-yellow-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Flag pole */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-2 h-full bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 shadow-lg"></div>
        
        {/* Flag (moves up when hoisted) */}
        <div 
          className={`absolute left-1/2 w-32 h-32 md:w-40 md:h-40 transition-all duration-1000 ease-in-out ${
            isHoisted ? 'top-4' : 'top-32 md:top-40'
          }`}
          style={{ transformOrigin: 'left center' }}
        >
          {/* Flag fabric with wave effect */}
          <div className="relative w-full h-full">
            {/* Black background */}
            <div className="absolute inset-0 bg-black rounded-r-lg shadow-2xl border-2 border-white/20"></div>
            
            {/* Skull and crossbones design */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Skull */}
              <div className="relative">
                {/* Skull head */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full relative">
                  {/* Eyes */}
                  <div className="absolute top-5 left-3 w-3 h-4 bg-black rounded-full"></div>
                  <div className="absolute top-5 right-3 w-3 h-4 bg-black rounded-full"></div>
                  
                  {/* Nose */}
                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                  
                  {/* Teeth */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                    <div className="w-1.5 h-2 bg-black"></div>
                    <div className="w-1.5 h-2 bg-black"></div>
                    <div className="w-1.5 h-2 bg-black"></div>
                  </div>
                </div>
                
                {/* Straw hat on skull */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 md:w-24">
                  {/* Hat brim */}
                  <div className="w-full h-2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 rounded-full shadow-lg"></div>
                  {/* Hat crown */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-t-full"></div>
                  {/* Red band */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-14 h-1 bg-red-600"></div>
                </div>
                
                {/* Crossbones */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-8">
                  {/* Left bone */}
                  <div className="absolute top-1/2 left-0 w-10 h-2 bg-white rounded-full transform -rotate-45 origin-left"></div>
                  {/* Right bone */}
                  <div className="absolute top-1/2 right-0 w-10 h-2 bg-white rounded-full transform rotate-45 origin-right"></div>
                  {/* Bone ends */}
                  <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                  <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Flag wave animation */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent ${isHoisted ? 'animate-pulse' : ''}`}></div>
          </div>
        </div>
        
        {/* Click instruction */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-sm text-gray-400 whitespace-nowrap">
            {isHoisted ? 'Click to lower' : 'Click to hoist'}
          </p>
        </div>
      </div>
    </div>
  );
}

