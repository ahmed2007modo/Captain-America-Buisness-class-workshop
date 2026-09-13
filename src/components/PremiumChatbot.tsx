import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Crown, MessageSquare, X, Brain, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { callGemini } from '@/lib/gemini'

interface PremiumChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const TOPIC_PROMPTS: Record<string, string> = {
  greetings: "You are a premium AI nutrition coach. The user just said hello or greeted you. Respond warmly and ask how you can help with nutrition, training, Berlin food spots, or supplements.",
  nutrition: "You are a premium AI nutrition coach. The user is asking about protein, macros, calories, meals, food, nutrition, or diet. Give expert advice about nutrition with specific Berlin restaurant recommendations and macro targets.",
  training: "You are a premium AI nutrition coach. The user is asking about training, workout, exercise, gym, lifting, muscle, strength, hypertrophy, cardio, or HIIT. Give expert advice about training with nutrition recommendations.",
  berlin: "You are a premium AI nutrition coach. The user is asking about Berlin, Mensa, cafés, restaurants, markets, Markthalle, Kaufland, REWE, Aldi, Lidl, food, or eating. Recommend specific Berlin spots with details.",
  supplements: "You are a premium AI nutrition coach. The user is asking about supplements, creatine, vitamin, omega, magnesium, protein powder, or pre-workout. Give evidence-based supplement recommendations.",
  general: "You are a premium AI nutrition coach. The user is asking a general question about nutrition, training, wellness, or Berlin lifestyle. Give a helpful, detailed response. Be conversational and expert-level.",
}

function getTopic(userInput: string): string {
  const input = userInput.toLowerCase()
  if (/(hello|hi|hey|greetings|good morning|good evening)/.test(input)) return 'greetings'
  if (/(protein|macro|calorie|meal|food|eat|nutrition|diet)/.test(input)) return 'nutrition'
  if (/(train|workout|exercise|gym|lift|muscle|strength|hypertrophy|cardio|hiit)/.test(input)) return 'training'
  if (/(berlin|mensa|café|restaurant|market|markthalle|kaufland|rewe|aldi|lidl|eat|food)/.test(input)) return 'berlin'
  if (/(supplement|creatine|vitamin|omega|magnesium|protein powder|pre-workout)/.test(input)) return 'supplements'
  return 'general'
}

interface PremiumChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export function PremiumChatbot({ isOpen, onClose }: PremiumChatbotProps) {
  const [messages, setMessages] = useState<PremiumChatMessage[]>([
    { id: '1', role: 'assistant', content: "Welcome to Premium AI Coach! 🧠 I'm your advanced nutrition assistant powered by Gemini AI. Ask me about macros, meal timing, Berlin food spots, supplements, training — anything!", timestamp: new Date() }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [useGemini, setUseGemini] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])
  useEffect(() => { inputRef.current?.focus() }, [isOpen])

  const buildPrompt = (text: string, history: PremiumChatMessage[]): string => {
    const topic = getTopic(text)
    const topicPrompt = TOPIC_PROMPTS[topic] || TOPIC_PROMPTS.general
    const historyContext = history.slice(-6).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n')
    return `${topicPrompt}\n\nConversation history:\n${historyContext}\n\nUser: ${text}\nAssistant:`
  }

