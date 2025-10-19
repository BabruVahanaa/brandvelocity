import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getBlogPostBySlug, getRecentPosts } from "@/data/blogPosts";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const post = params?.slug ? getBlogPostBySlug(params.slug) : undefined;
  const recentPosts = getRecentPosts(3).filter(p => p.slug !== params?.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.keywords.join(", ")}
        ogImage={post.image}
        ogType="article"
        canonicalUrl={`https://brandvelocity.co.uk/blog/${post.slug}`}
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
        </div>
        
        <div className="container relative z-10">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 text-purple-400 hover:text-purple-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          
          <div className="max-w-4xl">
            <span className="px-4 py-2 bg-purple-600/80 backdrop-blur-sm rounded-full text-sm font-semibold inline-block mb-6">
              {post.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="prose prose-invert prose-lg max-w-none prose-headings:text-purple-300 prose-a:text-purple-400 prose-strong:text-white prose-code:text-pink-400">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </article>
              
              {/* Keywords */}
              <div className="mt-12 pt-8 border-t border-gray-800">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">TOPICS</h3>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* CTA */}
              <Card className="mt-12 bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30 p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Brand?</h3>
                <p className="text-gray-300 mb-6">
                  Let BrandVelocity help your Devon or Cornwall business achieve remarkable growth through strategic branding and marketing.
                </p>
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Get in Touch
                  </Button>
                </Link>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold mb-6">Recent Posts</h3>
                <div className="space-y-6">
                  {recentPosts.map((recentPost) => (
                    <Link key={recentPost.id} href={`/blog/${recentPost.slug}`}>
                      <Card className="bg-gradient-to-br from-gray-900 to-black border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group overflow-hidden cursor-pointer">
                        <div className="relative h-32 overflow-hidden">
                          <img 
                            src={recentPost.image} 
                            alt={recentPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                            {recentPost.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(recentPost.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
                
                <Link href="/blog">
                  <Button variant="outline" className="w-full mt-6 border-purple-500/30 hover:border-purple-500/60">
                    View All Posts
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

