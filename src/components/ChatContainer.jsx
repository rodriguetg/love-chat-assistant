import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import SuggestionChips from './SuggestionChips'
import { generateBotResponse } from '../services/chatService'

const ChatContainer = () => {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Message d'accueil initial
    const welcomeMessage = {
      id: 1,
      content: "Bonjour ! 💕 Je suis Armony, votre conseillère en relations amoureuses développée par l'équipe de PEM (Rodrigue GBADOU, Loana LAMBERT, Louise MAKIALA MATOMA, Farah Mélissa AHMED, Inès DAOUDI, Aurélien YOMI).\n\nJe suis ici pour vous aider avec :\n• Conseils pour les premiers rendez-vous\n• Gestion des relations et communication\n• Surmonter les ruptures\n• Retrouver confiance en soi\n\nComment puis-je vous aider aujourd'hui ? 😊",
      isUser: false,
      timestamp: new Date()
    }

    const timer = setTimeout(() => {
      setMessages([welcomeMessage])
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = async (content) => {
    if (!content.trim()) return

    const userMessage = {
      id: Date.now(),
      content: content.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      // Simuler un délai de réponse réaliste
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000))
      
      const botResponse = generateBotResponse(content)
      const botMessage = {
        id: Date.now() + 1,
        content: botResponse,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Erreur lors de la génération de la réponse:', error)
      const errorMessage = {
        id: Date.now() + 1,
        content: "Désolée, je rencontre une petite difficulté. Pouvez-vous reformuler votre question ? 💕",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const suggestions = [
    "Comment trouver l'amour ?",
    "Comment gérer une rupture ?",
    "Conseils pour le premier rendez-vous",
    "Comment améliorer la communication dans mon couple ?",
    "Je manque de confiance en moi",
    "Mon partenaire ne me comprend pas"
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto h-screen flex flex-col bg-white/90 backdrop-blur-sm shadow-2xl md:my-5 md:rounded-2xl md:h-[calc(100vh-2.5rem)] overflow-hidden"
    >
      <ChatHeader />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <MessageList 
          messages={messages} 
          isTyping={isTyping}
        />
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white/95 backdrop-blur-sm border-t border-pink-100">
        <SuggestionChips 
          suggestions={suggestions}
          onSuggestionClick={handleSendMessage}
        />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </motion.div>
  )
}

export default ChatContainer
