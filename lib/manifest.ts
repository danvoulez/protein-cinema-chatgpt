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
  // Assinatura simbólica "DV25-Seal-like": HASH(payload) + epoch
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
