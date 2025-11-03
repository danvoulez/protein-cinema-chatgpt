// components/ConsultationMode.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { ConsultationChat } from './ConsultationChat'
import { CinemaScreen } from './CinemaScreen'
import { BottomMenu } from './BottomMenu'
import type { SessionData } from '../lib/types'

type TabId = 'simulation' | 'analysis' | 'replay' | 'manifesto'

export function ConsultationMode() {
  const [activeTab, setActiveTab] = useState<TabId>('simulation')
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [isThinking, setIsThinking] = useState(false)
  
  const touchStart = useRef<number | null>(null)
  const tabs: Array<typeof activeTab> = ['simulation', 'analysis', 'replay', 'manifesto']

  // Efeito de transição cinematográfica
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'auto' }
  }, [])

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.changedTouches[0].clientX
  }
  
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStart.current == null) return
    const dx = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(dx) < 60) return
    const dir = dx < 0 ? 1 : -1
    const i = tabs.indexOf(activeTab)
    const next = Math.min(tabs.length - 1, Math.max(0, i + dir))
    setActiveTab(tabs[next])
    touchStart.current = null
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      
      {/* Tela Cinema (70% da altura) */}
      <div className="flex-1 relative overflow-hidden">
        <CinemaScreen 
          activeTab={activeTab}
          sessionData={sessionData}
          isThinking={isThinking}
        />
      </div>
      
      {/* Barra Inferior (30% da altura) */}
      <div className="h-[30%] flex flex-col border-t border-gray-800">
        
        {/* Chat da Consulta */}
        <div className="flex-1 overflow-hidden">
          <ConsultationChat 
            onSessionUpdate={setSessionData}
            onThinkingState={setIsThinking}
          />
        </div>
        
        {/* Menu Inferior */}
        <BottomMenu 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sessionData={sessionData}
        />
      </div>
    </div>
  )
}
