// components/StockInfoCard.tsx

import type { InstrumentResponse, LevelOneEquityContent } from '@/app/mdata/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { formatAmount, formatNumber } from '@/lib/utils'

interface StockInfoCardProps {
  instrument: InstrumentResponse
}

export default function Component({ instrument }: StockInfoCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="bg-primary text-primary-foreground p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold">{instrument.symbol}</h2>
          <p className="text-2xl font-medium">{instrument.description}</p>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="font-medium">{instrument.exchange}</p>
            <p className="text-sm text-muted-foreground">Exchange</p>
          </div>
          <div>
            <p className="font-medium">{instrument.assetType}</p>
            <p className="text-sm text-muted-foreground">Asset Type</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="font-medium">
              {formatNumber(instrument.fundamental?.avg3MonthVolume ?? 0)}
            </p>
            <p className="text-sm text-muted-foreground">Volume (3 Month Avg.)</p>
          </div>
          <div>
            <p className="font-medium">{formatAmount(instrument.fundamental?.marketCap ?? 0)}</p>
            <p className="text-sm text-muted-foreground">Market Cap</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="font-medium">{formatAmount(instrument.fundamental?.high52 ?? 0, true)}</p>
            <p className="text-sm text-muted-foreground">52-Week High</p>
          </div>
          <div>
            <p className="font-medium">{formatAmount(instrument.fundamental?.low52 ?? 0, true)}</p>
            <p className="text-sm text-muted-foreground">52-Week Low</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
