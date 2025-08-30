const API_BASE = 'http://127.0.0.1:5000/'

export interface GenerateResponse {
  video_url?: string
  error?: string
}

export async function generateVideo(link: string, isRedditThread: boolean): Promise<GenerateResponse> {
  const response = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link, is_reddit_thread: isRedditThread }),
  })
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(text || `Failed to generate: ${response.status}`)
  }
  return response.json()
}

export interface GenerateRequestBody {
  link: string
  is_reddit_thread: boolean
}

export async function generateVideoDebug(link: string, isRedditThread: boolean): Promise<GenerateResponse> {
  console.log('Sending request to /generate')
  try {
    const result = await generateVideo(link, isRedditThread)
    console.log('Received response from /generate', result)
    return result
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export function withCacheBusting(url: string): string {
  const ts = Date.now()
  return url.includes('?') ? `${url}&t=${ts}` : `${url}?t=${ts}`
}


