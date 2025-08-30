export function GenerateButton(props: { disabled?: boolean; loading?: boolean; onPress?: () => void }) {
  const { disabled, loading, onPress } = props
  return (
    <view
      bindtap={disabled || loading ? undefined : onPress}
      className={`w-full py-3 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors
        ${disabled ? 'bg-gray-300 text-gray-600' : loading ? 'bg-green-500 text-white opacity-80' : 'bg-green-600 text-white hover:bg-green-700'}`}
      style={{ pointerEvents: disabled || loading ? 'none' : 'auto' }}
    >
      <text className='font-semibold'>{loading ? 'Generating…' : 'Generate Video'}</text>
    </view>
  )
}


