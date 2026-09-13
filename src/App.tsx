import { useState, useRef, useEffect, useCallback } from 'react'
import { Bot, Send, Zap, Check, TrendingUp, Crown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import html2canvas from 'html2canvas'
import { cn } from '@/lib/utils'
import { ErrorBoundary } from './components/ErrorBoundary'
import { TopBar } from './components/TopBar'
import { NavTabs } from './components/NavTabs'
import { ChatBubble } from './components/ChatBubble'
import { ResultCard } from './components/ResultCard'
import type { ResultCardHandle } from './components/ResultCard'
import { LockModal } from './components/LockModal'
import { GrowthHub } from './components/GrowthHub'
import { UniversityBattle } from './components/UniversityBattle'
import { ChatSkeleton } from './components/SkeletonLoader'
import { WorkshopChecklist } from './components/WorkshopChecklist'
import { PremiumChatbot } from './components/PremiumChatbot'
import { PlateWiseModule } from './components/PlateWiseModule'
import { InfluencerPanel } from './components/InfluencerPanel'
import { PresentationPanel } from './components/PresentationPanel'
import ScrollMorphHero from './components/ui/scroll-morph-hero'
import LoginPage from './components/LoginPage'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  type?: 'text' | 'widget' | 'card'
  widgetData?: {
    type: 'metric' | 'insight' | 'question' | 'menu'
    title: string
    value?: string
    options?: string[]
    menus?: { name: string; calories: string; protein: string; spot: string }[]
  }
}

const healthQuestions = [
  { question: "What's your primary fitness target?", options: ['Lean Muscle', 'Fat Loss', 'GLP-1/Ozempic Digestion', 'High Energy'] },
  { question: 'Do you have any dietary restrictions or allergies?', options: ['Vegan', 'Halal', 'Lactose-Free', 'Gluten-Free', 'None'] },
  { question: 'Where do you usually eat around Berlin?', options: ['University Mensa', 'Fast Casual', 'Cooking at Home', 'Mixed'] },
  { question: 'What is your daily protein priority?', options: ['120g+', '80-120g', '50-80g', 'Flexible'] },
]

