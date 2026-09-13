import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error.message, errorInfo.componentStack)
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
            <p className="text-white/50">{this.state.error?.message || 'Please refresh the page'}</p>
            <button onClick={() => window.location.reload()} className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 text-sm text-white">Refresh</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
