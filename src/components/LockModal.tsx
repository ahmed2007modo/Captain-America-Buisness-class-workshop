import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Crown, Users, RefreshCw, Tag, Ticket, Sparkles, X, Copy, CheckCircle, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LockModalProps {
  isOpen: boolean
  onClose: () => void
  onSubscribe: () => void
  onInvite: () => void
  referralCount: number
}

interface Coupon {
  code: string
  discount: number
  label: string
  description: string
  icon: React.ElementType
  color: string
}

const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'BERLIN25', discount: 25, label: 'Berlin Student', description: '25% off for Berlin students', icon: Tag, color: 'from-cyan-500 to-blue-500' },
  { code: 'WEGOVY15', discount: 15, label: 'GLP-1 Community', description: '15% off for GLP-1 followers', icon: Sparkles, color: 'from-emerald-500 to-teal-500' },
  { code: 'FUEL50', discount: 50, label: 'Premium Launch', description: '50% off limited time launch deal', icon: Crown, color: 'from-purple-500 to-pink-500' },
  { code: 'FRIEND30', discount: 30, label: 'Referral Bonus', description: '30% off for referring 3+ friends', icon: Users, color: 'from-amber-500 to-orange-500' },
]

const BASE_PRICE = 9.99

export function LockModal({ isOpen, onClose, onSubscribe, onInvite, referralCount }: LockModalProps) {
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [copiedCode, setCopiedCode] = useState('')
  const [showCoupons, setShowCoupons] = useState(false)

  const remaining = 3 - referralCount

  const discountPercent = appliedCoupon?.discount || 0
  const discountedPrice = useMemo(() => {
    return BASE_PRICE * (1 - discountPercent / 100)
  }, [discountPercent])

  const handleApplyCoupon = () => {
    const coupon = AVAILABLE_COUPONS.find(c => c.code === couponCode.toUpperCase().trim())
    if (coupon) {
      setAppliedCoupon(coupon)
    } else {
      setAppliedCoupon(null)
    }
  }

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const handleSubscribe = () => {
    onSubscribe()
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
        className="mx-4 max-w-lg w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111118] shadow-2xl shadow-black/50 backdrop-blur-xl"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-destructive/30 via-orange-500/20 to-pink-500/20 p-6 text-center overflow-hidden">
          <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 backdrop-blur-sm hover:bg-white/20 transition-colors">
            <X className="h-5 w-5 text-white/60" />
          </button>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.3 }}
            className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-destructive to-orange-500 shadow-lg shadow-red-500/30"
          >
            <Lock className="h-8 w-8 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold text-white">Intense Analysis Locked</h3>
          <p className="mt-2 text-sm text-[rgba(240,10%,96%,0.5)]">Unlock deep insights with a subscription or referral</p>
        </div>

        <div className="p-6 space-y-4">
          {/* Pricing Display */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-md shadow-cyan-500/20">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Subscribe</h4>
                  <p className="text-xs text-[rgba(240,10%,96%,0.4)]">Instant access to all features</p>
                </div>
              </div>
              <div className="text-right">
                {discountPercent > 0 ? (
                  <>
                    <p className="text-xs text-red-400 line-through">${BASE_PRICE.toFixed(2)}</p>
                    <p className="text-2xl font-bold text-emerald-400">${discountedPrice.toFixed(2)}</p>
                  </>
                ) : (
                  <p className="text-2xl font-bold text-white">${BASE_PRICE.toFixed(2)}/mo</p>
                )}
              </div>
            </div>

            {/* Discount Badge */}
            <AnimatePresence>
              {appliedCoupon && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 mb-3"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-400">Coupon Applied: {appliedCoupon.code}</p>
                    <p className="text-[10px] text-emerald-400/70">{appliedCoupon.description} — {appliedCoupon.discount}% off</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button onClick={handleSubscribe} className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-shadow hover:shadow-xl hover:shadow-cyan-500/30">
              {discountPercent > 0 ? `Subscribe @ $${discountedPrice.toFixed(2)}` : 'Subscribe Now'}
            </button>
          </div>

          {/* Coupon Section */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-purple-400" />
                <h4 className="text-sm font-bold text-white">Have a Coupon?</h4>
              </div>
              <button onClick={() => setShowCoupons(!showCoupons)} className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                {showCoupons ? 'Hide' : 'Show Available'} <ChevronRight className="h-3 w-3 inline" />
              </button>
            </div>

            {/* Coupon Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleApplyCoupon() }}
                placeholder="Enter coupon code..."
                className="flex-1 rounded-lg bg-black/30 border border-white/[0.08] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-purple-500/50"
              />
              <button onClick={handleApplyCoupon} className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-xs font-semibold text-white">
                Apply
              </button>
            </div>

            {/* Coupon Validation Feedback */}
            {couponCode && !appliedCoupon && (
              <p className="text-xs text-red-400 mb-2">Invalid coupon code. Please try again.</p>
            )}

            {/* Available Coupons Dropdown */}
            <AnimatePresence>
              {showCoupons && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="space-y-2 overflow-hidden">
                  {AVAILABLE_COUPONS.map((coupon) => {
                    const Icon = coupon.icon
                    const isApplied = appliedCoupon?.code === coupon.code
                    return (
                      <motion.div
                        key={coupon.code}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          'flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all',
                          isApplied ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-white/[0.06] bg-white/[0.02] hover:border-purple-500/30 hover:bg-white/[0.04]'
                        )}
                        onClick={() => { setCouponCode(coupon.code); handleApplyCoupon() }}
                      >
                        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br shrink-0', coupon.color)}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-white text-sm">{coupon.code}</p>
                            {isApplied && <CheckCircle className="h-4 w-4 text-emerald-400" />}
                          </div>
                          <p className="text-[10px] text-white/40">{coupon.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={cn('font-bold text-sm', isApplied ? 'text-emerald-400' : 'text-purple-400')}>-{coupon.discount}%</p>
                          {!isApplied && (
                            <button onClick={(e) => { e.stopPropagation(); handleCopyCoupon(coupon.code) }} className="text-[10px] text-white/40 hover:text-white/70">
                              {copiedCode === coupon.code ? 'Copied!' : <Copy className="h-3 w-3 inline" />}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Invite Friends */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-md shadow-purple-500/20">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Invite Friends</h4>
                <p className="text-xs text-[rgba(240,10%,96%,0.4)]">{remaining} more for FREE Premium</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(referralCount / 3) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <p className="mt-2 text-center text-xs text-[rgba(240,10%,96%,0.4)]">{referralCount}/3 friends invited</p>
            </div>
            <button onClick={onInvite} className="mt-2 w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-shadow hover:shadow-xl hover:shadow-purple-500/30">
              Invite via WhatsApp
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500/[0.08] to-purple-500/[0.08] border border-cyan-500/10 p-3">
            <RefreshCw className="h-4 w-4 animate-spin text-cyan-400" />
            <span className="text-xs text-[rgba(240,10%,96%,0.5)]">Premium unlocks instantly after completing any option</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
