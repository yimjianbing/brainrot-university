export function HistoryTab() {
    return (
        <view className="bg-white rounded-xl shadow-sm border border-gray-200">
        <view className="p-6 text-center space-y-2">
          <text className="text-lg font-medium text-gray-900 block">No videos yet</text>
          <text className="text-gray-600 text-sm block">Generate your first video from a Wikipedia article</text>
          <view className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 inline-block hover:bg-gray-200 transition-colors">
            <text>Get Started</text>
          </view>
        </view>
      </view>
    )
}