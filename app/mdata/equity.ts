// app/mdata/equity.ts
'use client'

import {
  type CandleList,
  type InstrumentResponse,
  getHistoryDailyPriceEquityHistoryDailyGet,
  getInfoEquityInfoGet,
} from '@/lib/api'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export async function getEquityInfo(symbol: string): Promise<InstrumentResponse> {
  const response = await getInfoEquityInfoGet({ query: { symbol: symbol } })
  return response.data as InstrumentResponse
}

export async function getEquityDailyPriceHistory(symbol: string): Promise<CandleList> {
  const response = await getHistoryDailyPriceEquityHistoryDailyGet({ query: { symbol: symbol } })
  return response.data as CandleList
}
