export function AssetSelector(props: { value: string; onChange: (next: string) => void }) {
  const { value, onChange } = props
  return (
    <view className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <view className="p-4 border-b border-gray-200">
        <text className="text-lg font-semibold text-gray-900">Select Asset</text>
      </view>
      <view className="p-4 space-y-3">
        <view className="space-y-2">
          <view className="flex items-center gap-2">
            <text className="text-sm text-gray-600 whitespace-nowrap">Asset</text>
            {/* @ts-expect-error allow raw input in Lynx */}
            <input type="text" value={value} bindinput={(e) => onChange(e.detail.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </view>
        </view>
      </view>
    </view>
  )
}