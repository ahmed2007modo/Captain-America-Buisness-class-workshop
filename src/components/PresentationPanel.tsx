import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Utensils, Sparkles, Shield, Check, ChevronRight, TrendingUp,
  Target, Users, FileText, Award, Layers, Palette
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; heading?: string; items: string[] }
  | { type: 'table'; heading?: string; headers: string[]; rows: string[][] }
  | { type: 'cards'; items: { title: string; body: string }[] }
  | { type: 'steps'; items: { title: string; subtitle?: string }[] }
  | { type: 'funnel'; image: string; fallbackImage?: string; steps: { value: string; title: string; basis: string }[]; note: string }
  | { type: 'grid'; cells: { title: string; items: string[] }[] }
  | { type: 'swatches'; items: { name: string; hex: string }[] }
  | { type: 'checklist'; items: string[] }

interface Artifact {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  color: string
  image?: string
  description?: string
  blocks: ContentBlock[]
}

const PRESENTER_IMAGES = {
  ahmed: '/Presentation/Picture/Ahmed.jpg',
  mostafa: '/Presentation/Picture/Mostafa.png',
  abdElrahman: '/Presentation/Picture/Abd-Elrahman.jpeg',
}

const PRESENTERS = [
  { name: 'Ahmed', role: 'Founder & AI Product Lead', image: PRESENTER_IMAGES.ahmed, color: 'from-cyan-500 to-blue-500' },
  { name: 'Mostafa', role: 'Growth & Strategy Lead', image: PRESENTER_IMAGES.mostafa, color: 'from-purple-500 to-pink-500' },
  { name: 'Abd-Elrahman', role: 'Systems & Technical Architect', image: PRESENTER_IMAGES.abdElrahman, color: 'from-emerald-500 to-teal-500' },
]

const OPTION1_DATA = {
  competitorMatrix: [
    { name: 'PlateWise', preVisit: '✅ Full AI Menu Analysis', postMeal: '✅ Silent Order', focus: 'Pre-Visit Intelligence' },
    { name: 'MyFitnessPal', preVisit: '❌ Post-Meal Logging Only', postMeal: '✅ Calorie Tracking', focus: 'Post-Meal Logging' },
    { name: 'OpenTable', preVisit: '❌ Reservation Only', postMeal: '❌ None', focus: 'Reservations' },
    { name: 'Yelp', preVisit: '⚠️ Reviews Only', postMeal: '⚠️ Reviews Only', focus: 'User Reviews' },
  ],
  moatPoints: [
    { title: 'Pre-Visit Menu Analysis Pipeline', desc: 'AI reads menus before arrival, analyzing every dish for nutrition, allergens, and goal alignment.', icon: '🔍' },
    { title: 'Multi-Modal Vision API (Gemini 1.5 Pro/Flash)', desc: 'Dual-engine vision processing for rapid OCR and deep nutritional extraction from menu images.', icon: '👁️' },
    { title: 'Creator Partner Database Network', desc: 'Verified Berlin influencers share real dining experiences, validated by GLP-1 and metabolic communities.', icon: '⭐' },
    { title: 'Ultra-Discreet Silent Order Interface', desc: 'One-tap dish ordering for servers — no phone distraction, no public menu browsing during client dinners.', icon: '🤫' },
  ],
  targetAudience: {
    segment: 'Berlin High-Earners (38–55)',
    plans: ['GLP-1 / Wegovy', 'Glucose Stability', 'Muscle Hypertrophy'],
    description: 'Professionals who value health, discretion, and data-driven dining decisions.'
  },
  personas: [
    { name: 'Michael', age: 44, role: 'Senior Consultant', needs: 'Fast, non-distracting choices during client dinners', pain: 'Can\'t browse menus publicly during business dinners' },
    { name: 'Andrea', age: 51, role: 'Lawyer on GLP-1', needs: 'Protein-dense dish suggestions to preserve lean muscle mass', pain: 'Struggles to find GLP-1 compatible high-protein options' },
  ],
  pitch: {
    elevator: 'PlateWise is the AI dining coach that reads menus before you arrive, serving executive-level discreet nutrition tailored for GLP-1 and metabolic health.',
    positioning: 'For high-performing Berlin professionals who value health and discretion, PlateWise provides automated pre-visit menu intelligence without phone distraction.',
    valueProp: 'Zero friction pre-visit planning. AI-personalized nutrition. Discreet silent ordering. All in one platform.'
  },
  valueCanvas: {
    pains: ['Can\'t analyze menus before arriving at restaurants', 'Phone distraction during client dinners', 'Uncertain about GLP-1 / Wegovy compatible dishes', 'No protein tracking at the point of ordering', 'Fear of social embarrassment in health-focused dining'],
    gains: ['Confidence in every dining decision', 'Professional discretion maintained', 'Personalized nutrition aligned with health goals', 'Time saved through AI pre-analysis', 'Access to verified creator recommendations'],
    products: ['Pre-Visit Menu Scanner', 'Gemini Vision Engine', 'Silent Order Card', 'Creator Partner Network', 'Metabolic Health Profiles'],
    painRelievers: ['AI reads menus before you arrive', 'One-tap discreet ordering for servers', 'GLP-1 / Wegovy specific filtering', 'Protein density scoring per dish', 'Verified influencer validation']
  }
}

