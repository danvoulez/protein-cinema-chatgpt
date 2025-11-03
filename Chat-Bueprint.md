# Experiência cinematográfica web

**User:** Anonymous (dcamarilho@gmail.com)  
**Created:** 11/3/2025 14:55:50  
**Updated:** 11/3/2025 16:18:17  
**Exported:** 11/3/2025 17:07:44  
**Link:** [https://chatgpt.com/c/6908c270-1fa8-8331-9920-d1a0d970aec6](https://chatgpt.com/c/6908c270-1fa8-8331-9920-d1a0d970aec6)  

## Prompt:
QUE CONCEITO INCRÍVEL! 🎭✨ Isso é muito mais que um site - é uma experiência cinematográfica científica. Vamos criar essa jornada.

---

🎬 VISÃO DA EXPERIÊNCIA CINEMATOGRÁFICA

Arquitetura da Jornada do Usuário:

1. 🏔️  LANDING PAGE ÉPICA (mobile first)
   |
2. 💬  CHAT FLUTUANTE com LogLine Bio
   |
3. 🎭  TRANSFORMAÇÃO para MODO CONSULTA
   |
4. 🔬  TELA CINEMA (simulações em tempo real)
   |
5. 📜  MANIFESTO FINAL (evidência assinada)

---

1. 🏔️ LANDING PAGE DESLUMBRANTE

typescript
// frontend/landing/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { FloatingChat } from '../components/FloatingChat'
import { CinematicBackground } from '../components/CinematicBackground'

export default function LandingPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [showChat, setShowChat] = useState(false)

  // Efeito cinematográfico de entrada
  useEffect(() => {
    const timer = setTimeout(() => setShowChat(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSessionStart = () => {
    setSessionStarted(true)
    // Transição suave para modo consulta
    document.documentElement.classList.add('session-active')
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      sessionStarted ? 'bg-black' : 'bg-gradient-to-br from-blue-900 via-purple-900 to-black'
    }`}>
      
      {/* Background Cinematográfico */}
      <CinematicBackground active={!sessionStarted} />
      
      {/* Conteúdo Principal */}
      {!sessionStarted && (
        <div className="relative z-10 text-white text-center px-6 pt-20">
          {/* Logo Épica */}
          <div className="mb-8 animate-float">
            <div className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ProteinTrace
            </div>
            <div className="text-xl md:text-2xl opacity-80">
              O Teatro da Descoberta Científica
            </div>
          </div>

          {/* Tagline Impactante */}
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-lg md:text-xl leading-relaxed opacity-90">
              Entre no laboratório virtual onde cada simulação é uma <span className="text-cyan-300">performance científica</span>, 
              e cada resultado um <span className="text-green-300">manifesto assinado</span> de evidência.
            </p>
          </div>
        </div>
      )}

      {/* Chat Flutuante */}
      {showChat && (
        <FloatingChat 
          onSessionStart={handleSessionStart}
          isVisible={!sessionStarted}
        />
      )}

      {/* Modo Consulta (ativa quando sessionStarted = true) */}
      {sessionStarted && (
        <ConsultationMode />
      )}
    </div>
  )
}

---

2. 💬 CHAT FLUTUANTE COM PERSONALIDADE

typescript
// components/FloatingChat.tsx
'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const INITIAL_SUGGESTIONS = [
  "🧬 Quero prever uma estrutura proteica nova",
  "🔍 Simular o impacto de uma mutação CRISPR", 
  "📚 Entender como o AlphaFold funciona",
  "⚗️ Explorar exemplos de descobertas recentes",
  "🎓 Sou estudante, me guie pela ciência"
]

export function FloatingChat({ onSessionStart, isVisible }: { 
  onSessionStart: () => void, 
  isVisible: boolean 
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Olá! Sou o **LogLine Bio**, seu assistente no Teatro da Descoberta. Sou um biólogo computacional especializado em tornar a complexidade proteica acessível e fascinante. Como posso guiar sua exploração científica hoje?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSuggestionClick = async (suggestion: string) => {
    setShowSuggestions(false)
    setInput('')
    
    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: suggestion,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // Simula resposta do assistente
    setTimeout(() => {
      const response = generateAssistantResponse(suggestion)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
      
      // Inicia sessão para certos tipos de consulta
      if (suggestion.includes('prever') || suggestion.includes('simular') || suggestion.includes('mutação')) {
        setTimeout(onSessionStart, 1500)
      }
    }, 1000)
  }

  const generateAssistantResponse = (userInput: string): string => {
    if (userInput.includes('prever') || userInput.includes('estrutura')) {
      return "Excelente! Vamos embarcar numa jornada de predição estrutural. Irei guiá-lo através do AlphaFold enquanto construímos um **manifesto auditável** completo. Esta sessão ficará registrada como uma consulta científica válida. Preparado para começar?"
    } else if (userInput.includes('CRISPR') || userInput.includes('mutação')) {
      return "Fascinante! A simulação de edições genéticas é onde a magia acontece. Vamos explorar como uma pequena alteração pode transformar uma proteína, criando um **registro validado** do impacto estrutural. Pronto para essa investigação?"
    } else if (userInput.includes('estudante') || userInput.includes('guie')) {
      return "Maravilhoso! Adoro iniciar novos cientistas nesta jornada. Vou explicar cada conceito como se estivéssemos num laboratório, transformando complexidade em clareza. Quer começar com uma demonstração prática?"
    }
    
    return "Perfeito! Como biólogo computacional, posso transformar sua curiosidade em descoberta concreta. Vamos criar uma sessão interativa onde cada passo será documentado como evidência científica. Por onde gostaria de começar?"
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-50">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
        
        {/* Header do Chat */}
        <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="font-semibold text-gray-800">LogLine Bio</div>
            <div className="text-xs text-gray-500">Biólogo Computacional • Online</div>
          </div>
        </div>
        
        {/* Área de Mensagens */}
        <div className="h-64 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap" 
                     dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                <div className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Sugestões */}
        {showSuggestions && (
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Sugestões para começar:</div>
            <div className="space-y-2">
              {INITIAL_SUGGESTIONS.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

---

3. 🎭 MODO CONSULTA - O TEATRO CIENTÍFICO

typescript
// components/ConsultationMode.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { ConsultationChat } from './ConsultationChat'
import { CinemaScreen } from './CinemaScreen'
import { BottomMenu } from './BottomMenu'

export function ConsultationMode() {
  const [activeTab, setActiveTab] = useState<'simulation' | 'manifesto' | 'replay' | 'analysis'>('simulation')
  const [sessionData, setSessionData] = useState<any>(null)
  const [isThinking, setIsThinking] = useState(false)

  // Efeito de transição cinematográfica
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'auto' }
  }, [])

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      
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

---

4. 🎬 TELA CINEMA - O ESPETÁCULO VISUAL

typescript
// components/CinemaScreen.tsx
'use client'

import { useEffect, useState } from 'react'
import { ProteinTheater } from './ProteinTheater'
import { ManifestoView } from './ManifestoView'
import { SessionReplay } from './SessionReplay'
import { AnalysisDashboard } from './AnalysisDashboard'

export function CinemaScreen({ activeTab, sessionData, isThinking }: any) {
  const [displayedContent, setDisplayedContent] = useState<any>(null)

  // Efeitos visuais durante "pensamento"
  useEffect(() => {
    if (isThinking) {
      const effects = ['🧬', '⚗️', '🔍', '📊', '🎯']
      let i = 0
      const interval = setInterval(() => {
        setDisplayedContent({
          type: 'thinking',
          emoji: effects[i % effects.length]
        })
        i++
      }, 500)
      return () => clearInterval(interval)
    } else {
      setDisplayedContent(sessionData)
    }
  }, [isThinking, sessionData])

  const renderContent = () => {
    if (isThinking) {
      return (
        <div className="h-full flex items-center justify-center flex-col">
          <div className="text-6xl mb-4 animate-bounce">
            {displayedContent?.emoji || '🧬'}
          </div>
          <div className="text-xl text-gray-400 animate-pulse">
            LogLine Bio está realizando a simulação...
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Cada passo está sendo auditado e registrado
          </div>
        </div>
      )
    }

    switch (activeTab) {
      case 'simulation':
        return <ProteinTheater data={sessionData} />
      case 'manifesto':
        return <ManifestoView data={sessionData} />
      case 'replay':
        return <SessionReplay data={sessionData} />
      case 'analysis':
        return <AnalysisDashboard data={sessionData} />
      default:
        return (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-6xl mb-4">🎭</div>
              <div>O Teatro da Descoberta aguarda sua consulta</div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="h-full bg-black relative overflow-hidden">
      
      {/* Header Cinematográfico */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="text-sm font-mono">SESSÃO ATIVA</div>
          </div>
          <div className="text-xs text-gray-500 font-mono">
            {sessionData?.sessionId ? `#${sessionData.sessionId}` : 'INICIANDO...'}
          </div>
        </div>
      </div>
      
      {/* Conteúdo Principal */}
      <div className="h-full pt-16 pb-4">
        {renderContent()}
      </div>
      
      {/* Efeitos Visuais */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-500/20 to-transparent"></div>
      </div>
    </div>
  )
}

---

5. 📜 SISTEMA DE MANIFESTO - EVIDÊNCIA ASSINADA

typescript
// components/ManifestoView.tsx
'use client'

interface ManifestoData {
  sessionId: string
  timestamp: string
  participants: string[]
  scientificQuestion: string
  methodology: string[]
  findings: any[]
  conclusions: string[]
  digitalSignature: string
  auditTrail: string[]
}

export function ManifestoView({ data }: { data: any }) {
  const manifesto: ManifestoData = data?.manifesto || generateDefaultManifesto(data)

  return (
    <div className="h-full overflow-y-auto p-6 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabeçalho Épico */}
        <div className="text-center mb-8 border-b border-gray-700 pb-8">
          <div className="text-4xl font-serif mb-2 text-amber-200">MANIFESTO CIENTÍFICO</div>
          <div className="text-gray-400 font-mono text-sm">Sessão #{manifesto.sessionId}</div>
        </div>
        
        {/* Metadados da Sessão */}
        <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
          <div>
            <div className="text-gray-500">Data/Hora</div>
            <div className="text-white">{new Date(manifesto.timestamp).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-500">Participantes</div>
            <div className="text-white">{manifesto.participants.join(' • ')}</div>
          </div>
        </div>
        
        {/* Questão Científica */}
        <div className="mb-8 p-6 bg-gray-800/50 rounded-lg border-l-4 border-cyan-500">
          <div className="text-gray-400 text-sm mb-2">QUESTÃO INVESTIGADA</div>
          <div className="text-white text-lg italic">"{manifesto.scientificQuestion}"</div>
        </div>
        
        {/* Metodologia */}
        <div className="mb-8">
          <div className="text-gray-400 text-sm mb-3">METODOLOGIA APLICADA</div>
          <div className="space-y-2">
            {manifesto.methodology.map((method, index) => (
              <div key={index} className="flex items-start space-x-3 text-white">
                <div className="text-cyan-400 mt-1">▸</div>
                <div>{method}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Descobertas */}
        <div className="mb-8">
          <div className="text-gray-400 text-sm mb-3">DESCOBERTAS E OBSERVAÇÕES</div>
          <div className="space-y-4">
            {manifesto.findings.map((finding, index) => (
              <div key={index} className="p-4 bg-gray-800/30 rounded border border-gray-700">
                <div className="text-amber-200 font-semibold mb-2">{finding.title}</div>
                <div className="text-white text-sm">{finding.description}</div>
                {finding.evidence && (
                  <div className="mt-2 text-xs text-gray-400 font-mono">
                    Evidência: {finding.evidence}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Conclusões */}
        <div className="mb-8 p-6 bg-green-900/20 rounded-lg border border-green-700/30">
          <div className="text-gray-400 text-sm mb-3">CONCLUSÕES E RECOMENDAÇÕES</div>
          <div className="space-y-2 text-white">
            {manifesto.conclusions.map((conclusion, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="text-green-400 mt-1">●</div>
                <div>{conclusion}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Assinatura Digital */}
        <div className="text-center border-t border-gray-700 pt-8">
          <div className="text-gray-400 text-sm mb-2">ASSINATURA DIGITAL DO PROCESSO</div>
          <div className="font-mono text-xs text-gray-500 break-all mb-4">
            {manifesto.digitalSignature}
          </div>
          <div className="text-gray-400 text-xs">
            Este manifesto representa um registro auditável e reproduzível da investigação científica realizada.
            Todos os passos foram documentados no ledger universal LogLine.
          </div>
        </div>
      </div>
    </div>
  )
}

function generateDefaultManifesto(data: any): ManifestoData {
  return {
    sessionId: Date.now().toString(),
    timestamp: new Date().toISOString(),
    participants: ['Usuário Pesquisador', 'LogLine Bio (Assistente)'],
    scientificQuestion: "Investigação da relação estrutura-função através de predição computacional de proteínas",
    methodology: [
      "Predição de estrutura terciária usando AlphaFold 2.3.2",
      "Análise de confiança pLDDT por resíduo", 
      "Validação de sequência proteica",
      "Simulação de impacto estrutural de variações",
      "Documentação auditável em tempo real"
    ],
    findings: [
      {
        title: "Estrutura Terciária Predita",
        description: "Modelo 3D gerado com confiança geral de " + (data?.confidence?.overall || 'N/A') + "%",
        evidence: data?.structureHash || "Hash de estrutura pendente"
      }
    ],
    conclusions: [
      "O processo de predição foi executado com sucesso e integridade",
      "Todos os dados de entrada e saída foram hashados e registrados",
      "Os resultados estão prontos para análise científica adicional",
      "Este manifesto serve como evidência reprodutível do processo"
    ],
    digitalSignature: `SIGNED|${Date.now()}|${btoa('proteintrace_evidence_v1')}|...`,
    auditTrail: ['Sessão iniciada', 'Validação de sequência', 'Predição AlphaFold', 'Análise de confiança']
  }
}

---

6. 🎨 ANIMAÇÕES E TRANSFORMAÇÕES CSS

css
/* styles/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Transições suaves entre modos */
.session-active {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}

/* Animações flutuantes */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Efeitos cinematográficos */
.cinematic-glow {
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.3),
    0 0 40px rgba(59, 130, 246, 0.2),
    0 0 60px rgba(59, 130, 246, 0.1);
}

/* Scrollbar customizada */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}

---

7. 🎯 BOTTOM MENU - CONTROLE DA EXPERIÊNCIA

typescript
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

---

🎪 O RESULTADO FINAL:

Uma experiência onde:

· ✅ Landing page que parece cena de filme de ficção científica
· ✅ Chat flutuante com personalidade (LogLine Bio - biólogo sábio e acessível)
· ✅ Transição suave para modo consulta (como entrar num laboratório virtual)
· ✅ Tela cinema que mostra simulações em tempo real
· ✅ Manifesto final que é uma obra de arte de evidência científica
· ✅ Mobile-first com gestos e animações naturais
· ✅ Dois públicos: especialistas têm profundidade, leigos têm guia

O fluxo narrativo:

1. Chegada épica na landing
2. Diálogo inicial com o assistente biólogo
3. Imersão total no modo consulta
4. Descoberta colaborativa através do chat
5. Manifesto final como troféu científico

Quer que eu desenvolva algum componente específico com mais detalhes?

Ou partimos para implementar essa visão cinematográfica? 🎬🔬

## Response:
Thought for 1m 7s

Dan, bora materializar isso agora. 💥 Abaixo estão **os componentes que faltavam** (100% mobile-first, SSR-safe e com degradação elegante), além de **utilitários** para hashing/assinatura do manifesto. Tudo plug-and-play para o teu esqueleto Next.js + Tailwind que você já esboçou.

Se colar esses arquivos na tua app (estrutura sugerida), você já consegue:

*   ver o **background cinematográfico** animado,
*   conversar no **ConsultationChat**,
*   disparar uma **“simulação”** (com loading bonito),
*   visualizar um modelo 3D com **3Dmol.js por CDN** (com fallback caso o script não carregue),
*   navegar pelo **Replay** e **Dashboard de Análise**, e
*   gerar um **Manifesto** com **hash + assinatura** via Web Crypto.

* * *

Estrutura sugerida
==================

```
app/
  frontend/
    landing/
      page.tsx            // já enviado por você (adaptei imports)
components/
  CinematicBackground.tsx
  ConsultationMode.tsx     // já enviado por você
  ConsultationChat.tsx
  CinemaScreen.tsx         // já enviado por você
  ProteinTheater.tsx
  SessionReplay.tsx
  AnalysisDashboard.tsx
  BottomMenu.tsx           // já enviado por você
  ManifestoView.tsx        // já enviado por você
lib/
  manifest.ts
  types.ts
styles/
  globals.css              // já enviado por você (mantém + pode colar extra no fim)
```

* * *

1) Conserto rápido no import do `ConsultationMode` (landing)
============================================================

> Só adicionar o import que faltava.

```tsx
// app/frontend/landing/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { FloatingChat } from '../components/FloatingChat'
import { CinematicBackground } from '../components/CinematicBackground'
import { ConsultationMode } from '../components/ConsultationMode' // <— ADICIONE ISTO

export default function LandingPage() {
  // ... resto igual ao teu
}
```

* * *

2) Tipagens compartilhadas
==========================

```ts
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
```

* * *

3) Utilitário de hash/assinatura (Web Crypto)
=============================================

```ts
// lib/manifest.ts
export async function sha256Base64(payload: string): Promise<string> {
  const enc = new TextEncoder().encode(payload)
  const buf = await crypto.subtle.digest('SHA-256', enc)
  const bytes = new Uint8Array(buf)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}

export async function signManifesto(payload: object): Promise<string> {
  // Assinatura simbólica “DV25-Seal-like”: HASH(payload) + epoch
  const json = JSON.stringify(payload)
  const hash = await sha256Base64(json)
  return `SIGNED|${Date.now()}|${hash}|PT1`
}

export function niceId(prefix = 'PT'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 6)}-${Date.now().toString(36)}`
}

export function samplePLDDT(len = 120): number[] {
  // Gera curva pLDDT plausível 60–95 com ruído
  const out: number[] = []
  for (let i = 0; i < len; i++) {
    const base = 78 + 15 * Math.sin(i / 13)
    const noise = (Math.random() - 0.5) * 8
    out.push(Math.max(40, Math.min(98, Math.round(base + noise))))
  }
  return out
}
```

* * *

4) Background Cinematográfico (Canvas, leve e lindo)
====================================================

```tsx
// components/CinematicBackground.tsx
'use client'

import { useEffect, useRef } from 'react'

export function CinematicBackground({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    type Star = { x: number; y: number; z: number; s: number }
    const stars: Star[] = Array.from({ length: Math.min(250, Math.floor(w / 6)) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.5 + 0.5,
      s: Math.random() * 1.5 + 0.3
    }))

    const gradient = ctx.createLinearGradient(0, 0, w, h)
    gradient.addColorStop(0, 'rgba(6, 14, 47, 0.9)')
    gradient.addColorStop(1, 'rgba(2, 0, 20, 1)')

    const loop = () => {
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      // “respiração” do glow
      const t = Date.now() * 0.001
      const glow = Math.floor((Math.sin(t) * 0.5 + 0.5) * 80) + 50

      for (const s of stars) {
        s.x += s.z // parallax leve
        if (s.x > w) s.x = 0
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${glow}, ${180 + glow / 2}, 255, ${0.6 * s.z})`
        ctx.fill()
      }

      // barras laterais sutis (cinema vibes)
      ctx.fillStyle = 'rgba(0,255,255,0.06)'
      ctx.fillRect(0, 0, 2, h)
      ctx.fillRect(w - 2, 0, 2, h)

      rafRef.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active])

  if (!active) return null
  return <canvas ref={canvasRef} className="fixed inset-0 z-0" aria-hidden />
}
```

* * *

5) Chat da Consulta (dispara “simulação”, atualiza sessão)
==========================================================

```tsx
// components/ConsultationChat.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import type { SessionData, Message } from '../lib/types'
import { niceId, samplePLDDT, signManifesto, sha256Base64 } from '../lib/manifest'

export function ConsultationChat({
  onSessionUpdate,
  onThinkingState
}: {
  onSessionUpdate: (s: SessionData) => void
  onThinkingState: (f: boolean) => void
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([
      {
        id: 'm0',
        type: 'assistant',
        content:
          'Bem-vindo ao laboratório. Envie uma sequência FASTA ou descreva sua hipótese (ex: “simular mutação G12D”).',
        timestamp: new Date().toISOString()
      }
    ])
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    const trimmed = input.trim()
    if (!trimmed) return
    const userMsg: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content: trimmed,
      timestamp: new Date().toISOString()
    }
    setMessages((m) => [...m, userMsg])
    setInput('')
    onThinkingState(true)

    // “Simulação” fake com dados plausíveis
    const sessionId = niceId()
    const startedAt = new Date().toISOString()
    const plddt = samplePLDDT(120)

    // Gerar PDB mínimo (1CRN pequeno) – suficiente para visualizar no 3Dmol
    const pdb = `ATOM      1  N   THR A   1      26.017  24.447   2.842  1.00 50.00           N
ATOM      2  CA  THR A   1      25.948  23.027   2.451  1.00 50.00           C
ATOM      3  C   THR A   1      24.505  22.574   2.106  1.00 50.00           C
ATOM      4  O   THR A   1      24.226  21.375   2.118  1.00 50.00           O
TER`

    // Hash dos principais outputs
    const structureHash = await sha256Base64(pdb + JSON.stringify(plddt))
    const auditTrail = [
      'Sessão iniciada',
      'Entrada validada',
      'Predição estrutural (mock)',
      'Cálculo pLDDT',
      'Geração de manifesto'
    ]

    const baseSession: SessionData = {
      sessionId,
      startedAt,
      inputSequence: trimmed.startsWith('>') ? trimmed : undefined,
      structureHash,
      confidence: { overall: Math.round(plddt.reduce((a, b) => a + b, 0) / plddt.length) },
      plddt,
      auditTrail,
      models: [{ name: 'Model-1', format: 'pdb', content: pdb }]
    }

    // Assinatura inicial do “manifesto”
    const manifestoPayload = {
      sessionId,
      timestamp: startedAt,
      scientificQuestion:
        'Investigação da relação estrutura-função por predição computacional (demo)',
      methodology: [
        'Predição mock estilo AlphaFold',
        'Perfil pLDDT por resíduo',
        'Hash de artefatos & trilha de auditoria'
      ],
      conclusions: [
        'Pipeline executado com integridade computável',
        'Artefatos hashados e prontos para reprodutibilidade'
      ],
      findings: [{ title: 'Modelo 3D', description: 'Estrutura PDB gerada (demo)', evidence: structureHash }]
    }
    const signature = await signManifesto(manifestoPayload)

    const session: SessionData = {
      ...baseSession,
      manifesto: {
        sessionId,
        timestamp: startedAt,
        participants: ['Usuário Pesquisador', 'LogLine Bio (Assistente)'],
        ...manifestoPayload,
        digitalSignature: signature,
        auditTrail
      }
    }

    // Simula tempo de computação com “cinema thinking”
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          type: 'assistant',
          content:
            'Simulação concluída. Ative as abas **Análise**, **Replay** ou **Manifesto** para explorar os resultados.',
          timestamp: new Date().toISOString()
        }
      ])
      onSessionUpdate(session)
      onThinkingState(false)
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col">
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-black/40"
        aria-live="polite"
      >
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                m.type === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-100 rounded-bl-none'
              }`}
              dangerouslySetInnerHTML={{
                __html: m.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }}
            />
          </div>
        ))}
      </div>

      <form
        className="p-3 border-t border-gray-800 bg-black/60 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          handleSend()
        }}
        aria-label="Enviar mensagem"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Descreva a hipótese ou cole FASTA..."
          className="flex-1 bg-gray-900 text-gray-100 rounded-xl px-3 py-2 outline-none border border-gray-700 focus:border-cyan-500"
          aria-label="Campo de entrada do chat"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-cyan-600 text-white disabled:opacity-50"
          disabled={!input.trim()}
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
```

* * *

6) ProteinTheater (3D com 3Dmol.js via CDN + fallback)
======================================================

```tsx
// components/ProteinTheater.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import type { SessionData } from '../lib/types'

declare global {
  interface Window {
    $3Dmol?: any
  }
}

export function ProteinTheater({ data }: { data?: SessionData | null }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const pdb = data?.models?.[0]?.content

  useEffect(() => {
    if (!containerRef.current) return
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

    async function render() {
      try {
        await ensure3Dmol()
        if (!mounted || !window.$3Dmol) return
        const viewer = window.$3Dmol.createViewer(containerRef.current, {
          backgroundColor: 'black'
        })
        if (pdb) {
          viewer.addModel(pdb, 'pdb')
          // Cartoons + esquema de cores inspirado em pLDDT
          viewer.setStyle({}, { cartoon: { colorscheme: 'Royal' } })
          viewer.zoomTo()
          viewer.render()
          setReady(true)
        }
      } catch {
        setReady(false)
      }
    }
    render()

    return () => {
      mounted = false
    }
  }, [pdb])

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
      <div ref={containerRef} className="absolute inset-0" role="img" aria-label="Visualizador 3D de proteína" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <div className="animate-pulse">Carregando visualizador 3D…</div>
        </div>
      )}
      {/* Overlay com metadados */}
      <div className="absolute left-3 bottom-3 text-xs text-gray-300 bg-black/50 px-3 py-2 rounded-lg border border-white/10">
        <div>Sessão: <span className="font-mono">{data?.sessionId ?? '-'}</span></div>
        <div>Confiança (pLDDT médio): <span className="font-semibold">{data?.confidence?.overall ?? '—'}%</span></div>
      </div>
    </div>
  )
}
```

* * *

7) SessionReplay (scrubber + eventos)
=====================================

```tsx
// components/SessionReplay.tsx
'use client'

