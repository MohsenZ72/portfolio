import { useState } from 'react'
import {
  getTechnologyLogoFallbackUrl,
  getTechnologyLogoUrl,
  type Technology,
} from '../data/technologies'

type TechLogoProps = {
  tech: Technology
  className?: string
  width?: number
  height?: number
}

export function TechLogo({ tech, className = '', width = 40, height = 40 }: TechLogoProps) {
  const [src, setSrc] = useState(getTechnologyLogoUrl(tech))
  const isAws = tech.slug === 'amazonaws'

  return (
    <img
      src={src}
      alt=""
      width={width}
      height={height}
      className={`object-contain ${isAws ? 'brightness-0 invert sepia saturate-[4] hue-rotate-[5deg]' : ''} ${className}`}
      loading="lazy"
      onError={() => setSrc(getTechnologyLogoFallbackUrl(tech))}
    />
  )
}
