import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  FileText, 
  Search, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Scale,
  Brain,
  Globe,
  DollarSign,
  Sparkles
} from "lucide-react";
import Navbar from "./Navbar";
import ChatGPTInterface from "./ChatGPTInterface";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to consult page with search query as state
      navigate('/consult', { state: { initialMessage: searchQuery.trim() } });
    } else {
      navigate('/consult');
    }
  };

  const handleChatNow = () => {
    navigate('/consult');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Prominent Chat */}
      <section className="pt-20 pb-10 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30 floating-animation"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="text-primary-foreground slide-up">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white/20 p-2 rounded-lg pulse-glow">
                  <Scale className="w-8 h-8" />
                </div>
                <span className="text-2xl font-bold">Lawgic</span>
                <Sparkles className="w-6 h-6 text-accent animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                AI Legal Assistant
                <span className="block text-accent">Powered by TensorOpera</span>
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
                Get instant legal guidance through Gemini 2.0 Flash. Analyze documents, research case law, and receive comprehensive legal assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleChatNow}
                  className="bg-white/20 text-primary-foreground hover:bg-white/30 backdrop-blur-md border border-white/30 shadow-multi transition-all duration-300"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/30 text-primary hover:bg-white/10 backdrop-blur-md"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Side - Search Bar */}
            <div className="fade-in-scale">
              <div className="glass-card p-8 rounded-2xl shadow-multi bg-white/10 backdrop-blur-md border border-white/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                    Ask Your Legal Question
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Get instant answers from our AI legal assistant
                  </p>
                </div>
                
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="e.g., What should I know about employment contracts?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-14 pl-4 pr-12 text-base bg-white/90 border-white/30 focus:border-white/50 rounded-xl shadow-lg placeholder:text-gray-500"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-2 top-2 h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-lg transition-all duration-200"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => setSearchQuery("Tell me about Article 350 in Indian law")}
                      className="text-left p-3 rounded-lg bg-white/20 hover:bg-white/30 text-primary-foreground text-sm transition-all duration-200 border border-white/20 hover:border-white/40"
                    >
                      📜 Tell me about Article 350 in Indian law
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("What are the essential elements of a contract?")}
                      className="text-left p-3 rounded-lg bg-white/20 hover:bg-white/30 text-primary-foreground text-sm transition-all duration-200 border border-white/20 hover:border-white/40"
                    >
                      📋 What are the essential elements of a contract?
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("Explain employment law in India")}
                      className="text-left p-3 rounded-lg bg-white/20 hover:bg-white/30 text-primary-foreground text-sm transition-all duration-200 border border-white/20 hover:border-white/40"
                    >
                      💼 Explain employment law in India
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <Button
                    onClick={handleChatNow}
                    variant="outline"
                    className="border-white/30 text-primary hover:bg-white/20 backdrop-blur-md"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Start Full Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 bg-gradient-glass opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Powerful Lawgic Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              TensorOpera's Gemini 2.0 Flash powers comprehensive legal assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Intelligent Legal Chat",
                description: "Engage in natural conversations about legal matters with our AI trained on extensive legal databases."
              },
              {
                icon: FileText,
                title: "Document Analysis",
                description: "Upload and analyze legal documents for insights, risks, and recommendations."
              },
              {
                icon: Search,
                title: "Legal Research",
                description: "Access millions of legal precedents and case studies instantly."
              },
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your conversations and documents are encrypted and stored securely on blockchain."
              },
              {
                icon: Zap,
                title: "Instant Responses",
                description: "Get legal guidance in seconds, not days or weeks."
              },
              {
                icon: DollarSign,
                title: "Decentralized AI",
                description: "Powered by TensorOpera's AI technology for transparent, secure legal assistance."
              }
            ].map((feature, index) => (
              <Card key={index} className="glass-card shadow-multi hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2 glow-effect slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-gradient-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 pulse-glow">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">How Lawgic Works</h2>
            <p className="text-xl text-muted-foreground">Decentralized AI legal assistance in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Ask Your Question",
                description: "Type your legal question in natural language. Our AI understands context and nuance.",
                icon: MessageSquare
              },
              {
                step: "02",
                title: "TensorOpera AI Analysis",
                description: "Our Gemini 2.0 Flash model analyzes vast legal databases using advanced AI technology.",
                icon: Brain
              },
              {
                step: "03",
                title: "Get Guidance",
                description: "Receive clear, actionable legal guidance with references to relevant laws and precedents.",
                icon: Scale
              }
            ].map((step, index) => (
              <div key={index} className="text-center slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-multi pulse-glow floating-animation">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">{step.step}</div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Legal Areas We Cover</h2>
            <p className="text-xl text-muted-foreground">Comprehensive legal assistance across multiple practice areas</p>
          </div>

          <Tabs defaultValue="business" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="business">Business Law</TabsTrigger>
              <TabsTrigger value="personal">Personal Law</TabsTrigger>
              <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
              <TabsTrigger value="intellectual">IP Law</TabsTrigger>
            </TabsList>
            
            <TabsContent value="business" className="mt-8">
              <Card className="glass-card shadow-glow">
                <h3 className="text-2xl font-bold mb-4">Business & Corporate Law</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Contract review and drafting",
                    "Business formation guidance",
                    "Employment law questions",
                    "Compliance requirements",
                    "Partnership agreements",
                    "Merger & acquisition basics"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="personal" className="mt-8">
              <Card className="glass-card shadow-glow">
                <h3 className="text-2xl font-bold mb-4">Personal Legal Matters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Family law guidance",
                    "Estate planning basics",
                    "Personal injury claims",
                    "Consumer rights",
                    "Immigration questions",
                    "Criminal law information"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="real-estate" className="mt-8">
              <Card className="glass-card shadow-glow">
                <h3 className="text-2xl font-bold mb-4">Real Estate Law</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Property purchase guidance",
                    "Lease agreement review",
                    "Landlord-tenant disputes",
                    "Zoning regulations",
                    "Property rights",
                    "Title issues"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="intellectual" className="mt-8">
              <Card className="glass-card shadow-glow">
                <h3 className="text-2xl font-bold mb-4">Intellectual Property</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Trademark applications",
                    "Copyright guidance",
                    "Patent basics",
                    "Trade secrets",
                    "Licensing agreements",
                    "IP infringement"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="glass-card bg-gradient-primary rounded-3xl p-12 shadow-multi text-primary-foreground slide-up glow-effect">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Experience Lawgic?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the legal revolution powered by TensorOpera's Gemini 2.0 Flash
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setShowFullChat(true)}
                className="bg-white/20 text-primary-foreground hover:bg-white/30 text-xl px-12 py-6 backdrop-blur-md border border-white/30 pulse-glow"
              >
                <MessageSquare className="w-6 h-6 mr-3" />
                Start Legal Chat
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-primary hover:bg-white/10 text-xl px-12 py-6 backdrop-blur-md"
              >
                <Scale className="w-6 h-6 mr-2" />
                Explore Platform
              </Button>
            </div>
            <div className="mt-6 text-sm opacity-75 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Powered by TensorOpera • Gemini 2.0 Flash • Secure • Instant
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-primary text-primary-foreground py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="slide-up">
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-6 h-6 floating-animation" />
                <span className="text-xl font-bold">Lawgic</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <p className="opacity-90">
                Revolutionizing legal assistance through TensorOpera's Gemini 2.0 Flash AI platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 opacity-90">
                <li><a href="#" className="hover:opacity-100">Features</a></li>
                <li><a href="#" className="hover:opacity-100">Pricing</a></li>
                <li><a href="#" className="hover:opacity-100">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 opacity-90">
                <li><a href="#" className="hover:opacity-100">About</a></li>
                <li><a href="#" className="hover:opacity-100">Careers</a></li>
                <li><a href="#" className="hover:opacity-100">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 opacity-90">
                <li><a href="#" className="hover:opacity-100">Privacy</a></li>
                <li><a href="#" className="hover:opacity-100">Terms</a></li>
                <li><a href="#" className="hover:opacity-100">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center opacity-75">
            <p>&copy; 2025 Lawgic. Built for TensorOpera AI Hackathon. Powered by Gemini 2.0 Flash.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;