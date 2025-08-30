export function AssetSelector(props: { value: string; onChange: (next: string) => void }) {
  const { value, onChange } = props
  const options = ['griffin', 'lebron', 'spongebob', 'trump']

  function onPick(next: string) {
    if (next !== value) onChange(next)
  }

  return (
    <view className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <view className="p-4 border-b border-gray-200">
        <text className="text-lg font-semibold text-gray-900">Select Asset</text>
        <text className="text-sm text-gray-600">Choose a voice and overlay style</text>
      </view>
      <view className="p-4 space-y-3">
        <view className="flex items-center justify-between">
          <text className="text-sm text-gray-700 whitespace-nowrap">Asset</text>
          <text className="text-xs text-gray-500">Current: {value}</text>
        </view>

        <view className="grid grid-cols-2 gap-2">
          {options.map((opt) => (
            <view
              key={opt}
              bindtap={() => onPick(opt)}
              className={`px-3 py-2 rounded-md text-sm font-medium text-center border transition-colors
                ${opt === value
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'}`}
            >
              <text className={opt === value ? 'text-white' : 'text-gray-800'}>{opt}</text>
            </view>
          ))}
        </view>

        <view className="pt-3">
          <text className="text-xs text-gray-500">Or enter manually (must match a folder and .mp3 in backend/assets)</text>
          {/* @ts-expect-error allow raw input in Lynx */}
          <input
            type="text"
            value={value}
            bindinput={(e) => onChange(e.detail.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </view>
      </view>
    </view>
  )
}