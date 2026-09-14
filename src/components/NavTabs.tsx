import { Bot, Map, Users, ClipboardList, Utensils, Heart, Info, LayoutGrid } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavTab {
  id: 'consultant' | 'battle' | 'growth' | 'workshop' | 'platewise' | 'influencer' | 'info' | 'presentation'
  label: string
  icon: React.ElementType
}

const tabs: NavTab[] = [
  { id: 'consultant', label: 'AI Consultant', icon: Bot },
  { id: 'battle', label: 'Berlin Campus', icon: Map },
  { id: 'growth', label: 'Growth Hub', icon: Users },
  { id: 'workshop', label: 'Workshop', icon: ClipboardList },
  { id: 'platewise', label: 'PlateWise', icon: Utensils },
  { id: 'influencer', label: 'Influencers', icon: Heart },
  { id: 'info', label: 'Info', icon: Info },
  { id: 'presentation', label: 'Presentation', icon: LayoutGrid },
]

interface NavTabsProps {
  activeTab: NavTab['id']
  onTabChange: (tab: NavTab['id']) => void
}

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  return (
    <nav className="border-b border-white/[0.05] bg-[#0a0a0f]/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl gap-1 px-4 py-2 sm:px-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                isActive ? 'text-cyan-400' : 'text-[rgba(240,10%,96%,0.4)] hover:text-[rgba(240,10%,96%,0.7)]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/[0.08] to-purple-500/[0.08]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <tab.icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
