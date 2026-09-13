import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Utensils, Sparkles, Shield, MapPin,
  Check, AlertCircle, X, Loader2, MapPin as MapPinIcon,
  ChevronDown, Star, ZapIcon, Dumbbell, Flame,
  Droplet, Search, Image as ImageIcon, Copy, Maximize2,
  Globe, Clock, Phone, Navigation, RefreshCw,
  Users, Building2, PartyPopper, Eye
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { fastScan, executiveScan, findRestaurants } from '@/lib/gemini'
import type { VenueDetails } from '@/lib/gemini'

type GoalType = 'weight-loss' | 'muscle-gain' | 'glucose-optimization' | 'glp1-mode'
type OccasionType = 'business-executive' | 'casual-family' | 'celebration'
type ScanMode = 'fast' | 'executive'

interface Goal {
  id: GoalType
  label: string
  icon: React.ElementType
  color: string
  description: string
  metricFocus: string
  warningKeywords: string[]
  goodKeywords: string[]
}

const GOALS: Goal[] = [
  { id: 'weight-loss', label: 'Lose Weight', icon: Flame, color: 'from-red-500 to-orange-500', description: 'Calorie deficit focus, high protein, low calorie density', metricFocus: 'Calorie density & protein per calorie', warningKeywords: ['fried', 'creamy', 'butter', 'cheese', 'bacon', 'sausage', 'mayo', 'dressing', 'croissant', 'pastry', 'battered', 'crispy'], goodKeywords: ['grilled', 'steamed', 'salad', 'vegetable', 'lean', 'fish', 'chicken breast', 'tofu', 'quinoa', 'broccoli', 'spinach', 'cucumber'] },
  { id: 'muscle-gain', label: 'Build Muscle', icon: Dumbbell, color: 'from-blue-500 to-cyan-500', description: 'High protein, adequate carbs for recovery', metricFocus: 'Protein per serving & complete amino profile', warningKeywords: ['low protein', 'mostly carbs', 'fried', 'empty calories'], goodKeywords: ['chicken', 'beef', 'fish', 'eggs', 'greek yogurt', 'cottage cheese', 'whey', 'lentils', 'beans', 'quinoa', 'turkey', 'salmon', 'tuna'] },
  { id: 'glucose-optimization', label: 'Glucose Optimization', icon: Droplet, color: 'from-purple-500 to-pink-500', description: 'Low glycemic impact, fiber-first, steady energy', metricFocus: 'Glycemic load & fiber content', warningKeywords: ['white rice', 'white bread', 'pasta', 'potato', 'sugar', 'honey', 'syrup', 'juice', 'soda', 'dessert', 'cake', 'cookie'], goodKeywords: ['salad', 'vegetable', 'nuts', 'seeds', 'avocado', 'olive oil', 'fish', 'chicken', 'eggs', 'cheese', 'greek yogurt', 'berries', 'beans', 'lentils'] },
  { id: 'glp1-mode', label: 'GLP-1 / Wegovy', icon: Shield, color: 'from-emerald-500 to-teal-500', description: 'Small portions, high protein density, low fat triggers', metricFocus: 'Protein density & nausea risk (low fat, low fiber per sitting)', warningKeywords: ['fried', 'heavy cream', 'cheese sauce', 'butter', 'oil', 'bacon', 'sausage', 'mayo', 'large portion', 'buffet', 'all you can eat'], goodKeywords: ['grilled', 'steamed', 'poached', 'small portion', 'lean protein', 'chicken breast', 'white fish', 'tofu', 'egg whites', 'greek yogurt', 'cottage cheese'] },
]

interface RestaurantSpot {
  name: string
  area: string
  description: string
  goals: GoalType[]
  highlight: string
  rating: number
  occasion: OccasionType[]
}

