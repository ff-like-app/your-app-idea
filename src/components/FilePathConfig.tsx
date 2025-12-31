import { motion } from "framer-motion";
import { FolderOpen, Check, RefreshCw, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface FilePathConfigProps {
  currentPath: string;
  onPathChange: (path: string) => void;
  guestFiles: string[];
  hasPermission: boolean;
  onRequestPermission: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const FilePathConfig = ({
  currentPath,
  onPathChange,
  guestFiles,
  hasPermission,
  onRequestPermission,
  onRefresh,
  isLoading
}: FilePathConfigProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempPath, setTempPath] = useState(currentPath);

  const handleSave = () => {
    onPathChange(tempPath);
    setIsEditing(false);
  };

  if (!hasPermission) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mb-4 p-4 glass-card neon-border"
      >
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <span className="font-display text-sm font-semibold">Storage Permission Required</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Grant storage access to inject accounts directly into your guest file.
        </p>
        <motion.button
          onClick={onRequestPermission}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-50"
        >
          {isLoading ? "Requesting..." : "Grant Permission"}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-4 p-4 glass-card"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-primary" />
          <span className="font-display text-sm font-semibold">Target File</span>
        </div>
        <motion.button
          onClick={onRefresh}
          disabled={isLoading}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="p-1.5 rounded-lg hover:bg-muted/50 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={tempPath}
            onChange={(e) => setTempPath(e.target.value)}
            className="cyber-input w-full"
            placeholder="guest/guest100067.dat"
          />
          <div className="flex gap-2">
            <motion.button
              onClick={handleSave}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium"
            >
              <Check className="w-4 h-4 inline mr-1" />
              Save
            </motion.button>
            <motion.button
              onClick={() => {
                setTempPath(currentPath);
                setIsEditing(false);
              }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 rounded-lg bg-muted/50 text-muted-foreground text-sm"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="p-3 rounded-lg bg-background/50 border border-border/30 cursor-pointer hover:border-primary/50 transition-colors"
        >
          <code className="text-sm text-primary font-mono break-all">
            /sdcard/{currentPath}
          </code>
        </div>
      )}

      {/* Available files */}
      {guestFiles.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-2">Available guest files:</p>
          <div className="flex flex-wrap gap-2">
            {guestFiles.map((file) => (
              <button
                key={file}
                onClick={() => {
                  setTempPath(`guest/${file}`);
                  onPathChange(`guest/${file}`);
                }}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  currentPath === `guest/${file}`
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                }`}
              >
                {file}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FilePathConfig;
