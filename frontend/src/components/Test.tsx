export default function Test() {
  return (
    <view className="min-h-screen bg-gray-50">
      <view className="max-w-md mx-auto px-4 pt-12 pb-8 space-y-6">
        {/* <view className="text-center">
          <text className="text-2xl font-bold text-gray-900 block">Wikipedia Video AI</text>
          <text className="text-gray-600 text-sm block mt-1">Transform Wikipedia articles into engaging videos</text>
        </view> */}

        {/* <view>
          <view className="grid grid-cols-2 bg-gray-200 rounded-lg p-1">
            <view className="bg-white text-gray-900 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 text-center">
              <text>Generate</text>
            </view>
            <view className="text-gray-600 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 text-center">
              <text>History (0)</text>
            </view>
          </view>
        </view> */}

        {/* <view className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <view className="p-4 border-b border-gray-200">
            <text className="text-lg font-semibold text-gray-900">Create Video</text>
            <text className="text-sm text-gray-600 mt-1 block">Enter a Wikipedia URL to generate an AI-powered video summary</text>
          </view> */}
          
        {/* <view className="p-4 space-y-3">
            <view className="space-y-2">
              <input
                type="text"
                placeholder="https://en.wikipedia.org/wiki/Article_Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <text className="text-xs text-gray-500 block">Paste any Wikipedia article URL to get started</text>
            </view>

            <view className="w-full bg-green-600 text-white py-3 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
              <text>Generate Video</text>
            </view>
          </view>
        </view>  */}

        {/* // <view className="bg-white rounded-xl shadow-sm border border-gray-200">
        //   <view className="p-6 text-center space-y-2">
        //     <text className="text-lg font-medium text-gray-900 block">No videos yet</text>
        //     <text className="text-gray-600 text-sm block">Generate your first video from a Wikipedia article</text>
        //     <view className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 inline-block hover:bg-gray-200 transition-colors">
        //       <text>Get Started</text>
        //     </view>
        //   </view>
        // </view> */}

        <view className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4 hidden">
          <view className="p-4">
            <view className="flex items-start justify-between mb-3">
              <view className="flex-1 min-w-0">
                <text className="font-medium text-sm text-gray-900">Sample Wikipedia Article</text>
                <text className="text-xs text-gray-500">12/29/2024 at 2:30 PM</text>
              </view>
              <text className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Ready</text>
            </view>

            <view className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
              <text className="block">Duration: 2:34</text>
              <text className="block">Ready to download</text>
            </view>

            <view className="flex gap-2">
              <view className="flex-1 bg-gray-50 text-gray-700 py-2 px-3 rounded-md text-sm font-medium border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                <text>Download</text>
              </view>
              <view className="bg-gray-50 text-gray-700 p-2 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
                <text>↩︎</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  )
}
  