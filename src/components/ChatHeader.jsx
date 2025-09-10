import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const ChatHeader = () => {
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 text-white p-6 overflow-hidden"
    >
      {/* Effet de brillance animé */}
      <div className="absolute inset-0 bg-gradient-to-45 from-transparent via-white/20 to-transparent animate-shine bg-[length:200%_200%]" />
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <Heart className="w-8 h-8 fill-white text-white" />
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-white/30 rounded-full blur-sm"
            />
          </motion.div>
          
          <div>
            <motion.h1 
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
              animate={{ 
                backgroundPosition: ['0% center', '200% center', '0% center']
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Armony
            </motion.h1>
            <p className="text-pink-100 text-sm md:text-base opacity-90">
              Votre conseillère en relations amoureuses
            </p>
          </div>
        </div>

        {/* Logo animé */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="hidden md:block w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30"
        >
          <Heart className="w-8 h-8 text-white fill-white" />
        </motion.div>
      </div>

      {/* Particules flottantes dans le header */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default ChatHeader
