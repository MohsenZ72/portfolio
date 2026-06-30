import { Html } from '@react-three/drei'
import { TechLogo } from '../TechLogo'
import type { Technology } from '../../data/technologies'

type TechCardProps = {
  tech: Technology
  active: boolean
}

export function TechCard({ tech, active }: TechCardProps) {
  return (
    <Html center transform distanceFactor={6} zIndexRange={[0, 0]}>
      <div
        className="flex w-28 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-5 backdrop-blur-md transition-all duration-300"
        style={{
          opacity: active ? 1 : 0.45,
          transform: active ? 'scale(1.08)' : 'scale(0.88)',
          boxShadow: active ? '0 0 32px rgb(255 255 255 / 0.08)' : 'none',
        }}
      >
        <TechLogo tech={tech} className="h-10 w-10" width={40} height={40} />
        <span className="text-center text-xs font-medium text-zinc-200">{tech.name}</span>
      </div>
    </Html>
  )
}
