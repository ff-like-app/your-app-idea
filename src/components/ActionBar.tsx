import { motion } from "framer-motion";
import { Plus, FileText, Search } from "lucide-react";

interface ActionBarProps {
  onAddClick: () => void;
  onImportClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  accountCount: number;
}

const ActionBar = ({
  onAddClick,
  onImportClick,
  searchQuery,
  onSearchChange,
  accountCount,
}: ActionBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="px-4 mb-4"
    >
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search accounts..."
          className="cyber-input w-full pl-11"
        />
      </div>

      {/* Actions & count */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {accountCount} account{accountCount !== 1 ? "s" : ""}
        </span>

        <div className="flex gap-2">
          <motion.button
            onClick={onImportClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-lg border border-secondary/50 text-secondary hover:bg-secondary/10 transition-colors"
          >
            <FileText className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={onAddClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActionBar;
