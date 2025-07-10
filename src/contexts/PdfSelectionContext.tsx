import React, { createContext, useContext, useState, ReactNode } from 'react'
import { StarterPack } from '../data/starterPacks'

interface PdfSelectionContextType {
  selectedProcedures: Set<string>
  addProcedure: (procedureId: string) => void
  removeProcedure: (procedureId: string) => void
  addStarterPack: (pack: StarterPack) => void
  removeStarterPack: (pack: StarterPack) => void
  clearSelection: () => void
  selectedPacks: Set<string>
  isGeneratingPdf: boolean
  setIsGeneratingPdf: (generating: boolean) => void
}

const PdfSelectionContext = createContext<PdfSelectionContextType | undefined>(undefined)

export const usePdfSelection = () => {
  const context = useContext(PdfSelectionContext)
  if (!context) {
    throw new Error('usePdfSelection must be used within a PdfSelectionProvider')
  }
  return context
}

interface PdfSelectionProviderProps {
  children: ReactNode
}

export const PdfSelectionProvider: React.FC<PdfSelectionProviderProps> = ({ children }) => {
  const [selectedProcedures, setSelectedProcedures] = useState<Set<string>>(new Set())
  const [selectedPacks, setSelectedPacks] = useState<Set<string>>(new Set())
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const addProcedure = (procedureId: string) => {
    setSelectedProcedures(prev => new Set(prev).add(procedureId))
  }

  const removeProcedure = (procedureId: string) => {
    setSelectedProcedures(prev => {
      const newSet = new Set(prev)
      newSet.delete(procedureId)
      return newSet
    })
  }

  const addStarterPack = (pack: StarterPack) => {
    setSelectedPacks(prev => new Set(prev).add(pack.id))
    setSelectedProcedures(prev => {
      const newSet = new Set(prev)
      pack.procedureIds.forEach(id => newSet.add(id))
      return newSet
    })
  }

  const removeStarterPack = (pack: StarterPack) => {
    setSelectedPacks(prev => {
      const newSet = new Set(prev)
      newSet.delete(pack.id)
      return newSet
    })
    setSelectedProcedures(prev => {
      const newSet = new Set(prev)
      pack.procedureIds.forEach(id => newSet.delete(id))
      return newSet
    })
  }

  const clearSelection = () => {
    setSelectedProcedures(new Set())
    setSelectedPacks(new Set())
  }

  const contextValue: PdfSelectionContextType = {
    selectedProcedures,
    addProcedure,
    removeProcedure,
    addStarterPack,
    removeStarterPack,
    clearSelection,
    selectedPacks,
    isGeneratingPdf,
    setIsGeneratingPdf
  }

  return (
    <PdfSelectionContext.Provider value={contextValue}>
      {children}
    </PdfSelectionContext.Provider>
  )
}