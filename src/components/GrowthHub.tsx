import { motion } from 'framer-motion'
import { Link2, MessageCircle, Copy, Check, Shield, Zap, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GrowthHubProps {
  referralCount: number
  isPremiumUnlocked: boolean
  referralLink: string
  onCopyLink: () => void
  onWhatsAppInvite: () => void
  onSubscribe: () => void
}

export function GrowthHub({ referralCount, isPremiumUnlocked, referralLink, onCopyLink, onWhatsAppInvite, onSubscribe }: GrowthHubProps) {
  const remaining = 3 - referralCount
  const progress = (referralCount / 3) * 100

  const perks = [
    { name: 'Deep Macro Matrix', icon: Zap, unlocked: isPremiumUnlocked },
    { name: 'VIP Berlin Coach', icon: Star, unlocked: isPremiumUnlocked },
    { name: 'Custom Meal Plans', icon: Shield, unlocked: isPremiumUnlocked },
  ]

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/[0.08] via-purple-500/[0.04] to-cyan-500/[0.08] border border-cyan-500/20 p-6 backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(185,255,0,0.05),transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-bold text-white">Your Growth Hub</h2>
          <p className="mt-1 text-sm text-[rgba(240,10%,96%,0.5)]">Invite friends to unlock premium features free! 🚀</p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[rgba(240,10%,96%,0.8)]">{referralCount}/3 friends invited</span>
              <span className={cn('font-bold', remaining === 0 ? 'text-cyan-400' : 'text-[rgba(240,10%,96%,0.4)]')}>
                {remaining === 0 ? '🎉 UNLOCKED!' : `${remaining} remaining`}
              </span>
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>

          {!isPremiumUnlocked && (
            <div className="mt-5 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSubscribe}
                className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-shadow hover:shadow-xl hover:shadow-cyan-500/30"
              >
                Subscribe to Premium
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onWhatsAppInvite}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-shadow hover:shadow-xl hover:shadow-purple-500/30"
              >
                <MessageCircle className="h-5 w-5" />
                Invite Friends via WhatsApp
              </motion.button>
            </div>
          )}

          {isPremiumUnlocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 py-3"
            >
              <Check className="h-5 w-5 text-cyan-400" />
              <span className="text-sm font-bold text-cyan-400">Premium Unlocked! Enjoy all features.</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-[rgba(240,10%,96%,0.4)] uppercase tracking-wider">Your Referral Link</h3>
        <div className="flex items-center gap-2 rounded-xl bg-[rgba(255,255,255,0.03)] border border-white/[0.06] p-3">
          <Link2 className="h-4 w-4 shrink-0 text-[rgba(240,10%,96%,0.3)]" />
          <input type="text" value={referralLink} readOnly className="flex-1 truncate bg-transparent text-xs text-[rgba(240,10%,96%,0.6)] outline-none" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCopyLink}
            className="flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-400 transition-colors hover:bg-cyan-500/20"
          >
            <Copy className="h-3 w-3" /> Copy
          </motion.button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-[rgba(240,10%,96%,0.4)] uppercase tracking-wider">Unlocked Perks</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border p-4 text-center backdrop-blur-sm',
                perk.unlocked
                  ? 'border-cyan-500/20 bg-cyan-500/[0.05] shadow-sm'
                  : 'border-white/[0.06] bg-[rgba(255,255,255,0.02)]'
              )}
            >
              <perk.icon className={cn('h-6 w-6', perk.unlocked ? 'text-cyan-400' : 'text-[rgba(240,10%,96%,0.2)]')} />
              <span className={cn('text-xs font-medium', perk.unlocked ? 'text-[rgba(240,10%,96%,0.8)]' : 'text-[rgba(240,10%,96%,0.2)]')}>{perk.name}</span>
              {perk.unlocked && <Check className="h-3 w-3 text-cyan-400" />}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
