import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Message from './Message'
import TypingIndicator from './TypingIndicator'

const MessageList = ({ messages, isTyping }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gradient-to-b from-pink-50/50 to-purple-50/50">
      <AnimatePresence mode="popLayout">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TypingIndicator />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MessageList
