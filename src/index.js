import React from "react";
import ReactDOM from "react-dom";
import 'bulma/css/bulma.min.css'
import "./index.css";
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {AuthContextProvider} from './store/context/AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
