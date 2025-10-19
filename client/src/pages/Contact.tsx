import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/nebula-hero.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"></div>
      </div>

      <Navigation />

      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-20 space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold">
              Ready to Build Your Brand?
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let's discuss your project and explore how we can help you create a sustainable brand that stands out and drives lasting results.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Get in Touch
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">Email Us</h3>
                        <p className="text-[#1abc9c] font-semibold">connect@brandvelocity.co.uk</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">Call Us</h3>
                        <p className="text-[#1abc9c] font-semibold">07426 877552</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">Visit Us</h3>
                        <p className="text-gray-400">Plymouth, Devon, UK</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/galaxy-swirl.jpg')] bg-cover bg-center opacity-20"></div>
                <CardContent className="relative p-8 space-y-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Ready to Launch?
                  </h3>
                  <p className="text-white/90">
                    Schedule a free consultation to discuss your project and discover how
                    we can accelerate your brand's growth.
                  </p>
                  <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                    Book a Call
                  </Button>
                </cardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Office Hours</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-purple-400">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-purple-400">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-gray-500">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
