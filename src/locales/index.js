import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import tr from "./translations/tr.json";

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
        lng: "en",
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });
