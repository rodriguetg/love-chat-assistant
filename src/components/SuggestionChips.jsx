import React from 'react'
import { motion } from 'framer-motion'

const SuggestionChips = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="px-4 py-3 border-b border-pink-100">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-gray-700 text-sm rounded-full border border-pink-200 transition-all duration-200 hover:shadow-md"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default SuggestionChips
