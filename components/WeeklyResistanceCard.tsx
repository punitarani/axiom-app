// components/WeeklyResistanceCard.tsx

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { formatAmount, formatPercentage } from '@/lib/utils'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'

import type { WeeklyResistance } from '@/app/mdata/ml'
import type { CandleList } from '@/lib/api'

interface WeeklyResistanceCardProps {
  weeklyResistance: WeeklyResistance
  candleList: CandleList
}

export default function WeeklyResistanceCard({
  weeklyResistance,
  candleList,
}: WeeklyResistanceCardProps) {
  const lastFridayClose = getLastFridayClose(candleList)
  const avgMove =
    ((weeklyResistance.high + weeklyResistance.low) / 2 - lastFridayClose) / lastFridayClose
  const lowMove = (weeklyResistance.low - lastFridayClose) / lastFridayClose
  const highMove = (weeklyResistance.high - lastFridayClose) / lastFridayClose

  let sentiment = 'Neutral'
  let SentimentIcon = Minus
  let bgColor = 'bg-yellow-500'

  if (avgMove > 0.001) {
    sentiment = 'Bullish'
    SentimentIcon = ArrowUp
    bgColor = 'bg-green-500'
  } else if (avgMove < -0.001) {
    sentiment = 'Bearish'
    SentimentIcon = ArrowDown
    bgColor = 'bg-red-500'
  }

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col space-y-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center gap-2">
          <div className={`rounded-full ${bgColor} p-2 text-white`}>
            <SentimentIcon className="h-5 w-5" />
          </div>
          <div className="text-lg font-medium">{sentiment}</div>
        </div>
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
          <div>Expected Weekly Move</div>
          <div className="rounded-md bg-muted px-2 py-1 text-lg font-medium">
            {formatPercentage(lowMove)} to {formatPercentage(highMove)}
          </div>
        </div>
        <div className="flex justify-between gap-6 sm:gap-10">
          <div className="flex flex-col items-center sm:flex-row sm:gap-2">
            <div className="text-lg font-medium">{formatAmount(weeklyResistance.high, true)}</div>
            <div>High</div>
          </div>
          <div className="flex flex-col items-center sm:flex-row sm:gap-2">
            <div className="text-lg font-medium">{formatAmount(weeklyResistance.low, true)}</div>
            <div>Low</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full bg-muted px-6 py-4">
        <div className="ml-auto text-sm italic text-muted-foreground/80">
          Prediction Models are experimental and not investment advice.
        </div>
      </CardFooter>
    </Card>
  )
}

function getLastFridayClose(candleList: CandleList): number {
  if (!candleList.candles || candleList.candles.length === 0) {
    return 0
  }

  for (let i = candleList.candles.length - 1; i >= 0; i--) {
    const candle = candleList.candles[i]
    const date = new Date(candle.datetime!)
    if (date.getDay() === 5) {
      // 5 is Friday
      return candle.close!
    }
  }

  return candleList.candles[candleList.candles.length - 1].close!
}
