import { type ReactNode } from '@lynx-js/react'

export function Header(props: { title: string; subtitle?: string; right?: ReactNode }) {
  const { title, subtitle, right } = props
  return (
    <view className='w-full items-center mb-4'>

      <view className='w-full flex flex-row items-center justify-between'>
        <text className='text-2xl font-bold text-black'>Wikirot</text>
        {right}
      </view>
      {subtitle ? (
        <text className='mt-1.5 text-base text-black/80'>{subtitle}</text>
      ) : null}
    </view>
  )
}


