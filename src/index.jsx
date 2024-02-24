import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./index.css"
import {DataFetchingProvider} from "./shared/state/context";
import {KeyboardProvider} from "./shared/components/ScreenKeyboard/context";
import {RouterProvider} from "react-router-dom";
import router from "./router";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <DataFetchingProvider>
          <KeyboardProvider>
              <RouterProvider router={router}/>
          </KeyboardProvider>
      </DataFetchingProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
