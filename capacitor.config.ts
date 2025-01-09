import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'weather-app',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Doba zobrazení splashscreenu v milisekundách
      launchAutoHide: true, // Automaticky skryje splashscreen
      backgroundColor: '#ffffff', // Barva pozadí splashscreenu
      androidScaleType: 'CENTER_CROP', // Styl škálování obrázku
      showSpinner: true, // Zobrazení spinneru (načítání)
      androidSpinnerStyle: 'large', // Styl spinneru pro Android
      iosSpinnerStyle: 'small', // Styl spinneru pro iOS
      spinnerColor: '#000000', // Barva spinneru
    },
  },
};

export default config;
