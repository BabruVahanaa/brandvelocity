import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SEO from "@/components/SEO";
import VelocityAI from "@/components/VelocityAI";


export default function Home() {


  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="BrandVelocity | We Build Brands That Matter"
        description="Strategic brand development and design that connects with your audience and drives sustainable business results."
        keywords="brand strategy, visual identity, digital presence, public relations, branding agency"
      />
      
      <Navigation />
      
      <HeroSection />
      
      <VelocityAI />

      <Footer />

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
      `}</style>
    </div>
  );
}

