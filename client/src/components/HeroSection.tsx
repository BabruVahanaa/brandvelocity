import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Animated starfield effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
    }> = [];

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star) => {
        star.z -= star.speed;

        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const x = (star.x / star.z) * canvas.width + centerX;
        const y = (star.y / star.z) * canvas.height + centerY;
        const size = (1 - star.z / canvas.width) * star.size * 3;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - star.z / canvas.width})`;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw trail
        const trailLength = 10;
        const prevX = (star.x / (star.z + star.speed * trailLength)) * canvas.width + centerX;
        const prevY = (star.y / (star.z + star.speed * trailLength)) * canvas.height + centerY;
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - star.z / canvas.width) * 0.5})`;
        ctx.lineWidth = size;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative">
      <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 md:pt-0 bg-black">
      {/* Animated Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black/50 to-black z-0"></div>

      {/* Floating Orbs with Parallax */}
      <div
        className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"
        style={{
          top: "20%",
          left: "10%",
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          transition: "transform 0.3s ease-out",
        }}
      ></div>
      <div
        className="absolute w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse"
        style={{
          bottom: "20%",
          right: "10%",
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: "transform 0.3s ease-out",
          animationDelay: "1s",
        }}
      ></div>

      {/* 3D Grid Background */}
      <div className="absolute inset-0 z-0" style={{ perspective: "1000px" }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(168, 85, 247, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `rotateX(60deg) translateZ(-200px) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>
      </div>

      {/* Floating Background Text */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="text-[20rem] font-bold text-white whitespace-nowrap animate-float">
          BRAND
        </div>
      </div>

      {/* Main Content */}
      <div className="container relative z-10 text-center px-4">
        <div
          className="space-y-4 md:space-y-6 animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Cosmic Wave Animation */}
          <div className="flex justify-center animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <div className="relative w-64 h-32 md:w-96 md:h-48 overflow-hidden">
              {/* Wave 1 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#1abc9c] to-transparent animate-wave opacity-80"></div>
              </div>
              
              {/* Wave 2 */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: "0.5s" }}>
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-wave opacity-60"></div>
              </div>
              
              {/* Wave 3 */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: "1s" }}>
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-wave opacity-40"></div>
              </div>
              
              {/* Wave 4 */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: "1.5s" }}>
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-wave opacity-60"></div>
              </div>
              
              {/* Wave 5 */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: "2s" }}>
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-wave opacity-50"></div>
              </div>
              
              {/* Center energy core */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-[#1abc9c] via-purple-500 to-pink-500 rounded-full blur-2xl animate-pulse opacity-60"></div>
              </div>
              
              {/* Sparkle particles */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#1abc9c] rounded-full animate-ping"></div>
              <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
              <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-pink-500 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-fadeInUp px-4"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="block text-white mb-2 md:mb-4">We Build</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_auto]">
              Brands That Matter
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-base sm:text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fadeInUp px-4"
            style={{ animationDelay: "0.6s" }}
          >
            Strategic brand development and design that connects with your audience and drives sustainable business results.
          </p>

          {/* CTA Button */}
          <div
            className="flex flex-col items-center gap-3 animate-fadeInUp"
            style={{ animationDelay: "0.8s" }}
          >
            <Button
              size="lg"
              className="relative group bg-gradient-to-r from-[#1abc9c] to-[#16a085] hover:from-[#16a085] hover:to-[#1abc9c] text-white text-base md:text-lg px-6 md:px-8 py-5 md:py-6 overflow-hidden border-2 border-[#1abc9c]/30 hover:border-[#1abc9c] transition-all duration-300 shadow-lg shadow-[#1abc9c]/20 hover:shadow-[#1abc9c]/40"
              onClick={() => {
                const velocityBtn = document.querySelector('[data-velocity-ai-trigger]') as HTMLButtonElement;
                if (velocityBtn) velocityBtn.click();
              }}
            >
              <span className="relative z-10 font-semibold">Velocity AI</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
            <p className="text-xs sm:text-sm text-gray-400 px-4 text-center">
              Find out how much it's gonna cost for your website in 30 seconds
            </p>
          </div>

          {/* Rotating Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[600px] h-[600px] border border-purple-500/20 rounded-full animate-spin-slow"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-pink-500/10 rounded-full animate-spin-reverse"></div>
          </div>
        </div>
      </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: translate(-50%, -50%) rotate(360deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out both;
        }

        .animate-gradient-flow {
          animation: gradient-flow 3s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

