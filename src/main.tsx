import { createRoot } from 'react-dom/client';
import './app/styles/reset.css';
import './app/styles/index.css';
import { BrowserRouter } from 'react-router';
import { App } from './app/ui/App/App.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
