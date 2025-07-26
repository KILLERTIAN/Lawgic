import { Scale, Sparkles, Users, Globe, Shield, Zap, Award, Target, Heart, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-primary-foreground slide-up">
            <div className="flex justify-center mb-6">
              <div className="glass-card bg-white/10 p-4 rounded-2xl floating-animation">
                <Scale className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Lawgic
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing legal assistance through ChainOpera's decentralized AI platform
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Lawgic is democratizing access to legal knowledge by leveraging ChainOpera's cutting-edge 
                decentralized AI platform. We believe that everyone deserves affordable, accurate, and 
                accessible legal guidance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Built for the ChainOpera AI Hackathon, Lawgic represents the future of legal technology - 
                where blockchain meets artificial intelligence to create transparent, secure, and powerful 
                legal assistance tools.
              </p>
              <div className="flex gap-4">
                <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <Target className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Heart className="w-4 h-4 mr-2" />
                  Join Mission
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="glass-card p-8 glow-effect fade-in-scale">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-primary/10 p-4 rounded-xl mb-4 mx-auto w-fit">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold">10,000+</h3>
                    <p className="text-sm text-muted-foreground">Users Served</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-accent/10 p-4 rounded-xl mb-4 mx-auto w-fit">
                      <Globe className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold">50+</h3>
                    <p className="text-sm text-muted-foreground">Jurisdictions</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 p-4 rounded-xl mb-4 mx-auto w-fit">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold">99.9%</h3>
                    <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-accent/10 p-4 rounded-xl mb-4 mx-auto w-fit">
                      <Zap className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold">&lt;2s</h3>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Powered by ChainOpera
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built on the world's first decentralized AI platform, ensuring transparency, security, and unprecedented performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "Decentralized AI",
                description: "Powered by ChainOpera's distributed AI network for unmatched performance and reliability",
                color: "primary"
              },
              {
                icon: Shield,
                title: "Blockchain Security",
                description: "Your legal queries are secured using advanced blockchain technology and cryptographic protection",
                color: "accent"
              },
              {
                icon: Globe,
                title: "Global Knowledge",
                description: "Access to comprehensive legal databases spanning multiple jurisdictions and legal systems",
                color: "primary"
              }
            ].map((tech, index) => (
              <Card key={index} className="glass-card hover:shadow-glow transition-all duration-300 glow-effect slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`bg-${tech.color}/10 p-3 rounded-xl mb-4 w-fit`}>
                  <tech.icon className={`w-8 h-8 text-${tech.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{tech.title}</h3>
                <p className="text-muted-foreground">{tech.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your legal matters remain confidential with our zero-knowledge architecture"
              },
              {
                icon: Users,
                title: "Accessibility",
                description: "Making legal guidance available to everyone, regardless of economic status"
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Delivering the highest quality legal information and guidance"
              },
              {
                icon: Sparkles,
                title: "Innovation",
                description: "Continuously pushing the boundaries of legal technology"
              }
            ].map((value, index) => (
              <div key={index} className="text-center slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="glass-card bg-gradient-glass p-6 rounded-2xl mb-4 glow-effect">
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hackathon Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ChainOpera AI Hackathon
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Lawgic was created for the ChainOpera AI Hackathon, competing for the $10,000 prize pool 
              while showcasing the future of decentralized AI in legal technology.
            </p>
            <div className="glass-card bg-white/10 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4">Hackathon Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2">🚀 Innovation</h4>
                  <p className="text-sm opacity-90">Demonstrate cutting-edge AI agent capabilities</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🌍 Impact</h4>
                  <p className="text-sm opacity-90">Solve real-world legal accessibility problems</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🔗 Decentralization</h4>
                  <p className="text-sm opacity-90">Leverage blockchain for transparent AI</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💡 Excellence</h4>
                  <p className="text-sm opacity-90">Push the boundaries of legal technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Lawgic?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the legal revolution powered by ChainOpera's decentralized AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-multi transition-all duration-300 pulse-glow">
                <Scale className="w-5 h-5 mr-2" />
                Start Legal Chat
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Globe className="w-5 h-5 mr-2" />
                Explore Platform
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;