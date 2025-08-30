export function ResultPlayer(props: { videoUrl: string; qrUrl?: string | null }) {
  const { videoUrl, qrUrl } = props

  return (
    <view className='w-full mt-4'>
      <text className='text-black/85 mb-2'>Result</text>
      <view className='mt-2.5 flex gap-2 items-center'>
        {qrUrl ? (
          <>
            <text className='text-black/85 mb-2'>QR Code</text>
            <image src={qrUrl} className='w-40 h-40 rounded-xl bg-white' />
          </>
        ) : null}
        <text className='text-black/85 mb-2'>Link to video</text>
        <text className='text-black/85 mb-2'>{videoUrl}</text>
      </view>
    </view>
  )
}


