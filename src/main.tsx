import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from 'react-query';

import App from './App';

import './styles/global.css';
import { queryClient } from './services/queryClient';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
