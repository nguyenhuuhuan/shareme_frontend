import React from 'react'
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from "@react-oauth/google";

import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'
const root = createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
    >
        <React.StrictMode>
            <Router>
                <App />
            </Router>
        </React.StrictMode>
    </GoogleOAuthProvider>
);