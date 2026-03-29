import { createRoot } from 'react-dom/client';
import './app/styles/reset.css';
import './app/styles/index.css';
import { BrowserRouter } from 'react-router';
import { App } from './app/ui/App/App.tsx';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store.ts';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