const BERLIN_SPOTS: RestaurantSpot[] = [
  { name: 'Clean Eating Kreuzberg', area: 'Kreuzberg', description: 'Macro-counted bowls with precise protein tracking', goals: ['weight-loss', 'muscle-gain', 'glucose-optimization', 'glp1-mode'], highlight: 'Customizable macro breakdown per bowl', rating: 4.8, occasion: ['business-executive', 'casual-family'] },
  { name: 'Bio Bowl Charlottenburg', area: 'Charlottenburg', description: 'Organic, gluten-free, glycemic-index labeled menu', goals: ['glucose-optimization', 'glp1-mode', 'weight-loss'], highlight: 'GI index listed for every dish', rating: 4.7, occasion: ['business-executive', 'casual-family'] },
  { name: 'Protein House Mitte', area: 'Mitte', description: 'High-protein focused meals with amino profiles', goals: ['muscle-gain', 'weight-loss', 'glucose-optimization'], highlight: '40g+ protein per main dish', rating: 4.6, occasion: ['business-executive', 'celebration'] },
  { name: 'Lean Kitchen Neukölln', area: 'Neukölln', description: 'Portion-controlled, GLP-1 friendly meal prep style', goals: ['glp1-mode', 'weight-loss', 'glucose-optimization'], highlight: 'Pre-weighed macro containers', rating: 4.5, occasion: ['casual-family'] },
  { name: 'Green Garden Prenzlauer Berg', area: 'Prenzlauer Berg', description: 'Plant-forward, fiber-rich, low glycemic bowls', goals: ['glucose-optimization', 'weight-loss', 'glp1-mode'], highlight: '15g+ fiber per bowl', rating: 4.7, occasion: ['casual-family', 'celebration'] },
  { name: 'Iron Kitchen Friedrichshain', area: 'Friedrichshain', description: 'Strength athlete meals with tracked macros', goals: ['muscle-gain', 'weight-loss'], highlight: 'Creatine & beta-alanine add-ons available', rating: 4.6, occasion: ['business-executive'] },
]

interface DecisionResult {
  verdict: 'good' | 'okay' | 'avoid'
  confidence: number
  metricFocus: string
  quickTip: string
  reasoning: string[]
}

interface SilentOrderCard {
  dishName: string
  status: string
  proteinGrams: string
  reasoning: string
  silentOrderTip: string
}

function analyzeMeal(input: string, goal: Goal): DecisionResult {
  const lowerInput = input.toLowerCase()
  let goodCount = 0, warningCount = 0
  goal.goodKeywords.forEach(k => { if (lowerInput.includes(k.toLowerCase())) goodCount++ })
  goal.warningKeywords.forEach(k => { if (lowerInput.includes(k.toLowerCase())) warningCount++ })
  let verdict: 'good' | 'okay' | 'avoid' = 'okay'
  let confidence = 50
  if (goodCount > warningCount && goodCount > 0) { verdict = 'good'; confidence = Math.min(55 + goodCount * 10, 95) }
  else if (warningCount > goodCount && warningCount > 0) { verdict = 'avoid'; confidence = Math.min(55 + warningCount * 10, 90) }
  else { confidence = 50 + Math.floor(Math.random() * 20) }
  const reasoning: string[] = []
  if (goodCount > 0) reasoning.push(`Detected ${goodCount} goal-aligned keywords`)
  if (warningCount > 0) reasoning.push(`Flagged ${warningCount} caution keywords`)
  if (goodCount === 0 && warningCount === 0) reasoning.push('No specific keywords detected — manual review recommended')
  const tips: Record<GoalType, string[]> = {
    'weight-loss': ['Ask for sauce on the side', 'Double the vegetables, halve the carbs', 'Choose grilled over fried', 'Drink water 10 min before eating'],
    'muscle-gain': ['Add extra lean protein if available', 'Pair with complex carbs post-workout', 'Ask for double meat portion', 'Skip the bread basket'],
    'glucose-optimization': ['Eat vegetables and protein first', 'Save carbs for last', 'Take a 10-min walk after eating', 'Add vinegar or lemon to your meal'],
    'glp1-mode': ['Eat slowly, stop at 80% full', 'Choose lean protein, avoid heavy sauces', 'Split meal if portion looks large', 'Sip water between bites'],
  }
  return { verdict, confidence, metricFocus: goal.metricFocus, quickTip: tips[goal.id][Math.floor(Math.random() * tips[goal.id].length)], reasoning }
}

function getOccasionLabel(occasion: OccasionType): string {
  switch (occasion) { case 'business-executive': return 'Business / Executive Dinner'; case 'casual-family': return 'Casual / Family'; case 'celebration': return 'Celebration'; }
}

function getOccasionDesc(occasion: OccasionType): string {
  switch (occasion) { case 'business-executive': return 'Ultra-discreet, one top-ranked recommendation'; case 'casual-family': return 'Expanded options, social sharing'; case 'celebration': return 'Special occasion dining, premium picks'; }
}

