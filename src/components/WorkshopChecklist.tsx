import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, Target, Users, Euro, TrendingUp, Shield, Zap, Brain, Globe, ClipboardList, BarChart2, Dumbbell, GraduationCap, Calculator, Star, Award, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

function Task1Content() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-6">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-cyan-400 mb-4">
          <Target className="h-4 w-4" /> Elevator Pitch
        </h4>
        <blockquote className="text-white/90 italic leading-relaxed border-l-4 border-cyan-500 pl-4">
          "For healthy and busy students in Berlin, who fail to maintain nutritional goals while eating out under time pressure, PlateWise is a dining decision coach that delivers instant meal recommendations in under 90 seconds, unlike retrospective logging apps like Yazio or MyFitnessPal, we eliminate logging friction at the moment of choice and scale organically across campuses through zero-budget viral loops."
        </blockquote>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-4">
          <Users className="h-4 w-4" /> Persona (Interactive Student ID Card)
        </h4>
        <div className="max-w-xs mx-auto">
          <div className="rounded-2xl bg-[#111118] border border-white/10 overflow-hidden shadow-xl">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3">
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider">Technische Universität Berlin</p>
              <p className="text-xs text-white/60">Student Identification Card</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10">
                  <span className="text-2xl font-bold text-white/60">📷</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-lg font-bold text-white">Lukas</p>
                  <p className="text-sm text-white/60">22 Years Old | Male</p>
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-white/50">Major:</span><span className="font-medium text-white">B.Sc. Computer Science (2nd Year)</span></div>
                <div className="flex justify-between"><span className="text-white/50">Campus:</span><span className="font-medium text-white">TU Berlin (Campus Charlottenburg)</span></div>
                <div className="flex justify-between"><span className="text-white/50">ID Number:</span><span className="font-mono text-white/80">2026-TUB-8492</span></div>
              </div>
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Goals & Background</p>
                  <p className="text-sm text-white/80 leading-relaxed">Needs to hit his daily protein target and eat healthy near Campus Charlottenburg without wasting time manually logging ingredients during short lecture breaks.</p>
                </div>
                <div className="rounded-xl bg-black/30 border border-white/5 p-3">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Biggest Frustration</p>
                  <p className="text-sm text-white/70 italic">"MyFitnessPal is too slow to search while my friends are waiting at the waiter, and Yazio just feels like a retroactive food diary that judges what I already ate wrong."</p>
                </div>
                <div className="rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-3">
                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">Student Quote</p>
                  <p className="text-sm text-white/80 italic">"If my whole study group gets a 30% discount at our local lunch spot just by using an app that actually solves eating out in 90 seconds, I'm sharing it in our campus WhatsApp group immediately."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Task2Content() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-6">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-400 mb-3">
            <BarChart2 className="h-4 w-4" /> Market Foundation
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 4.45M German nutrition app users</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> €108M market size (2025)</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 200,000 university students in Berlin</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> ~3,900 local restaurants</li>
          </ul>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-3">
            <Brain className="h-4 w-4" /> GLP-1 Trend Alignment
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Smaller portion size prioritization</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> High protein density focus</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> High-fat trigger avoidance</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> German dining culture adaptation</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-6">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-cyan-400 mb-3">
          <Shield className="h-4 w-4" /> Positioning Differentiator
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-black/30 border border-white/5 p-4">
            <p className="text-sm font-medium text-white mb-1">vs. Yazio / MyFitnessPal</p>
            <p className="text-sm text-white/70">Retrospective food diaries — log after eating</p>
          </div>
          <div className="rounded-lg bg-black/30 border border-white/5 p-4">
            <p className="text-sm font-medium text-white mb-1">vs. Noom</p>
            <p className="text-sm text-white/70">High-cost behavioral coaching (€15+/mo)</p>
          </div>
          <div className="rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 p-4">
            <p className="text-sm font-medium text-cyan-400 mb-1">PlateWise Advantage</p>
            <p className="text-sm text-white/80">Zero-friction decision support in <span className="font-bold text-cyan-400">under 90 seconds</span> right at the restaurant table</p>
          </div>
          <div className="rounded-lg bg-black/30 border border-white/5 p-4">
            <p className="text-sm font-medium text-white mb-1">Local Adaptation</p>
            <p className="text-sm text-white/70">German sit-down dining culture + strict GDPR compliance</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Task3Content() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 mx-auto mb-3">
            <Check className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-green-400 mb-2">Free Tier</h4>
          <ul className="text-sm text-white/70 space-y-1 text-left">
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-green-400" /> Unlimited menu scans</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-green-400" /> 90-second decision engine</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-green-400" /> Basic meal recommendations</li>
          </ul>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6 text-center relative">
          <div className="absolute -top-2 right-2 bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded">PREMIUM</div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 mx-auto mb-3">
            <Star className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-amber-400 mb-2">Premium Tier (€4.99/mo)</h4>
          <ul className="text-sm text-white/70 space-y-1 text-left">
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-amber-400" /> Deep macro analytics</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-amber-400" /> GLP-1 tracking mode</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-amber-400" /> Restaurant perk access</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-amber-400" /> Unlock: €4.99/mo OR invite 3 friends</li>
          </ul>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto mb-3">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-semibold text-blue-400 mb-2">Benchmarking</h4>
          <ul className="text-sm text-white/70 space-y-1 text-left">
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-400" /> Yazio: €6.99/mo</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-400" /> Noom: €15+/mo</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-400" /> PlateWise: <span className="font-bold text-amber-400">€4.99/mo</span></li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-4">
          <TrendingUp className="h-4 w-4" /> Customer Lifetime Value (LTV)
        </h4>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="text-center rounded-lg bg-black/30 border border-white/5 p-4">
            <p className="text-3xl font-bold text-white">5 months</p>
            <p className="text-xs text-white/50 uppercase tracking-wider">Avg Student Lifetime</p>
          </div>
          <div className="text-center rounded-lg bg-black/30 border border-white/5 p-4">
            <p className="text-3xl font-bold text-amber-400">€4.99/mo</p>
            <p className="text-xs text-white/50 uppercase tracking-wider">Premium Price</p>
          </div>
          <div className="text-center rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-4">
            <p className="text-3xl font-bold text-pink-400">€24.95</p>
            <p className="text-xs text-white/50 uppercase tracking-wider">LTV per Paying User</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Task4Content() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 p-6">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-red-400 mb-4">
          <Zap className="h-4 w-4" /> Bottom-Up Acquisition Plan (Months 1–3)
        </h4>
        <div className="space-y-3">
          {[
            { channel: 'Inter-Campus Leaderboard', downloads: 2400, desc: 'TU Berlin, HU, HTW, GISMA via campus WhatsApp groups', icon: Users },
            { channel: 'Gym & POS Shake Counter Cards', downloads: 800, desc: 'Fitness First & health spots near Rosenthaler Platz', icon: Dumbbell },
            { channel: 'Student Council Channels', downloads: 600, desc: 'Health partnerships & student forums', icon: GraduationCap },
          ].map((item) => (
            <div key={item.channel} className="flex items-center gap-4 rounded-lg bg-black/30 border border-white/5 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20">
                <item.icon className="h-5 w-5 text-red-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{item.channel}</p>
                <p className="text-xs text-white/50">{item.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-400">{item.downloads.toLocaleString()}</p>
                <p className="text-xs text-white/50">downloads</p>
              </div>
            </div>
          ))}
          <div className="rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 p-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Total Target</span>
              <span className="text-2xl font-bold text-cyan-400">3,800</span>
            </div>
            <p className="text-sm text-white/60 mt-1">Active student downloads across all channels</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 p-6">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-cyan-400 mb-4">
          <Calculator className="h-4 w-4" /> Plausibilized Arithmetic & Revenue
        </h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-black/30 border border-white/5 p-4">
              <span className="text-white/70">Downloads</span>
              <span className="font-bold text-white">3,800</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-black/30 border border-white/5 p-4">
              <span className="text-white/70">Free-to-Paid Conversion (4.5%)</span>
              <span className="font-bold text-amber-400">171 paying users</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-black/30 border border-white/5 p-4">
              <span className="text-white/70">Monthly Price</span>
              <span className="font-bold text-white">€4.99/mo</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-black/30 border border-white/5 p-4">
              <span className="text-white/70">Avg Student Lifetime</span>
              <span className="font-bold text-white">5 months</span>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 p-6 text-center">
            <p className="text-sm text-white/60 mb-2">Initial Cohort Revenue</p>
            <p className="text-4xl font-bold text-cyan-400">€4,266.45</p>
            <p className="text-xs text-white/50 mt-2">171 × €4.99 × 5 months = €4,266.45</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Task5Content() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-6">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-indigo-400 mb-3">
            <Smartphone className="h-4 w-4" /> Product Scope
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Mobile-first PWA</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Campus Leaderboard screen</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Viral Referral Hub</li>
          </ul>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-6">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-cyan-400 mb-3">
            <Users className="h-4 w-4" /> Target User
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Lukas (TU Berlin CS student)</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> Health-conscious Berlin peers</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-3">
          <Zap className="h-4 w-4" /> Core Interaction
        </h4>
        <ul className="space-y-2 text-sm text-white/80">
          <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Live campus ranking progress bar toward 1,000-user discount threshold</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> 1-tap WhatsApp referral trigger</li>
        </ul>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-400 mb-3">
          <Award className="h-4 w-4" /> Must-Have Features (MoSCoW)
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { title: 'Live Campus Leaderboard UI', desc: 'TU Berlin #1, HU Berlin #2 with real-time rankings' },
            { title: 'Progress Tracker', desc: 'Signups remaining to unlock 30% partner food discounts' },
            { title: 'WhatsApp Share Button', desc: 'Direct "Share to WhatsApp Group" & personal link generator' },
            { title: 'Social Result Card', desc: 'Story-ready visual preview formatted for social sharing' },
          ].map((feature) => (
            <div key={feature.title} className="rounded-lg bg-black/30 border border-white/5 p-4">
              <p className="font-medium text-white mb-1">{feature.title}</p>
              <p className="text-sm text-white/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-6">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-green-400 mb-3">
          <Check className="h-4 w-4" /> Success Criteria
        </h4>
        <p className="text-white/80">
          <span className="font-bold text-green-400">100% functional click-through referral flow</span> completed in under <span className="font-bold text-green-400">2 taps</span>.
        </p>
      </div>
    </div>
  )
}

