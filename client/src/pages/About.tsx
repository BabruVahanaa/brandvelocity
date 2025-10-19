import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="About Us | BrandVelocity"
        description="We're a team of strategists, designers, and creative thinkers who believe that great brands have the power to change the world."
        keywords="about brandvelocity, branding agency, marketing team, brand strategists"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-16">
              About <span className="text-[#1abc9c]">Brand</span>Velocity
            </h1>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Column - About Text */}
              <div className="space-y-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  We're a team of strategists, designers, and creative thinkers who believe that great brands have the power to change the world. Our approach combines strategic thinking with creative excellence to build sustainable brands that not only look amazing but also drive real business results.
                </p>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  With extensive experience working with diverse clients from emerging startups to established enterprises, we understand what it takes to create sustainable brands that stand out in today's competitive landscape.
                </p>
              </div>
              
              {/* Right Column - Mission Card */}
              <div>
                <Card className="bg-gradient-to-br from-[#1abc9c] to-[#16a085] border-none overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 group-hover:to-black/30 transition-all duration-300"></div>
                  <CardContent className="p-10 relative z-10">
                    <h2 className="text-3xl font-bold mb-6 text-white">
                      Our Mission
                    </h2>
                    
                    <p className="text-lg text-white/95 leading-relaxed mb-8">
                      To help businesses build authentic, memorable brands that create lasting connections with their audiences and drive sustainable growth.
                    </p>
                    
                    <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">
                          Trusted by young entrepreneurs
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black"></div>
        
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              What Drives Us
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-gray-900/80 to-black border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-[#1abc9c]">
                    Strategic Thinking
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We believe in data-driven strategies that are grounded in research and insights, ensuring every decision moves your brand forward.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-gray-900/80 to-black border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-[#1abc9c]">
                    Creative Excellence
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our designs don't just look good—they communicate your brand's unique story and create memorable experiences.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-gray-900/80 to-black border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-[#1abc9c]">
                    Sustainable Growth
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We focus on building brands that deliver long-term value and create lasting connections with your audience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

