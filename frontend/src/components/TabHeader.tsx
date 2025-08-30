export function TabHeader() {
    return (
        <view>
        <view className="grid grid-cols-2 bg-gray-200 rounded-lg p-1">
          <view className="bg-white text-gray-900 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 text-center">
            <text>Generate</text>
          </view>
          <view className="text-gray-600 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 text-center">
            <text>History (0)</text>
          </view>
        </view>
      </view>
    )
}