import { useMemo, useState } from 'react'
import type { SessionData } from '../lib/types'

export function SessionReplay({ data }: { data?: SessionData | null }) {
  const steps = data?.auditTrail ?? []
  const [idx, setIdx] = useState(0)

  const current = useMemo(() => steps[idx] ?? 'Aguardando sessão…', [idx, steps])

  if (!steps.length) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Nenhum evento ainda. Rode uma simulação para habilitar o replay.
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-sm text-gray-300 mb-3">
        Etapa <span className="font-mono">{idx + 1}</span>/<span className="font-mono">{steps.length}</span>
      </div>
      <div className="flex-1 bg-gray-900/40 rounded-lg border border-gray-800 p-4">
        <div className="text-2xl">🎞️</div>
        <div className="mt-2 text-gray-100">{current}</div>
      </div>
      <input
        type="range"
        min={0}
        max={steps.length - 1}
        value={idx}
        onChange={(e) => setIdx(Number(e.target.value))}
        className="mt-4 w-full accent-cyan-500"
        aria-label="Controle de replay"
      />
    </div>
  )
}
```

* * *

8) AnalysisDashboard (estatísticas simples + barras)
====================================================

```tsx
// components/AnalysisDashboard.tsx
'use client'

import { useMemo } from 'react'
import type { SessionData } from '../lib/types'

