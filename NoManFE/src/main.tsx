import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigsProvider } from './Contexts/ConfigContext'
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