const healthResponses: Record<string, { content: string; type: 'widget'; widgetData: { type: 'menu'; title: string; menus: { name: string; calories: string; protein: string; spot: string }[] } }> = {
  'target-lean-muscle': { content: "Lean muscle detected! Here are your Berlin meal plans. 🏋️", type: 'widget', widgetData: { type: 'menu', title: 'Recommended Berlin Spots', menus: [{ name: 'Steakhouse Berlin Mitte', calories: '520 kcal', protein: '48g', spot: 'Mitte' }, { name: 'Protein Bowl Prenzlauer Berg', calories: '380 kcal', protein: '40g', spot: 'Prenzlauer Berg' }, { name: 'Mensa TU Berlin', calories: '450 kcal', protein: '42g', spot: 'Charlottenburg' }] }},
  'target-fat-loss': { content: "Fat loss strategy activated! Low-cal Berlin options. 🔥", type: 'widget', widgetData: { type: 'menu', title: 'Low-Cal Berlin Spots', menus: [{ name: 'Salad Lab Friedrichshain', calories: '280 kcal', protein: '22g', spot: 'Friedrichshain' }, { name: 'Clean Eating Kreuzberg', calories: '320 kcal', protein: '28g', spot: 'Kreuzberg' }, { name: 'Mensa HU Berlin', calories: '350 kcal', protein: '30g', spot: 'Mitte' }] }},
  'target-glp1': { content: "GLP-1 friendly nutrition plan! Fiber-rich Berlin meals. 🌿", type: 'widget', widgetData: { type: 'menu', title: 'GLP-1 Friendly Berlin', menus: [{ name: 'Bio Bowl Charlottenburg', calories: '340 kcal', protein: '25g', spot: 'Charlottenburg' }, { name: 'Veggie Station Wilmersdorf', calories: '290 kcal', protein: '20g', spot: 'Wilmersdorf' }, { name: 'Mensa FU Berlin', calories: '310 kcal', protein: '24g', spot: 'Dahlem' }] }},
  'target-high-energy': { content: "High energy mode! Power through Berlin. ⚡", type: 'widget', widgetData: { type: 'menu', title: 'High Energy Berlin Spots', menus: [{ name: 'Energy Cafe Alexanderplatz', calories: '550 kcal', protein: '35g', spot: 'Alexanderplatz' }, { name: 'Smoothie King Tempelhof', calories: '420 kcal', protein: '30g', spot: 'Tempelhof' }, { name: 'Mensa HTW Berlin', calories: '480 kcal', protein: '38g', spot: 'Wilmersdorf' }] }},
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState<'consultant' | 'battle' | 'growth' | 'workshop' | 'platewise' | 'influencer' | 'presentation'>('consultant')
  const [streak] = useState(7)
  const [vipRank] = useState('Gold')
  const [university] = useState('GISMA')
  const [referralCount, setReferralCount] = useState(2)
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false)
  const [isLockModalOpen, setIsLockModalOpen] = useState(false)
  const [showResultCard, setShowResultCard] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Welcome to your Health & Nutrition Consultant! 🎯 I'll guide you through a quick 4-question assessment to create your personalized Berlin meal plan. Type 'start' or say hello!" },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [assessmentStep, setAssessmentStep] = useState(0)
  const [assessmentStarted, setAssessmentStarted] = useState(false)
  const [assessmentAnswers, setAssessmentAnswers] = useState<string[]>([])
  const [referralLink] = useState('https://berlin.fuelcampus.app/ref/abc123')
  const [showHero, setShowHero] = useState(true)
  const [isPremiumChatOpen, setIsPremiumChatOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const resultCardRef = useRef<ResultCardHandle>(null)

  const scrollToBottom = useCallback(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [])
  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const exportResultCard = async () => {
    const el = resultCardRef.current?.getDomElement()
    if (!el) return
    try {
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#111118' })
      const link = document.createElement('a')
      link.download = 'my-nutrition-profile.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) { console.error('Export failed:', err) }
  }

  const handleSendMessage = () => {
    const text = inputValue.trim()
    if (!text) return
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    setTimeout(() => {
      let response: Message
      if (!assessmentStarted) {
        if (text.toLowerCase() === 'start') {
          setAssessmentStarted(true)
          setAssessmentStep(0)
          response = { id: Date.now().toString(), role: 'assistant', content: healthQuestions[0].question, type: 'widget', widgetData: { type: 'question', title: 'Question 1/4', options: healthQuestions[0].options } }
        } else {
          response = { id: Date.now().toString(), role: 'assistant', content: "Type 'start' to begin your Health Assessment! 🚀 Or ask about meals in Berlin." }
        }
      } else if (assessmentStep < healthQuestions.length) {
        const currentQ = healthQuestions[assessmentStep]
        const matched = currentQ.options.find(opt => text.toLowerCase().includes(opt.toLowerCase().split(' ')[0].slice(0, 4)))
        const answer = matched || text
        const newAnswers = [...assessmentAnswers, answer]
        setAssessmentAnswers(newAnswers)
        if (assessmentStep < healthQuestions.length - 1) {
          setAssessmentStep(prev => prev + 1)
          const nextQ = healthQuestions[assessmentStep + 1]
          response = { id: Date.now().toString(), role: 'assistant', content: nextQ.question, type: 'widget', widgetData: { type: 'question', title: `Question ${assessmentStep + 2}/4`, options: nextQ.options } }
        } else {
          setAssessmentStep(4)
          const allAnswers = [...newAnswers, answer]
          setAssessmentAnswers(allAnswers)
          const targetKey = allAnswers[0]?.toLowerCase().includes('lean') ? 'target-lean-muscle' : allAnswers[0]?.toLowerCase().includes('fat') ? 'target-fat-loss' : allAnswers[0]?.toLowerCase().includes('glp') ? 'target-glp1' : 'target-high-energy'
          const aiRes = healthResponses[targetKey] || healthResponses['target-lean-muscle']
          setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: aiRes.content, type: aiRes.type, widgetData: aiRes.widgetData }])
          setShowResultCard(true)
          response = { id: Date.now().toString(), role: 'assistant', content: "Assessment complete! 🎉 Your Berlin nutrition plan is ready. Ask me anything!" }
        }
      } else {
        const randomResponses = [
          "Great question! For Berlin student nutrition, try the Mensas — they're affordable and balanced.",
          "Absolutely! Protein timing is key. Try a post-workout shake from a Berlin smoothie bar!",
          "For GLP-1 eating, focus on high-fiber veggies. Berlin has great vegan options at Markthallen!",
        ]
        response = { id: Date.now().toString(), role: 'assistant', content: randomResponses[Math.floor(Math.random() * randomResponses.length)] }
      }
      setMessages(prev => [...prev, response])
      setIsLoading(false)
    }, 1200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSendMessage() }
  const handleInvite = () => { if (referralCount < 3) setReferralCount(prev => prev + 1) }
  const handleSubscribe = () => { setIsPremiumUnlocked(true); setIsLockModalOpen(false) }
  const handleCopyLink = () => { navigator.clipboard?.writeText(referralLink) }
  const handleWhatsAppInvite = () => { window.open(`https://wa.me/?text=${encodeURIComponent('Join my Berlin campus nutrition team! Sign up: ' + referralLink)}`, '_blank') }
  const handleMobilizeCampus = () => { window.open(`https://wa.me/?text=${encodeURIComponent('Mobilize ' + university + '! Join the Berlin Campus Battle — 1000 signups unlocks 30% OFF at partner cafés and gyms! ' + referralLink)}`, '_blank') }
  const handleLockClick = () => { if (!isPremiumUnlocked) setIsLockModalOpen(true) }
  const metrics = { score: Math.floor(Math.random() * 30 + 70), protein: '120g', calories: '2200 kcal', category: ['Performance', 'Balance', 'Focus', 'Recovery'][Math.floor(Math.random() * 4)], personality: ['The Optimizer', 'The Balanced', 'The Warrior', 'The Fueler'][Math.floor(Math.random() * 4)], recommendation: 'Prioritize protein-rich meals at Berlin Mensas and drink 2.5L water daily.' }

  const handleLogin = () => setIsLoggedIn(true)

  if (!isLoggedIn) {
    return (
      <ErrorBoundary fallback={<div className="flex min-h-screen items-center justify-center text-white/50">Login error</div>}>
        <LoginPage onLogin={handleLogin} />
      </ErrorBoundary>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white transition-colors duration-300">
      <TopBar streak={streak} vipRank={vipRank} university={university} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} onOpenLeaderboard={() => setActiveTab('battle')} />

      {showHero && (
        <ErrorBoundary fallback={<div className="h-[700px] flex items-center justify-center text-white/50">Hero error</div>}>
          <div className="w-full h-[700px] relative overflow-hidden">
            <ScrollMorphHero />
          </div>
        </ErrorBoundary>
      )}

      {showHero && (
        <div className="flex justify-end px-4 sm:px-6 -mt-4 relative z-10">
          <button onClick={() => setShowHero(false)} className="rounded-full bg-black/60 px-4 py-2 text-xs text-white/60 backdrop-blur-sm hover:bg-black/80">Hide Hero</button>
        </div>
      )}

      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-7xl py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'consultant' && (
            <ErrorBoundary fallback={<div className="p-8 text-center text-white/50">Consultant error</div>}>
              <motion.div key="consultant" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <div className="flex max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111118] shadow-lg shadow-cyan-500/5 sm:mx-auto">
                <div className="border-b border-white/[0.05] bg-white/[0.03] px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Health & Nutrition Consultant</p>
                        <p className="text-xs text-white/40">
                          {isLoading ? '🤖 Thinking...' : assessmentStarted ? `Step ${Math.min(assessmentStep + 1, 4)}/4` : 'Berlin Fuel Consultant'}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setShowResultCard(true)} className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-3 py-1.5 text-xs font-semibold text-white shadow shadow-cyan-500/20">
                      <TrendingUp className="h-3 w-3" /> Results
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
                  {messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)}
                  {isLoading && <ChatSkeleton />}
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-white/[0.05] bg-white/[0.03] p-4">
                  <div className="flex items-center gap-3">
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={assessmentStarted ? "Ask about meals, nutrition, Berlin spots..." : "Type 'start' for assessment"} className="flex-1 rounded-xl border border-white/[0.08] bg-black/50 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 placeholder:text-white/30" />
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSendMessage} disabled={isLoading} className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white transition-opacity hover:opacity-90 disabled:opacity-50">
                      <Send className="h-4 w-4" />
                    </motion.button>
                  </div>
                  <p className="mt-2 text-center text-[10px] text-white/30">
                    {assessmentStarted ? `Question ${Math.min(assessmentStep + 1, 4)} of 4` : 'Type "start" for the 4-question assessment'}
                  </p>
                </div>
              </div>

              <div className="mt-6 max-w-3xl sm:mx-auto">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLockClick}
                    disabled={isPremiumUnlocked}
                    className={cn('flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all', isPremiumUnlocked ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25' : 'bg-white/5 border border-white/[0.08] text-white hover:bg-white/[0.1]')}
                  >
                    {isPremiumUnlocked ? <><Check className="h-4 w-4" /> Premium Unlocked — Deep Macro Matrix Active</> : <><Zap className="h-4 w-4" /> Intense / Deep Analysis — Requires Unlock</>}
                  </motion.button>
                  {isPremiumUnlocked && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsPremiumChatOpen(true)}
                      className="flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/30"
                    >
                      <Bot className="h-4 w-4" />
                      <Crown className="h-4 w-4" />
                      Premium AI Coach
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </ErrorBoundary>
        )}

          {activeTab === 'battle' && (
            <ErrorBoundary fallback={<div className="p-8 text-center text-white/50">Battle error</div>}>
              <motion.div key="battle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <UniversityBattle userUniversity={university} onMobilize={handleMobilizeCampus} />
              </motion.div>
            </ErrorBoundary>
          )}

          {activeTab === 'growth' && (
            <ErrorBoundary fallback={<div className="p-8 text-center text-white/50">Growth error</div>}>
              <motion.div key="growth" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <GrowthHub referralCount={referralCount} isPremiumUnlocked={isPremiumUnlocked} referralLink={referralLink} onCopyLink={handleCopyLink} onWhatsAppInvite={handleWhatsAppInvite} onSubscribe={handleSubscribe} />
              </motion.div>
            </ErrorBoundary>
          )}

          {activeTab === 'workshop' && (
            <ErrorBoundary fallback={<div className="p-8 text-center text-white/50">Workshop error</div>}>
              <motion.div key="workshop" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <WorkshopChecklist />
              </motion.div>
            </ErrorBoundary>
          )}

          {activeTab === 'platewise' && (
            <ErrorBoundary fallback={<div className="p-8 text-center text-white/50">PlateWise error</div>}>
              <motion.div key="platewise" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <PlateWiseModule />
              </motion.div>
            </ErrorBoundary>
          )}

