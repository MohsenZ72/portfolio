import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react'

type ScrollProgressContextType = {
  progress: number
  setProgress: (value: number) => void
}

const ScrollProgressContext = createContext<ScrollProgressContextType | null>(null)

export function ScrollProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState(0)
  const value = useMemo(() => ({ progress, setProgress }), [progress])

  return <ScrollProgressContext.Provider value={value}>{children}</ScrollProgressContext.Provider>
}

export function useScrollProgress() {
  const context = useContext(ScrollProgressContext)
  if (!context) {
    throw new Error('useScrollProgress must be used inside ScrollProgressProvider')
  }

  return context
}
