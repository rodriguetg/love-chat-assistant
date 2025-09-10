import React from 'react'
import ChatContainer from './components/ChatContainer'
import ParticleBackground from './components/ParticleBackground'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <ChatContainer />
      </div>
    </div>
  )
}

export default App
