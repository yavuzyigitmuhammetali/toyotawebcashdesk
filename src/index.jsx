import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./index.css"
import {AppStatusProvider} from "./shared/states/AppStatus/context";
import {KeyboardProvider} from "./shared/components/ScreenKeyboard/context";
import {RouterProvider} from "react-router-dom";
import router from "./router";
import {AppDataProvider} from "./shared/states/AppData/context";
import "./locales";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppStatusProvider>
            <AppDataProvider>
                <KeyboardProvider>
                    <RouterProvider router={router}/>
                </KeyboardProvider>
            </AppDataProvider>
        </AppStatusProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
