import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { TransactionProvider } from './context/TransactionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TransactionProvider>
    <App />
  </TransactionProvider>
);
