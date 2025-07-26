import { ArrowRight, Scale, Shield, Zap, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-secondary">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">ChainOpera AI Hackathon Winner</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            AI Legal Assistant
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl">Powered by Blockchain</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Get affordable legal advice instantly. Our decentralized AI analyzes vast legal documents 
            and precedents to provide accurate, accessible legal assistance for everyone.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary shadow-glow hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Legal Chat
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6"
            >
              <Scale className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 border-border/50">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Decentralized & Secure</h3>
              <p className="text-muted-foreground text-sm">
                Built on blockchain technology ensuring privacy, security, and transparent legal advice.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 border-border/50">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Responses</h3>
              <p className="text-muted-foreground text-sm">
                Get immediate legal advice powered by advanced AI trained on millions of legal documents.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 border-border/50">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Affordable Justice</h3>
              <p className="text-muted-foreground text-sm">
                Making legal advice accessible to everyone with transparent, affordable pricing.
              </p>
            </Card>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1M+</div>
              <div className="text-sm text-muted-foreground">Legal Documents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">$10</div>
              <div className="text-sm text-muted-foreground">Starting Price</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;