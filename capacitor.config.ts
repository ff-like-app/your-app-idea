import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7628c16cbb10431099d45d2dedb0dbdb',
  appName: 'R1 Guest Manager',
  webDir: 'dist',
  server: {
    url: 'https://7628c16c-bb10-4310-99d4-5d2dedb0dbdb.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Filesystem: {
      // Request legacy external storage for Android
    }
  },
  android: {
    // Allow cleartext traffic for development
    allowMixedContent: true
  }
};

export default config;
