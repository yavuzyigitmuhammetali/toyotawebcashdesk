import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./index.css"
import {StatusProvider} from "./shared/state/context";
import {KeyboardProvider} from "./shared/components/ScreenKeyboard/context";
import {RouterProvider} from "react-router-dom";
import router from "./router";
import RequireAuth from "./shared/state/RequireAuth";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <StatusProvider>
          <KeyboardProvider>
              <RouterProvider router={router}/>
          </KeyboardProvider>
      </StatusProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
