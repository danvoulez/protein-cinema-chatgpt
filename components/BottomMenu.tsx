// components/BottomMenu.tsx
'use client'

import type { SessionData } from '../lib/types'

type TabId = 'simulation' | 'analysis' | 'replay' | 'manifesto'

interface BottomMenuProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  sessionData: SessionData | null
}

export function BottomMenu({ activeTab, onTabChange, sessionData }: BottomMenuProps) {
  const menuItems: Array<{ id: TabId; icon: string; label: string; disabled: boolean }> = [
    { id: 'simulation', icon: '🧬', label: 'Simulação', disabled: false },
    { id: 'analysis', icon: '📊', label: 'Análise', disabled: !sessionData },
    { id: 'replay', icon: '🎥', label: 'Replay', disabled: !sessionData },
    { id: 'manifesto', icon: '📜', label: 'Manifesto', disabled: !sessionData },
  ]

  return (
    <div className="flex justify-around items-center h-16 bg-black border-t border-gray-800 px-4">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => !item.disabled && onTabChange(item.id)}
          disabled={item.disabled}
          className={`flex flex-col items-center justify-center flex-1 max-w-[80px] transition-all ${
            activeTab === item.id 
              ? 'text-cyan-400 scale-110' 
              : item.disabled 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className="text-2xl mb-1">{item.icon}</div>
          <div className="text-xs font-medium">{item.label}</div>
        </button>
      ))}
    </div>
  )
}
