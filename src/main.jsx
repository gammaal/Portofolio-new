import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }
`

const styleSheet = document.createElement("style")
styleSheet.innerText = globalStyles
document.head.appendChild(styleSheet)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)