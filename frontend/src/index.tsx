import '@lynx-js/preact-devtools'
import '@lynx-js/react/debug'
import { root } from '@lynx-js/react'
import 'tailwindcss/tailwind.css'
import './App.css'

import { App } from './App.tsx'

root.render(<App />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
