"use client"

import * as React from "react"
import { Lookout, type LookoutMood } from "@/components/ui/lookout"

const settings = {
  lookAwayForPasswords: true,
  followPointer: true,
  startLookingAway: true,
  idleAfter: 8,
  blink: true,
  squareHead: false,
  size: 176,
  useIrisColor: true,
  irisColor: "#6366f1",
  headline: "Welcome back",
}

const field =
  "bg-[#111118] border-white/10 placeholder:text-white/30 focus-visible:ring-cyan-500/50 h-11 rounded-lg border px-3 text-sm font-medium outline-none focus-visible:ring-[3px]"

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const s = settings
  const formRef = React.useRef<HTMLFormElement>(null)
  const [reveal, setReveal] = React.useState(false)
  // Start with "secret" (looking away), interaction switches to "auto"
  const [mood, setMood] = React.useState<LookoutMood>(s.startLookingAway ? "secret" : "auto")
  const [note, setNote] = React.useState<string | null>(null)
  const [passwordFocused, setPasswordFocused] = React.useState(false)
  const live = () => setMood((m) => (m === "secret" ? "auto" : m))

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const ok = String(data.get("email")).includes("@") && String(data.get("password")).length >= 8
    setMood(ok ? "happy" : "auto")
    setNote(ok ? "Signed in. Redirecting…" : "Use a valid email and at least 8 characters.")
    if (ok) {
      onLogin()
    }
    window.setTimeout(() => {
      setMood("auto")
      setNote(null)
    }, 1800)
  }

  const handlePasswordFocus = () => {
    setPasswordFocused(true)
    // Password field focused & hidden → look away (secret)
    if (!reveal) setMood("secret")
    else setMood("auto")
  }

  const handlePasswordBlur = () => {
    setPasswordFocused(false)
    // Not focused, not revealing → neutral/auto (not sad)
    if (!reveal) setMood("auto")
  }

  const handleRevealToggle = () => {
    setReveal((v) => {
      const next = !v
      // Revealed → peek (open mouth), Hidden → look away if focused, else auto
      if (next) setMood("peek")
      else if (passwordFocused) setMood("secret")
      else setMood("auto")
      return next
    })
  }

  return (
    <div className="bg-[#0a0a0a] flex min-h-[max(560px,100svh)] w-full items-center justify-center px-6 py-12">
      <div
        onPointerDownCapture={live}
        onFocusCapture={live}
        className="bg-[#111118] text-white border-white/10 grid w-full max-w-3xl overflow-hidden rounded-2xl border shadow-sm md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      >
        <div className="bg-white/[0.03] flex flex-col items-center justify-center gap-6 px-8 py-12">
          <Lookout
            shape="orb"
            size={s.size}
            scope={formRef}
            follow={s.followPointer ? "both" : "form"}
            blink={s.blink}
            lookAwayForPasswords={s.lookAwayForPasswords}
            idleAfter={s.idleAfter}
            mood={mood}
            restGaze={[0.45, 0.1]}
            irisColor={s.useIrisColor ? s.irisColor : undefined}
          />
          <p className="text-white/40 max-w-[22ch] text-center text-sm text-pretty">
            I read along as you type. I won't look at your password.
          </p>
          <p className="text-[10px] text-white/20">Made by Captain America 🇺🇸</p>
        </div>

        <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col justify-center gap-5 px-8 py-10">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">{s.headline}</h1>
            <p className="text-white/40 mt-1 text-sm">Sign in to continue to FuelCampus.</p>
          </div>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-white/70">
            Email
            <input name="email" type="text" inputMode="email" autoComplete="email" defaultValue="nima@meridian.app" className={field} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-white/70">
            Password
            <span className="relative flex">
              <input
                name="password"
                type={reveal ? "text" : "password"}
                autoComplete="current-password"
                defaultValue="correct-horse"
                className={`${field} w-full pr-11`}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
              <button
                type="button"
                id="show-password"
                data-slot="cta-primary"
                data-lookout="reveal"
                aria-label={reveal ? "Hide password" : "Show password"}
                aria-pressed={reveal}
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleRevealToggle}
                className="text-white/40 hover:text-white absolute inset-y-0 right-0 inline-flex w-11 cursor-pointer items-center justify-center rounded-r-lg outline-none focus-visible:ring-cyan-500/50 focus-visible:ring-[3px]"
              >
                {reveal ? (
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3l18 18" />
                    <path d="M10.6 5.2A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1" />
                    <path d="M6.6 6.6A17.9 17.9 0 0 0 2 12s3.5 7 10 7a10.7 10.7 0 0 0 4.3-.9" />
                    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                  </svg>
                ) : (
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </span>
          </label>

          <div className="flex items-center justify-between text-sm">
            <label className="text-white/40 inline-flex items-center gap-2">
              <input type="checkbox" name="remember" className="accent-cyan-500 size-4" /> Remember me
            </label>
            <a href="#reset" className="text-white/40 hover:text-white underline-offset-4 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="bg-cyan-500 text-white inline-flex h-11 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold shadow-sm transition-[transform,box-shadow] duration-150 active:scale-[0.98]"
          >
            Sign in
          </button>

          <p aria-live="polite" className="text-white/40 min-h-5 text-sm">
            {note}
          </p>
        </form>
      </div>
    </div>
  )
}