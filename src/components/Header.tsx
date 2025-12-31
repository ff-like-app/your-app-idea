import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative pt-8 pb-6 px-4 text-center"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 mb-4"
      >
        <Shield className="w-8 h-8 text-primary" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="font-display text-2xl md:text-3xl font-bold tracking-wider neon-text"
      >
        R1 GUEST MANAGER
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex items-center justify-center gap-2 mt-2 text-muted-foreground text-sm"
      >
        <Sparkles className="w-4 h-4 text-secondary" />
        <span>Secure Account Management</span>
        <Sparkles className="w-4 h-4 text-secondary" />
      </motion.div>

      <div className="glow-line mt-6 opacity-30" />
    </motion.header>
  );
};

export default Header;
