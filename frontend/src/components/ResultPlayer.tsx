export function ResultPlayer(props: { videoUrl: string }) {
  const { videoUrl } = props
  const absoluteURL = "http://127.0.0.1:5000/final" + videoUrl

  return (
    <view className='w-full mt-4'>
      <text className='text-black/85 mb-2'>Result</text>
      <view className='mt-2.5 flex gap-2 items-center'>
        {/* @ts-expect-error allow raw input in Lynx */}
        <frame
          src={absoluteURL}
          autoplay={true}
          controls={true}
          loop={false}
        />
    
      </view>
    </view>
  )
}


