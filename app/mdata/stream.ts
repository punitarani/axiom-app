// app/mdata/stream.ts

import type { LevelOneEquityContent } from './types'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export function connectToLevelOneEquityStream(
  onMessage: (data: LevelOneEquityContent) => void,
  onError: (error: Event) => void,
  onClose: () => void,
) {
  const ws = new WebSocket(`${backendUrl}/stream/equity/level-one?frequency=3`)

  ws.onopen = () => {
    console.log('WebSocket connection opened')
  }

  ws.onmessage = (event) => {
    const data: LevelOneEquityContent = JSON.parse(event.data)
    console.log('WebSocket message received:', data)
    onMessage(data)
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
    onError(error)
  }

  ws.onclose = () => {
    console.log('WebSocket connection closed')
    onClose()
  }

  return ws
}
