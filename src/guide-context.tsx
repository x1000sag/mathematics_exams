import { createContext, useContext } from 'react'

export type GuideContextValue = {
  training: boolean
  go: (id: string) => void
}

export const GuideContext = createContext<GuideContextValue>({
  training: false,
  go: () => {},
})

export function useGuide() {
  return useContext(GuideContext)
}
