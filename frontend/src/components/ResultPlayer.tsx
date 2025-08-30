export function ResultPlayer(props: { videoUrl: string }) {
  const { videoUrl } = props
  return (
    <view className='w-full mt-4'>
      <text className='text-black/85 mb-2'>Result</text>
      <component is='video' src={`${videoUrl}?t=${Date.now()}`} controls className='w-full h-[360px] rounded-xl bg-black' />
      <view className='mt-2.5'>
        <component is='a' href={videoUrl} target='_blank' rel='noreferrer' className='px-3 py-2 rounded-lg bg-white/10 border border-white/20'>
          <text className='text-black'>Open in new tab</text>
        </component>
      </view>
    </view>
  )
}


