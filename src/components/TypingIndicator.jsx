import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const TypingIndicator = () => {
  return (
    <div className="flex items-end space-x-2">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
        <Heart className="w-4 h-4 text-white fill-white" />
      </div>

      {/* Typing Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-md shadow-lg border border-pink-100"
      >
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-pink-400 rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full typing-dot"></div>
        </div>
      </motion.div>
    </div>
  )
}

export default TypingIndicator
