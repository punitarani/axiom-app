// app/mdata/equity.ts
'use client'

import type { CandleList, InstrumentResponse } from './types'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export async function getEquityInfo(
  symbol: string,
): Promise<InstrumentResponse> {
  const response = await fetch(`${backendUrl}/equity/info?symbol=${symbol}`)
  return await response.json()
}

export async function getEquityDailyPriceHistory(
  symbol: string,
): Promise<CandleList> {
  const response = await fetch(
    `${backendUrl}/equity/history/daily?symbol=${symbol}`,
  )
  return await response.json()
}
