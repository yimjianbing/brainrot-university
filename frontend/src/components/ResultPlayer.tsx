import qr from '../../../backend/final/final_qr.png'

export function ResultPlayer(props: { videoUrl: string; qrUrl?: string | null }) {
  const { videoUrl, qrUrl } = props

  return (
    <view className='w-full mt-2 flex flex-col items-center gap-2'>
      <text className='text-black/85 text-base'>Result</text>
      <image src={qr} className='w-40 h-40 rounded-xl bg-white' />
      <text className='text-black/85 text-base'>Scan QR code to watch video</text>
      <text className='text-xs text-gray-600 break-all'>{videoUrl}</text>
      <text className='text-xs text-gray-600 break-all'>Link to video</text>
    </view>
  )
}


