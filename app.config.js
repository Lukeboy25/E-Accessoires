export default {
  expo: {
    name: 'E-accessoires',
    slug: 'e-accessoires-app',
    version: '2.0.1',
    orientation: 'portrait',
    icon: './app/assets/logo-small.png',
    splash: {
      image: './app/assets/logo-splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      infoPlist: {
        UIBackgroundModes: ['location', 'fetch'],
      },
      supportsTablet: true,
    },
    android: {
      package: 'eaccessoires.app',
      googleServicesFile: './google-services.json',
      adaptiveIcon: {
        foregroundImage: './app/assets/logo-small.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './app/assets/icon.png',
    },
  },
  extra: {},
};
