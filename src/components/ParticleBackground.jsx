import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ParticleBackground = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const createParticle = () => {
      const newParticle = {
        id: Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 3 + 4,
        emoji: ['💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 5)],
      }
      
      setParticles(prev => [...prev, newParticle])
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id))
      }, newParticle.duration * 1000)
    }

    const interval = setInterval(createParticle, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: `${particle.left}vw`,
            y: '100vh',
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            y: '-100vh',
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.8]
          }}
          transition={{ 
            duration: particle.duration,
            ease: "easeOut"
          }}
          className="absolute"
          style={{ 
            fontSize: `${particle.size}px`,
            left: 0,
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default ParticleBackground
