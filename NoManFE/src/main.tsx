import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigsProvider } from './contexts/ConfigContext/index.ts'
import configData from '../config/config.json';

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigsProvider configJson={configData}>
      <App />
    </ConfigsProvider> 
  </StrictMode>,
)
