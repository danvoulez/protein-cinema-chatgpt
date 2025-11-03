// components/ProteinTheater.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import type { SessionData } from '../lib/types'

declare global { interface Window { $3Dmol?: any } }

export function ProteinTheater({ data }: { data?: SessionData | null }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null)
  const [ready, setReady] = useState(false)
  const pdb = data?.models?.[0]?.content

  useEffect(() => {
    if (!containerRef.current || !pdb) return
    let mounted = true

    async function ensure3Dmol() {
      if (window.$3Dmol) return
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement('script')
        s.src = 'https://unpkg.com/3dmol/build/3Dmol-min.js'
        s.async = true
        s.onload = () => resolve()
        s.onerror = () => reject(new Error('3Dmol load failed'))
        document.body.appendChild(s)
      })
    }

    async function init() {
      try {
        await ensure3Dmol()
        if (!mounted || !window.$3Dmol || !containerRef.current) return
        const viewer = window.$3Dmol.createViewer(containerRef.current, {
          backgroundColor: 'black'
        })
        viewer.addModel(pdb, 'pdb')
        viewer.setStyle({}, { cartoon: { colorscheme: 'Royal' } })
        viewer.zoomTo()
        viewer.render()

        // Guarda referência pra controles manuais (fallback)
        viewerRef.current = viewer
        setReady(true)
      } catch {
        setReady(false)
      }
    }

    // iOS Safari: prevenir zoom da página ao usar pinça no viewer
    const el = containerRef.current
    const stopDefault = (e: Event) => e.preventDefault()
    el.addEventListener('gesturestart', stopDefault as any, { passive: false })
    el.addEventListener('gesturechange', stopDefault as any, { passive: false })
    el.addEventListener('gestureend', stopDefault as any, { passive: false })

    init()

    return () => {
      mounted = false
      el.removeEventListener('gesturestart', stopDefault as any)
      el.removeEventListener('gesturechange', stopDefault as any)
      el.removeEventListener('gestureend', stopDefault as any)
    }
  }, [pdb])

  // Fallbacks de acessibilidade/teclado/mouse
  function zoom(step = 1.2) {
    const v = viewerRef.current
    if (!v) return
    v.zoom(step)
    v.render()
  }
  function reset() {
    const v = viewerRef.current
    if (!v) return
    v.zoomTo()
    v.render()
  }
  function spin(toggle?: boolean) {
    const v = viewerRef.current
    if (!v) return
    // liga/desliga rotação automática
    v.spin('y', toggle ?? !v.isSpinning())
    v.render()
  }

  if (!pdb) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-5xl mb-3">🧪</div>
          <div>Inicie uma simulação para visualizar a estrutura 3D.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full relative">
      {/* touch-action:none permite pinça/gestos do viewer sem scroll/zoom da página */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ touchAction: 'none' }}
        role="img"
        aria-label="Visualizador 3D de proteína (arraste para girar, pinça para zoom, dois dedos para mover)"
        // fallback: roda do mouse = zoom
        onWheel={(e) => {
          e.preventDefault()
          zoom(e.deltaY < 0 ? 1.1 : 1 / 1.1)
        }}
      />

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <div className="animate-pulse">Carregando visualizador 3D…</div>
        </div>
      )}

      {/* Overlay com metadados */}
      <div className="absolute left-3 bottom-3 text-xs text-gray-300 bg-black/50 px-3 py-2 rounded-lg border border-white/10 pointer-events-none">
        <div>Sessão: <span className="font-mono">{data?.sessionId ?? '-'}</span></div>
        <div>Confiança (pLDDT médio): <span className="font-semibold">{data?.confidence?.overall ?? '—'}%</span></div>
      </div>

      {/* Botões de controle (fallback para quem preferir tocar em botões) */}
      <div className="absolute right-3 bottom-3 flex flex-col gap-2">
        <button onClick={() => zoom(1.15)} className="px-3 py-2 bg-white/10 text-white rounded-lg border border-white/20">＋ Zoom</button>
        <button onClick={() => zoom(1/1.15)} className="px-3 py-2 bg-white/10 text-white rounded-lg border border-white/20">－ Zoom</button>
        <button onClick={() => spin()} className="px-3 py-2 bg-white/10 text-white rounded-lg border border-white/20">⟳ Spin</button>
        <button onClick={reset} className="px-3 py-2 bg-white/10 text-white rounded-lg border border-white/20">⤾ Reset</button>
      </div>
    </div>
  )
}