const OPTION2_DATA: Artifact[] = [
  {
    id: '1', title: '1-Zero-Paid-Marketing Pilot', subtitle: 'Berlin GTM · Channels, Numbers & Growth',
    icon: Users, color: 'from-emerald-500 to-teal-500',
    description: 'Beating big-spending competitors with a narrow Berlin segment won through local communities, professional networks, partnerships and referrals — then scaling only once the playbook is repeatable.',
    blocks: [
      { type: 'heading', text: 'Berlin GTM — Zero-Paid-Marketing Pilot' },
      { type: 'text', text: 'Group 7 · Option 2 — Channels, Numbers & Growth' },
      { type: 'quote', text: 'We will not outspend big players. We win a narrow Berlin segment through trusted local communities, professional networks, partnerships and referrals — then scale only after the playbook proves repeatable.' },
      { type: 'cards', items: [
        { title: 'Startups.Berlin (~34 downloads)', body: 'Founder & startup events — demo the plan-ahead business-dinner use case.' },
        { title: 'Business-Netzwerken (~26 downloads)', body: 'Business networking events — 10-minute demo + QR code at relevant meetups.' },
        { title: 'betahaus Berlin (~21 downloads)', body: 'Coworking community — Business Dinner Challenge at community events.' },
        { title: 'GrowFirma (~13 downloads)', body: 'Founder / professional events — demos to a high-intent audience.' },
        { title: 'Biohackers Berlin (~9 downloads)', body: 'Health optimization niche — protein / glucose / GLP-1 educational activation.' },
      ] },
      { type: 'list', heading: 'Why These Channels', items: [
        'Reach the ICP where trust already exists',
        'Local / partnership-led, not paid-ad-led',
        'Sells the moat: plan-ahead, local relevance, privacy, context',
      ] },
      { type: 'text', text: 'Working Model Total: ~103 direct downloads in the first 3 months (conservative, bottom-up).' },
    ],
  },
  {
    id: '2', title: '2-Bottom-Up Forecast & Funnel', subtitle: 'Acquisition Channels & Conversion Metrics',
    icon: TrendingUp, color: 'from-cyan-500 to-blue-500',
    description: 'A conservative bottom-up funnel linking each acquisition channel to activation and paying subscribers, benchmarked against industry download-to-paid medians.',
    blocks: [
      { type: 'heading', text: 'Bottom-Up Forecast & Funnel' },
      { type: 'funnel',
        image: '/Presentation/Option 2/Bottom funnel graph.png',
        fallbackImage: '/Presentation/Option 2/2- Bottom-Up Forecast & Funnel.png',
        steps: [
          { value: '103', title: 'Downloads', basis: 'Direct acquisition from 5 zero-paid channels' },
          { value: '≈ 62', title: 'Activated users · ↓ 60%', basis: 'First restaurant decision completed' },
          { value: '≈ 3', title: 'Paying users · ↓ 2.9%', basis: 'Health & Fitness median D35 download-to-paid benchmark' },
        ],
        note: 'Key Rule: Referral growth is modeled as upside until real share + invite-conversion data exist.' },
    ],
  },
  {
    id: '3', title: '3-Referral Loop, Scale Gates & Validation', subtitle: 'Berlin → DACH → Germany → International',
    icon: Target, color: 'from-purple-500 to-pink-500',
    description: 'A built-in “Table for Two” referral mechanic paired with an evidence-driven A/B validation experiment and 4-stage scaling gates.',
    blocks: [
      { type: 'heading', text: 'Referral Loop, Scale Gates & Validation' },
      { type: 'text', text: 'Referral Mechanic — “Table for Two”: 7 days Premium for both when the invitee completes their first recommendation.' },
      { type: 'steps', items: [
        { title: 'Invite a colleague', subtitle: 'After your first restaurant plan' },
        { title: 'Complete a recommendation', subtitle: 'The invitee saves their first PlateWise plan' },
        { title: 'Both unlock 7 days Premium', subtitle: 'Reward delivered automatically' },
      ] },
      { type: 'quote', text: 'Referral Math: 10% share rate × 3 invites × 15% activation = K ≈ 0.045 (~4.5 referred activations / 100 active users).' },
      { type: 'heading', text: 'Validation A/B Test — Launch Message' },
      { type: 'cards', items: [
        { title: 'Option A', body: '“AI-powered restaurant menu scanner” · Primary metric: landing-page signup rate' },
        { title: 'Option B', body: '“Know what fits your goal before the business dinner starts.” · Primary metric: landing-page signup rate' },
      ] },
      { type: 'heading', text: '4-Stage Scaling Gates' },
      { type: 'steps', items: [
        { title: 'Berlin', subtitle: 'Validate — repeatable acquisition + activation + retention' },
        { title: 'DACH Pilot', subtitle: 'Replicate — in another German-speaking city' },
        { title: 'Germany', subtitle: 'Scale — multiple cities with repeatable economics' },
        { title: 'International', subtitle: 'Localize — language, privacy & dining context' },
      ] },
    ],
  },
  {
    id: '4', title: '4-Appendix — Evidence Sheet', subtitle: 'Named Sources & Benchmarks',
    icon: FileText, color: 'from-amber-500 to-orange-500',
    description: 'Every growth assumption backed by a named source and benchmark so the bottom-up model is defensible.',
    blocks: [
      { type: 'heading', text: 'Appendix — Evidence Sheet' },
      { type: 'table', headers: ['Channel / Metric', 'Value', 'Source', 'Benchmark'], rows: [
        ['Startups.Berlin', '~34 downloads', 'Meetup community + event attendance', 'AppTweak app-store conversion'],
        ['Business-Netzwerken', '~26 downloads', 'Meetup event attendance', 'Unbounce landing-page median cold-traffic'],
        ['betahaus Berlin', '~21 downloads', 'betahaus official pages', 'AppTweak conversion benchmark'],
        ['GrowFirma', '~13 downloads', 'Meetup Berlin event attendance', 'Professional event cross-check'],
        ['Biohackers Berlin', '~9 downloads', 'Meetup 2,137-member community', 'Longevity Berlin / Liv Longevity sizes'],
        ['Paid Conversion', '2.9% base', 'RevenueCat 2026 Health & Fitness median', '6.2%+ top-quartile'],
        ['Referral Share / Activation', '10% share, 15% invite activation', 'ReferralCandy benchmarks', 'Friendbuy conversion'],
      ] },
    ],
  },
]

