import { motion } from "framer-motion";
import { Zap, Loader2 } from "lucide-react";

interface InjectButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const InjectButton = ({ onClick, isLoading, disabled }: InjectButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className="w-full py-3 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-background font-display font-bold text-lg shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Injecting...
        </>
      ) : (
        <>
          <Zap className="w-5 h-5" />
          INJECT TO DEVICE
        </>
      )}
    </motion.button>
  );
};

export default InjectButton;
