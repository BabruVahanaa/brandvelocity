import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, BookOpen, Globe, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const services = [
    {
      icon: Lightbulb,
      title: "Brand Strategy",
      description: "We develop comprehensive brand strategies that define your unique position in the market and create meaningful, sustainable connections with your audience.",
      features: [
        "Market positioning analysis",
        "Brand identity development",
        "Competitive research",
        "Target audience profiling",
        "Brand messaging framework"
      ]
    },
    {
      icon: BookOpen,
      title: "Visual Identity",
      description: "From logos to complete visual systems, we create distinctive designs that capture your brand's essence and resonate with your target market.",
      features: [
        "Logo design",
        "Brand guidelines",
        "Typography systems",
        "Color palette development",
        "Visual asset creation"
      ]
    },
    {
      icon: Globe,
      title: "Digital Presence",
      description: "We design and develop sustainable digital experiences that bring your brand to life online, from websites to social media presence.",
      features: [
        "Website design & development",
        "Social media strategy",
        "Digital marketing campaigns",
        "Content creation",
        "SEO optimization"
      ]
    },
    {
      icon: MessageSquare,
      title: "Public Relations",
      description: "Strategic PR campaigns that build brand awareness, manage reputation, and create meaningful media relationships to amplify your brand message.",
      features: [
        "Media relations",
        "Press release writing",
        "Crisis management",
        "Reputation monitoring",
        "Influencer partnerships"
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Our Services | BrandVelocity"
        description="Comprehensive brand strategy and design services including Brand Strategy, Visual Identity, Digital Presence, and Public Relations to help your business stand out."
        keywords="brand strategy services, visual identity design, digital presence, public relations, branding services"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              What We Do
            </h1>
            <p className="text-xl text-gray-300">
              We offer comprehensive brand strategy and design services to help your business stand out.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-gray-900/80 to-black border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 group overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <CardContent className="p-10">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-10 h-10 text-purple-400" />
                      </div>
                      <div className="absolute inset-0 bg-purple-400 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-gray-400">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href="/contact">
                      <Button 
                        variant="ghost" 
                        className="group/btn text-purple-400 hover:text-purple-300 p-0 mt-4"
                      >
                        Learn More 
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Brand?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how BrandVelocity can help your business achieve remarkable growth through strategic branding and design.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

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