const OPTION3_DATA: Artifact[] = [
  {
    id: '1', title: '1-Business Model Canvas', subtitle: 'Berlin-First AI Dining Decision Coach',
    icon: Layers, color: 'from-cyan-500 to-blue-500',
    description: 'The full Osterwalder & Pigneur canvas for PlateWise as a freemium consumer product with a future B2B venue/wellness layer.',
    blocks: [
      { type: 'heading', text: 'The Business Model Canvas' },
      { type: 'text', text: 'Berlin-first AI dining decision coach based on the Osterwalder & Pigneur framework.' },
      { type: 'grid', cells: [
        { title: 'Key Partners', items: ['Berlin restaurants / cafés / mensas', 'Gyms / wellness studios / dietitians', 'University & research communities', 'Menu-data & AI infrastructure', 'GDPR / EU-hosting partners'] },
        { title: 'Key Activities', items: ['Build / improve AI menu analysis', 'Collect & structure local menu data', 'Run zero-budget Berlin GTM tests', 'Build referral loops', 'Measure conversion'] },
        { title: 'Key Resources', items: ['PlateWise PWA & recommendation engine', 'Local Berlin menu database', 'User goal profiles (calories, protein, glucose, GLP-1)', 'Trust / privacy architecture'] },
        { title: 'Value Propositions', items: ['Personalized meal recommendations before / when ordering', '1 clear choice in <90 seconds', 'Supports GLP-1 / glucose needs', 'Lowers manual tracking stress', 'Local privacy-first guidance'] },
        { title: 'Customer Relationships', items: ['Self-service mobile experience', 'Direct, encouraging, non-judgmental tone', 'Personalized saved goals', 'Transparent privacy communication'] },
        { title: 'Channels', items: ['Organic social / content (“what to order”)', 'LinkedIn-style professional networks', 'Berlin gyms / clinics', 'Restaurant QR codes', 'Campus referral pilots'] },
        { title: 'Customer Segments', items: ['Primary — Busy health-conscious Berlin adults 38–55, consultants, researchers', 'Secondary — Fitness-focused diners, GLP-1 / glucose users', 'Students (as low-cost GTM)'] },
        { title: 'Cost Structure', items: ['AI / API usage & cloud hosting', 'Product dev & maintenance', 'Menu data collection / verification', 'Privacy / compliance', 'Low-cash marketing'] },
        { title: 'Revenue Streams', items: ['Freemium model with paid Premium subscription (€14.99/mo)', 'Advanced planning features', 'Future B2B venue / wellness partner revenue'] },
      ] },
    ],
  },
  {
    id: '2', title: '2-First Page PRD', subtitle: 'Executive & Influencer Module',
    icon: FileText, color: 'from-purple-500 to-pink-500',
    description: 'Product requirements for PlateWise as an AI dining decision coach guiding Berlin professionals before and during restaurant visits.',
    blocks: [
      { type: 'heading', text: 'Product Requirement Document (PRD): PlateWise Executive & Influencer Module' },
      { type: 'text', text: 'Product Overview: AI dining decision coach guiding Berlin professionals aged 38–55 before & during restaurant visits.' },
      { type: 'list', heading: 'Personas', items: [
        'Primary — Michael, 44 · Senior Consultant',
        'Secondary — Andrea, 51 · Lawyer on GLP-1',
        'Creator — Berlin Food & Health Influencers',
      ] },
      { type: 'list', heading: 'Core Features', items: [
        'Pre-Visit Planning — the moat (via URLs, PDFs, Google Gemini 1.5 Vision API)',
        'Occasion Context Switcher — Business/Executive Mode vs. Casual/Social/Event Mode',
        'Influencer Partner Program & Verified Spots Cards',
      ] },
      { type: 'heading', text: 'PRD Part 2: Location, Technical Architecture & Success Metrics' },
      { type: 'list', heading: 'Location & Occasion Search', items: [
        'Venue filtering by location (Hermannstraße, Charlottenburg)',
        'Occasion filtering (Business Dinner, Birthday)',
      ] },
      { type: 'list', heading: 'Technical Stack & Architecture', items: [
        'Frontend — React, TypeScript, Tailwind CSS, Framer Motion',
        'AI Engine — Google Gemini API gemini-1.5-flash (14-allergen detection & executive analysis)',
        'Environment Security — import.meta.env.VITE_GEMINI_API_KEY',
      ] },
      { type: 'list', heading: 'Success Metrics (KPIs)', items: [
        'Pre-Visit Engagement',
        'Executive Mode Retention (active daily / weekly usage among 38–55 pros)',
        'Creator Acquisition',
      ] },
    ],
  },
  {
    id: '3', title: '3-Visual Style Guide', subtitle: 'Dark Glassmorphic Design System',
    icon: Palette, color: 'from-amber-500 to-yellow-500',
    description: 'The design system tokens behind PlateWise — a premium dark glassmorphic aesthetic built for high-end executive dining.',
    blocks: [
      { type: 'heading', text: 'PlateWise Visual Style Guide (Design System)' },
      { type: 'text', text: 'Aesthetic: Dark Glassmorphic Premium Aesthetic tailored for high-end executive dining.' },
      { type: 'swatches', items: [
        { name: 'Deep Obsidian', hex: '#0B0F17' },
        { name: 'Charcoal Glass', hex: '#161C28' },
        { name: 'Emerald Cyan', hex: '#06B6D4' },
        { name: 'Electric Mint', hex: '#10B981' },
        { name: 'Amber Gold', hex: '#F59E0B' },
        { name: 'Coral Red', hex: '#EF4444' },
        { name: 'Crisp White', hex: '#F9FAFB' },
        { name: 'Slate Grey', hex: '#9CA3AF' },
      ] },
      { type: 'list', heading: 'Typography', items: [
        'Headings — Inter / Plus Jakarta Sans Bold',
        'Body — Inter Regular, optimized for low-light restaurant environments',
      ] },
      { type: 'list', heading: 'UI Components', items: [
        '1px border gradients (border-white/10)',
        'Glass surfaces — bg-slate-900/60 + backdrop-blur-md',
        'Framer Motion transitions (easeOut, 0.2s–0.3s)',
      ] },
    ],
  },
  {
    id: '4', title: '4-Final Slide Deck & Consistency Audit', subtitle: 'Interactive 8-Slide Checklist',
    icon: Award, color: 'from-red-500 to-orange-500',
    description: 'The final pitch deck outline, from problem to competitive roadmap, framed for investors — tap each slide to mark it ready.',
    blocks: [
      { type: 'heading', text: 'Final Slide Deck Outline (Pitch Structure)' },
      { type: 'text', text: 'Tap each slide below to track delivery of the 8-slide investor narrative.' },
      { type: 'checklist', items: [
        '1 · Title Slide — PlateWise: The AI Executive Dining Coach & Verified Discovery Engine',
        '2 · The Problem — Executives (40–55) struggle with health goals (GLP-1, glucose) during business dinners due to awkward phone distractions',
        '3 · The Solution — Pre-Visit Planning + Gemini Multi-Model Vision API + The Silent Order Card',
        '4 · Target Market & Persona — The 38–55 Berlin Executive Demographic & Influencer Growth Loop',
        '5 · Product Showcase — Live prototype screenshots (Menu Scan, Silent Order Card, Influencer Verified Spots)',
        '6 · Business Model & Pricing — Freemium, €14.99/mo Executive Tier, B2B Venue Partnerships',
        '7 · Growth Engine (The Moat) — Crowdsourced restaurant database built by Influencer Partner Pass users',
        '8 · Competitive Advantage & Roadmap — Gemini 1.5 Pro reasoning vs. generic calorie counters (MyFitnessPal)',
      ] },
    ],
  },
];

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading':
      return <p className="pt-1 font-bold text-white text-sm">{block.text}</p>
    case 'text':
      return <p className="text-xs leading-relaxed text-white/60">{block.text}</p>
    case 'quote':
      return (
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3">
          <p className="text-xs italic leading-relaxed text-cyan-100/80">{block.text}</p>
        </div>
      )
    case 'list':
      return (
        <div className="space-y-1.5">
          {block.heading && <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-400">{block.heading}</p>}
          {block.items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-white/60">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )
    case 'table':
      return (
        <div>
          {block.heading && <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-cyan-400">{block.heading}</p>}
          <div className="overflow-x-auto rounded-lg border border-white/[0.06]">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                  {block.headers.map((h, i) => (
                    <th key={i} className="px-2.5 py-1.5 font-semibold text-white/70">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {block.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-2.5 py-1.5 align-top text-white/60">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    case 'cards':
      return (
        <div className="grid gap-2 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <p className="mb-1 text-xs font-semibold text-white">{item.title}</p>
              <p className="text-[11px] leading-relaxed text-white/50">{item.body}</p>
            </div>
          ))}
        </div>
      )
    case 'steps':
      return (
        <div className="space-y-0">
          {block.items.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="flex flex-col items-center">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-[10px] font-bold text-white shadow-sm shadow-cyan-500/20">{i + 1}</span>
                {i < block.items.length - 1 && <span className="my-0.5 h-5 w-px bg-white/10" />}
              </div>
              <div className="pb-3">
                <p className="text-xs font-semibold text-white">{item.title}</p>
                {item.subtitle && <p className="text-[11px] text-white/50">{item.subtitle}</p>}
              </div>
            </div>
          ))}
        </div>
      )
    case 'funnel':
      return (
        <div className="grid items-start gap-4 sm:grid-cols-2">
          <div>
            <FunnelImage src={block.image} fallback={block.fallbackImage ?? block.image} alt="Bottom-Up Forecast funnel graph" />
            <p className="mt-1.5 text-[10px] text-white/40">Bottom-Up Forecast — reachable audience × qualified reach × benchmarked conversion</p>
          </div>
          <div className="space-y-2">
            {block.steps.map((step, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
                <div className="mb-0.5 flex items-baseline justify-between gap-2">
                  <p className="text-lg font-bold text-white">{step.value}</p>
                  <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-400">{step.title}</span>
                </div>
                <p className="text-[11px] text-white/50">{step.basis}</p>
              </div>
            ))}
            <p className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-amber-200/80">{block.note}</p>
          </div>
        </div>
      )
    case 'grid':
      return (
        <div className="grid gap-2 sm:grid-cols-2">
          {block.cells.map((cell, i) => (
            <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-cyan-400">{cell.title}</p>
              <ul className="space-y-1">
                {cell.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-1.5 text-[11px] text-white/60">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    case 'swatches':
      return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {block.items.map((sw, i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-white/[0.06]">
              <div className="h-9 w-full" style={{ backgroundColor: sw.hex }} />
              <div className="bg-white/[0.03] px-2 py-1.5">
                <p className="text-[11px] font-semibold text-white">{sw.name}</p>
                <p className="font-mono text-[10px] text-white/50">{sw.hex}</p>
              </div>
            </div>
          ))}
        </div>
      )
    case 'checklist':
      return <ChecklistBlock items={block.items} />
  }
}

function FunnelImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [url, setUrl] = useState(src)
  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      onError={() => { if (url !== fallback) setUrl(fallback) }}
      className="w-full rounded-xl border border-white/[0.08] object-contain"
    />
  )
}

function ChecklistBlock({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false))
  const toggle = (i: number) => setChecked(prev => prev.map((v, idx) => (idx === i ? !v : v)))
  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <div key={i} onClick={(e) => { e.stopPropagation(); toggle(i) }} className="flex cursor-pointer items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2 transition-colors hover:border-cyan-500/30">
          <span className={cn('mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] transition-colors', checked[i] ? 'border-cyan-400 bg-cyan-400 text-black' : 'border-white/20')}>
            {checked[i] && <Check className="h-3 w-3" />}
          </span>
          <span className={cn('text-[11px] leading-relaxed', checked[i] ? 'text-white/40 line-through' : 'text-white/70')}>{item}</span>
        </div>
      ))}
    </div>
  )
}

