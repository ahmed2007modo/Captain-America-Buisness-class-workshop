import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, BadgeCheck, X, ChevronRight, Users,
  ForkKnife, Award, Search
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface InfluencerProfile {
  id: string
  name: string
  avatar: string
  bio: string
  tagline: string
  verified: boolean
  followers: number
  category: 'fitness' | 'nutrition' | 'lifestyle' | 'metabolic' | 'restriction'
}

interface CustomerReview {
  author: string
  rating: number
  text: string
  date: string
}

interface InfluencerVisit {
  id: string
  restaurantName: string
  address: string
  area: string
  orderedDish: string
  proteinGrams: string
  glucoseScore: string
  influencerRating: number
  influencerReview: string
  customerReviews: CustomerReview[]
  overallRating: number
  reviewCount: number
  occasionTags: string[]
  imageUrl?: string
  visitedAt: string
}

const MOCK_INFLUENCERS: InfluencerProfile[] = [
  { id: '1', name: 'BerlinFitness', avatar: 'BF', bio: 'Vegan Bodybuilding & Strength', tagline: 'Vegan Bodybuilding & Strength', verified: true, followers: 18200, category: 'fitness' },
  { id: '2', name: 'MarathonMitte', avatar: 'MM', bio: 'Endurance, Carb-Loading & Running', tagline: 'Endurance, Carb-Loading & Running', verified: true, followers: 14500, category: 'fitness' },
  { id: '3', name: 'LeanInBerlin', avatar: 'LB', bio: 'High-Volume Eat Clean, Low-Calorie', tagline: 'High-Volume Eat Clean, Low-Calorie', verified: true, followers: 9800, category: 'nutrition' },
  { id: '4', name: 'Hypertrophy_Kotti', avatar: 'HK', bio: 'High-Protein, Muscle Hypertrophy', tagline: 'High-Protein, Muscle Hypertrophy', verified: false, followers: 22100, category: 'fitness' },
  { id: '5', name: 'Sarahs_GLP1_Journey', avatar: 'SG', bio: 'GLP-1 Support, Small-Portion Friendly', tagline: 'GLP-1 Support, Small-Portion Friendly', verified: true, followers: 31400, category: 'metabolic' },
  { id: '6', name: 'GlucoseGuide_DE', avatar: 'GG', bio: 'Low Glycemic, Insulin-Smart Dining', tagline: 'Low Glycemic, Insulin-Smart Dining', verified: true, followers: 12700, category: 'metabolic' },
  { id: '7', name: 'The_Metabolic_Doc', avatar: 'TM', bio: 'High-Protein, High-Fibre Metabolic Health', tagline: 'High-Protein, High-Fibre Metabolic Health', verified: true, followers: 19600, category: 'metabolic' },
  { id: '8', name: 'OzempicDiaries_Berlin', avatar: 'OD', bio: 'Appetite Management & Nutrient Density', tagline: 'Appetite Management & Nutrient Density', verified: true, followers: 27800, category: 'metabolic' },
  { id: '9', name: 'Prenzlauer_PlantBased', avatar: 'PP', bio: '100% Vegan, Macro-Balanced', tagline: '100% Vegan, Macro-Balanced', verified: true, followers: 15300, category: 'restriction' },
  { id: '10', name: 'TheBerlinCeliac', avatar: 'TB', bio: 'Strict Gluten-Free & Safe Prep', tagline: 'Strict Gluten-Free & Safe Prep', verified: true, followers: 8900, category: 'restriction' },
  { id: '11', name: 'KetoInKreuzberg', avatar: 'KI', bio: 'High-Fat, Ultra Low-Carb Dining', tagline: 'High-Fat, Ultra Low-Carb Dining', verified: false, followers: 11200, category: 'restriction' },
]

