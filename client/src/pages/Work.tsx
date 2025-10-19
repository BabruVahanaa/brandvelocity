import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "MorningCooks.co.uk",
    category: "Full Digital Solution",
    description: "End-to-end digital transformation including website design, SEO optimization, social media strategy, and comprehensive branding for a culinary business.",
    services: ["Website Design", "SEO Optimization", "Social Media Marketing", "Branding", "Content Strategy"],
    image: "/morningcooks-cover.png",
    link: "https://morningcooks.co.uk",
    results: [
      "Modern, responsive website",
      "Improved search rankings",
      "Active social media presence",
      "Cohesive brand identity",
    ],
  },
  {
    id: 2,
    title: "Protribe.io",
    category: "Branding & Content Creation",
    description: "Complete brand identity and content strategy for a modern digital platform. We developed a cohesive visual language and compelling content that resonates with their target audience.",
    services: ["Brand Strategy", "Visual Identity", "Content Creation", "Brand Guidelines"],
    image: "/protribe-cover.png",
    link: "https://protribe.io",
    results: [
      "Established strong brand presence",
      "Consistent content strategy",
      "Enhanced audience engagement",
    ],
  },
];

export default function Work() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Our Work - BrandVelocity Portfolio"
        description="Explore our portfolio of successful branding, web design, and digital marketing projects including Protribe.io and MorningCooks.co.uk"
        keywords="portfolio, case studies, branding projects, web design Devon, digital marketing Cornwall"
      />

      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/nebula-hero.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>
      </div>

      <Navigation />

      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1abc9c]/20 to-purple-500/20 px-6 py-3 rounded-full border border-[#1abc9c]/30 mb-6">
              <Sparkles className="w-5 h-5 text-[#1abc9c]" />
              <span className="text-[#1abc9c] font-semibold">Our Portfolio</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold">
              Our <span className="text-[#1abc9c]">Work</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how we've helped businesses build authentic, memorable brands that create lasting connections with their audiences.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="max-w-6xl mx-auto space-y-16">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#1abc9c]/20 backdrop-blur-sm overflow-hidden group hover:border-[#1abc9c]/50 transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Image */}
                    <div className={`relative h-80 lg:h-auto overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1abc9c]/20 to-purple-500/20 mix-blend-overlay"></div>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="inline-block px-4 py-2 bg-[#1abc9c]/10 border border-[#1abc9c]/30 rounded-full text-[#1abc9c] text-sm font-semibold mb-4 w-fit">
                        {project.category}
                      </div>
                      
                      <h2 className="text-4xl font-bold mb-4 group-hover:text-[#1abc9c] transition-colors">
                        {project.title}
                      </h2>
                      
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Services */}
                      <div className="mb-6">
                        <h3 className="text-white font-semibold mb-3">Services Provided:</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Results */}
                      <div className="mb-6">
                        <h3 className="text-white font-semibold mb-3">Key Results:</h3>
                        <ul className="space-y-2">
                          {project.results.map((result, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-300">
                              <div className="w-1.5 h-1.5 bg-[#1abc9c] rounded-full"></div>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button className="bg-gradient-to-r from-[#1abc9c] to-[#16a085] hover:from-[#16a085] hover:to-[#1abc9c] text-white group/btn">
                          Visit Website
                          <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <Card className="bg-gradient-to-r from-[#1abc9c]/10 to-purple-500/10 border-[#1abc9c]/30 max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h2 className="text-4xl font-bold mb-4">
                  Ready to Build Your Brand?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's create something extraordinary together. Get in touch to discuss your project.
                </p>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  size="lg"
                  className="bg-gradient-to-r from-[#1abc9c] to-[#16a085] hover:from-[#16a085] hover:to-[#1abc9c] text-white px-8 py-6 text-lg"
                >
                  Start Your Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

