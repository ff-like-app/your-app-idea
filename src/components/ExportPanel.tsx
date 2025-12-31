import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, FileJson, Download, X, Zap, Loader2 } from "lucide-react";
import { useState } from "react";
import { GuestAccount } from "@/types/account";
import { generateGuestJson } from "@/lib/parser";

interface ExportPanelProps {
  account: GuestAccount | null;
  onClose: () => void;
  isNative: boolean;
  hasPermission: boolean;
  isLoading: boolean;
  onInject: (account: GuestAccount) => Promise<boolean>;
}

const ExportPanel = ({ 
  account, 
  onClose, 
  isNative, 
  hasPermission, 
  isLoading, 
  onInject 
}: ExportPanelProps) => {
  const [copied, setCopied] = useState(false);

  if (!account) return null;

  const jsonOutput = generateGuestJson(account);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guest_${account.uid}.dat`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleInject = async () => {
    await onInject(account);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-x-4 bottom-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md z-40"
      >
        <div className="glass-card p-4 neon-border">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileJson className="w-5 h-5 text-primary" />
              <span className="font-display text-sm font-semibold">Export JSON</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Account info */}
          <div className="mb-3 text-sm">
            <span className="text-muted-foreground">Selected: </span>
            <span className="text-primary font-semibold">{account.name || account.uid}</span>
          </div>

          {/* JSON preview */}
          <pre className="p-3 rounded-lg bg-background/50 border border-border/30 text-xs font-mono text-foreground/80 overflow-x-auto mb-4 max-h-24 overflow-y-auto">
            {jsonOutput}
          </pre>

          {/* Native inject button */}
          {isNative && hasPermission && (
            <motion.button
              onClick={handleInject}
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full mb-3 py-3 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-background font-display font-bold shadow-lg shadow-primary/25 disabled:opacity-50 flex items-center justify-center gap-2"
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
          )}

          {/* Web actions */}
          <div className="flex gap-3">
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </motion.button>

            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary/30 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </motion.button>
          </div>

          {/* Hint */}
          <p className="mt-3 text-xs text-muted-foreground text-center">
            {isNative && hasPermission 
              ? "Tap INJECT to write directly to your guest file"
              : "Copy this JSON and paste it into your guest.dat file"
            }
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExportPanel;
