import { root, useState, useCallback } from "@lynx-js/react";
import { generateVideo } from './api.js'
import { Header } from './components/Header.js'
import { LinkInput } from './components/LinkInput.js'
import { GenerateButton } from './components/GenerateButton.js'
import { ResultPlayer } from './components/ResultPlayer.js'
import { HistoryTab } from './components/HistoryTab.tsx'
import reactLynxLogo from "./assets/react-logo.png";


export function App() {
  const [link, setLink] = useState('')
  const [isRedditThread, setIsRedditThread] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onGenerate = useCallback(async () => {
    if (!link) return
    setError(null)
    setVideoUrl(null)
    setSubmitting(true)
    try {
      const res = await generateVideo(link, isRedditThread)
      if (res.video_url) setVideoUrl(res.video_url)
      else setError(res.error || 'Video generation failed')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate')
    } finally {
      setSubmitting(false)
    }
  }, [link, isRedditThread])

  return (
    <view className='w-full h-full p-5 pt-20'>
      <image src={reactLynxLogo} className="Logo--react" />
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
        <ResultPlayer videoUrl={videoUrl} />
      ) : null}

      <HistoryTab />
    </view>
  )
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}