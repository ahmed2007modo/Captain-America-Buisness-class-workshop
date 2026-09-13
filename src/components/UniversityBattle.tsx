import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, MapPin, ChevronRight, X, BarChart2, Users, Award, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

interface University {
  name: string
  shortName: string
  score: number
  color: string
  students: number
  rank: number
  description: string
}

const berlinUniversities: University[] = [
  { name: 'Charité', shortName: 'CH', score: 1350, color: '#00897B', students: 8500, rank: 1, description: 'Europe\'s largest university hospital - leading in medical research and health innovation' },
  { name: 'TU Berlin', shortName: 'TU', score: 1245, color: '#E53935', students: 35000, rank: 2, description: 'Technical University - engineering excellence and startup ecosystem leader' },
  { name: 'HU Berlin', shortName: 'HU', score: 1180, color: '#1E88E5', students: 38000, rank: 3, description: 'Humboldt University - research-intensive with strong humanities and sciences' },
  { name: 'FU Berlin', shortName: 'FU', score: 1090, color: '#43A047', students: 32000, rank: 4, description: 'Free University - political science, international relations, and life sciences' },
  { name: 'HTW Berlin', shortName: 'HTW', score: 975, color: '#FB8C00', students: 14000, rank: 5, description: 'University of Applied Sciences - practice-oriented engineering and business' },
  { name: 'BHT Berlin', shortName: 'BHT', score: 860, color: '#8E24AA', students: 12000, rank: 6, description: 'Berlin University of Applied Sciences - technology, design, and life sciences' },
  { name: 'GISMA', shortName: 'GISMA', score: 720, color: '#00B4D8', students: 2500, rank: 7, description: 'Business school - international management and digital transformation' },
  { name: 'HWR Berlin', shortName: 'HWR', score: 680, color: '#7B1FA2', students: 11000, rank: 8, description: 'Berlin School of Economics and Law - business, law, and public administration' },
]

const GOAL = 1000
const OVERALL_PROGRESS = 780

interface UniversityBattleProps {
  userUniversity: string
  onMobilize: () => void
}

