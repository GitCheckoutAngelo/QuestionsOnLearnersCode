import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter
    basename={import.meta.env.DEV ? '/' : '/part-4-project-qlcs/'}
    >
    <App />
  </BrowserRouter>,

)
