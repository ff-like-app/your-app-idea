import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, User, Gamepad2, Hash, Key } from "lucide-react";
import { useState } from "react";
import { GuestAccount } from "@/types/account";
import { generateId } from "@/lib/storage";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (account: GuestAccount) => void;
}

const AddAccountModal = ({ isOpen, onClose, onAdd }: AddAccountModalProps) => {
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid || !password) return;

    onAdd({
      id: generateId(),
      name: name || undefined,
      gameId: gameId || undefined,
      uid,
      password,
      createdAt: Date.now(),
    });

    setName("");
    setGameId("");
    setUid("");
    setPassword("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md z-50"
          >
            <div className="glass-card p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-bold">Add Account</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name (optional) */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., R1 Fahad"
                    className="cyber-input w-full"
                  />
                </div>

                {/* Game ID (optional) */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Gamepad2 className="w-4 h-4" />
                    Game ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                    placeholder="e.g., 12345678"
                    className="cyber-input w-full"
                  />
                </div>

                {/* UID (required) */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Hash className="w-4 h-4 text-secondary" />
                    UID <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    placeholder="e.g., 4308309852"
                    className="cyber-input w-full"
                    required
                  />
                </div>

                {/* Password (required) */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Key className="w-4 h-4 text-accent" />
                    Password <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="e.g., R1F4H4D3338852571K1NG"
                    className="cyber-input w-full font-mono text-sm"
                    required
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cyber-button w-full mt-6"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Add Account
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddAccountModal;
