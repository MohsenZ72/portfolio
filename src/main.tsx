import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ScrollProgressProvider } from './hooks/useScrollProgress.tsx'
import { TechScrollProgressProvider } from './hooks/useTechScrollProgress.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScrollProgressProvider>
      <TechScrollProgressProvider>
        <App />
      </TechScrollProgressProvider>
    </ScrollProgressProvider>
  </StrictMode>,
)
