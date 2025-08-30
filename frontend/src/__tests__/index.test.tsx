// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
import '@testing-library/jest-dom'
import { expect, test, vi } from 'vitest'
import { render, getQueriesForElement } from '@lynx-js/react/testing-library'

import { App } from '../App.tsx'

test('App', async () => {
  const cb = vi.fn()

  render(<App />)
  expect(cb).toBeCalledTimes(1)
  expect(cb.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "__MAIN_THREAD__: false",
      ],
    ]
  `)
  const { findByPlaceholderText } = getQueriesForElement(elementTree.root!)
  const input = await findByPlaceholderText('Paste a Wikipedia link')
  expect(input).toBeInTheDocument()
})
