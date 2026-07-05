import { useState, useCallback, useRef } from 'react'
import { getStudentScores } from '../api/client'
import type { StudentResult, ScoreEntry } from '../types'

import ScoreCard from '../components/ScoreCard'

export default function HomePage() {
  const [sbd, setSbd] = useState('')
  const [result, setResult] = useState<StudentResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const handleSearch = useCallback(async () => {
    const trimmed = sbd.trim()

    // Validate: must be exactly 8 digits
    if (!/^\d+$/.test(trimmed)) {
      setError('Student ID must consist of exactly 8 digits.')
      setResult(null)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    // Fetch student scores from the API
    try {
      const data = await getStudentScores(trimmed)
      setResult(data)

      // Scroll to result on mobile
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const resp = err as { response?: { status?: number; data?: { message?: string } } }
        if (resp.response?.status === 404) {
          setError('Not found. Please check the student ID and try again.')
        } else {
          setError(resp.response?.data?.message ?? 'An error occurred while querying. Please try again.')
        }
      } else {
        setError('Unable to connect to the server. Please check your connection.')
      }
    } finally {
      setLoading(false)
    }
  }, [sbd])

  return (
    <div className="min-h-screen hero-bg">
      {/* Search Section */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-20 pb-12 sm:pt-28 sm:pb-16">
        {/* Decorative blurs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Logo / Title */}
        <div className="relative z-10 text-center mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="gradient-text">TODO LIST</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed font-medium">
            Create and manage your tasks efficiently
          </p>
        </div>
      </section>

      {/* Result */}
      {result && (
        <section ref={resultRef} className="px-4 pb-20 animate-[fadeIn_0.3s_ease]">
          <div className="max-w-3xl mx-auto">
            {/* Student header card */}
            <div className="glass-card p-6 sm:p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-slate-400 text-xs uppercase mb-1 font-semibold tracking-wider">Số báo danh</p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-wide">{result.sbd}</h2>
                </div>
                <div className="flex items-center gap-4">
                  {result.ma_ngoai_ngu && (
                    <div className="px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200/80">
                      <span className="text-sky-700 text-sm font-bold">🌐 {result.ma_ngoai_ngu}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Score grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {result.scores.map((score: ScoreEntry) => (
                  <ScoreCard key={score.subject} score={score} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <section className="px-4 pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-6 sm:p-8">
              <div className="h-8 w-48 rounded-lg shimmer mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="h-20 rounded-xl shimmer" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
