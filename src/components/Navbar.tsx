import { useState } from "react";
import { Scale, Menu, X, MessageSquare, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
              <Scale className="h-6 w-6 text-primary-foreground" />
            </div>
            <motion.span 
              className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Lawgic
            </motion.span>
          </div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button 
              onClick={() => handleNavigation("/")}
              className={`text-foreground hover:text-primary transition-smooth ${location.pathname === "/" ? "text-primary font-semibold" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.button>
            <motion.button 
              onClick={() => handleNavigation("/about")}
              className={`text-foreground hover:text-primary transition-smooth ${location.pathname === "/about" ? "text-primary font-semibold" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.button>
            <motion.button 
              onClick={() => handleNavigation("/consult")}
              className={`text-foreground hover:text-primary transition-smooth ${location.pathname === "/consult" ? "text-primary font-semibold" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Consult
            </motion.button>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                Sign In
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => handleNavigation("/consult")}
                className="bg-gradient-primary shadow-glow hover:shadow-xl transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-border">
                <motion.button
                  onClick={() => handleNavigation("/")}
                  className={`block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-smooth ${location.pathname === "/" ? "text-primary font-semibold bg-muted" : ""}`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Home
                </motion.button>
                <motion.button
                  onClick={() => handleNavigation("/about")}
                  className={`block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-smooth ${location.pathname === "/about" ? "text-primary font-semibold bg-muted" : ""}`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  About
                </motion.button>
                <motion.button
                  onClick={() => handleNavigation("/consult")}
                  className={`block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-smooth ${location.pathname === "/consult" ? "text-primary font-semibold bg-muted" : ""}`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Consult
                </motion.button>
                <div className="flex flex-col space-y-2 pt-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
                      Sign In
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={() => handleNavigation("/consult")}
                      className="w-full bg-gradient-primary shadow-glow"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Start Chat
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;