import { motion } from 'framer-motion'
import { Download, Share2, X, CheckCircle, Clock, TrendingUp } from 'lucide-react'

interface ShareCardProps {
  isOpen: boolean
  onClose: () => void
  metrics: {
    score: number
    insights: number
    recommendations: number
    personality: string
    category: string
  }
  referralLink: string
}

export function ShareCard({ isOpen, onClose, metrics, referralLink }: ShareCardProps) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="mx-4 max-w-lg w-full overflow-hidden rounded-2xl bg-card shadow-2xl border border-border/50"
      >
        <div className="relative bg-gradient-to-br from-primary to-accent p-6 text-center text-primary-foreground">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-1 hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button>
          <h3 className="mb-2 text-xl font-bold">Your AI Assessment Results</h3>
          <p className="text-sm opacity-80">Share your profile with your network</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center rounded-xl bg-muted/50 p-3">
              <TrendingUp className="mb-2 h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-foreground">{metrics.score}</span>
              <span className="text-xs text-muted-foreground">Score</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-muted/50 p-3">
              <CheckCircle className="mb-2 h-6 w-6 text-accent" />
              <span className="text-2xl font-bold text-foreground">{metrics.insights}</span>
              <span className="text-xs text-muted-foreground">Insights</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-muted/50 p-3">
              <Clock className="mb-2 h-6 w-6 text-secondary" />
              <span className="text-2xl font-bold text-foreground">{metrics.recommendations}</span>
              <span className="text-xs text-muted-foreground">Tips</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Category:</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {metrics.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Profile:</span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                {metrics.personality}
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-muted/50 p-3">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Share Link</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 truncate rounded-lg bg-background px-3 py-2 text-xs text-foreground outline-none"
              />
              <button className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
                Copy
              </button>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
            >
              <Download className="h-4 w-4" />
              Download Card
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground"
            >
              <Share2 className="h-4 w-4" />
              Share
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