interface Task {
  id: number
  title: string
  icon: React.ElementType
  color: string
  content: React.ReactNode
}

const tasks: Task[] = [
  { id: 1, title: 'Task 1: Elevator Pitch & Persona (ICP)', icon: Target, color: 'from-cyan-500 to-blue-500', content: <Task1Content /> },
  { id: 2, title: 'Task 2: Positioning & Berlin Market Analysis', icon: Globe, color: 'from-emerald-500 to-teal-500', content: <Task2Content /> },
  { id: 3, title: 'Task 3: Business Model & Pricing Ladder', icon: Euro, color: 'from-amber-500 to-orange-500', content: <Task3Content /> },
  { id: 4, title: 'Task 4: Zero-Budget GTM Strategy & Revenue Derivation', icon: Zap, color: 'from-red-500 to-pink-500', content: <Task4Content /> },
  { id: 5, title: 'Task 5: One-Page Product Requirements Document (PRD)', icon: ClipboardList, color: 'from-indigo-500 to-purple-500', content: <Task5Content /> },
]

export function WorkshopChecklist({}: {}) {
  const [activeTask, setActiveTask] = useState<number | null>(0)

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/[0.08] via-purple-500/[0.04] to-pink-500/[0.08] border border-cyan-500/20 p-6 backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(185,255,0,0.05),transparent_50%)]" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/20">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Workshop Checklist</h2>
            <p className="mt-1 text-sm text-[rgba(240,10%,96%,0.5)]">5 Tasks to validate and structure the PlateWise concept</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="group rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.02)] overflow-hidden transition-all hover:border-cyan-500/20 hover:bg-[rgba(255,255,255,0.04)]">
              <button
                onClick={() => setActiveTask(activeTask === task.id ? null : task.id)}
                className="w-full flex items-center justify-between gap-4 p-5 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', task.color)}>
                    <task.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{task.title}</h3>
                    <p className="text-xs text-white/40">Click to expand</p>
                  </div>
                </div>
                <div className={cn('flex items-center gap-2 text-white/40 transition-transform duration-200', activeTask === task.id && 'rotate-180')}>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </button>

              <AnimatePresence>
                {activeTask === task.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/[0.06] p-5 pt-0">
                      {task.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}