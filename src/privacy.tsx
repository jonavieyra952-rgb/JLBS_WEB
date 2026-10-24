import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrivacyPage } from './pages/PrivacyPage';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('No se encontró el contenedor principal.');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <PrivacyPage />
  </React.StrictMode>,
);
