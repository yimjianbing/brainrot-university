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

      </view>
    </view>
  )
}