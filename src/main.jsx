import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

/* CSS/JS سراسری */
import 'bootstrap/dist/css/bootstrap.rtl.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'

import App from './App.jsx'

/* ست اولیهٔ سند */
const html = document.documentElement
html.setAttribute('dir','rtl')
html.setAttribute('lang','fa')
html.setAttribute('data-theme','dark') // بعداً از API بوت می‌گیریم و اینجا ست می‌کنیم

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter /* basename='/' */>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
