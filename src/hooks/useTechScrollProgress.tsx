import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react'

type TechScrollProgressContextType = {
  progress: number
  setProgress: (value: number) => void
}

const TechScrollProgressContext = createContext<TechScrollProgressContextType | null>(null)

export function TechScrollProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState(0)
  const value = useMemo(() => ({ progress, setProgress }), [progress])

  return (
    <TechScrollProgressContext.Provider value={value}>{children}</TechScrollProgressContext.Provider>
  )
}

export function useTechScrollProgress() {
  const context = useContext(TechScrollProgressContext)
  if (!context) {
    throw new Error('useTechScrollProgress must be used inside TechScrollProgressProvider')
  }

  return context
}
