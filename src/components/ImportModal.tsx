import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Upload, Check } from "lucide-react";
import { useState } from "react";
import { GuestAccount } from "@/types/account";
import { parseAccountsFromText } from "@/lib/parser";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (accounts: GuestAccount[]) => void;
}

const ImportModal = ({ isOpen, onClose, onImport }: ImportModalProps) => {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState<GuestAccount[]>([]);

  const handleTextChange = (value: string) => {
    setText(value);
    const parsed = parseAccountsFromText(value);
    setPreview(parsed);
  };

  const handleImport = () => {
    if (preview.length > 0) {
      onImport(preview);
      setText("");
      setPreview([]);
      onClose();
    }
  };

  const exampleFormat = `👤Ｒ1ғʜᴅ⁴⁸⁴⁷⁶⁵ : 🆔️ 13783414720
4272296050:R1BGPRR4NCF4KING

👤Ｒ1ғʜᴅ⁶⁰⁵⁴⁸¹ : 🆔️ 13783450899
4272304170:R13H6RQ8AS5LKING`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg z-50 overflow-hidden"
          >
            <div className="glass-card p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 border border-secondary/30 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>
                  <h2 className="font-display text-xl font-bold">Import Accounts</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Format hint */}
              <div className="mb-4 p-3 rounded-lg bg-muted/30 border border-border/30">
                <p className="text-xs text-muted-foreground mb-2">Expected format:</p>
                <pre className="text-xs text-foreground/70 whitespace-pre-wrap font-mono">
                  {exampleFormat}
                </pre>
              </div>

              {/* Text input */}
              <div className="flex-1 min-h-0 mb-4">
                <textarea
                  value={text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Paste your accounts here..."
                  className="cyber-input w-full h-full resize-none font-mono text-sm"
                />
              </div>

              {/* Preview */}
              {preview.length > 0 && (
                <div className="mb-4 p-3 rounded-lg bg-neon-green/10 border border-neon-green/30">
                  <div className="flex items-center gap-2 text-neon-green text-sm">
                    <Check className="w-4 h-4" />
                    <span>Found {preview.length} account(s)</span>
                  </div>
                </div>
              )}

              {/* Import button */}
              <motion.button
                onClick={handleImport}
                disabled={preview.length === 0}
                whileHover={{ scale: preview.length > 0 ? 1.02 : 1 }}
                whileTap={{ scale: preview.length > 0 ? 0.98 : 1 }}
                className={`cyber-button w-full ${preview.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5" />
                  Import {preview.length} Account(s)
                </span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImportModal;
