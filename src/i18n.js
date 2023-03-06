import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationRu from './translations/ru/translation.json';
import translationEn from './translations/en/translation.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'ru',
  debug: false,
  resources: {
    ru: {
      translation: translationRu,
    },
    en: {
      translation: translationEn,
    },
  },
});

export default i18n;
