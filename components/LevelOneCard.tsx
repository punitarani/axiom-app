// components/LevelOneCard.tsx

import { useEffect, useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'

import { formatAmount, formatPercentage } from '@/lib/utils'

import type { LevelOneEquityContent } from '@/app/mdata/types'

interface LevelOneCardProps {
  levelOneContent: LevelOneEquityContent | undefined
}

export default function LevelOneCard({ levelOneContent }: LevelOneCardProps) {
  const [askData, setAskData] = useState<{ price: number | undefined; size: number | undefined }>({
    price: undefined,
    size: undefined,
  })
  const [markData, setMarkData] = useState<{
    mark: number | undefined
    change: number | undefined
    percentChange: number | undefined
  }>({ mark: undefined, change: undefined, percentChange: undefined })
  const [bidData, setBidData] = useState<{ price: number | undefined; size: number | undefined }>({
    price: undefined,
    size: undefined,
  })

  useEffect(() => {
    if (levelOneContent) {
      if (
        levelOneContent.ASK_PRICE &&
        levelOneContent.ASK_PRICE > 0 &&
        levelOneContent.ASK_PRICE !== askData.price &&
        levelOneContent.ASK_SIZE &&
        levelOneContent.ASK_SIZE > 0 &&
        levelOneContent.ASK_SIZE !== askData.size
      ) {
        setAskData({ price: levelOneContent.ASK_PRICE, size: levelOneContent.ASK_SIZE })
      }
      if (
        levelOneContent.MARK &&
        levelOneContent.MARK > 0 &&
        levelOneContent.MARK !== markData.mark &&
        levelOneContent.MARK_CHANGE &&
        levelOneContent.MARK_CHANGE > 0 &&
        levelOneContent.MARK_CHANGE !== markData.change &&
        levelOneContent.MARK_CHANGE_PERCENT &&
        levelOneContent.MARK_CHANGE_PERCENT > 0 &&
        levelOneContent.MARK_CHANGE_PERCENT !== markData.percentChange
      ) {
        setMarkData({
          mark: levelOneContent.MARK,
          change: levelOneContent.MARK_CHANGE,
          percentChange: levelOneContent.MARK_CHANGE_PERCENT,
        })
      }
      if (
        levelOneContent.BID_PRICE &&
        levelOneContent.BID_PRICE > 0 &&
        levelOneContent.BID_PRICE !== bidData.price &&
        levelOneContent.BID_SIZE &&
        levelOneContent.BID_SIZE > 0 &&
        levelOneContent.BID_SIZE !== bidData.size
      ) {
        setBidData({ price: levelOneContent.BID_PRICE, size: levelOneContent.BID_SIZE })
      }
    }
  }, [levelOneContent, askData, markData, bidData])

  return (
    <Card className="w-full h-full min-h-52">
      {levelOneContent === undefined ? (
        <CardContent className="flex items-center justify-between">
          <p>Waiting for live data...</p>
        </CardContent>
      ) : (
        <CardContent className="flex flex-col py-4 h-full justify-between">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Ask Price</span>
              <span className="font-bold">{formatAmount(askData.price ?? 0, true)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Ask Size</span>
              <span className="font-bold">{askData.size ?? '-'}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-4xl font-bold">{formatAmount(markData.mark ?? 0, true)}</span>
            <div className="flex flex-col items-end">
              <span className="text-primary font-bold">
                {markData.change && markData.change > 0 ? '+' : '-'}
                {formatAmount(markData.change ?? 0, true)}
              </span>
              <span className="text-muted-foreground text-sm">
                {markData.percentChange && markData.percentChange > 0 ? '+' : '-'}
                {formatPercentage((markData.percentChange ?? 0) / 100)}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Bid Price</span>
              <span className="font-bold">{formatAmount(bidData.price ?? 0, true)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Bid Size</span>
              <span className="font-bold">{bidData.size ?? '-'}</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
