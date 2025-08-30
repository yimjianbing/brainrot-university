import { useState, useCallback } from "@lynx-js/react";
import { startGenerate, pollGenerateStatus } from './api.ts'
import { Header } from './components/Header.tsx'
import { LinkInput } from './components/LinkInput.tsx'
import { GenerateButton } from './components/GenerateButton.tsx'
import { ResultPlayer } from './components/ResultPlayer.tsx'
import { AssetSelector } from './components/AssetSelector.tsx'
import qr from '../../backend/final/final_qr.png'


export function App() {
  const [link, setLink] = useState('')
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [qrUrl, setQrUrl] = useState<string | null>(null)
  const [asset, setAsset] = useState('trump')

  const onGenerate = useCallback(async () => {
    if (!link) return
    setError(null)
    setVideoUrl(null)
    setQrUrl(null)
    setSubmitting(true)
    try {
      const start = await startGenerate(link, asset)
      if (!start.job_id || !start.status_url) throw new Error('Failed to start job')
      let status = start.status
      let tries = 0
      while (status === 'queued' || status === 'running') {
        await new Promise(r => setTimeout(r, 2000))
        const s = await pollGenerateStatus(start.status_url)
        status = s.status
        if (status === 'done') {
          if (s.video_url) setVideoUrl(s.video_url)
          if (s.qr_url) setQrUrl(s.qr_url)
          break
        }
        if (status === 'error') {
          throw new Error(s.error || 'Generation failed')
        }
        tries++
        if (tries > 180) throw new Error('Timed out waiting for result')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate')
    } finally {
      setSubmitting(false)
    }
  }, [link, asset])

  return (
    <view className='w-full h-full p-5 pt-20'>
      
      <Header title={'BrainRot University'} subtitle={'Turn Wikipedia into shortform'} />
      

      <view className='w-full p-4 bg-white/10 border border-white/20 rounded-2xl'>
        <view className='h-2.5' />
        <LinkInput value={link} onChange={setLink} placeholder={'Paste a Wikipedia link'} />
        <view className='h-3' />
        <AssetSelector value={asset} onChange={setAsset} />
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
