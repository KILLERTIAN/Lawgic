import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Plus, Trash2, Scale, Sparkles, Clock, Menu, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import ChatGPTInterface from "@/components/ChatGPTInterface";

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const ConsultPage = () => {
  const location = useLocation();
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [initialMessage, setInitialMessage] = useState<string>("");

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle initial message from search
  useEffect(() => {
    if (location.state?.initialMessage) {
      setInitialMessage(location.state.initialMessage);
      // Clear the state to prevent re-triggering
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const createNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat: ChatSession = {
      id: newChatId,
      title: "New Legal Consultation",
      lastMessage: "",
      timestamp: new Date(),
    };
    
    setChatSessions(prev => [newChat, ...prev]);
    setActiveChatId(newChatId);
    
    // Close sidebar on mobile after creating new chat
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  const deleteChat = (chatId: string) => {
    setChatSessions(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChatId === chatId) {
      setActiveChatId("new");
    }
  };

  const updateChatTitle = (chatId: string, newTitle: string) => {
    setChatSessions(prev => 
      prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, title: newTitle, timestamp: new Date() }
          : chat
      )
    );
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
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
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div 
            className={`${
              isMobile 
                ? 'fixed left-0 top-0 h-full w-80 z-50' 
                : 'relative w-80'
            } bg-background border-r border-border flex flex-col shadow-lg`}
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Lawgic AI</h2>
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="w-2 h-2 mr-1" />
                  TensorOpera
                </Badge>
              </div>
            </div>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(true)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <Button 
            onClick={createNewChat}
            className="w-full justify-start gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            New Legal Consultation
          </Button>
        </div>

        {/* Chat Sessions */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {/* New Chat Option */}
            <motion.div
              className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                activeChatId === "new" 
                  ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20" 
                  : "hover:bg-muted/50"
              }`}
              onClick={() => {
                setActiveChatId("new");
                if (isMobile) setSidebarCollapsed(true);
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">New Consultation</h4>
                  <p className="text-xs text-muted-foreground">Start a fresh legal discussion</p>
                </div>
              </div>
            </motion.div>

            {/* Existing Chat Sessions */}
            {chatSessions.map((chat) => (
              <motion.div
                key={chat.id}
                className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeChatId === chat.id 
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20" 
                    : "hover:bg-muted/50"
                }`}
                onClick={() => {
                  setActiveChatId(chat.id);
                  if (isMobile) setSidebarCollapsed(true);
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{chat.title}</h4>
                    {chat.lastMessage && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {chat.lastMessage}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatTime(chat.timestamp)}
                      </span>
                    </div>
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
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="text-xs text-muted-foreground text-center space-y-2">
            <div className="flex items-center justify-center gap-1">
              <Scale className="w-3 h-3" />
              <span>Lawgic AI Legal Assistant</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span>Powered by TensorOpera</span>
            </div>
            <p className="text-[10px] text-muted-foreground/70">
              Gemini 2.0 Flash • General legal information only
            </p>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <motion.div 
        className="flex-1 flex flex-col min-w-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Chat Header */}
        <div className="border-b border-border p-4 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="flex-shrink-0"
            >
              {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </Button>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Scale className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                {activeChatId === "new" ? "New Legal Consultation" : 
                 chatSessions.find(chat => chat.id === activeChatId)?.title || "Legal Chat"}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="w-2 h-2 mr-1" />
                  TensorOpera AI
                </Badge>
                <span className="text-xs md:text-sm text-muted-foreground hidden sm:inline">
                  Comprehensive legal guidance at your fingertips
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 min-h-0">
          <ChatGPTInterface initialMessage={initialMessage} />
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultPage;