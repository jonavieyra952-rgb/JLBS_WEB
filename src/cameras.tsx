import React from 'react';
import ReactDOM from 'react-dom/client';
import { CameraLandingPage } from './pages/CameraLandingPage';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('No se encontró el contenedor principal.');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <CameraLandingPage />
  </React.StrictMode>,
);
