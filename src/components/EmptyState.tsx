import { motion } from "framer-motion";
import { Users, Plus, FileText } from "lucide-react";

interface EmptyStateProps {
  onAddClick: () => void;
  onImportClick: () => void;
}

const EmptyState = ({ onAddClick, onImportClick }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/30 flex items-center justify-center mb-6"
      >
        <Users className="w-12 h-12 text-muted-foreground" />
      </motion.div>

      <h3 className="font-display text-xl font-semibold mb-2 text-center">
        No Accounts Yet
      </h3>
      <p className="text-muted-foreground text-center mb-8 max-w-xs">
        Add your first guest account or import from a file
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <motion.button
          onClick={onAddClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cyber-button flex-1"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Add Account
          </span>
        </motion.button>

        <motion.button
          onClick={onImportClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-6 py-3 rounded-lg font-semibold border border-secondary/50 text-secondary hover:bg-secondary/10 transition-all duration-300"
        >
          <span className="flex items-center justify-center gap-2">
            <FileText className="w-5 h-5" />
            Import
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EmptyState;
