// components/BottomMenu.tsx
'use client'

export function BottomMenu({ activeTab, onTabChange, sessionData }: any) {
  const menuItems = [
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
