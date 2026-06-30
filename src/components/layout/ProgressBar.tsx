import { useScrollProgress } from '../../hooks/useScrollProgress'

export function ProgressBar() {
  const { progress } = useScrollProgress()

  return (
    <div aria-hidden className="fixed left-0 top-0 z-50 h-1 w-full bg-white/5">
      <div
        className="h-full bg-zinc-300 transition-transform duration-75"
        style={{ transform: `scaleX(${Math.max(progress, 0.02)})`, transformOrigin: 'left' }}
      />
    </div>
  )
}
