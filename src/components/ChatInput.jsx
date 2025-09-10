import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mic } from 'lucide-react'

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Ici, vous pourriez implémenter la reconnaissance vocale
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex items-end space-x-3 bg-white rounded-2xl shadow-lg border border-pink-100 p-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Posez votre question à Armony..."
          className="flex-1 resize-none border-none outline-none px-4 py-3 text-gray-700 placeholder-gray-400 bg-transparent min-h-[44px] max-h-32"
          rows={1}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        />

        <div className="flex space-x-2">
          {/* Bouton micro */}
          <motion.button
            type="button"
            onClick={toggleRecording}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isRecording 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Mic className="w-5 h-5" />
          </motion.button>

          {/* Bouton envoyer */}
          <motion.button
            type="submit"
            disabled={!message.trim()}
            whileHover={{ scale: message.trim() ? 1.05 : 1 }}
            whileTap={{ scale: message.trim() ? 0.95 : 1 }}
            className={`p-3 rounded-xl transition-all duration-200 ${
              message.trim()
                ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </form>
  )
}

export default ChatInput
