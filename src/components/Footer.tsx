import { motion } from "framer-motion";
import { Heart, Code } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="py-6 px-4 text-center border-t border-border/20"
    >
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Code className="w-4 h-4" />
        <span>Developed with</span>
        <Heart className="w-4 h-4 text-accent fill-accent" />
        <span>by</span>
        <span className="font-display font-bold text-primary neon-text">R1 Fahad</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground/50">
        R1 Guest Manager v1.0
      </p>
    </motion.footer>
  );
};

export default Footer;