{activeTab === 'influencer' && (
             <ErrorBoundary fallback={<div className="p-8 text-center text-white/50">Influencer error</div>}>
               <motion.div key="influencer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                 <InfluencerPanel />
               </motion.div>
             </ErrorBoundary>
           )}
           {activeTab === 'presentation' && (
             <ErrorBoundary fallback={<div className="p-8 text-center text-white/50">Presentation error</div>}>
               <motion.div key="presentation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                 <PresentationPanel />
               </motion.div>
             </ErrorBoundary>
           )}
         </AnimatePresence>
      </main>

      <div className="fixed bottom-4 right-4 z-50">
        <p className="rounded-full bg-black/80 px-4 py-2 text-[10px] text-white/40 backdrop-blur-sm">Made by Captain America 🇺🇸</p>
      </div>

      <ResultCard ref={resultCardRef} isOpen={showResultCard} onClose={() => setShowResultCard(false)} onExport={exportResultCard} metrics={metrics} referralLink={referralLink} />

      <LockModal isOpen={isLockModalOpen} onClose={() => setIsLockModalOpen(false)} onSubscribe={handleSubscribe} onInvite={handleInvite} referralCount={referralCount} />

      <PremiumChatbot isOpen={isPremiumChatOpen} onClose={() => setIsPremiumChatOpen(false)} />
    </div>
  )
}
