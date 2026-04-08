import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Uploadfile from './pages/uploadfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/" element={<Uploadfile/>}/>
    </Routes>
    </>
  )
}

export default App