  const handleSend = async () => {
    const text = inputValue.trim()
    if (!text || isLoading) return

    const userMsg: PremiumChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsLoading(true)

    try {
      if (useGemini) {
        const prompt = buildPrompt(text, messages)
        const response = await callGemini('gemini-1.5-pro', prompt)
        const aiMsg: PremiumChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() }
        setMessages(prev => [...prev, aiMsg])
      } else {
        await new Promise(r => setTimeout(r, 800 + Math.random() * 1200))
        const topic = getTopic(text)
        const response = TOPIC_PROMPTS[topic] || TOPIC_PROMPTS.general
        const aiMsg: PremiumChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() }
        setMessages(prev => [...prev, aiMsg])
      }
    } catch (err) {
      const fallbackResponses: Record<string, string> = {
        greetings: "Hello! 👋 I'm your Premium AI Nutrition Coach. How can I help you today?",
        nutrition: "Great question about nutrition! For optimal protein synthesis, aim for 0.4g/kg per meal across 4-5 meals. In Berlin, the Mensa at TU has excellent lean protein options.",
        training: "Progressive overload is king. For hypertrophy, 6-12 reps at 65-75% 1RM, 3-4 sets per exercise. Recovery is where growth happens!",
        berlin: "Berlin's food scene is amazing for healthy eating! Top picks: Mensa TU, Bio Bowl Charlottenburg, Smoothie Bar Prenzlauer Berg, FitStudio Café.",
        supplements: "Evidence-based stack: Creatine monohydrate 5g daily, Vitamin D3 2000-4000 IU, Omega-3 2-3g EPA/DHA, Magnesium glycinate 400mg.",
        general: "I'm here to help with anything nutrition, training, or wellness related! What specific challenge are you facing?",
      }
      const topic = getTopic(text)
      const aiMsg: PremiumChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: fallbackResponses[topic] || fallbackResponses.general, timestamp: new Date() }
      setMessages(prev => [...prev, aiMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[20px]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="mx-4 max-w-2xl w-full h-[85vh] max-h-[85vh] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111118] shadow-2xl shadow-black/50 backdrop-blur-xl flex flex-col"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 p-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30">
              <Bot className="h-5 w-5 text-white" />
              <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Premium AI Coach</h3>
              <p className="text-xs text-white/50">{useGemini ? 'Gemini-powered • Live responses' : 'Local mode • Fallback responses'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUseGemini(!useGemini)}
              className={cn(
                'rounded-full px-3 py-1 text-[10px] font-semibold transition-all',
                useGemini ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              )}
            >
              {useGemini ? '✓ Gemini' : '⚡ Local'}
            </button>
            <button onClick={onClose} className="rounded-full bg-white/10 p-2 backdrop-blur-sm hover:bg-white/20 transition-colors">
              <X className="h-5 w-5 text-white/60" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 shadow-lg shadow-purple-500/20">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-5 py-3.5',
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/20'
                      : 'bg-white/[0.03] border border-white/[0.08] text-white'
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <p className="mt-1 text-[10px] text-white/30 text-right">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 shadow-lg shadow-pink-500/20">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
                <Brain className="h-4 w-4 text-white animate-pulse" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] px-5 py-3.5">
                <div className="flex gap-1">
                  <motion.div className="h-2 w-2 rounded-full bg-white/40" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                  <motion.div className="h-2 w-2 rounded-full bg-white/40" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                  <motion.div className="h-2 w-2 rounded-full bg-white/40" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                </div>
                <span className="text-[10px] text-white/40 ml-1">Gemini thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Buttons */}
        <div className="px-4 py-3 border-t border-white/[0.08] bg-white/[0.02]">
          <p className="text-xs text-white/40 mb-2 text-center">Quick Topics:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: '🥗 Meal Plan', prompt: 'Create a personalized meal plan for my goals' },
              { label: '🏋️ Training', prompt: 'Design a workout program for muscle gain' },
              { label: '📍 Berlin Spots', prompt: 'Best healthy restaurants near TU Berlin' },
              { label: '💊 Supplements', prompt: 'Which supplements are actually worth it?' },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => {
                  setInputValue(action.prompt)
                  handleSend()
                }}
                className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/70 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-white transition-all"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/[0.08]">
          <div className="flex items-end gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about nutrition, training, Berlin food..."
              className="flex-1 rounded-xl border border-white/[0.08] bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 placeholder:text-white/30"
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <Zap className="h-5 w-5" />
            </motion.button>
          </div>
          <p className="mt-2 text-center text-[10px] text-white/30">
            Premium AI • {useGemini ? 'Gemini-powered' : 'Local fallback'} • Context-aware • Berlin-optimized
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
