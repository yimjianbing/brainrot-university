export const API_BASE = 'http://127.0.0.1:5000/'

export interface GenerateResponse {
  video_url?: string
  qr_url?: string
  error?: string
}

export async function generateVideo(link: string): Promise<GenerateResponse> {
  const response = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link }),
  })
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(text || `Failed to generate: ${response.status}`)
  }
  return response.json()
}

export interface GenerateRequestBody {
  link: string
}



