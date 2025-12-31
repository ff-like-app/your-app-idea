import { useState, useEffect, useCallback } from 'react';
import { 
  isNativeApp, 
  checkPermissions, 
  requestPermissions, 
  writeGuestFile, 
  readGuestFile,
  listGuestDirectory,
  checkGuestFileExists
} from '@/lib/filesystem';
import { GuestAccount } from '@/types/account';
import { toast } from 'sonner';

interface UseFileSystemReturn {
  isNative: boolean;
  hasPermission: boolean;
  isLoading: boolean;
  guestFilePath: string;
  guestFiles: string[];
  setGuestFilePath: (path: string) => void;
  requestStoragePermission: () => Promise<boolean>;
  injectAccount: (account: GuestAccount) => Promise<boolean>;
  readCurrentFile: () => Promise<string | null>;
  refreshGuestFiles: () => Promise<void>;
}

export const useFileSystem = (): UseFileSystemReturn => {
  const [isNative, setIsNative] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [guestFilePath, setGuestFilePath] = useState('guest/guest100067.dat');
  const [guestFiles, setGuestFiles] = useState<string[]>([]);

  useEffect(() => {
    const init = async () => {
      const native = isNativeApp();
      setIsNative(native);
      
      if (native) {
        const permission = await checkPermissions();
        setHasPermission(permission);
        
        if (permission) {
          const files = await listGuestDirectory();
          setGuestFiles(files);
        }
      }
    };
    
    init();
  }, []);

  const requestStoragePermission = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const granted = await requestPermissions();
      setHasPermission(granted);
      
      if (granted) {
        toast.success('Storage permission granted!');
        const files = await listGuestDirectory();
        setGuestFiles(files);
      } else {
        toast.error('Storage permission denied');
      }
      
      return granted;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const injectAccount = useCallback(async (account: GuestAccount): Promise<boolean> => {
    if (!isNative) {
      toast.error('Native file access not available in browser');
      return false;
    }

    setIsLoading(true);
    try {
      const result = await writeGuestFile(account, guestFilePath);
      
      if (result.success) {
        toast.success(result.message);
        return true;
      } else {
        toast.error(result.message);
        return false;
      }
    } finally {
      setIsLoading(false);
    }
  }, [isNative, guestFilePath]);

  const readCurrentFile = useCallback(async (): Promise<string | null> => {
    if (!isNative) return null;

    setIsLoading(true);
    try {
      const result = await readGuestFile(guestFilePath);
      
      if (result.success && result.data) {
        return result.data;
      } else {
        toast.error(result.message);
        return null;
      }
    } finally {
      setIsLoading(false);
    }
  }, [isNative, guestFilePath]);

  const refreshGuestFiles = useCallback(async (): Promise<void> => {
    if (!isNative) return;
    
    const files = await listGuestDirectory();
    setGuestFiles(files);
  }, [isNative]);

  return {
    isNative,
    hasPermission,
    isLoading,
    guestFilePath,
    guestFiles,
    setGuestFilePath,
    requestStoragePermission,
    injectAccount,
    readCurrentFile,
    refreshGuestFiles
  };
};
