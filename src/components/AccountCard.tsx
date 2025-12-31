import { motion } from "framer-motion";
import { User, Gamepad2, Key, Hash, Trash2, Copy, Check } from "lucide-react";
import { GuestAccount } from "@/types/account";
import { useState } from "react";

interface AccountCardProps {
  account: GuestAccount;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const AccountCard = ({ account, index, isSelected, onSelect, onDelete }: AccountCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUid = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(account.uid);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`account-card ${isSelected ? "selected" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Name */}
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-primary shrink-0" />
            <span className="font-display text-lg font-semibold truncate">
              {account.name || "Guest Account"}
            </span>
          </div>

          {/* Game ID */}
          {account.gameId && (
            <div className="flex items-center gap-2 mb-1 text-sm text-muted-foreground">
              <Gamepad2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">ID: {account.gameId}</span>
            </div>
          )}

          {/* UID */}
          <div className="flex items-center gap-2 mb-1 text-sm">
            <Hash className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span className="font-mono text-secondary truncate">{account.uid}</span>
            <button
              onClick={handleCopyUid}
              className="p-1 rounded hover:bg-muted/50 transition-colors"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-neon-green" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Password preview */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Key className="w-3.5 h-3.5 shrink-0" />
            <span className="font-mono truncate">
              {account.password.substring(0, 16)}...
            </span>
          </div>
        </div>

        {/* Delete button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          layoutId="selection-indicator"
          className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.div>
  );
};

export default AccountCard;