const MOCK_VISITS: InfluencerVisit[] = [
  {
    id: '1', restaurantName: 'Clean Eating Kreuzberg', address: 'Friedrichstraße 12, 10117 Berlin', area: 'Kreuzberg',
    orderedDish: 'Grilled Chicken Quinoa Bowl', proteinGrams: '42g', glucoseScore: 'Low (28 GI)',
    influencerRating: 5, influencerReview: 'Absolute staple for meal prep. The quinoa is perfectly cooked and the chicken is always juicy. Macro breakdown is spot-on for tracking.',
    customerReviews: [
      { author: 'Alex M.', rating: 5, text: 'Best macro-counted bowl in Berlin! Protein is always accurate.', date: '2025-12-20' },
      { author: 'Julia K.', rating: 4, text: 'Great food but can get crowded during lunch. Go early!', date: '2025-12-18' },
      { author: 'Chris P.', rating: 5, text: 'My go-to spot for post-workout. The portions are generous.', date: '2025-12-15' },
    ],
    overallRating: 4.7, reviewCount: 234, occasionTags: ['business-executive', 'casual-family'], visitedAt: '2025-12-15'
  },
  {
    id: '2', restaurantName: 'Bio Bowl Charlottenburg', address: 'Hauptstraße 45, 10623 Berlin', area: 'Charlottenburg',
    orderedDish: 'Lentil-Quinoa Power Bowl', proteinGrams: '35g', glucoseScore: 'Low (32 GI)',
    influencerRating: 5, influencerReview: 'Organic ingredients and the GI labeling is a game-changer. Perfect for glucose optimization. The lentil-quinoa combo is incredible.',
    customerReviews: [
      { author: 'Marie S.', rating: 5, text: 'Finally a place that labels GI index! Life saver for my diabetes management.', date: '2025-12-19' },
      { author: 'Hans W.', rating: 4, text: 'Good variety but slightly overpriced for the portion size.', date: '2025-12-16' },
    ],
    overallRating: 4.6, reviewCount: 189, occasionTags: ['casual-family', 'celebration'], visitedAt: '2025-12-10'
  },
  {
    id: '3', restaurantName: 'Protein House Mitte', address: 'Unter den Linden 8, 10117 Berlin', area: 'Mitte',
    orderedDish: '40g Protein Chicken Breast Plate', proteinGrams: '40g', glucoseScore: 'Minimal (8 GI)',
    influencerRating: 4, influencerReview: 'Pure protein focus done right. The 40g plate is massive and perfect for cutting. Would love to see more plant-based options though.',
    customerReviews: [
      { author: 'Tim R.', rating: 5, text: 'Insane protein per euro. This is what I eat every day during contest prep.', date: '2025-12-17' },
      { author: 'Lisa B.', rating: 3, text: 'Great for fitness but the vibe is very gym-like. Not a date night spot.', date: '2025-12-12' },
      { author: 'Mike T.', rating: 4, text: 'Solid food, solid portions. The egg white omelette is underrated.', date: '2025-12-08' },
    ],
    overallRating: 4.4, reviewCount: 156, occasionTags: ['business-executive'], visitedAt: '2025-12-05'
  },
  {
    id: '4', restaurantName: 'Green Garden Prenzlauer Berg', address: 'Kastanienstraße 22, 10435 Berlin', area: 'Prenzlauer Berg',
    orderedDish: 'Plant-Power Mediterranean Bowl', proteinGrams: '28g', glucoseScore: 'Low (25 GI)',
    influencerRating: 5, influencerReview: 'The most beautiful plant-forward spot in Berlin. The fiber content is incredible for gut health. Perfect for GLP-1 followers.',
    customerReviews: [
      { author: 'Sarah L.', rating: 5, text: '15g+ fiber per bowl! This changed my digestion completely.', date: '2025-12-20' },
      { author: 'David F.', rating: 5, text: 'Best vegan options in Berlin. The seasonal menu keeps things fresh.', date: '2025-12-17' },
      { author: 'Nina H.', rating: 4, text: 'Lovely ambiance but can get slow during peak hours.', date: '2025-12-14' },
    ],
    overallRating: 4.7, reviewCount: 312, occasionTags: ['casual-family', 'celebration'], visitedAt: '2025-12-01'
  },
  {
    id: '5', restaurantName: 'Lean Kitchen Neukölln', address: 'Neumannstraße 55, 12045 Berlin', area: 'Neukölln',
    orderedDish: 'GLP-1 Portion-Controlled Bowl', proteinGrams: '32g', glucoseScore: 'Minimal (10 GI)',
    influencerRating: 4, influencerReview: 'Portion-controlled meals are exactly what I needed for my GLP-1 journey. Pre-weighed macros save so much time. Only wish they had more variety.',
    customerReviews: [
      { author: 'Olivia G.', rating: 4, text: 'Perfect portion sizes for my medication. The macros are always accurate.', date: '2025-12-19' },
      { author: 'Jake R.', rating: 3, text: 'Functional rather than fun. Good for the goals but not the vibe.', date: '2025-12-15' },
    ],
    overallRating: 4.3, reviewCount: 178, occasionTags: ['casual-family'], visitedAt: '2025-11-28'
  },
  {
    id: '6', restaurantName: 'Iron Kitchen Friedrichshain', address: 'Simon-Dach-Straße 36, 10245 Berlin', area: 'Friedrichshain',
    orderedDish: 'Creatine-Enhanced Steak Plate', proteinGrams: '48g', glucoseScore: 'Minimal (5 GI)',
    influencerRating: 4, influencerReview: 'The creatine and beta-alanine add-ons are a unique touch. Massive 48g protein steak plate for serious athletes. Not for the faint of heart.',
    customerReviews: [
      { author: 'Ben C.', rating: 5, text: 'As a strength athlete, this is the only place I go for pre-contest meals.', date: '2025-12-16' },
      { author: 'Emma W.', rating: 4, text: 'Incredible protein density. The add-on supplements are worth it.', date: '2025-12-13' },
    ],
    overallRating: 4.5, reviewCount: 143, occasionTags: ['business-executive'], visitedAt: '2025-11-30'
  },
]

