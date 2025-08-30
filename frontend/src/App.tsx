import { useState, useCallback } from "@lynx-js/react";
import { generateVideo } from './api.ts'
import { Header } from './components/Header.tsx'
import { LinkInput } from './components/LinkInput.tsx'
import { GenerateButton } from './components/GenerateButton.tsx'
import { ResultPlayer } from './components/ResultPlayer.tsx'
import { HistoryTab } from './components/HistoryTab.tsx'



export function App() {
  const [link, setLink] = useState('')
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [qrUrl, setQrUrl] = useState<string | null>(null)

  const onGenerate = useCallback(async () => {
    if (!link) return
    setError(null)
    setVideoUrl(null)
    setQrUrl(null)
    setSubmitting(true)
    try {
      const res = await generateVideo(link)
      if (res.video_url) setVideoUrl(res.video_url)
      
      else setError(res.error || 'Video generation failed')

      if (res.qr_url) setQrUrl(res.qr_url)
      else setError(res.error || 'QR code generation failed')
    
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate')
    } finally {
      setSubmitting(false)
    }
  }, [link])

  return (
    <view className='w-full h-full p-5 pt-20'>
      
      <Header title={'BrainRot University'} subtitle={'Turn Wikipedia into shortform'} />
      

      <view className='w-full p-4 bg-white/10 border border-white/20 rounded-2xl'>
        <view className='h-2.5' />
        <LinkInput value={link} onChange={setLink} placeholder={'Paste a Wikipedia link'} />
        <view className='h-3' />
        <GenerateButton disabled={!link || submitting} loading={submitting} onPress={onGenerate} />
        {error ? (
          <text className='mt-2.5 text-[#ff8a80]'>{error}</text>
        ) : null}
      </view>

      {videoUrl ? (
        <ResultPlayer videoUrl={videoUrl} qrUrl={qrUrl} />
      ) : null}
      
    </view>
  )
}
