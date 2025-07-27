import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Paperclip, MoreVertical, Scale, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Lawgic, your AI Legal Assistant powered by ChainOpera's decentralized AI platform. I can help you with legal questions, document analysis, case law research, and provide comprehensive legal guidance. What legal question can I help you with today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      // Call Supabase Edge Function for ChainOpera AI
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { message: currentMessage }
      });

      if (error) {
        throw error;
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Show success toast
      toast({
        title: "Response from Lawgic",
        description: "Powered by ChainOpera's decentralized AI platform",
        duration: 3000,
      });

    } catch (error) {
      console.error('Error calling AI:', error);
      
      // Fallback response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thank you for your legal question: "${currentMessage}". I'm experiencing connectivity issues with the ChainOpera AI platform. Please try again in a moment, or feel free to ask another question.

As Lawgic, I'm designed to provide comprehensive legal guidance powered by ChainOpera's decentralized AI. Once connectivity is restored, I'll be able to give you detailed legal analysis and guidance.

**Disclaimer**: This is general legal information, not legal advice. For specific legal matters, please consult with a qualified attorney.`,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
      
      toast({
        title: "Connection Issue",
        description: "Please try again. Using fallback response for now.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div 
      className="flex flex-col h-screen max-h-[800px] glass-card shadow-multi border border-white/20 overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Chat Header */}
      <motion.div 
        className="flex items-center justify-between p-4 border-b border-white/20 bg-gradient-primary text-primary-foreground"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg floating-animation">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              Lawgic AI
              <Sparkles className="w-4 h-4 animate-pulse" />
            </h3>
            <p className="text-sm opacity-90">Powered by ChainOpera</p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 transition-all duration-300">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
              {message.role === "assistant" && (
                <Avatar className="w-8 h-8 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <motion.div
                className={`max-w-[80%] rounded-2xl px-4 py-3 transition-all duration-300 ${
                  message.role === "user"
                    ? "bg-gradient-primary text-primary-foreground ml-12 shadow-glow"
                    : "glass-card border border-white/30 shadow-card text-foreground"
                }`}
                whileHover={{ scale: 1.02 }}
                layout
              >
                <p className={`text-sm leading-relaxed whitespace-pre-wrap ${message.role === "user" ? "text-primary-foreground" : "text-foreground"}`}>
                  {message.content}
                </p>
                <span className={`text-xs mt-1 block ${message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {formatTime(message.timestamp)}
                </span>
              </motion.div>

              {message.role === "user" && (
                <Avatar className="w-8 h-8 bg-muted">
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div 
                className="flex gap-3 justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
              <Avatar className="w-8 h-8 bg-gradient-primary pulse-glow">
                <AvatarFallback className="bg-transparent text-primary-foreground">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="glass-card border border-white/30 rounded-2xl px-4 py-3">
                <div className="flex space-x-1 items-center">
                  <motion.div 
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                  <span className="text-xs text-muted-foreground ml-2">Lawgic is thinking...</span>
                </div>
              </div>
            </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <motion.div 
        className="p-4 border-t border-white/20 glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-all duration-300">
              <Paperclip className="w-5 h-5" />
            </Button>
          </motion.div>
          
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Lawgic any legal question..."
              className="pr-12 border-white/30 focus:border-primary bg-white/5 backdrop-blur-sm transition-all duration-300"
              disabled={isTyping}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-primary hover:shadow-multi transition-all duration-300 pulse-glow disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <motion.div 
          className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-3 h-3 text-accent" />
          </motion.div>
          <span>Powered by ChainOpera's decentralized AI • General legal information only</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ChatInterface;