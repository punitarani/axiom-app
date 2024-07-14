// components/StockInfoCard.tsx

import type { InstrumentResponse } from '@/app/mdata/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

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
      <CardContent className="grid grid-cols-1 gap-6 p-6 md:grid-cols-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="font-medium">{instrument.description}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">CUSIP</p>
            <p className="font-medium">{instrument.cusip}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Exchange</p>
            <p className="font-medium">{instrument.exchange}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Asset Type</p>
            <p className="font-medium">{instrument.assetType}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Volume (3 Month Avg.)</p>
            <p className="font-medium">{instrument.fundamental?.avg3MonthVolume}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <p className="font-medium">${instrument.fundamental?.marketCap}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">52-Week High</p>
            <p className="font-medium">${instrument.fundamental?.high52}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">52-Week Low</p>
            <p className="font-medium">${instrument.fundamental?.low52}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
