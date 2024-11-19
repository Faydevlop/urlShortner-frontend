import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './redux/Store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)