import os

filepath = r"E:\1st year GISMA studying\Year 1, 1st quarter\B119F Creative Problem Solving and startegy development\Workshop\workshop-spa\src\components\ui\lookout.tsx"

new_content = '''import * as React from "react"
import { cn } from "@/lib/utils"

type LookoutMood = "auto" | "neutral" | "reading" | "secret" | "peek" | "happy" | "sad" | "sleepy"
type Expression = Exclude<LookoutMood, "auto">

const LID: Record<Expression, number> = {
  neutral: -30, reading: -32, secret: -20, peek: -38,
  happy: -25, sad: -27, sleepy: -13,
}
const BROWS: Record<Expression, { left: string; right: string }> = {
  neutral: { left: "translateY(0)", right: "translateY(0)" },
  reading: { left: "translateY(-1px)", right: "translateY(-1px)" },
  secret: { left: "translateY(-2px) rotate(-6deg)", right: "translateY(-2px) rotate(6deg)" },
  peek: { left: "translateY(-6px)", right: "translateY(-6px)" },
  happy: { left: "translateY(-3px)", right: "translateY(-3px)" },
  sad: { left: "translateY(2px) rotate(-14deg)", right: "translateY(2px) rotate(14deg)" },
  sleepy: { left: "translateY(4px)", right: "translateY(4px)" },
}
const MOUTH: Record<Expression, string> = {
  neutral: "M52 91 Q60 93.5 68 91 Q60 93.5 52 91",
  reading: "M53 91 Q60 92.5 67 91 Q60 92.5 53 91",
  secret: "M54 92 Q60 90 66 92 Q60 90 54 92",
  peek: "M56 89 Q60 97 64 89 Q60 82 56 89",
  happy: "M49 89 Q60 100 71 89 Q60 100 49 89",
  sad: "M51 95 Q60 87.5 69 95 Q60 87.5 51 95",
  sleepy: "M55 92 Q60 92.2 65 92 Q60 92.2 55 92",
}
const EYES = [41, 79] as const
const EYE_Y = 64
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export function Lookout({
  size = 96, shape = "orb", mood = "auto",
  className, style, ref, ...rest
}: {
  size?: number
  shape?: "orb" | "square"
  mood?: LookoutMood
  className?: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
}) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const hostRef = React.useRef<HTMLDivElement>(null)
  const pupilsRef = React.useRef<Array<SVGGElement | null>>([])
  const lidsRef = React.useRef<Array<SVGRectElement | null>>([])
  const [expression, setExpression] = React.useState<Expression>("neutral")
  const [gazeX, setGazeX] = React.useState(0)
  const [gazeY, setGazeY] = React.useState(0)
  const [lidY, setLidY] = React.useState(LID.neutral)
  const gazeXRef = React.useRef(gazeX)
  const gazeYRef = React.useRef(gazeY)
  const lidYRef = React.useRef(lidY)
  const expressionRef = React.useRef(expression)
  const rafRef = React.useRef(0)

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    if (!hostRef.current) return
    const rect = hostRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height * 0.5
    const tx = clamp((e.clientX - cx) / (rect.width * 1.6), -1, 1)
    const ty = clamp((e.clientY - cy) / (rect.height * 1.6), -1, 1)
    setGazeX(tx)
    setGazeY(ty)
    if (mood === "auto") setExpression("reading")
  }, [mood])

  React.useEffect(() => {
    const expr = mood === "auto" ? "reading" : mood
    setExpression(expr as Expression)
    setLidY(LID[expr as Expression] ?? LID.neutral)
    expressionRef.current = expr as Expression
  }, [mood])

  React.useEffect(() => {
    gazeXRef.current = gazeX
    gazeYRef.current = gazeY
    lidYRef.current = lidY
  }, [gazeX, gazeY, lidY])

  React.useEffect(() => {
    const loop = () => {
      setGazeX(prev => prev + (0 - prev) * 0.1)
      setGazeY(prev => prev + (0 - prev) * 0.1)
      setLidY(prev => prev + ((LID[expressionRef.current] ?? LID.neutral) - prev) * 0.28)
      if (pupilsRef.current) {
        for (const g of pupilsRef.current) if (g) g.style.transform = `translate(${(gazeXRef.current * 6).toFixed(2)}px, ${(gazeYRef.current * 5).toFixed(2)}px)`
      }
      if (lidsRef.current) {
        for (const r of lidsRef.current) if (r) r.style.transform = `translateY(${lidYRef.current.toFixed(2)}px)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const brows = BROWS[expression]

  return (
    <div ref={hostRef} data-slot="lookout" data-expression={expression} className={cn("pointer-events-none inline-block select-none", className)} style={{ width: size, height: size, ...style }} {...rest}>
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" focusable="false" className="block overflow-visible">
        <defs>
          {EYES.map((cx, i) => (
            <clipPath key={cx} id={`${uid}-${i}`}>
              <ellipse cx={cx} cy={EYE_Y} rx="13.5" ry="15.5" />
            </clipPath>
          ))}
        </defs>
        {shape === "orb" ? (
          <circle cx="60" cy="62" r="52" className="fill-[#111118] stroke-white/10" strokeWidth="1.5" />
        ) : (
          <rect x="8" y="10" width="104" height="104" rx="30" className="fill-[#111118] stroke-white/10" strokeWidth="1.5" />
        )}
        {EYES.map((cx, i) => (
          <g key={cx} data-slot="eye">
            <ellipse cx={cx} cy={EYE_Y} rx="13.5" ry="15.5" className="fill-white/5 stroke-white/10" strokeWidth="1" />
            <g ref={(n) => { pupilsRef.current[i] = n }}>
              <circle cx={cx} cy={EYE_Y} r="7.5" className="fill-white/60" />
              <circle cx={cx} cy={EYE_Y} r="3.6" className="fill-white" />
              <circle cx={cx - 2.6} cy={EYE_Y - 3} r="2" className="fill-white" opacity="0.95" />
            </g>
            <g clipPath={`url(#${uid}-${i})`}>
              <rect ref={(n) => { lidsRef.current[i] = n }} x={cx - 15} y="48" width="30" height="34" className="fill-[#111118]" style={{ transform: `translateY(${LID.neutral}px)` }} />
            </g>
          </g>
        ))}
        <path d="M30 44 Q41 38.5 52 44" fill="none" strokeWidth="2.6" strokeLinecap="round" className="stroke-white/70 transition-transform duration-200" style={{ transform: brows.left, transformOrigin: "41px 42px" }} />
        <path d="M68 44 Q79 38.5 90 44" fill="none" strokeWidth="2.6" strokeLinecap="round" className="stroke-white/70 transition-transform duration-200" style={{ transform: brows.right, transformOrigin: "79px 42px" }} />
        <path d={MOUTH[expression]} fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="stroke-white/70" />
      </svg>
    </div>
  )
}

export default Lookout
'''

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Done')