function Stat({ label, value, suffix = '' }: { label: string; value: string | number; suffix?: string }) {
  return (
    <div className="p-3 bg-gray-900/40 rounded-lg border border-gray-800">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-lg text-white">{value}{suffix}</div>
    </div>
  )
}

export function AnalysisDashboard({ data }: { data?: SessionData | null }) {
  const p = data?.plddt ?? []
  const stats = useMemo(() => {
    if (!p.length) return null
    const min = Math.min(...p)
    const max = Math.max(...p)
    const mean = Math.round(p.reduce((a, b) => a + b, 0) / p.length)
    const bins = [0, 50, 70, 90, 100]
    const hist = Array(4).fill(0)
    p.forEach((v) => {
      for (let i = 0; i < 4; i++) if (v >= bins[i] && v < bins[i + 1]) hist[i]++
    })
    return { min, max, mean, hist, bins }
  }, [p])

  if (!stats) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Rode uma simulação para ver as métricas.
      </div>
    )
  }

  const total = (data?.plddt?.length ?? 1)
  const labels = ['<50', '50–69', '70–89', '90–100']

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="pLDDT mín." value={stats.min} />
        <Stat label="pLDDT máx." value={stats.max} />
        <Stat label="pLDDT médio" value={stats.mean} />
      </div>

      <div className="p-4 bg-gray-900/40 rounded-lg border border-gray-800">
        <div className="text-sm text-gray-300 mb-3">Distribuição pLDDT</div>
        <div className="space-y-2">
          {stats.hist.map((count, i) => {
            const pct = Math.round((count / total) * 100)
            return (
              <div key={i} className="flex items-center gap-2">
                <div className="w-16 text-xs text-gray-400">{labels[i]}</div>
                <div className="flex-1 h-3 bg-gray-800 rounded">
                  <div
                    className="h-3 rounded bg-cyan-500 transition-all"
                    style={{ width: `${pct}%` }}
                    aria-label={`Faixa ${labels[i]}: ${pct}%`}
                  />
                </div>
                <div className="w-10 text-xs text-gray-300 text-right">{pct}%</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Artefato: <span className="font-mono">{data?.structureHash}</span>
      </div>
    </div>
  )
}
```

* * *

9) Pequeno extra no CSS (suave, opcional)
=========================================

> Acrescente ao final do teu `styles/globals.css` para dar _vibe_ de película.

```css
/* Film grain leve */
.cinema-grain::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0 0 0.03 0.06 0.03 0'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  opacity: .25;
  pointer-events: none;
  mix-blend-mode: screen;
}
```

* * *

10) Dica de gestos (troca de abas no mobile)
============================================

> Você pode adicionar isso dentro do `ConsultationMode` (que você já tem) para swipe-left/right entre as abas:

```tsx
// Dentro de ConsultationMode.tsx
import { useRef } from 'react'
// ...
const touchStart = useRef<number | null>(null)
const tabs: Array<typeof activeTab> = ['simulation', 'analysis', 'replay', 'manifesto']

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

// Envolva a <div className="h-screen flex flex-col ..."> com os handlers:
<div className="h-screen flex flex-col bg-black text-white" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
  {/* ... */}
</div>
```

* * *

Como isso fecha o circuito “cinema → consulta → manifesto”
==========================================================

*   **Landing** dispara **FloatingChat** → quando a intenção pede _predição/simulação_, você ativa `sessionStarted`.
*   **ConsultationMode** segura o palco: **CinemaScreen** exibe _Thinking_ + depois **ProteinTheater**/**Analysis**/**Replay**/**Manifesto**.
*   **ConsultationChat** gera **SessionData** (com hash, pLDDT e PDB demo) e injeta no **CinemaScreen**.
*   **ManifestoView** (o seu) recebe o `manifesto` com **digitalSignature** (via `signManifesto`) e imprime a **evidência auditável**.

Se quiser, eu já coloco:

*   um **endpoint /api/simulate** para você trocar o mock por AlphaFold/ColabFold no backend,
*   ou um **mapeamento visual pLDDT→cores** no 3Dmol (cartoon por resíduo).

Curte que eu adicione **/api/simulate** e o **mapeamento pLDDT** agora, ou preferes integrar logo com o teu LogLineOS (ledger + assinatura DV25-Seal) direto?

## Prompt:
E deve ser possivel tocar com o dedo mexer, dar zoom com gesto de pin;a

## Response:
Pensado para 21s

total! já dá pra rotacionar/zoom/pan no dedo — o **3Dmol.js** suporta nativamente:

*   1 dedo arrasta → **rotaciona**
*   2 dedos arrastam → **pan**
*   pinça (2 dedos) → **zoom**

pra ficar perfeito no mobile (evitar o navegador “roubar” o gesto e dar zoom na página), só aplicar `touch-action: none` no contêiner do viewer e adicionar uns botões de fallback. segue um drop-in que substitui o teu `ProteinTheater.tsx`:

```tsx
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
```

e adiciona só essa linha no teu CSS global, caso ainda não tenha:

```css
/* evita conflitos de gesto no iOS/Android fora do viewer */
html, body { overscroll-behavior: none; }
```

**resultado:** na prática, no telemóvel o usuário pode **tocar para girar**, **arrastar com dois dedos para mover**, e **pinçar para dar zoom** — sem o browser “roubar” o gesto. ainda deixei **botões de fallback** e roda do mouse para desktop.

quer que eu também pinte o cartoon por pLDDT (ex.: azul→vermelho) e mapeie a escala automaticamente a partir do vetor `plddt`? posso te mandar o patch já configurado.



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)
