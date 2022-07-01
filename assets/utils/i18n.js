import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; 
import enYaml from 'js-yaml-loader!./../../translations/messages.en.yaml';
import frYaml from 'js-yaml-loader!./../../translations/messages.fr.yaml';

export default i18n
    .use(initReactI18next)
    .init({
        debug: false,
        resources: { 
            en: {
                translation: enYaml,
            },
            fr: {
                translation: frYaml,
            }
        },
        lng: (window && window.locale) || 'en',
        fallbackLng: 'en', 
        react: {
            useSuspense: false
        }
    }
);