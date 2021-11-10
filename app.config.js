export default {
  expo: {
    name: 'E-accessoires',
    slug: 'e-accessoires-app',
    version: '2.0.14',
    orientation: 'portrait',
    icon: './app/assets/logo-new-middle.png',
    splash: {
      image: './app/assets/logo-new-space-around.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    sdkVersion: '42.0.0',
    platforms: ['ios', 'android'],
    ios: {
      infoPlist: {
        UIBackgroundModes: ['location', 'fetch'],
      },
      supportsTablet: true,
    },
    android: {
      versionCode: 2,
      package: 'eaccessoires.app',
      googleServicesFile: './google-services.json',
      adaptiveIcon: {
        foregroundImage: './app/assets/logo-new-space-around.png',
        backgroundColor: '#FFFFFF',
      },
      permissions: [],
    },
  },
  extra: {},
};
