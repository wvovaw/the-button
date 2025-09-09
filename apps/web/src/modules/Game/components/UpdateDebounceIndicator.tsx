import { useEffect, useRef } from 'react'
import { GAME_CONFIG } from '../constants'
import { useGame } from '../contexts/GameContext'

export default function UpdateDebounceIndicator() {
  const fillRef = useRef<HTMLDivElement>(null)
  const { state } = useGame()

  useEffect(() => {
    const el = fillRef.current
    if (!el) return

    el.style.animation = 'none'
    el.style.transform = 'scaleY(1)'
    void el.offsetHeight
    el.style.animation = `triangleDrainScale ${GAME_CONFIG.UPDATE_DEBOUNCE}ms linear forwards`
  }, [state.stats.counter])

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rotate-90 rotate-y-180">
      <div
        className="relative h-64 w-10"
        style={{
          clipPath: 'polygon(0% 100%, 100% 100%, 0% 0%)',
          overflow: 'hidden',
        }}
      >
        <div className="bg-secondary-foreground/30 absolute inset-0" />
        <div
          ref={fillRef}
          className="bg-secondary-foreground absolute inset-0"
          style={{
            transformOrigin: 'top center',
            transform: 'scaleY(0)',
            willChange: 'transform',
          }}
        />
      </div>

      <style>{`
        @keyframes triangleDrainScale {
          from { transform: scaleY(1); }
          to   { transform: scaleY(0); }
        }
      `}</style>
    </div>
  )
}
