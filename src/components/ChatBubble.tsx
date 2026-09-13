import { motion } from 'framer-motion'
import { Bot, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  type?: 'text' | 'widget' | 'card'
  widgetData?: {
    type: 'metric' | 'insight' | 'question' | 'menu'
    title: string
    value?: string
    options?: string[]
    menus?: { name: string; calories: string; protein: string; spot: string }[]
  }
}

interface ChatBubbleProps {
  message: Message
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}
    >
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 shadow-lg shadow-cyan-500/20">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-5 py-3.5',
          isUser
            ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/20'
            : 'glass-strong text-foreground'
        )}
      >
        <p className={cn('text-sm leading-relaxed whitespace-pre-wrap', isUser ? '' : 'text-[rgba(240,10%,96%,0.9)]')}>{message.content}</p>
        {message.type === 'widget' && message.widgetData?.type === 'metric' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 flex gap-3 rounded-xl bg-black/60 p-4 border border-white/10"
          >
            {[
              { icon: '📊', label: 'AI Score', value: message.widgetData.value },
              { icon: '🍗', label: 'Protein', value: '120g' },
              { icon: '🔥', label: 'Calories', value: '2200' },
            ].map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-lg">{m.icon}</span>
                <span className="text-sm font-bold text-white">{m.value}</span>
                <span className="text-[10px] text-[rgba(240,10%,96%,0.4)]">{m.label}</span>
              </div>
            ))}
          </motion.div>
        )}
        {message.type === 'widget' && message.widgetData?.type === 'menu' && (
          <div className="mt-4 space-y-2">
            {message.widgetData.menus?.map((menu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between rounded-xl bg-black/30 border border-white/[0.06] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{menu.name}</p>
                  <p className="text-xs text-[rgba(240,10%,96%,0.4)]">{menu.spot} • Berlin</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-cyan-400">{menu.calories}</p>
                  <p className="text-[10px] text-purple-400">{menu.protein}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {message.type === 'widget' && message.widgetData?.type === 'question' && (
          <div className="mt-4 space-y-2.5">
            {message.widgetData.options?.map((option, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="block w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-left text-sm text-[rgba(240,10%,96%,0.8)] backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-cyan-500/[0.05] hover:text-white"
              >
                {option}
              </motion.button>
            ))}
          </div>
        )}
      </div>
      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 shadow-lg shadow-pink-500/20">
          <Send className="h-3 w-3 text-white" />
        </div>
      )}
    </motion.div>
  )
}
