// app/page.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

import LevelOneCard from '@/components/LevelOneCard'
import PriceHistoryChart from '@/components/PriceHistoryChart'
import StockFundamentalsCard from '@/components/StockFundamentalsCard'
import StockInfoCard from '@/components/StockInfoCard'
import WeeklyResistanceCard from '@/components/WeeklyResistanceCard'
import { Alert } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

import { getEquityDailyPriceHistory, getEquityInfo } from './mdata/equity'
import { type WeeklyResistance, getWeeklyResistance } from './mdata/ml'
import { connectToLevelOneEquityStream } from './mdata/stream'

import type { CandleList, InstrumentResponse } from '@/lib/api'
import type { LevelOneEquityContent } from './mdata/types'

export default function Home() {
  const loading = useRef<boolean>(true)
  const fetching = useRef<boolean>(false)
  const [instrument, setInstrument] = useState<InstrumentResponse>()
  const [priceHistory, setPriceHistory] = useState<CandleList>()
  const [levelOneContent, setLevelOneContent] = useState<LevelOneEquityContent>()
  const [weeklyResistance, setWeeklyResistance] = useState<WeeklyResistance>()

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
      getWeeklyResistance('SPY').then((data) => {
        setWeeklyResistance(data)
        console.log(data)
      })
    }
  }, [fetching, instrument, priceHistory])

  useEffect(() => {
    const ws = connectToLevelOneEquityStream(
      (data: LevelOneEquityContent) => {
        setLevelOneContent(data)
      },
      (error) => {
        console.error('WebSocket error:', error)
      },
      () => {
        console.log('WebSocket connection closed')
      },
    )

    return () => {
      ws.close()
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      {loading.current ? (
        <div>Loading...</div>
      ) : instrument === undefined ||
        priceHistory === undefined ||
        weeklyResistance === undefined ? (
        <Alert>Error fetching data</Alert>
      ) : (
        <section className="w-full max-w-5xl flex flex-col gap-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-10 gap-6">
            <div className="flex md:col-span-7">
              <StockInfoCard instrument={instrument} />
            </div>
            <div className="flex w-full md:col-span-3">
              <LevelOneCard levelOneContent={levelOneContent} />
            </div>
          </div>
          <PriceHistoryChart data={priceHistory} />
          <StockFundamentalsCard instrument={instrument} />
          <Separator />
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Models</h2>
            <WeeklyResistanceCard weeklyResistance={weeklyResistance} candleList={priceHistory} />
          </div>
        </section>
      )}
    </main>
  )
}
