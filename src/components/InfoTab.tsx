import { motion } from 'framer-motion'
import {
  Utensils, Target, Shield, Users, Sparkles, Layers, TrendingUp, RefreshCw,
  Check, CalendarClock, Smartphone, Lock, Building2, Activity, Goal,
  Link2, QrCode, Repeat, MapPin
} from 'lucide-react'

const stepJourney = [
  {
    icon: CalendarClock, step: '01', label: 'Decide before you arrive',
    tag: 'PLAN AHEAD', note: 'Upload restaurant URL, PDF, or menu photo before you go.',
    color: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400',
  },
  {
    icon: Smartphone, step: '02', label: 'Confirm at the table',
    tag: 'OCCASION-SENSITIVE', note: 'Scan menu on-site in seconds, adapted for business, casual, or family dining.',
    color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', text: 'text-purple-400',
  },
  {
    icon: Lock, step: '03', label: 'Stay aligned with your goals',
    tag: 'GDPR-FIRST · BERLIN-NATIVE', note: 'Supports Weight, Glucose, Protein, or GLP-1 with German dish names, EU allergen rules, and minimal data collection.',
    color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400',
  },
]

const marketMatrix = [
  { name: 'PlateWise', rows: ['Pre-visit URL/PDF/Photo + At-table scan', 'Decision support', 'High local relevance'], highlight: true },
  { name: 'Snackly', rows: ['Scan-first', 'Limited pre-visit'] },
  { name: 'Dishup', rows: ['Goal-based ranking', 'Limited pre-visit'] },
  { name: 'MyFitnessPal / Cal AI', rows: ['Photo recognition / post-meal tracking'] },
  { name: 'YAZIO', rows: ['Nutrition tracking', 'No restaurant planning focus'] },
]

const moats = [
  { icon: CalendarClock, title: 'Plan-Ahead', desc: 'Pre-visit decision loop before ordering pressure hits.', color: 'text-cyan-400' },
  { icon: MapPin, title: 'German / Berlin Native', desc: 'Local dish names, EU allergen laws, and German dining culture.', color: 'text-emerald-400' },
  { icon: Lock, title: 'GDPR-First', desc: 'Minimal data collection, EU-hosted infrastructure from day one.', color: 'text-amber-400' },
  { icon: Layers, title: 'Occasion Sensitivity', desc: 'Tailored options for business dinners, family, or solo dining.', color: 'text-purple-400' },
]

const personas = [
  {
    name: 'Michael', age: 44, role: 'Senior Consultant / Team Lead',
    profile: 'Needs fast glucose and weight-smart choices during corporate dinners.',
    accent: 'from-cyan-500 to-blue-500', badge: 'Cyan',
    jtbd: ['Pick a goal-compliant dinner fast', 'Stay low-glycemic through client nights'],
    pains: ['Decision paralysis under time pressure', 'No appetite-destroying afterthoughts'],
    gains: ['Confident order without menu research', 'Steady glucose across long dinners'],
  },
  {
    name: 'Andrea', age: 51, role: 'Lawyer (GLP-1 User)',
    profile: 'Needs protein-dense, high-value choices for reduced appetite.',
    accent: 'from-purple-500 to-pink-500', badge: 'Purple',
    jtbd: ['Hit protein targets with small portions', 'Avoid nausea triggers while dining out'],
    pains: ['Reduced appetite vs. protein needs', 'Restaurants rarely show macro detail'],
    gains: ['Packed protein in compact plates', 'Silent, discreet ordering'],
  },
]

const bmc = [
  { icon: Building2, title: 'Key Partners', items: ['Berlin restaurants', 'Gyms & dietitians', 'Coworking networks', 'EU cloud hosts'], color: 'text-cyan-400' },
  { icon: Activity, title: 'Key Activities', items: ['AI menu analysis', 'Local menu graph', 'Zero-paid GTM testing'], color: 'text-purple-400' },
  { icon: Goal, title: 'Value Proposition', items: ['90-second automated goal matching', 'Privacy-first design'], color: 'text-emerald-400' },
  { icon: Users, title: 'Customer Segments', items: ['Primary: Berlin professionals (38–55)', 'Secondary: GLP-1 & glucose tracking adults'], color: 'text-amber-400' },
  { icon: Link2, title: 'Channels', items: ['Coworking hubs', 'QR code promos', 'Organic referrals'], color: 'text-pink-400' },
  { icon: Sparkles, title: 'Revenue Model', items: ['Freemium', 'Premium subscription (€9.99/mo)'], color: 'text-teal-400' },
]

