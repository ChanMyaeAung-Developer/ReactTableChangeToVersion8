import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../src/index.css'
import Index from './index.jsx'




createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

    <StrictMode>
    <Index/>
  </StrictMode>,
)
