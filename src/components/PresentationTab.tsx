import { motion } from 'framer-motion'
import { Utensils, Check, Upload, ScanLine, Target, Shield, Layers, Users2, TrendingUp } from 'lucide-react'

const PRESENTER_IMAGES = {
  ahmed: '/Presentation/Picture/Ahmed.jpg',
  mostafa: '/Presentation/Picture/Mostafa.png',
  abdElrahman: '/Presentation/Picture/Abd-Elrahman.jpeg',
}

const PRESENTERS = [
  { name: 'Ahmed', role: 'Founder & AI Product Lead', image: PRESENTER_IMAGES.ahmed, accent: 'from-cyan-500 to-blue-500', glow: 'group-hover:border-cyan-500/50', badgeBg: 'bg-cyan-500/10', badgeText: 'text-cyan-400' },
  { name: 'Mostafa', role: 'Growth & Strategy Lead', image: PRESENTER_IMAGES.mostafa, accent: 'from-purple-500 to-pink-500', glow: 'group-hover:border-purple-500/50', badgeBg: 'bg-purple-500/10', badgeText: 'text-purple-400' },
  { name: 'Abd-Elrahman', role: 'Systems & Technical Architect', image: PRESENTER_IMAGES.abdElrahman, accent: 'from-emerald-500 to-teal-500', glow: 'group-hover:border-emerald-500/50', badgeBg: 'bg-emerald-500/10', badgeText: 'text-emerald-400' },
]

const DECK_OVERVIEW = [
  { icon: Upload, slide: 'Core Idea', desc: '3-step decision journey: Plan ahead, confirm at the table, stay aligned with goals.', color: 'text-cyan-400' },
  { icon: Target, slide: 'Market & Positioning', desc: 'Comparisons against tracker and delivery competitors with clear strategic gaps.', color: 'text-purple-400' },
  { icon: Shield, slide: 'Defensibility', desc: 'Plan-Ahead, Berlin-native, GDPR-first, and occasion-sensitive moats.', color: 'text-emerald-400' },
  { icon: Users2, slide: 'ICPs & Personas', desc: 'Michael and Andrea — corporate dining and GLP-1 aligned buyer profiles.', color: 'text-amber-400' },
  { icon: Layers, slide: 'Business Model & GTM', desc: 'Freemium + €9.99 premium, Berlin zero-paid pilot (~103 downloads, 62 activated, 3 paying).', color: 'text-pink-400' },
  { icon: TrendingUp, slide: 'Growth & Expansion', desc: '"Table for Two" referrals and a 4-stage DACH-scaling timeline.', color: 'text-teal-400' },
]

const goals = ['Weight', 'Glucose', 'Protein', 'GLP-1']

export function PresentationTab() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Hero Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/[0.08] p-6 sm:p-8">
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/20">
              <Utensils className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">PlateWise — AI Dining Decision Coach</h2>
              <p className="text-sm text-white/60">Pitch Deck & Documentation</p>
            </div>
          </div>
          <div className="relative z-10 mt-4 flex flex-wrap gap-2">
            {goals.map((g) => (
              <span key={g} className="rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">{g}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Team Profile Cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRESENTERS.map((presenter, index) => (
          <motion.div key={presenter.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }} whileHover={{ scale: 1.03 }} className={`group rounded-2xl border border-white/[0.08] bg-slate-900/60 backdrop-blur-md p-5 ${presenter.glow} hover:shadow-lg hover:shadow-cyan-500/10 transition-all`}>
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img src={presenter.image} alt={presenter.name} className="h-16 w-16 rounded-full object-cover border-2 border-white/[0.1] group-hover:border-cyan-500/50 transition-colors" />
                <div className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br ${presenter.accent} border-2 border-[#111118]`}>
                  <Check className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white text-sm">{presenter.name}</p>
                <p className="text-xs text-white/50">{presenter.role}</p>
                <div className={`mt-1.5 inline-flex items-center gap-1 rounded-full ${presenter.badgeBg} px-2 py-0.5 text-[10px] font-semibold ${presenter.badgeText}`}>
                  <Check className="h-3 w-3" /> Verified
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Deck Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
        <div className="flex items-center gap-2 mb-4">
          <ScanLine className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">Deck Overview</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DECK_OVERVIEW.map((d, i) => {
            const Icon = d.icon
            return (
              <motion.div key={d.slide} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:border-cyan-500/20 transition-all">
                <div className="flex items-center gap-2 mb-2"><Icon className={`h-4 w-4 ${d.color}`} /><p className="text-sm font-bold text-white">{d.slide}</p></div>
                <p className="text-xs text-white/60 leading-relaxed">{d.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}