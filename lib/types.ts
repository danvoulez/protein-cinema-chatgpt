// lib/types.ts
export type Message = {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: string
}

export type SimulationFinding = {
  title: string
  description: string
  evidence?: string
}

export type SessionData = {
  sessionId: string
  startedAt: string
  inputSequence?: string
  structureHash?: string
  confidence?: { overall: number }
  plddt?: number[] // 0-100 por resíduo
  auditTrail: string[]
  models?: Array<{
    name: string
    format: 'pdb' | 'cif'
    content: string
  }>
  manifesto?: any
}
