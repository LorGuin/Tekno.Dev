import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CrmDemo from './pages/demos/CrmDemo'
import ChatbotDemo from './pages/demos/ChatbotDemo'
import TurnosDemo from './pages/demos/TurnosDemo'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo/crm" element={<CrmDemo />} />
        <Route path="/demo/chatbot" element={<ChatbotDemo />} />
        <Route path="/demo/turnos" element={<TurnosDemo />} />
      </Routes>
      <WhatsAppButton />
    </>
  )
}

export default App
