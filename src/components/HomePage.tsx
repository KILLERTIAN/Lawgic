import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  FileText, 
  Search, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Scale,
  Brain,
  Globe,
  DollarSign
} from "lucide-react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ChatInterface from "./ChatInterface";

const HomePage = () => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto p-4 pt-8">
          <div className="mb-4">
            <Button
              variant="outline"
              onClick={() => setShowChat(false)}
              className="mb-4"
            >
              ← Back to Home
            </Button>
          </div>
          <ChatInterface />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Powerful Legal AI Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our advanced AI leverages blockchain technology to provide comprehensive legal assistance
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
                title: "Affordable Access",
                description: "Legal advice starting at $10 - making justice accessible to everyone."
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How LexiAssist Works</h2>
            <p className="text-xl text-muted-foreground">Simple, secure, and powerful legal assistance in three steps</p>
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
                title: "AI Analysis",
                description: "Our blockchain-powered AI analyzes millions of legal documents to find relevant information.",
                icon: Brain
              },
              {
                step: "03",
                title: "Get Guidance",
                description: "Receive clear, actionable legal guidance with references to relevant laws and precedents.",
                icon: Scale
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{step.step}</div>
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
              <Card className="p-8 bg-gradient-card">
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
              <Card className="p-8 bg-gradient-card">
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
              <Card className="p-8 bg-gradient-card">
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
              <Card className="p-8 bg-gradient-card">
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
          <div className="bg-gradient-primary rounded-3xl p-12 shadow-glow text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Get Legal Help?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who trust LexiAssist for their legal questions
            </p>
            <Button
              size="lg"
              onClick={() => setShowChat(true)}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-xl px-12 py-6 shadow-xl"
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              Start Your Legal Chat Now
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <div className="mt-6 text-sm opacity-75">
              No credit card required • Instant responses • Secure & confidential
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-6 h-6" />
                <span className="text-xl font-bold">LexiAssist AI</span>
              </div>
              <p className="opacity-90">
                Making legal advice accessible through blockchain-powered AI.
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
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center opacity-75">
            <p>&copy; 2024 LexiAssist AI. Built for ChainOpera AI Hackathon.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;