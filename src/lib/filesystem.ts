import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { GuestAccount } from '@/types/account';
import { generateGuestJson } from './parser';

const GUEST_FILE_PATH = 'guest/guest100067.dat';

export interface FileSystemResult {
  success: boolean;
  message: string;
  data?: string;
}

/**
 * Check if we're running in a native Capacitor environment
 */
export const isNativeApp = (): boolean => {
  return typeof (window as any).Capacitor !== 'undefined' && 
         (window as any).Capacitor.isNativePlatform();
};

/**
 * Request file system permissions on Android
 */
export const requestPermissions = async (): Promise<boolean> => {
  try {
    const result = await Filesystem.requestPermissions();
    return result.publicStorage === 'granted';
  } catch (error) {
    console.error('Permission request failed:', error);
    return false;
  }
};

/**
 * Check if permissions are granted
 */
export const checkPermissions = async (): Promise<boolean> => {
  try {
    const result = await Filesystem.checkPermissions();
    return result.publicStorage === 'granted';
  } catch (error) {
    console.error('Permission check failed:', error);
    return false;
  }
};

/**
 * Read the guest.dat file from external storage
 */
export const readGuestFile = async (customPath?: string): Promise<FileSystemResult> => {
  try {
    const hasPermission = await checkPermissions();
    if (!hasPermission) {
      const granted = await requestPermissions();
      if (!granted) {
        return { success: false, message: 'Storage permission denied' };
      }
    }

    const filePath = customPath || GUEST_FILE_PATH;
    
    const result = await Filesystem.readFile({
      path: filePath,
      directory: Directory.ExternalStorage,
      encoding: Encoding.UTF8
    });

    return { 
      success: true, 
      message: 'File read successfully',
      data: result.data as string
    };
  } catch (error: any) {
    console.error('Read file error:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to read file'
    };
  }
};

/**
 * Write account data to the guest.dat file
 */
export const writeGuestFile = async (account: GuestAccount, customPath?: string): Promise<FileSystemResult> => {
  try {
    const hasPermission = await checkPermissions();
    if (!hasPermission) {
      const granted = await requestPermissions();
      if (!granted) {
        return { success: false, message: 'Storage permission denied' };
      }
    }

    const filePath = customPath || GUEST_FILE_PATH;
    const jsonContent = generateGuestJson(account);

    // Ensure directory exists
    try {
      await Filesystem.mkdir({
        path: 'guest',
        directory: Directory.ExternalStorage,
        recursive: true
      });
    } catch (e) {
      // Directory might already exist
    }

    await Filesystem.writeFile({
      path: filePath,
      data: jsonContent,
      directory: Directory.ExternalStorage,
      encoding: Encoding.UTF8
    });

    return { 
      success: true, 
      message: 'Account injected successfully!'
    };
  } catch (error: any) {
    console.error('Write file error:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to write file'
    };
  }
};

/**
 * Check if guest file exists
 */
export const checkGuestFileExists = async (customPath?: string): Promise<boolean> => {
  try {
    const filePath = customPath || GUEST_FILE_PATH;
    await Filesystem.stat({
      path: filePath,
      directory: Directory.ExternalStorage
    });
    return true;
  } catch {
    return false;
  }
};

/**
 * List files in the guest directory
 */
export const listGuestDirectory = async (): Promise<string[]> => {
  try {
    const result = await Filesystem.readdir({
      path: 'guest',
      directory: Directory.ExternalStorage
    });
    return result.files.map(f => f.name);
  } catch {
    return [];
  }
};