function buildCuratedVenues(goal: GoalType, occasion: OccasionType): VenueDetails[] {
  const matches = BERLIN_SPOTS.filter(s => s.goals.includes(goal) && s.occasion.includes(occasion))
  const pool = matches.length > 0 ? matches : BERLIN_SPOTS.filter(s => s.goals.includes(goal))
  const picks = (pool.length > 0 ? pool : BERLIN_SPOTS).slice(0, 3)
  return picks.map(s => ({
    name: s.name,
    address: `${s.area}, Berlin`,
    phone: 'Contact via website',
    website: 'https://www.google.com/maps',
    mapUrl: `https://www.google.com/maps/search/${encodeURIComponent(s.name + ' Berlin')}`,
    openingHours: 'Hours vary',
    menuSummary: s.description,
    goalAlignedDishes: [s.highlight]
  }))
}

export function PlateWiseModule() {
  const [selectedGoal, setSelectedGoal] = useState<GoalType>('weight-loss')
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('business-executive')
  const [inputValue, setInputValue] = useState('')
  const [menuUrl, setMenuUrl] = useState('')
  const [result, setResult] = useState<DecisionResult | null>(null)
  const [silentOrder, setSilentOrder] = useState<SilentOrderCard | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isScanningGemini, setIsScanningGemini] = useState(false)
  const [scanMode, setScanMode] = useState<ScanMode>('fast')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [venues, setVenues] = useState<VenueDetails[]>([])
  const [isFindingVenues, setIsFindingVenues] = useState(false)
  const [showVenuePanel, setShowVenuePanel] = useState(false)
  const [venueSource, setVenueSource] = useState<'ai' | 'curated'>('ai')
  const [copiedTip, setCopiedTip] = useState(false)
  const [fullscreenOrder, setFullscreenOrder] = useState(false)

  const apiKeyPresent = import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY.trim() !== ''
  const [apiStatus, setApiStatus] = useState<'ready' | 'missing' | 'error'>(apiKeyPresent ? 'ready' : 'missing')

  const goal = GOALS.find(g => g.id === selectedGoal)!
  const relevantSpots = useMemo(() => BERLIN_SPOTS.filter(s => s.goals.includes(selectedGoal)).slice(0, 3), [selectedGoal])
  const occasionSpots = useMemo(() => relevantSpots.filter(s => s.occasion.includes(selectedOccasion)), [relevantSpots, selectedOccasion])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5MB'); return }
    const reader = new FileReader()
    reader.onload = (event) => { setUploadedImage(event.target?.result as string) }
    reader.readAsDataURL(file)
  }
  const removeImage = () => { setUploadedImage(null) }

  const buildGeminiPrompt = useCallback((source: string) => {
    const goalLabels = GOALS.filter(g => g.id === selectedGoal).map(g => g.label).join(', ')
    const occasionLabel = getOccasionLabel(selectedOccasion)
    const modeHint = scanMode === 'executive' ? 'Perform deep nutritional extraction, EU 14-allergen detection, and goal-specific analysis.' : 'Perform rapid OCR dish identification.'
    return `You are a PlateWise AI nutrition consultant for Berlin executives. Analysis context: Goal: ${goalLabels}. Occasion: ${occasionLabel} (${getOccasionDesc(selectedOccasion)}). ${modeHint} Source: ${source}. Return JSON: {"dishName":"Exact Dish Name","status":"Good"|"Okay"|"Avoid","proteinGrams":"Estimated Protein (e.g., 38g)","reasoning":"1-2 sentence rationale tailored to active health goal","silentOrderTip":"1-sentence discreet order modification (e.g., 'Dressing on the side')"}`
  }, [selectedGoal, selectedOccasion, scanMode])

  const runGeminiScan = useCallback(async () => {
    if (!apiKeyPresent) { setApiStatus('missing'); return }
    setIsScanningGemini(true)
    setApiStatus('ready')
    try {
      const safeImageDataUrl = uploadedImage && uploadedImage.startsWith('data:image/') ? uploadedImage : undefined
      const prompt = buildGeminiPrompt(inputValue || 'Meal photo uploaded')
      const scanResult = scanMode === 'fast' ? await fastScan(prompt, safeImageDataUrl) : await executiveScan(prompt, safeImageDataUrl)
      setSilentOrder({ dishName: scanResult.dishName, status: scanResult.status, proteinGrams: scanResult.proteinGrams, reasoning: scanResult.reasoning, silentOrderTip: scanResult.silentOrderTip })
      const analysisInput = inputValue || 'Photo analysis'
      const localResult = analyzeMeal(analysisInput, goal)
      setResult(localResult)
      setApiStatus('ready')
    } catch (err) {
      setApiStatus('error')
      const localResult = analyzeMeal(inputValue || 'Menu link', goal)
      setResult(localResult)
    } finally {
      setIsScanningGemini(false)
    }
  }, [inputValue, uploadedImage, goal, selectedGoal, selectedOccasion, scanMode, apiKeyPresent, buildGeminiPrompt])

  const handleAnalyze = useCallback(async () => {
    if (!inputValue.trim() && !uploadedImage && !menuUrl) return
    setIsAnalyzing(true)
    try {
      if (apiKeyPresent && (uploadedImage || menuUrl)) {
        await runGeminiScan()
      } else {
        const analysisInput = inputValue || 'Menu analysis'
        const localResult = analyzeMeal(analysisInput, goal)
        setResult(localResult)
        if (!apiKeyPresent) setApiStatus('missing')
      }
    } finally { setIsAnalyzing(false) }
  }, [inputValue, uploadedImage, menuUrl, goal, apiKeyPresent, runGeminiScan])

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAnalyze() } }

  const handleFindVenues = async () => {
    setIsFindingVenues(true)
    const curated = buildCuratedVenues(selectedGoal, selectedOccasion)
    if (!apiKeyPresent) {
      setVenues(curated)
      setVenueSource('curated')
      setShowVenuePanel(true)
      setApiStatus('missing')
      setIsFindingVenues(false)
      return
    }
    try {
      const results = await findRestaurants(selectedOccasion, selectedGoal)
      if (results.length > 0) {
        setVenues(results)
        setVenueSource('ai')
      } else {
        setVenues(curated)
        setVenueSource('curated')
      }
      setShowVenuePanel(true)
    } catch {
      setVenues(curated)
      setVenueSource('curated')
      setShowVenuePanel(true)
    } finally { setIsFindingVenues(false) }
  }

  const copySilentTip = () => { if (silentOrder) { navigator.clipboard?.writeText(silentOrder.silentOrderTip); setCopiedTip(true); setTimeout(() => setCopiedTip(false), 2000) } }

  const verdictStyles = { good: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400', okay: 'bg-amber-500/20 border-amber-500/30 text-amber-400', avoid: 'bg-red-500/20 border-red-500/30 text-red-400' }
  const verdictIcons = { good: Check, okay: AlertCircle, avoid: X }
  const VerdictIcon = (result?.verdict ? verdictIcons[result.verdict] : undefined) || Check
  const occasionIcons: Record<OccasionType, React.ElementType> = { 'business-executive': Building2, 'casual-family': Users, 'celebration': PartyPopper }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/20">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">PlateWise AI Dining Engine</h2>
              <p className="text-sm text-white/50">Executive pre-visit planning & AI vision analysis for Berlin</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {!apiKeyPresent ? (
              <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2"><AlertCircle className="h-4 w-4 text-amber-400" /><span className="text-xs font-medium text-amber-400">API key missing — local mode active</span></div>
            ) : apiStatus === 'error' ? (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2"><AlertCircle className="h-4 w-4 text-red-400" /><span className="text-xs font-medium text-red-400">API error — fallback to local mode</span></div>
            ) : (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2"><Check className="h-4 w-4 text-emerald-400" /><span className="text-xs font-medium text-emerald-400">Gemini API connected</span></div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Executive Mode & Occasion Switcher */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }} className="rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/[0.06] p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Executive Mode Configuration</h3>
          <span className="text-xs text-white/40">40-55 Professionals in Berlin</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Occasion Context</label>
            <div className="grid grid-cols-3 gap-2">
              {(['business-executive', 'casual-family', 'celebration'] as OccasionType[]).map((occ) => {
                const Icon = occasionIcons[occ]
                return (
                  <button key={occ} onClick={() => setSelectedOccasion(occ)} className={cn('relative rounded-xl p-3 text-left transition-all border', selectedOccasion === occ ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-white/[0.06] bg-white/[0.02] hover:border-cyan-500/30')}>
                    <Icon className={cn('h-5 w-5 mb-1', selectedOccasion === occ ? 'text-cyan-400' : 'text-white/40')} />
                    <p className={cn('text-[11px] font-semibold', selectedOccasion === occ ? 'text-white' : 'text-white/60')}>{getOccasionLabel(occ)}</p>
                    <p className="text-[10px] text-white/40">{getOccasionDesc(occ)}</p>
                  </button>
                )
              })}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Gemini Vision Engine</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setScanMode('fast')} className={cn('rounded-xl p-3 text-left transition-all border', scanMode === 'fast' ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-white/[0.06] bg-white/[0.02]')}>
                <ZapIcon className={cn('h-5 w-5 mb-1', scanMode === 'fast' ? 'text-cyan-400' : 'text-white/40')} />
                <p className={cn('text-[11px] font-semibold', scanMode === 'fast' ? 'text-white' : 'text-white/60')}>Fast Scan</p>
                <p className="text-[10px] text-white/40">gemini-1.5-flash</p>
              </button>
              <button onClick={() => setScanMode('executive')} className={cn('rounded-xl p-3 text-left transition-all border', scanMode === 'executive' ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/[0.06] bg-white/[0.02]')}>
                <Shield className={cn('h-5 w-5 mb-1', scanMode === 'executive' ? 'text-purple-400' : 'text-white/40')} />
                <p className={cn('text-[11px] font-semibold', scanMode === 'executive' ? 'text-white' : 'text-white/60')}>Executive Mode</p>
                <p className="text-[10px] text-white/40">gemini-1.5-pro</p>
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {GOALS.map((g) => {
            const isSelected = selectedGoal === g.id
            return (
              <button key={g.id} onClick={() => setSelectedGoal(g.id)} className={cn('relative rounded-xl p-3 text-left transition-all border', isSelected ? 'border-2 shadow-lg' : 'border border-white/[0.06] hover:border-cyan-500/30 hover:bg-white/[0.04]')} style={{ borderColor: isSelected ? 'transparent' : undefined, background: isSelected ? `linear-gradient(135deg, ${g.color})` : undefined }}>
                <div className="absolute inset-0 bg-gradient-to-br rounded-xl" style={{ background: `linear-gradient(135deg, ${g.color})`, opacity: isSelected ? 1 : 0 }} />
                <div className="relative flex items-center gap-2 mb-1">
                  <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', isSelected ? 'bg-white/20' : 'bg-white/[0.05]')}>{React.createElement(g.icon, { className: 'h-4 w-4 text-white' })}</div>
                </div>
                <p className={cn('font-semibold text-xs', isSelected ? 'text-white' : 'text-white/80')}>{g.label}</p>
                {isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500"><Check className="h-2.5 w-2.5 text-white" /></motion.div>}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Pre-Visit & Meal Scan System */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/[0.06] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 font-semibold text-white"><Search className="h-5 w-5 text-cyan-400" /> Pre-Visit Planning & Meal Scan</h3>
            <span className="text-xs text-white/40">{scanMode === 'fast' ? 'gemini-1.5-flash' : 'gemini-1.5-pro'} · {getOccasionLabel(selectedOccasion)}</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Menu Link / PDF / Restaurant URL</label>
              <div className="relative"><Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" /><input type="text" value={menuUrl} onChange={(e) => setMenuUrl(e.target.value)} placeholder="Paste menu URL or PDF link..." className="w-full rounded-xl bg-black/30 border border-white/[0.08] px-4 py-3 pl-11 text-sm text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20" /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Or Describe a Meal</label>
              <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" /><textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="e.g., Grilled chicken breast with quinoa..." className="w-full min-h-[80px] rounded-xl bg-black/30 border border-white/[0.08] px-4 py-3 pl-11 text-sm text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 resize-none" rows={2} /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Or Upload a Meal Photo</label>
              <div className="relative">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="meal-photo-upload" disabled={isScanningGemini} />
                {uploadedImage ? (
                  <div className="relative rounded-xl bg-black/30 border border-white/[0.08] overflow-hidden"><img src={uploadedImage} alt="Uploaded meal" className="w-full h-auto max-h-[200px] object-contain" /><button type="button" onClick={removeImage} className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors" aria-label="Remove image"><X className="h-4 w-4" /></button></div>
                ) : (
                  <label htmlFor="meal-photo-upload" className={cn('relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition-all cursor-pointer', 'border-white/[0.15] bg-white/[0.02] hover:border-cyan-500/30 hover:bg-cyan-500/5')}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20"><ImageIcon className="h-6 w-6 text-cyan-400" /></div>
                    <p className="text-sm text-white/70">Drag & drop or click to upload</p>
                    <p className="text-xs text-white/40">JPG, PNG up to 5MB</p>
                  </label>
                )}
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAnalyze} disabled={isAnalyzing || (!inputValue.trim() && !uploadedImage && !menuUrl)} className={cn('w-full flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-sm font-semibold transition-all', (isAnalyzing || (!inputValue.trim() && !uploadedImage && !menuUrl)) ? 'bg-white/5 text-white/30 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30')}>
              {isScanningGemini ? (<><Loader2 className="h-4 w-4 animate-spin" /> {scanMode === 'executive' ? 'Deep Analysis with Gemini-1.5-pro...' : 'Fast OCR with Gemini-1.5-flash...'}</>) : (uploadedImage || menuUrl) ? (<><ImageIcon className="h-4 w-4" /> Gemini Vision Scan</>) : (<><ZapIcon className="h-4 w-4" /> Analyze Meal</>)}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Silent Order Card */}
      <AnimatePresence>
        {silentOrder && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }} transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }} className="rounded-2xl border p-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(6,182,212,0.1))', borderColor: 'rgba(34,197,94,0.3)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20"><Check className="h-5 w-5 text-emerald-400" /></div>
              <div><p className="text-lg font-bold text-white">Silent Order Card</p><p className="text-xs text-white/50">Discreet preparation for the server</p></div>
            </div>
            <div className="rounded-xl bg-black/30 border border-white/[0.05] p-4 mb-4">
              <p className="text-sm font-semibold text-cyan-400 mb-1">Recommended Dish</p>
              <p className="text-xl font-bold text-white">{silentOrder.dishName}</p>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className={cn('px-2 py-0.5 rounded-full border', verdictStyles[silentOrder.status.toLowerCase() as keyof typeof verdictStyles] || 'bg-white/10 text-white')}>{silentOrder.status}</span>
                <span className="text-white/60">Protein: {silentOrder.proteinGrams}</span>
              </div>
            </div>
            <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-4 mb-4">
              <div className="flex items-center gap-2 mb-1"><Eye className="h-4 w-4 text-cyan-400" /><p className="text-xs font-semibold text-cyan-400">Discreet Order Modification</p></div>
              <p className="text-sm text-white/80">{silentOrder.silentOrderTip}</p>
            </div>
            <div className="flex gap-2">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={copySilentTip} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white transition-all">
                {copiedTip ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copiedTip ? 'Copied!' : 'Copy Tip'}
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setFullscreenOrder(true)} className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/[0.08] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.15]"><Maximize2 className="h-4 w-4" /> Full Screen</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Result Card */}
      <AnimatePresence mode="popLayout">
        {result && !silentOrder && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }} transition={{ duration: 0.3 }} className={cn('rounded-2xl border p-6 mt-6 overflow-hidden', verdictStyles[result.verdict])}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', verdictStyles[result.verdict])}><VerdictIcon className="h-5 w-5" /></div>
                  <div><p className="text-lg font-bold text-white capitalize">{result.verdict}</p><p className="text-sm text-white/60">Confidence: {result.confidence}%</p></div>
                </div>
                <div className="mb-4"><p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Key Metric Focus</p><p className="text-white/90">{result.metricFocus}</p></div>
                <div className="rounded-xl bg-black/30 border border-white/[0.05] p-4"><div className="flex items-center gap-2 mb-2"><Sparkles className="h-4 w-4 text-cyan-400" /><p className="font-medium text-white">Quick Action Tip</p></div><p className="text-white/80">{result.quickTip}</p></div>
                <details className="mt-4 group">
                  <summary className="flex items-center gap-2 cursor-pointer text-sm text-white/60 hover:text-white/80"><ChevronDown className={cn('h-4 w-4 transition-transform', 'group-open:rotate-180')} /><span>AI Reasoning</span></summary>
                  <div className="mt-3 space-y-1 pl-6 border-l border-white/[0.1]">
                    {result.reasoning.map((r, i) => <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="text-sm text-white/70 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />{r}</motion.p>)}
                  </div>
                </details>
              </div>
              <div className="text-right"><p className="text-3xl font-bold text-white">{result.confidence}%</p><p className="text-xs text-white/40">Match Score</p></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Occasion-Aware Restaurant & Menu Discovery */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/[0.06] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 font-semibold text-white"><MapPinIcon className="h-5 w-5 text-cyan-400" /> Berlin Restaurants for {getOccasionLabel(selectedOccasion)}</h3>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleFindVenues} disabled={isFindingVenues} className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 text-xs font-semibold text-white shadow shadow-cyan-500/20">
              {isFindingVenues ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />} {isFindingVenues ? 'Finding...' : 'Find Restaurants'}
            </motion.button>
          </div>
          {!apiKeyPresent && (<div className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3"><p className="text-xs text-amber-400">Add VITE_GEMINI_API_KEY to your .env for AI-powered venue discovery</p></div>)}
          <div className="grid gap-4 sm:grid-cols-3">
            {occasionSpots.map((spot, index) => (
              <motion.div key={spot.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }} className="group rounded-xl bg-black/30 border border-white/[0.06] p-5 hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all cursor-pointer">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div><p className="font-semibold text-white">{spot.name}</p><p className="flex items-center gap-1 text-xs text-white/50"><MapPin className="h-3 w-3" />{spot.area}</p></div>
                  <div className="flex items-center gap-1 text-amber-400"><Star className="h-3.5 w-3.5 fill-current" /><span className="font-medium">{spot.rating}</span></div>
                </div>
                <p className="text-sm text-white/70 mb-3">{spot.description}</p>
                <div className="rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 p-3"><p className="text-xs font-medium text-cyan-400 mb-1">Why for {goal.label}</p><p className="text-sm text-white/80">{spot.highlight}</p></div>
              </motion.div>
            ))}
          </div>
          {venues.length > 0 && showVenuePanel && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mt-6 space-y-3">
              <h4 className="text-sm font-semibold text-white/80">{venueSource === 'ai' ? 'AI-Discovered Venues' : 'Curated Berlin Picks'}{venueSource === 'curated' && <span className="ml-2 text-xs font-normal text-amber-400">Gemini unavailable — using local curated list</span>}</h4>
              {venues.map((venue, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl bg-black/30 border border-white/[0.06] p-4 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-start justify-between mb-2"><div><p className="font-semibold text-white">{venue.name}</p><p className="flex items-center gap-1 text-xs text-white/50 mt-0.5"><MapPin className="h-3 w-3" />{venue.address}</p></div></div>
                  <div className="flex flex-wrap gap-3 text-xs text-white/60">
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{venue.phone}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{venue.openingHours}</span>
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-cyan-400 hover:underline"><Navigation className="h-3 w-3" />View Map</a>
                    <a href={venue.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-cyan-400 hover:underline"><Globe className="h-3 w-3" />Website</a>
                  </div>
                  <div className="mt-2 rounded-lg bg-white/[0.02] p-2">
                    <p className="text-[10px] text-white/40 mb-1">Goal-Aligned Dishes:</p>
                    <div className="flex flex-wrap gap-1">{venue.goalAlignedDishes?.map((d, j) => <span key={j} className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-400">{d}</span>)}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Fullscreen Order Modal */}
      <AnimatePresence>
        {fullscreenOrder && silentOrder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setFullscreenOrder(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="mx-4 max-w-md w-full rounded-2xl border p-8" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(34,197,94,0.15))', borderColor: 'rgba(34,197,94,0.4)' }} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-white">Silent Order Card</h3><button onClick={() => setFullscreenOrder(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20"><X className="h-4 w-4" /></button></div>
              <div className="text-center mb-6"><p className="text-2xl font-bold text-cyan-400">{silentOrder.dishName}</p><p className="text-sm text-white/50 mt-1">Status: <span className={cn('capitalize font-semibold', verdictStyles[silentOrder.status.toLowerCase() as keyof typeof verdictStyles] || 'text-white')}>{silentOrder.status}</span></p><p className="text-sm text-white/50">Protein: {silentOrder.proteinGrams}</p></div>
              <div className="rounded-xl bg-black/30 border border-white/[0.05] p-4 mb-4"><p className="text-xs font-semibold text-cyan-400 mb-1">Discreet Order Modification</p><p className="text-sm text-white/80">{silentOrder.silentOrderTip}</p></div>
              <div className="flex gap-2"><button onClick={copySilentTip} className="flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 py-3 text-sm font-semibold text-white">{copiedTip ? '✓ Copied!' : '📋 Copy Tip'}</button><button onClick={() => setFullscreenOrder(false)} className="flex-1 items-center justify-center rounded-xl bg-white/10 py-3 text-sm font-semibold text-white">Close</button></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