function ArtifactCard({ artifact, isExpanded, onToggle, delay }: { artifact: Artifact; isExpanded: boolean; onToggle: () => void; delay: number }) {
  const Icon = artifact.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      onClick={onToggle}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 backdrop-blur-md p-5 transition-all cursor-pointer hover:border-cyan-500/30"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br', artifact.color)}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <ChevronRight className={cn('h-5 w-5 text-white/30 transition-transform', isExpanded && 'rotate-90')} />
      </div>
      <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">{artifact.subtitle}</p>
      <h4 className="mb-2 text-sm font-bold text-white">{artifact.title}</h4>
      {artifact.description && <p className="text-xs text-white/50">{artifact.description}</p>}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 space-y-3 overflow-hidden"
          >
            {artifact.image && (
              <img src={artifact.image} alt={artifact.title} loading="lazy" className="w-full rounded-xl border border-white/[0.08] object-contain" />
            )}
            {artifact.blocks.map((block, i) => <BlockRenderer key={i} block={block} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ArtifactGrid({ artifacts, expanded, onToggle }: { artifacts: Artifact[]; expanded: string | null; onToggle: (id: string) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {artifacts.map((artifact, index) => (
        <ArtifactCard
          key={artifact.id}
          artifact={artifact}
          delay={0.1 + index * 0.1}
          isExpanded={expanded === artifact.id}
          onToggle={() => onToggle(artifact.id)}
        />
      ))}
    </div>
  )
}

export function PresentationPanel() {
  const [expandedArtifact, setExpandedArtifact] = useState<string | null>(null)

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/[0.08] p-6 sm:p-8">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/20">
                <Utensils className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">PlateWise — AI Dining Decision Coach</h2>
                <p className="text-sm text-white/60">Pitch Deck & Documentation</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Presenter Cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PRESENTERS.map((presenter, index) => (
          <motion.div key={presenter.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }} whileHover={{ scale: 1.03 }} className="group rounded-2xl border border-white/[0.08] bg-slate-900/60 backdrop-blur-md p-5 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img src={presenter.image} alt={presenter.name} className="h-16 w-16 rounded-full object-cover border-2 border-white/[0.1] group-hover:border-cyan-500/50 transition-colors" />
                <div className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br ${presenter.color} border-2 border-[#111118]`}>
                  <Check className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white text-sm">{presenter.name}</p>
                <p className="text-xs text-white/50">{presenter.role}</p>
                <div className={cn('mt-1.5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r bg-clip-text text-xs font-semibold text-transparent', presenter.color)}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Verified</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Content Area */}
      <div className="space-y-6">

        {/* OPTION 1 */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white"><Target className="h-5 w-5 text-cyan-400" /> Market & Positioning — Option 1</h3>
          <div className="space-y-6">
              {/* Competitor Matrix */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Competitor Framing Matrix</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Platform</th>
                        <th className="text-left py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Pre-Visit AI</th>
                        <th className="text-left py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Post-Meal</th>
                        <th className="text-left py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Focus</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {OPTION1_DATA.competitorMatrix.map((row, i) => (
                        <motion.tr key={row.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.05 }} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 font-semibold text-white">{row.name}</td>
                          <td className={cn('py-3 text-xs', row.preVisit.includes('✅') ? 'text-emerald-400' : row.preVisit.includes('⚠️') ? 'text-amber-400' : 'text-red-400')}>{row.preVisit}</td>
                          <td className={cn('py-3 text-xs', row.postMeal.includes('✅') ? 'text-emerald-400' : 'text-red-400')}>{row.postMeal}</td>
                          <td className="py-3 text-xs text-white/60">{row.focus}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Moat Points */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">4 Moat Points</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {OPTION1_DATA.moatPoints.map((point, i) => (
                    <motion.div key={point.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:border-cyan-500/20 transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{point.icon}</span>
                        <div><p className="font-semibold text-white text-sm">{point.title}</p></div>
                      </div>
                      <p className="text-xs text-white/50">{point.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Target Audience & ICP */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Target Audience & ICP</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                    <p className="font-semibold text-white mb-1">Primary Segment</p>
                    <p className="text-cyan-400 text-sm">{OPTION1_DATA.targetAudience.segment}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {OPTION1_DATA.targetAudience.plans.map(plan => (
                        <span key={plan} className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-400">{plan}</span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-white/50">{OPTION1_DATA.targetAudience.description}</p>
                  </div>
                  <div className="space-y-3">
                    {OPTION1_DATA.personas.map((persona, i) => (
                      <motion.div key={persona.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-white text-sm">{persona.name}, {persona.age}</p>
                          <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] text-purple-400">{persona.role}</span>
                        </div>
                        <p className="text-xs text-white/60">{persona.needs}</p>
                        <p className="text-xs text-red-400/70 mt-1">Pain: {persona.pain}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* GTM Messaging & Pitch */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">GTM Messaging & Pitch</h3>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 p-4">
                    <p className="text-xs font-semibold text-cyan-400 mb-1">Elevator Pitch</p>
                    <p className="text-sm text-white/80 italic">"{OPTION1_DATA.pitch.elevator}"</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-4">
                    <p className="text-xs font-semibold text-purple-400 mb-1">Positioning Statement</p>
                    <p className="text-sm text-white/80 italic">"{OPTION1_DATA.pitch.positioning}"</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4">
                    <p className="text-xs font-semibold text-emerald-400 mb-1">Value Proposition</p>
                    <p className="text-sm text-white/80">{OPTION1_DATA.pitch.valueProp}</p>
                  </div>
                </div>
              </motion.div>

              {/* Value Proposition Canvas */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Value Proposition Canvas</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-4">
                    <p className="font-semibold text-red-400 text-sm mb-2">Customer Pains</p>
                    <ul className="space-y-1.5">
                      {OPTION1_DATA.valueCanvas.pains.map((pain, i) => (
                        <li key={i} className="text-xs text-white/60 flex items-start gap-1.5"><span className="h-1 w-1 rounded-full bg-red-400 mt-1.5 shrink-0" />{pain}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4">
                    <p className="font-semibold text-emerald-400 text-sm mb-2">Customer Gains</p>
                    <ul className="space-y-1.5">
                      {OPTION1_DATA.valueCanvas.gains.map((gain, i) => (
                        <li key={i} className="text-xs text-white/60 flex items-start gap-1.5"><span className="h-1 w-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />{gain}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/10 p-4">
                    <p className="font-semibold text-cyan-400 text-sm mb-2">Products & Pain Relievers</p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-white">Products:</p>
                      {OPTION1_DATA.valueCanvas.products.map((prod, i) => (
                        <p key={i} className="text-xs text-white/60">• {prod}</p>
                      ))}
                      <p className="text-xs font-semibold text-white mt-2 mb-1">Pain Relievers:</p>
                      {OPTION1_DATA.valueCanvas.painRelievers.map((rel, i) => (
                        <p key={i} className="text-xs text-white/60">• {rel}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        {/* OPTION 2 */}
        <div className="border-t border-white/[0.08] pt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white"><TrendingUp className="h-5 w-5 text-cyan-400" /> GTM & Growth — Option 2</h3>
          <ArtifactGrid artifacts={OPTION2_DATA} expanded={expandedArtifact} onToggle={(id) => setExpandedArtifact(expandedArtifact === id ? null : id)} />
        </div>

        {/* OPTION 3 */}
        <div className="border-t border-white/[0.08] pt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white"><FileText className="h-5 w-5 text-cyan-400" /> PRD & Deck — Option 3</h3>
          <ArtifactGrid artifacts={OPTION3_DATA} expanded={expandedArtifact} onToggle={(id) => setExpandedArtifact(expandedArtifact === id ? null : id)} />
        </div>
      </div>
    </div>
  )
}
