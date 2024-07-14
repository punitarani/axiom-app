// app/page.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

import PriceHistoryChart from '@/components/PriceHistoryChart'
import StockFundamentalsCard from '@/components/StockFundamentalsCard'
import StockInfoCard from '@/components/StockInfoCard'
import { Alert } from '@/components/ui/alert'

import type { CandleList, InstrumentResponse } from './mdata'
import { getEquityDailyPriceHistory, getEquityInfo } from './mdata/equity'

export default function Home() {
  const loading = useRef<boolean>(true)
  const fetching = useRef<boolean>(false)
  const [instrument, setInstrument] = useState<InstrumentResponse>()
  const [priceHistory, setPriceHistory] = useState<CandleList>()

  useEffect(() => {
    if (!priceHistory && !fetching.current) {
      fetching.current = true
      getEquityInfo('SPY').then((data) => {
        setInstrument(data)
      })
      getEquityDailyPriceHistory('SPY').then((data) => {
        setPriceHistory(data)
        loading.current = false
      })
    }
  }, [fetching, instrument, priceHistory])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      {loading.current ? (
        <div>Loading...</div>
      ) : instrument === undefined || priceHistory === undefined ? (
        <Alert>Error fetching data</Alert>
      ) : (
        <div className="w-full max-w-5xl flex flex-col gap-8">
          <StockInfoCard instrument={instrument} />
          <PriceHistoryChart data={priceHistory} />
          <StockFundamentalsCard instrument={instrument} />
        </div>
      )}
    </main>
  )
}
