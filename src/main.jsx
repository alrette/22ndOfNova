import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/fraunces/full.css';
import '@fontsource-variable/fraunces/full-italic.css';
import '@fontsource-variable/schibsted-grotesk/wght.css';
import './styles.css';
import App from './App.jsx';
import Gate from './components/Gate.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Gate>
      <App />
    </Gate>
  </StrictMode>,
);
