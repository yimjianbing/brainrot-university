export const API_BASE = 'http://127.0.0.1:5000/'

export interface GenerateResponse {
  job_id: string
  status_url: string
  status: 'queued' | 'running' | 'done' | 'error'
}

export interface GenerateStatus {
  status: 'queued' | 'running' | 'done' | 'error'
  video_url?: string
  qr_url?: string
  error?: string
}

export async function startGenerate(link: string, asset: string): Promise<GenerateResponse> {
  const response = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link, asset }),
  })
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(text || `Failed to generate: ${response.status}`)
  }
  return response.json()
}

export async function pollGenerateStatus(statusUrl: string): Promise<GenerateStatus> {
  const response = await fetch(`${API_BASE.replace(/\/$/, '')}${statusUrl}`)
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(text || `Failed to fetch status: ${response.status}`)
  }
  return response.json()
}

export interface GenerateRequestBody {
  link: string
  asset: string
}



