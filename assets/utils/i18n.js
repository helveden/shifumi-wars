import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; 
import enYaml from 'js-yaml-loader!./../../translations/messages.en.yaml';



i18n
    .use(initReactI18next)
    .init({
        debug: true,
        resources: {
            // fr: {
            //     translation: frYaml,
            // }, 
            en: {
                translation: enYaml.react,
            },
        },
        lng: (window && window.locale) || 'en',
        fallbackLng: 'en', 
        react: {
            useSuspense: false
        }
    }
);


console.log(i18n.t('react.allgames.title'))

export default i18n;