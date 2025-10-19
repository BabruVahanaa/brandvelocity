import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Sparkles, Rocket, Zap, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface QuoteResult {
  tier: string;
  priceRange: string;
  timeline: string;
  features: string[];
  marketPrice: string;
  savings: string;
  score: number;
}

export default function VelocityAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  const questions = [
    {
      id: 1,
      question: "What type of website do you need?",
      icon: <Rocket className="w-6 h-6" />,
      options: [
        { text: "Simple Landing Page", score: 1, emoji: "🚀" },
        { text: "Multi-Page Website", score: 2, emoji: "🌐" },
        { text: "E-commerce Platform", score: 3, emoji: "🛒" },
        { text: "Custom Web Application", score: 4, emoji: "⚡" },
      ],
    },
    {
      id: 2,
      question: "How many pages do you need?",
      icon: <Zap className="w-6 h-6" />,
      options: [
        { text: "1-3 Pages", score: 1, emoji: "📄" },
        { text: "4-7 Pages", score: 2, emoji: "📚" },
        { text: "8-15 Pages", score: 3, emoji: "📖" },
        { text: "15+ Pages", score: 4, emoji: "📕" },
      ],
    },
    {
      id: 3,
      question: "What features do you need?",
      icon: <Sparkles className="w-6 h-6" />,
      options: [
        { text: "Contact Form Only", score: 1, emoji: "✉️" },
        { text: "Blog + Contact", score: 2, emoji: "✍️" },
        { text: "User Accounts + Database", score: 3, emoji: "👥" },
        { text: "Advanced Integrations", score: 4, emoji: "🔗" },
      ],
    },
    {
      id: 4,
      question: "Design complexity level?",
      icon: <Sparkles className="w-6 h-6" />,
      options: [
        { text: "Clean & Minimal", score: 1, emoji: "✨" },
        { text: "Modern & Stylish", score: 2, emoji: "🎨" },
        { text: "Custom Animations", score: 3, emoji: "🎭" },
        { text: "Cutting-Edge Interactive", score: 4, emoji: "🌟" },
      ],
    },
    {
      id: 5,
      question: "Content & SEO requirements?",
      icon: <Rocket className="w-6 h-6" />,
      options: [
        { text: "You Provide Content", score: 1, emoji: "📝" },
        { text: "Help with Copywriting", score: 2, emoji: "✏️" },
        { text: "Full SEO Package", score: 3, emoji: "📈" },
        { text: "Complete Content Strategy", score: 4, emoji: "🎯" },
      ],
    },
  ];

  const calculateQuote = (totalScore: number): QuoteResult => {
    let tier = "";
    let priceRange = "";
    let timeline = "";
    let features: string[] = [];
    let marketPrice = "";
    let savings = "";

    if (totalScore <= 8) {
      tier = "Starter Package";
      // More granular pricing for starter
      let basePrice = 250;
      let topPrice = 250;
      
      if (totalScore <= 5) {
        basePrice = 250;
        topPrice = 300;
        timeline = "3-7 days";
      } else if (totalScore <= 6) {
        basePrice = 280;
        topPrice = 350;
        timeline = "5-10 days";
      } else if (totalScore <= 7) {
        basePrice = 320;
        topPrice = 400;
        timeline = "7-14 days";
      } else {
        basePrice = 380;
        topPrice = 450;
        timeline = "10-17 days";
      }
      
      priceRange = `£${basePrice}-£${topPrice}`;
      marketPrice = `£${Math.round(topPrice * 1.35)}-£${Math.round(topPrice * 1.5)}`;
      savings = `£${Math.round(topPrice * 0.35)}-£${Math.round(topPrice * 0.5)}`;
      features = [
        "Responsive Design",
        "Mobile Optimized",
        "Contact Form",
        "Basic SEO Setup",
        "Fast Loading Speed",
        "Social Media Links",
      ];
    } else if (totalScore <= 14) {
      tier = "Professional Package";
      // More granular pricing for professional
      let basePrice = 450;
      let topPrice = 450;
      
      if (totalScore <= 10) {
        basePrice = 450;
        topPrice = 580;
        timeline = "2-3 weeks";
      } else if (totalScore <= 12) {
        basePrice = 550;
        topPrice = 720;
        timeline = "2.5-3.5 weeks";
      } else {
        basePrice = 680;
        topPrice = 890;
        timeline = "3-4 weeks";
      }
      
      priceRange = `£${basePrice}-£${topPrice}`;
      marketPrice = `£${Math.round(topPrice * 1.35)}-£${Math.round(topPrice * 1.5)}`;
      savings = `£${Math.round(topPrice * 0.35)}-£${Math.round(topPrice * 0.5)}`;
      features = [
        "Everything in Starter",
        "Advanced Animations",
        "Blog Integration",
        "SEO Optimization",
        "Content Management System",
        "Analytics Integration",
        "Email Marketing Setup",
        "Social Media Integration",
      ];
    } else {
      tier = "Enterprise Package";
      const basePrice = 890;
      const extraComplexity = (totalScore - 14) * 120;
      const topPrice = basePrice + extraComplexity;
      
      priceRange = `£${basePrice}-£${topPrice}+`;
      timeline = "4-7 weeks";
      marketPrice = `£${Math.round(topPrice * 1.4)}-£${Math.round(topPrice * 1.6)}+`;
      savings = `£${Math.round(topPrice * 0.4)}-£${Math.round(topPrice * 0.6)}+`;
      features = [
        "Everything in Professional",
        "Custom Web Application",
        "Database Architecture",
        "User Authentication",
        "API Integrations",
        "Advanced SEO Strategy",
        "Performance Optimization",
        "Security Features",
        "Ongoing Support",
        "Training & Documentation",
      ];
    }

    return { tier, priceRange, timeline, features, marketPrice, savings, score: totalScore };
  };

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = newAnswers.reduce((a, b) => a + b, 0);
      setResult(calculateQuote(totalScore));
    }
  };

  const generatePDF = () => {
    if (!result || !email) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Black background for entire page
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    
    // Top contact bar - green background
    doc.setFillColor(26, 188, 156);
    doc.rect(0, 0, pageWidth, 15, "F");
    
    // Contact info in top bar
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text("connect@brandvelocity.co.uk", 15, 10);
    doc.text("07426 877552", pageWidth / 2, 10, { align: "center" });
    doc.text("Plymouth, Devon, UK", pageWidth - 15, 10, { align: "right" });
    
    // Logo
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 188, 156);
    doc.text("Brand", 20, 30);
    doc.setTextColor(255, 255, 255);
    doc.text("Velocity", 47, 30);
    
    // Main heading
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("We Build", 20, 50);
    
    // Gradient text effect simulation with pink/purple
    doc.setTextColor(232, 121, 249);
    doc.text("Brands That Matter", 20, 62);
    
    // Subtitle
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 200, 200);
    doc.text("Strategic brand development and design that connects with your", 20, 71);
    doc.text("audience and drives sustainable business results.", 20, 78);
    
    // Decorative line
    doc.setDrawColor(26, 188, 156);
    doc.setLineWidth(0.5);
    doc.line(20, 85, pageWidth - 20, 85);
    
    // Client info
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 188, 156);
    doc.text("PREPARED FOR:", 20, 95);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text(userName || email, 20, 103);
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }), 20, 110);
    
    // Package tier box
    doc.setFillColor(26, 188, 156, 30);
    doc.setDrawColor(26, 188, 156);
    doc.setLineWidth(0.3);
    doc.roundedRect(20, 118, pageWidth - 40, 28, 3, 3, "FD");
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 188, 156);
    doc.text("YOUR PACKAGE", 25, 126);
    
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text(result.tier, 25, 136);
    
    // Pricing
    doc.setFontSize(10);
    doc.setTextColor(26, 188, 156);
    doc.text("INVESTMENT", 20, 156);
    
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(result.priceRange, 20, 167);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text(`Timeline: ${result.timeline}`, 20, 175);
    
    // Market comparison box
    doc.setFillColor(26, 188, 156, 20);
    doc.setDrawColor(26, 188, 156);
    doc.roundedRect(20, 183, pageWidth - 40, 32, 3, 3, "FD");
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 188, 156);
    doc.text("MARKET COMPARISON", 25, 191);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text(`Average Market Price: `, 25, 199);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "normal");
    const strikeText = result.marketPrice;
    doc.text(strikeText, 75, 199);
    doc.setLineWidth(0.3);
    doc.setDrawColor(150, 150, 150);
    doc.line(75, 198, 75 + doc.getTextWidth(strikeText), 198);
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 188, 156);
    doc.setFontSize(11);
    doc.text(`You Save: ${result.savings}`, 25, 207);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("✨ 30-40% more affordable than market average!", 25, 213);
    
    // Features
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 188, 156);
    doc.text("WHAT'S INCLUDED", 20, 228);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    let yPos = 236;
    result.features.forEach((feature) => {
      if (yPos > 270) {
        // Add new page with black background
        doc.addPage();
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, pageWidth, pageHeight, "F");
        yPos = 20;
      }
      doc.setFillColor(26, 188, 156);
      doc.circle(23, yPos - 1.5, 0.8, "F");
      doc.setTextColor(200, 200, 200);
      doc.text(feature, 27, yPos);
      yPos += 6;
    });
    
    // Why choose us section
    if (yPos > 220) {
      doc.addPage();
      doc.setFillColor(0, 0, 0);
      doc.rect(0, 0, pageWidth, pageHeight, "F");
      yPos = 20;
    } else {
      yPos += 8;
    }
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 188, 156);
    doc.text("WHY CHOOSE BRANDVELOCITY?", 20, yPos);
    yPos += 8;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    const benefits = [
      "30-40% more affordable than market average",
      "Complete branding services under one roof",
      "From website to full brand identity",
      "SEO optimization for Devon & Cornwall markets",
      "Ongoing support and maintenance",
      "Fast turnaround times",
      "Trusted by young entrepreneurs",
    ];
    
    benefits.forEach((benefit) => {
      if (yPos > 270) {
        doc.addPage();
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, pageWidth, pageHeight, "F");
        yPos = 20;
      }
      doc.setFillColor(26, 188, 156);
      doc.circle(23, yPos - 1.5, 0.8, "F");
      doc.setTextColor(200, 200, 200);
      doc.text(benefit, 27, yPos);
      yPos += 6;
    });
    
    // Footer CTA box
    const finalY = pageHeight - 35;
    doc.setFillColor(26, 188, 156);
    doc.roundedRect(20, finalY, pageWidth - 40, 25, 3, 3, "F");
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Ready to Build Your Brand?", pageWidth / 2, finalY + 10, { align: "center" });
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Contact us: connect@brandvelocity.co.uk | 07426 877552 | Plymouth, Devon, UK", pageWidth / 2, finalY + 18, { align: "center" });
    
    // Copyright
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`© ${new Date().getFullYear()} BrandVelocity. All rights reserved.`, pageWidth / 2, pageHeight - 5, { align: "center" });
    
    // Save PDF
    doc.save(`BrandVelocity-Quote-${userName || 'Client'}.pdf`);
    
    toast.success("Quote saved and PDF downloaded!");
    
    // Reset form
    setTimeout(() => {
      setShowEmailForm(false);
      setEmail("");
      setUserName("");
      setIsOpen(false);
      setCurrentQuestion(0);
      setAnswers([]);
      setResult(null);
    }, 1000);
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setShowEmailForm(false);
    setEmail("");
    setUserName("");
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        data-velocity-ai-trigger
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-gradient-to-r from-[#1abc9c] to-[#16a085] hover:from-[#16a085] hover:to-[#1abc9c] text-white shadow-2xl shadow-[#1abc9c]/60 px-4 py-4 md:px-6 md:py-6 text-sm md:text-base font-semibold rounded-full group animate-bounce"
      >
        <Sparkles className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
        Velocity AI - Get Quote
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black border-[#1abc9c]/30 max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1abc9c] to-[#16a085] rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Velocity AI</h2>
                      <p className="text-sm text-gray-400">BrandVelocity Price Calculator</p>
                    </div>
                  </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {!result && !showEmailForm && (
                <>
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <span className="text-sm text-[#1abc9c] font-semibold">
                        {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#1abc9c] to-[#16a085] transition-all duration-500"
                        style={{
                          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#1abc9c]/20 rounded-full flex items-center justify-center">
                        {questions[currentQuestion].icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {questions[currentQuestion].question}
                      </h3>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 gap-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option.score)}
                          className="group relative p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg hover:border-[#1abc9c] hover:from-[#1abc9c]/10 hover:to-[#16a085]/10 transition-all duration-300 text-left"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{option.emoji}</span>
                            <span className="text-white font-medium group-hover:text-[#1abc9c] transition-colors">
                              {option.text}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {result && !showEmailForm && (
                <div className="space-y-6">
                  {/* Result Header */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1abc9c]/20 to-[#16a085]/20 px-6 py-3 rounded-full border border-[#1abc9c]/30 mb-4">
                      <Rocket className="w-5 h-5 text-[#1abc9c]" />
                      <span className="text-[#1abc9c] font-semibold">BrandVelocity Price</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{result.tier}</h3>
                    <p className="text-4xl font-bold text-[#1abc9c] mb-2">{result.priceRange}</p>
                    <p className="text-gray-400">Timeline: {result.timeline}</p>
                  </div>

                  {/* Market Comparison */}
                  <div className="bg-gradient-to-r from-[#1abc9c]/10 to-[#16a085]/10 border border-[#1abc9c]/30 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#1abc9c]" />
                      Market Comparison
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Average Market Price:</span>
                        <span className="text-white font-semibold line-through">{result.marketPrice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Your Investment:</span>
                        <span className="text-[#1abc9c] font-bold text-xl">{result.priceRange}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-[#1abc9c]/20">
                        <span className="text-white font-semibold">You Save:</span>
                        <span className="text-[#1abc9c] font-bold text-xl">{result.savings}</span>
                      </div>
                      <p className="text-sm text-[#1abc9c] text-center pt-2">
                        ✨ 30-40% more affordable than market average!
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">What's Included:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {result.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-300">
                          <div className="w-1.5 h-1.5 bg-[#1abc9c] rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why Choose Us */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Why Choose BrandVelocity?</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>✓ Complete branding services under one roof</li>
                      <li>✓ From website to full brand identity</li>
                      <li>✓ SEO optimized for Devon & Cornwall markets</li>
                      <li>✓ Trusted by young entrepreneurs</li>
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowEmailForm(true)}
                      className="flex-1 bg-gradient-to-r from-[#1abc9c] to-[#16a085] hover:from-[#16a085] hover:to-[#1abc9c] text-white"
                    >
                      <Download className="mr-2 w-4 h-4" />
                      Download Full Report
                    </Button>
                    <Button
                      onClick={reset}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Start Over
                    </Button>
                  </div>
                </div>
              )}

              {showEmailForm && result && (
                <div className="space-y-6">
                  <div className="text-center">
                    <Download className="w-16 h-16 text-[#1abc9c] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Get Your Detailed Quote</h3>
                    <p className="text-gray-400">
                      Enter your details to download a comprehensive PDF report
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Your Name</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={generatePDF}
                      disabled={!email}
                      className="flex-1 bg-gradient-to-r from-[#1abc9c] to-[#16a085] hover:from-[#16a085] hover:to-[#1abc9c] text-white disabled:opacity-50"
                    >
                      <Download className="mr-2 w-4 h-4" />
                      Download PDF Report
                    </Button>
                    <Button
                      onClick={() => setShowEmailForm(false)}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Back
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    We respect your privacy. Your email will only be used to send you the quote and occasional updates.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

