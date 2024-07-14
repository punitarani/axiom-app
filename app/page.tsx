// app/page.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

import PriceHistoryChart from '@/components/PriceHistoryChart'
import { Alert } from '@/components/ui/alert'

import type { CandleList } from './mdata'
import { getEquityDailyPriceHistory } from './mdata/equity'

export default function Home() {
  const loading = useRef<boolean>(true)
  const fetching = useRef<boolean>(false)
  const [priceHistory, setPriceHistory] = useState<CandleList>()

  useEffect(() => {
    if (!priceHistory && !fetching.current) {
      fetching.current = true
      getEquityDailyPriceHistory('SPY').then((data) => {
        setPriceHistory(data)
        loading.current = false
      })
    }
  }, [fetching, priceHistory])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      {loading.current ? (
        <div>Loading...</div>
      ) : priceHistory === undefined ? (
        <Alert>Error fetching data</Alert>
      ) : (
        <div className="w-full max-w-5xl">
          <PriceHistoryChart data={priceHistory} />
        </div>
      )}
    </main>
  )
}
