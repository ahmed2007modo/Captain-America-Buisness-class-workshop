import { forwardRef, useImperativeHandle, useRef } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Clock, Sparkles, Check } from 'lucide-react'

export interface ResultCardHandle {
  exportCard: () => void
  getDomElement: () => HTMLDivElement | null
}

interface ResultCardProps {
  isOpen: boolean
  onClose: () => void
  onExport: () => void
  metrics: {
    score: number
    protein: string
    calories: string
    category: string
    personality: string
    recommendation: string
  }
  referralLink: string
}

export const ResultCard = forwardRef<ResultCardHandle, ResultCardProps>(({ isOpen, onClose, onExport, metrics, referralLink }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => ({ exportCard: onExport, getDomElement: () => innerRef.current }))

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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        data-export="result-card"
        ref={innerRef}
        className="mx-4 max-w-lg w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111118] shadow-2xl shadow-black/50 backdrop-blur-xl"
      >
        <div className="relative bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 p-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(185,255,0,0.1),transparent_60%)]" />
          <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 backdrop-blur-sm hover:bg-white/20 transition-colors">
            <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }} className="text-white/60">✕</motion.div>
          </button>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.3 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/30"
          >
            <Sparkles className="h-8 w-8 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold gradient-text">Your Nutrition Profile</h3>
          <p className="mt-1 text-sm text-[rgba(240,10%,96%,0.5)]">AI Assessment Results</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: TrendingUp, label: 'AI Score', value: metrics.score, color: 'text-cyan-400', bg: 'from-cyan-500/10 to-emerald-500/10' },
              { icon: Target, label: 'Protein', value: metrics.protein, color: 'text-purple-400', bg: 'from-purple-500/10 to-pink-500/10' },
              { icon: Clock, label: 'Calories', value: metrics.calories, color: 'text-pink-400', bg: 'from-pink-500/10 to-red-500/10' },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center rounded-xl bg-gradient-to-br ${m.bg} p-4 border border-white/[0.04]`}
              >
                <m.icon className={`mb-2 h-6 w-6 ${m.color}`} />
                <span className="text-2xl font-bold text-white">{m.value}</span>
                <span className="text-xs text-[rgba(240,10%,96%,0.4)]">{m.label}</span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-4 border border-white/[0.04]"
            >
              <span className="text-lg font-bold text-cyan-400">{metrics.category}</span>
              <span className="text-xs text-[rgba(240,10%,96%,0.4)]">Category</span>
            </motion.div>
          </div>

          <div className="rounded-xl bg-[rgba(255,255,255,0.03)] border border-white/[0.06] p-4">
            <p className="text-sm text-[rgba(240,10%,96%,0.8)]">💡 {metrics.recommendation}</p>
          </div>

          <div className="rounded-xl bg-[rgba(255,255,255,0.03)] border border-white/[0.06] p-3">
            <p className="mb-2 text-xs font-semibold text-[rgba(240,10%,96%,0.4)] uppercase tracking-wider">Share Your Profile</p>
            <div className="flex items-center gap-2">
              <input type="text" value={referralLink} readOnly className="flex-1 truncate rounded-lg bg-black/50 px-3 py-2.5 text-xs text-[rgba(240,10%,96%,0.7)] outline-none border border-white/[0.06]" />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onExport} className="flex items-center gap-1 rounded-lg bg-cyan-500/20 px-4 py-2.5 text-xs font-semibold text-cyan-400 transition-colors hover:bg-cyan-500/30">
                <Check className="h-3 w-3" /> Export
              </motion.button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExport}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-shadow hover:shadow-xl hover:shadow-cyan-500/40"
          >
            <TrendingUp className="h-4 w-4" /> Export & Share Card
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
})

ResultCard.displayName = 'ResultCard'