const CATEGORY_COLORS = {
  fitness: 'from-red-500 to-orange-500',
  nutrition: 'from-emerald-500 to-teal-500',
  lifestyle: 'from-purple-500 to-pink-500',
  metabolic: 'from-blue-500 to-cyan-500',
  restriction: 'from-amber-500 to-yellow-500',
}

export function InfluencerPanel() {
  const [selectedInfluencer, setSelectedInfluencer] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showOnlyVerified, setShowOnlyVerified] = useState(false)
  const [selectedVisit, setSelectedVisit] = useState<InfluencerVisit | null>(null)

  const filteredInfluencers = useMemo(() => {
    let list = MOCK_INFLUENCERS
    if (filterCategory !== 'all') list = list.filter(i => i.category === filterCategory)
    if (showOnlyVerified) list = list.filter(i => i.verified)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(i => i.name.toLowerCase().includes(q) || i.bio.toLowerCase().includes(q) || i.tagline.toLowerCase().includes(q))
    }
    return list
  }, [filterCategory, showOnlyVerified, searchQuery])

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={cn('h-3.5 w-3.5', s <= rating ? 'fill-amber-400 text-amber-400' : 'text-white/20')} />
      ))}
    </div>
  )

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Influencer Verified Spots</h2>
            <p className="text-sm text-white/50">See what Berlin's top creators eat, review, and recommend</p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/[0.06] p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search influencers or restaurants..." className="w-full rounded-xl bg-black/30 border border-white/[0.08] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-purple-500/50" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {[
               { key: 'all', label: 'All' },
               { key: 'fitness', label: '💪 Fitness' },
               { key: 'nutrition', label: '🥗 Nutrition' },
               { key: 'metabolic', label: '🩺 Metabolic' },
               { key: 'restriction', label: '🥑 Restrictions' },
             ].map(cat => (
               <button key={cat.key} onClick={() => setFilterCategory(cat.key)} className={cn('rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-all', filterCategory === cat.key ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-white/5 text-white/50 border border-white/[0.06]')}>
                 {cat.label}
               </button>
             ))}
            <button onClick={() => setShowOnlyVerified(!showOnlyVerified)} className={cn('rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-all', showOnlyVerified ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-white/50 border border-white/[0.06]')}>
              <BadgeCheck className="h-3 w-3 inline mr-1" /> Verified Only
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Influencer List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-semibold text-white/80 mb-2">Influencers ({filteredInfluencers.length})</h3>
          {filteredInfluencers.map((influencer, index) => (
            <motion.div
              key={influencer.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => setSelectedInfluencer(influencer.id === selectedInfluencer ? null : influencer.id)}
              className={cn(
                'group rounded-xl border p-4 cursor-pointer transition-all',
                selectedInfluencer === influencer.id ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/[0.06] bg-white/[0.02] hover:border-purple-500/30 hover:bg-white/[0.04]'
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br shrink-0 text-white text-xs font-bold', CATEGORY_COLORS[influencer.category])}>
                  {influencer.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-white text-sm">{influencer.name}</p>
                    {influencer.verified && <BadgeCheck className="h-3.5 w-3.5 text-purple-400 shrink-0" />}
                  </div>
                  <p className="text-[10px] text-white/40 mt-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 bg-clip-text text-transparent">{influencer.tagline}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-white/40">{influencer.followers.toLocaleString()} followers</span>
                    <span className="text-[10px] text-white/20">·</span>
                    <span className="text-[10px] text-white/40 capitalize">{influencer.category}</span>
                  </div>
                </div>
                <ChevronRight className={cn('h-4 w-4 text-white/30 transition-transform shrink-0', selectedInfluencer === influencer.id ? 'rotate-90 text-purple-400' : '')} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visits / Restaurant List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-white/80 mb-2">
            {selectedInfluencer ? (
              <>Visited Spots</>
            ) : (
              <>All Verified Restaurant Visits ({MOCK_VISITS.length})</>
            )}
          </h3>
          {selectedInfluencer && (
            <div className="grid gap-3">
              {MOCK_VISITS.map((visit, index) => {
                const influencer = MOCK_INFLUENCERS.find(i => i.id === selectedInfluencer)
                return (
                  <motion.div
                    key={visit.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => setSelectedVisit(visit)}
                    className="group rounded-xl bg-black/30 border border-white/[0.06] p-4 hover:border-purple-500/30 hover:bg-white/[0.02] transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs font-bold shrink-0">{influencer?.avatar || '??'}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-white text-sm">{visit.restaurantName}</p>
                          {renderStars(visit.influencerRating)}
                        </div>
                        <p className="text-xs text-white/50 mt-0.5">{visit.address}</p>
                        <p className="text-xs text-purple-400 mt-1">Ordered: <span className="text-white/80">{visit.orderedDish}</span> · {visit.proteinGrams} protein</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {!selectedInfluencer && (
            <div className="grid gap-4 sm:grid-cols-2">
              {MOCK_VISITS.map((visit, index) => {
                return (
                  <motion.div
                    key={visit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    onClick={() => setSelectedVisit(visit)}
                    className="group rounded-xl bg-black/30 border border-white/[0.06] p-5 hover:border-purple-500/30 hover:bg-white/[0.02] transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-[10px] font-bold">{MOCK_INFLUENCERS[0].avatar}</div>
                        <div>
                          <p className="font-semibold text-white text-sm">{visit.restaurantName}</p>
                          <p className="text-[10px] text-white/40">{visit.area}</p>
                        </div>
                      </div>
                      {renderStars(visit.overallRating)}
                    </div>
                    <p className="text-sm text-white/70 mb-2">{visit.orderedDish}</p>
                    <div className="flex items-center gap-3 text-[10px]">
                      <span className="text-cyan-400">Protein: {visit.proteinGrams}</span>
                      <span className="text-amber-400">GI: {visit.glucoseScore}</span>
                      <span className="text-white/30">{visit.customerReviews.length} reviews</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3 text-amber-400" />
                        <span className="text-xs text-white/60">{visit.overallRating} overall</span>
                      </div>
                      <span className="text-[10px] text-white/30">{visit.reviewCount} reviews</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Selected Visit Detail Modal */}
      <AnimatePresence>
        {selectedVisit && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setSelectedVisit(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} onClick={e => e.stopPropagation()} className="mx-4 max-w-2xl w-full rounded-2xl border border-white/[0.08] bg-[#111118] shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="relative bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 p-4 border-b border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-white">{selectedVisit.restaurantName}</p>
                    <p className="text-xs text-white/50">{selectedVisit.address}</p>
                  </div>
                  <button onClick={() => setSelectedVisit(null)} className="rounded-full bg-white/10 p-2 hover:bg-white/20"><X className="h-5 w-5 text-white/60" /></button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Creator's Order */}
                <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ForkKnife className="h-4 w-4 text-purple-400" />
                    <p className="text-xs font-semibold text-purple-400">Creator's Exact Order</p>
                  </div>
                  <p className="text-xl font-bold text-white">{selectedVisit.orderedDish}</p>
                  <div className="flex gap-3 mt-2 text-xs">
                    <span className="text-cyan-400">Protein: {selectedVisit.proteinGrams}</span>
                    <span className="text-amber-400">GI: {selectedVisit.glucoseScore}</span>
                  </div>
                </div>

                {/* Creator Review */}
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-purple-400" />
                    <p className="text-xs font-semibold text-white/80">Creator Review</p>
                    <span className="text-[10px] text-white/40">· {selectedVisit.visitedAt}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(selectedVisit.influencerRating)}
                    <span className="text-xs text-white/60">{selectedVisit.influencerRating}/5</span>
                  </div>
                  <p className="text-sm text-white/70">{selectedVisit.influencerReview}</p>
                </div>

                {/* Overall Rating */}
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-white/80">Overall Community Rating</p>
                    {renderStars(selectedVisit.overallRating)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span>{selectedVisit.overallRating} average</span>
                    <span>·</span>
                    <span>{selectedVisit.reviewCount} reviews</span>
                  </div>
                </div>

                {/* Customer Reviews */}
                <div>
                  <p className="text-xs font-semibold text-white/80 mb-2">Customer Reviews</p>
                  <div className="space-y-3">
                    {selectedVisit.customerReviews.map((review, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white text-[10px] font-bold">{review.author[0]}</div>
                            <div>
                              <p className="text-xs font-semibold text-white">{review.author}</p>
                              <p className="text-[10px] text-white/30">{review.date}</p>
                            </div>
                          </div>
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-xs text-white/60 mt-1">{review.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Occasion Tags */}
                <div className="flex flex-wrap gap-1">
                  {selectedVisit.occasionTags.map(tag => (
                    <span key={tag} className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] text-purple-400">{tag}</span>
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
