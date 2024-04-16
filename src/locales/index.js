import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./translations/en.json";
import tr from "./translations/tr.json";

const initialLanguage = 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },
            tr: {
                translation: tr
            }
        },
        fallbackLng: initialLanguage,

        interpolation: {
            escapeValue: false
        }
    });
