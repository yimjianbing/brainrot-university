export function LinkInput(props: { value: string; onChange: (next: string) => void; placeholder?: string }) {
  const { value, onChange, placeholder } = props

  function onInput(e: unknown) {
    if (e && typeof e === 'object') {
      const withDetail = e as { detail?: { value?: string } }
      if (withDetail.detail && typeof withDetail.detail.value === 'string') {
        onChange(withDetail.detail.value)
        return
      }
      const withTarget = e as { target?: { value?: string } }
      if (withTarget.target && typeof withTarget.target.value === 'string') {
        onChange(withTarget.target.value)
        return
      }
    }
    onChange('')
  }

  return (
    <view className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <view className="p-4 border-b border-gray-200">
      <text className="text-lg font-semibold text-gray-900">Create Video</text>
      <text className="text-sm text-gray-600 mt-1 block">Enter a Wikipedia URL to generate an AI-powered video summary</text>
    </view>
    <view className="p-4 space-y-3">
        <view className="space-y-2">
        {/* @ts-expect-error allow raw input in Lynx */}
        <input
            type="text"
            placeholder="https://en.wikipedia.org/wiki/Article_Name"
            value={value}
            bindinput={onInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <text className="text-xs text-gray-500 block">Paste any Wikipedia article URL to get started</text>
        </view>


  </view>
</view>
  )
}


