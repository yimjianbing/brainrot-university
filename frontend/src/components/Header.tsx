import { type ReactNode } from '@lynx-js/react'
import peter from '../assets/peter.png'

export function Header(props: { title: string; subtitle?: string; right?: ReactNode }) {
  const { title, subtitle, right } = props
  return (
    <view className='w-full items-center mb-4'>
      <image src={peter} className='w-24 h-24' />
      <view className='w-full relative flex items-center justify-center'>
        <text className='text-2xl font-bold text-black text-center'>{title}</text>
        {right ? <view className='absolute right-0'>{right}</view> : null}
      </view>
      {subtitle ? (
        <text className='mt-1.5 text-base text-black/80 text-center'>{subtitle}</text>
      ) : null}
    </view>
  )
}


