import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stevenellis.functionaltrainer',
  appName: 'Functional Trainer',
  webDir: 'dist',
  // iOS 18 deployment target needs `.iOS(.v18)`, which requires tools version 6.0.
  experimental: { ios: { spm: { swiftToolsVersion: '6.0' } } }
};

export default config;
