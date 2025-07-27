import { useState } from "react";
import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import ChatGPTInterface from "@/components/ChatGPTInterface";

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const ConsultPage = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Contract Review Question",
      lastMessage: "What should I look for when reviewing an employment contract?",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: "2", 
      title: "Business Formation",
      lastMessage: "What are the differences between LLC and Corporation?",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
    },
  ]);
  
  const [activeChatId, setActiveChatId] = useState<string>("new");

  const createNewChat = () => {
    setActiveChatId("new");
  };

  const deleteChat = (chatId: string) => {
    setChatSessions(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChatId === chatId) {
      setActiveChatId("new");
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.div 
        className="w-80 bg-muted/30 border-r border-border flex flex-col"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <Button 
            onClick={createNewChat}
            className="w-full justify-start gap-2 bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        {/* Chat Sessions */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {chatSessions.map((chat) => (
              <motion.div
                key={chat.id}
                className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeChatId === chat.id 
                    ? "bg-primary/10 border border-primary/20" 
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setActiveChatId(chat.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{chat.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {chat.lastMessage}
                    </p>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {formatTime(chat.timestamp)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 text-muted-foreground hover:text-destructive transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            <p>Lawgic AI Legal Assistant</p>
            <p className="mt-1">Powered by ChainOpera</p>
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <motion.div 
        className="flex-1 flex flex-col"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Chat Header */}
        <div className="border-b border-border p-4 bg-background">
          <h1 className="text-xl font-semibold">
            {activeChatId === "new" ? "New Legal Consultation" : 
             chatSessions.find(chat => chat.id === activeChatId)?.title || "Legal Chat"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Get comprehensive legal guidance from Lawgic AI
          </p>
        </div>

        {/* Chat Interface */}
        <div className="flex-1">
          <ChatGPTInterface />
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultPage;