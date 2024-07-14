// components/LevelOneCard.tsx

import { useEffect, useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'

import { formatAmount, formatPercentage } from '@/lib/utils'

import type { LevelOneEquityContent } from '@/app/mdata/types'

interface LevelOneCardProps {
  levelOneContent: LevelOneEquityContent | undefined
}

export default function LevelOneCard({ levelOneContent }: LevelOneCardProps) {
  const [lastLevelOne, setLastLevelOne] = useState<LevelOneEquityContent | undefined>(undefined)

  useEffect(() => {
    if (levelOneContent) {
      setLastLevelOne(levelOneContent as LevelOneEquityContent)
    }
  }, [levelOneContent])

  return (
    <Card className="w-full h-full min-h-52">
      {lastLevelOne === undefined ? (
        <CardContent className="flex items-center justify-between">
          <p>Waiting for live data...</p>
        </CardContent>
      ) : (
        <CardContent className="flex flex-col py-4 h-full justify-between">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Ask Price</span>
              <span className="font-bold">{formatAmount(lastLevelOne.ASK_PRICE ?? 0, true)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Ask Size</span>
              <span className="font-bold">{lastLevelOne.ASK_SIZE ?? 'N/A'}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-4xl font-bold">{formatAmount(lastLevelOne.MARK ?? 0, true)}</span>
            <div className="flex flex-col items-end">
              <span className="text-primary font-bold">
                {lastLevelOne.MARK_CHANGE && lastLevelOne.MARK_CHANGE > 0 ? '+' : ''}
                {formatAmount(lastLevelOne.MARK_CHANGE ?? 0, true)}
              </span>
              <span className="text-muted-foreground text-sm">
                {lastLevelOne.MARK_CHANGE_PERCENT && lastLevelOne.MARK_CHANGE_PERCENT > 0
                  ? '+'
                  : ''}
                {formatPercentage((lastLevelOne.MARK_CHANGE_PERCENT ?? 0) / 100)}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Bid Price</span>
              <span className="font-bold">{lastLevelOne.BID_PRICE ?? 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Bid Size</span>
              <span className="font-bold">{lastLevelOne.BID_SIZE ?? 'N/A'}</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
