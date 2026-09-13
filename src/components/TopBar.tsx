import { motion } from 'framer-motion'
import { Zap, Crown, MapPin, Trophy, Sun, Moon } from 'lucide-react'

interface TopBarProps {
  streak: number
  vipRank: string
  university: string
  darkMode: boolean
  onToggleDarkMode: () => void
  onOpenLeaderboard: () => void
}

export function TopBar({ streak, vipRank, university, darkMode, onToggleDarkMode, onOpenLeaderboard }: TopBarProps) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#0a0a0f]/80 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 px-3 py-1.5 border border-cyan-500/10">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">🔥 {streak}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-3 py-1.5 border border-purple-500/10">
            <Crown className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">{vipRank}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] px-3 py-1.5 border border-white/[0.06]">
          <MapPin className="h-4 w-4 text-[rgba(240,10%,96%,0.4)]" />
          <span className="text-sm font-medium text-[rgba(240,10%,96%,0.7)]">{university}</span>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenLeaderboard}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30"
          >
            <Trophy className="h-4 w-4" />
            Leaderboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleDarkMode}
            className="rounded-xl p-2 transition-colors hover:bg-[rgba(255,255,255,0.05)]"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-[rgba(240,10%,96%,0.6)]" />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
