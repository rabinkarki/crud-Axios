import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Posts from './api/components/Posts'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <section className="main-section">
      <Posts />
    </section>
    
  )
}

export default App
