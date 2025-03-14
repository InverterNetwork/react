import React from 'react'
import ReactDOM from 'react-dom/client'
import { Preview } from './screen'

// Import CSS with proper order to ensure Tailwind processes correctly
import '../src/styles/global.css'

// Add preview-specific styles if needed
import './preview.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Preview />
  </React.StrictMode>
)
