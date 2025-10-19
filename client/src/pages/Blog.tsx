import { Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

export default function Blog() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Marketing & Branding Insights Blog | Devon & Cornwall"
        description="Expert insights on branding, marketing, and digital strategy for businesses in Devon and Cornwall. Tips, guides, and success stories from BrandVelocity."
        keywords="marketing blog Devon, branding blog Cornwall, digital marketing insights, SEO tips Devon, marketing strategies"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Marketing Insights
            </h1>
            <p className="text-xl text-gray-300">
              Expert strategies, tips, and insights for Devon and Cornwall businesses looking to elevate their branding and marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card 
                key={post.id}
                className="bg-gradient-to-br from-gray-900 to-black border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group overflow-hidden"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <Button 
                      variant="ghost" 
                      className="group/btn text-purple-400 hover:text-purple-300 p-0"
                    >
                      Read More 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how BrandVelocity can help your Devon or Cornwall business achieve remarkable growth through strategic branding and marketing.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Get in Touch
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

