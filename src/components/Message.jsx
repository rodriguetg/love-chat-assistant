import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { User, Heart } from 'lucide-react'

const Message = forwardRef(({ message }, ref) => {
  const formatContent = (content) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ))
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-end space-x-2 ${
        message.isUser ? 'justify-end flex-row-reverse space-x-reverse' : 'justify-start'
      }`}
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.isUser 
            ? 'bg-gradient-to-br from-pink-400 to-pink-600' 
            : 'bg-gradient-to-br from-purple-400 to-purple-600'
        }`}
      >
        {message.isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Heart className="w-4 h-4 text-white fill-white" />
        )}
      </motion.div>

      {/* Message Bubble */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm ${
          message.isUser
            ? 'bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-br-md'
            : 'bg-white/80 text-gray-800 rounded-bl-md border border-pink-100'
        }`}
      >
        <div className={`text-sm md:text-base leading-relaxed ${
          message.isUser ? 'text-white' : 'text-gray-700'
        }`}>
          {formatContent(message.content)}
        </div>
        
        <div className={`text-xs mt-2 ${
          message.isUser ? 'text-pink-100' : 'text-gray-500'
        }`}>
          {message.timestamp.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </motion.div>
    </motion.div>
  )
})

export default Message