const launchChannels = [
  { name: 'Startups.Berlin', value: '~34' },
  { name: 'Business-Netzwerken', value: '~26' },
  { name: 'betahaus Berlin', value: '~21' },
  { name: 'GrowFirma', value: '~13' },
  { name: 'Biohackers Berlin', value: '~9' },
]

const funnel = [
  { label: '103 Downloads', tag: 'Acquisition', width: '100%', color: 'from-cyan-400 to-blue-500' },
  { label: '62 Activated Users', tag: 'First restaurant decision', width: '60%', color: 'from-purple-400 to-pink-500' },
  { label: '3 Paying Users', tag: '2.9% baseline conversion', width: '3%', color: 'from-emerald-400 to-teal-500' },
]

const referralSteps = [
  'Invite a colleague',
  'Invitee completes first recommendation',
  'Both unlock 7 days Premium',
]

export function InfoTab() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Section 1: Hero & Core Idea */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/[0.08] p-6 sm:p-8">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/20">
                <Utensils className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">PlateWise — Berlin Go-to-Market Strategy</h2>
                <p className="text-sm text-white/60">Group 7 · Captain America · B119</p>
              </div>
            </div>
            <p className="max-w-2xl text-base italic text-white/80">"Every restaurant menu, matched to your nutritional needs and goals — before and when you dine."</p>
          </div>
        </div>
      </motion.div>

      {/* 3-Step Decision Journey */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
        <div className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
          <h3 className="flex items-center gap-2 mb-5 text-lg font-bold text-white"><RefreshCw className="h-5 w-5 text-cyan-400" /> 3-Step Decision Journey</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {stepJourney.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }} className={`rounded-xl bg-gradient-to-br ${s.color} border ${s.border} p-5`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Icon className={`h-5 w-5 ${s.text}`} /></div>
                    <span className="font-mono text-2xl font-bold text-white/20">{s.step}</span>
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-1 text-white/50">{s.tag}</p>
                  <p className="font-bold text-white">{s.label}</p>
                  <p className="mt-1 text-xs text-white/60">{s.note}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Section 2: Market & Positioning Matrix */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
        <div className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
          <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white"><Target className="h-5 w-5 text-cyan-400" /> Market & Positioning Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Player</th>
                  <th className="text-left py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Positioning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {marketMatrix.map((row, i) => (
                  <motion.tr key={row.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.05 }} className={row.highlight ? 'bg-cyan-500/[0.04] hover:bg-cyan-500/[0.06]' : 'hover:bg-white/[0.02]'} style={{ transition: 'background-color .2s' }}>
                    <td className="py-3 font-semibold text-white">{row.name}</td>
                    <td className="py-3">
                      <ul className="flex flex-wrap gap-1.5">
                        {row.rows.map((r, j) => (
                          <li key={j} className={`rounded-full px-2 py-0.5 text-[11px] ${row.highlight ? 'bg-cyan-500/10 text-cyan-400' : 'bg-white/[0.04] text-white/60'}`}>{r}</li>
                        ))}
                      </ul>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Section 3: Defensibility */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
        <div className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
          <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white"><Shield className="h-5 w-5 text-cyan-400" /> Defensibility — 4 Strategic Moats</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {moats.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div key={m.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:border-cyan-500/20 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06]"><Icon className={`h-5 w-5 ${m.color}`} /></div>
                    <p className="font-semibold text-white">{m.title}</p>
                  </div>
                  <p className="text-xs text-white/50">{m.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Section 4: Personas */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }}>
        <div className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
          <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white"><Users className="h-5 w-5 text-cyan-400" /> Customer Personas & Value (ICP)</h3>
          <div className="grid gap-4 lg:grid-cols-2">
            {personas.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${p.accent}`}>
                      <span className="font-bold text-white">{p.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-bold text-white">{p.name} ({p.age})</p>
                      <p className="text-xs text-white/50">{p.role}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-400 flex items-center gap-1"><Check className="h-3 w-3" /> {p.badge}</span>
                </div>
                <p className="text-sm text-white/70 mb-3">{p.profile}</p>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div className="rounded-lg bg-cyan-500/5 border border-cyan-500/10 p-2">
                    <p className="font-semibold text-cyan-400 mb-1">Jobs</p>
                    {p.jtbd.map((j, k) => <p key={k} className="text-white/60 leading-snug">{j}</p>)}
                  </div>
                  <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-2">
                    <p className="font-semibold text-red-400 mb-1">Pains</p>
                    {p.pains.map((j, k) => <p key={k} className="text-white/60 leading-snug">{j}</p>)}
                  </div>
                  <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-2">
                    <p className="font-semibold text-emerald-400 mb-1">Gains</p>
                    {p.gains.map((j, k) => <p key={k} className="text-white/60 leading-snug">{j}</p>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Section 5: Positioning & Elevator Pitch */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }}>
        <div className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
          <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white"><Sparkles className="h-5 w-5 text-cyan-400" /> Positioning & Elevator Pitch</h3>
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 p-4">
              <p className="text-xs font-semibold text-cyan-400 mb-1">Elevator Pitch</p>
              <p className="text-sm text-white/80 italic">"For busy, health-conscious professionals in Berlin, PlateWise is an AI dining decision coach..."</p>
            </div>
            <div className="rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-4">
              <p className="text-xs font-semibold text-purple-400 mb-1">Positioning Statement & USP</p>
              <p className="text-sm text-white/80">Plan ahead before you arrive, get fast confirmation at the table.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Weight', 'Glucose', 'Protein', 'GLP-1'].map((g) => (
                <span key={g} className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">{g}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section 6: Business Model Canvas */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.4 }}>
        <div className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
          <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white"><Layers className="h-5 w-5 text-cyan-400" /> Business Model Canvas</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bmc.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div key={b.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.05 }} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                  <div className="flex items-center gap-2 mb-2"><Icon className={`h-4 w-4 ${b.color}`} /><p className="text-sm font-bold text-white">{b.title}</p></div>
                  <ul className="space-y-1">
                    {b.items.map((it, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-xs text-white/60">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />{it}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Section 7: GTM Launch & Funnel */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.4 }}>
        <div className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
          <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white"><TrendingUp className="h-5 w-5 text-cyan-400" /> GTM Berlin Launch & Conversion Funnel</h3>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
              <p className="text-sm font-semibold text-white mb-3">5 Launch Channels</p>
              <div className="space-y-2">
                {launchChannels.map((c, i) => (
                  <div key={c.name} className="flex items-center justify-between rounded-lg bg-black/30 border border-white/[0.05] px-3 py-2">
                    <span className="flex items-center gap-2 text-sm text-white/80"><span className="font-mono text-xs text-cyan-400">{i + 1}.</span>{c.name}</span>
                    <span className="text-sm font-bold text-white">{c.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 px-3 py-2">
                  <span className="text-sm font-semibold text-white">Total direct downloads</span>
                  <span className="text-sm font-bold text-cyan-400">~103</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
              <p className="text-sm font-semibold text-white mb-3">Conversion Funnel Metrics</p>
              <div className="space-y-3">
                {funnel.map((f) => (
                  <div key={f.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white">{f.label}</span>
                      <span className="text-[10px] text-white/50">{f.tag}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div initial={{ width: 0 }} animate={{ width: f.width }} transition={{ delay: 0.8, duration: 0.6 }} className={`h-full rounded-full bg-gradient-to-r ${f.color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section 8: Growth Loop & Expansion Gates */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.4 }}>
        <div className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
          <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-white"><Repeat className="h-5 w-5 text-cyan-400" /> Growth Loop & 4-Stage Expansion Gates</h3>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-white">"Table for Two" Referral Mechanics</p>
                <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] text-purple-400">K-factor target: 0.045</span>
              </div>
              <div className="space-y-2">
                {referralSteps.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-black/30 border border-white/[0.05] px-3 py-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-400">{i + 1}</span>
                    <span className="text-sm text-white/80">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
              <p className="text-sm font-semibold text-white mb-3">Expansion Gates Timeline</p>
              <div className="flex flex-wrap items-center gap-2">
                {['1. Berlin Pilot', '2. DACH Cities', '3. Germany Scale', '4. International Localization'].map((g, i, arr) => (
                  <div key={g} className="flex items-center gap-2">
                    <span className="rounded-lg bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-500/25 px-3 py-2 text-xs font-semibold text-white">{g}</span>
                    {i < arr.length - 1 && <span className="text-white/30">→</span>}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/50"><QrCode className="h-4 w-4 text-cyan-400" /> Growth delivered through QR promos and organic referrals — no paid spend.</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}