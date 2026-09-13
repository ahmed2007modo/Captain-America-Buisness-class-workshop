import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-[rgba(255,255,255,0.05)]',
        className
      )}
    />
  )
}

export function ChatSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-3/4 bg-[rgba(255,255,255,0.05)]" />
          <Skeleton className="h-3 w-1/3 bg-[rgba(255,255,255,0.03)]" />
        </div>
      </div>
      <div className="flex items-start gap-3 justify-end">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-full bg-[rgba(255,255,255,0.05)]" />
          <Skeleton className="h-4 w-2/3 bg-[rgba(255,255,255,0.05)]" />
        </div>
        <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-orange-500" />
      </div>
      <div className="flex items-start gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-5/6 bg-[rgba(255,255,255,0.05)]" />
          <Skeleton className="h-3 w-3/5 bg-[rgba(255,255,255,0.03)]" />
          <Skeleton className="h-24 w-full rounded-2xl bg-[rgba(255,255,255,0.05)]" />
        </div>
      </div>
    </div>
  )
}