export function UniversityBattle({ userUniversity, onMobilize }: UniversityBattleProps) {
  const userUni = berlinUniversities.find((u) => u.name === userUniversity)
  const userScore = userUni?.score || 0
  const goalProgress = Math.min((OVERALL_PROGRESS / GOAL) * 100, 100)
  const [selectedUni, setSelectedUni] = React.useState<University | null>(null)

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/[0.08] via-purple-500/[0.04] to-pink-500/[0.08] border border-cyan-500/20 p-6 backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(185,255,0,0.05),transparent_50%)]" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Berlin Campus Battle</h2>
          </div>
          <p className="text-sm text-[rgba(240,10%,96%,0.5)]">
            First Berlin campus to hit{' '}
            <span className="font-bold text-cyan-400">1,000 signups</span> unlocks 30% OFF at partner Berlin cafés, Mensas, and gyms! 🏆
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[rgba(240,10%,96%,0.7)]">Overall Goal Progress</span>
              <span className="font-bold text-cyan-400">{OVERALL_PROGRESS}/{GOAL} users</span>
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${goalProgress}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-[rgba(240,10%,96%,0.3)]">
              <span>🌍</span>
              <span>{Math.round(goalProgress)}% complete — {GOAL - OVERALL_PROGRESS} more needed!</span>
            </div>
          </div>

          {userUni && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex items-center gap-3 rounded-xl bg-black/40 border border-white/[0.06] p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white shadow-lg" style={{ backgroundColor: userUni.color }}>
                {userUni.shortName}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Your Campus: {userUni.name}</p>
                <p className="text-xs text-[rgba(240,10%,96%,0.4)]">{userUni.score} signups • Rank #{userUni.rank}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-cyan-400">+{userScore}</p>
                <p className="text-xs text-[rgba(240,10%,96%,0.3)]">points</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-[rgba(240,10%,96%,0.4)] uppercase tracking-wider">Berlin University Rankings</h3>
          <div className="flex items-center gap-2 text-xs text-[rgba(240,10%,96%,0.5)]">
            <BarChart2 className="h-3 w-3" />
            <span>Click any university to view detailed progress</span>
          </div>
        </div>
        <div className="space-y-2">
          {berlinUniversities.map((uni, i) => {
            const isUser = uni.name === userUniversity
            const isNearGoal = uni.score >= GOAL
            const progress = Math.min((uni.score / GOAL) * 100, 100)
            return (
              <motion.div
                key={uni.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.01, x: 2 }}
                onClick={() => setSelectedUni(uni)}
                className={cn(
                  'flex items-center gap-3 rounded-xl border p-3 transition-all backdrop-blur-sm cursor-pointer',
                  isUser
                    ? 'border-cyan-500/30 bg-cyan-500/[0.05] shadow-md shadow-cyan-500/10'
                    : 'border-white/[0.04] bg-[rgba(255,255,255,0.02)] hover:border-cyan-500/20 hover:bg-[rgba(255,255,255,0.04)]'
                )}
              >
                <span className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
                  i < 3 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm' : 'bg-[rgba(255,255,255,0.06)] text-[rgba(240,10%,96%,0.4)]'
                )}>
                  {i + 1}
                </span>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: uni.color }}
                >
                  {uni.shortName}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-medium truncate', isUser ? 'text-cyan-400' : 'text-[rgba(240,10%,96%,0.8)]')}>
                    {uni.name}
                    {isUser && <span className="ml-1 text-xs text-cyan-400">(You)</span>}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-xs font-bold text-white w-16 text-right">{uni.score}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[rgba(240,10%,96%,0.4)]">{progress.toFixed(0)}% to goal</p>
                  {isNearGoal && <span className="text-xs text-cyan-400">🟢 Goal Reached!</span>}
                </div>
                <ChevronRight className="h-4 w-4 text-[rgba(240,10%,96%,0.3)]" />
              </motion.div>
            )
          })}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onMobilize}
        className="relative overflow-hidden flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/40 active:scale-[0.98]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_60%)]" />
        <MapPin className="h-5 w-5 relative z-10" />
        <span className="relative z-10">Mobilize My Campus — Share on WhatsApp</span>
      </motion.button>

      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-[rgba(240,10%,96%,0.4)] uppercase tracking-wider">Partner Perks Preview</h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { name: 'Berlin Café Mocha', discount: '30% OFF', color: '#6D4C41' },
            { name: 'Mensa TU Berlin', discount: '25% OFF', color: '#E53935' },
            { name: 'FitStudio Kreuzberg', discount: '35% OFF', color: '#00B4D8' },
            { name: 'Smoothie Bar Prenzl.', discount: '20% OFF', color: '#43A047' },
          ].map((perk) => (
            <div key={perk.name} className="flex items-center gap-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-white/[0.04] p-3">
              <div className="h-7 w-7 rounded-lg" style={{ backgroundColor: perk.color }} />
              <div className="flex-1">
                <p className="text-xs font-medium text-[rgba(240,10%,96%,0.8)]">{perk.name}</p>
                <p className="text-xs font-bold" style={{ color: perk.color }}>{perk.discount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* University Detail Modal */}
      <AnimatePresence>
        {selectedUni && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[20px] p-4"
            onClick={() => setSelectedUni(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.08] bg-[#111118] shadow-2xl shadow-black/50 backdrop-blur-xl"
            >
              <div className="relative bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 p-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(185,255,0,0.1),transparent_60%)]" />
                <button
                  onClick={() => setSelectedUni(null)}
                  className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }} className="text-white/60">
                    <X className="h-5 w-5" />
                  </motion.div>
                </button>
                <div className="relative flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg" style={{ backgroundColor: selectedUni.color }}>
                    <span className="text-xl font-bold text-white">{selectedUni.shortName}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedUni.name}</h3>
                    <p className="text-sm text-[rgba(240,10%,96%,0.5)]">Rank #{selectedUni.rank} in Berlin</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-black/30 border border-white/[0.06] p-4 text-center">
                    <p className="text-3xl font-bold text-cyan-400">{selectedUni.score}</p>
                    <p className="text-xs text-[rgba(240,10%,96%,0.4)] uppercase tracking-wider">Signups</p>
                  </div>
                  <div className="rounded-xl bg-black/30 border border-white/[0.06] p-4 text-center">
                    <p className="text-3xl font-bold text-purple-400">{selectedUni.students.toLocaleString()}</p>
                    <p className="text-xs text-[rgba(240,10%,96%,0.4)] uppercase tracking-wider">Students</p>
                  </div>
                  <div className="rounded-xl bg-black/30 border border-white/[0.06] p-4 text-center">
                    <p className="text-3xl font-bold text-pink-400">{Math.min((selectedUni.score / GOAL) * 100, 100).toFixed(0)}%</p>
                    <p className="text-xs text-[rgba(240,10%,96%,0.4)] uppercase tracking-wider">To Goal</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[rgba(240,10%,96%,0.7)]">Progress to 1,000 Goal</span>
                    <span className="text-sm font-bold text-cyan-400">{selectedUni.score}/{GOAL}</span>
                  </div>
                  <div className="flex h-3 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((selectedUni.score / GOAL) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-black/30 border border-white/[0.06] p-4">
                  <p className="text-sm text-[rgba(240,10%,96%,0.8)]">{selectedUni.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Users, label: 'Students', value: selectedUni.students.toLocaleString() },
                    { icon: Award, label: 'Rank', value: `#${selectedUni.rank}` },
                    { icon: Target, label: 'Score', value: selectedUni.score },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col items-center gap-1 rounded-xl bg-black/30 border border-white/[0.06] p-4 text-center"
                    >
                      <stat.icon className="h-5 w-5 text-cyan-400" />
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-[rgba(240,10%,96%,0.4)]">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}