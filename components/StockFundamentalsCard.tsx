// components/StockInfoCard.tsx

import type { InstrumentResponse } from '@/app/mdata/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { formatAmount, formatDate, formatNumber, formatPercentage } from '@/lib/utils'

interface StockInfoCardProps {
  instrument: InstrumentResponse
}

export default function Component({ instrument }: StockInfoCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fundamentals</CardTitle>
        <CardDescription>Key Financial Metrics</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="font-medium">
              {formatNumber(instrument.fundamental?.sharesOutstanding ?? 0)}
            </p>
            <p className="text-sm text-muted-foreground">Shares Outstanding</p>
          </div>
          <div>
            <p className="font-medium">{formatAmount(instrument.fundamental?.marketCap ?? 0)}</p>
            <p className="text-sm text-muted-foreground">Market Cap</p>
          </div>
          <div>
            <p className="font-medium">
              {formatAmount(instrument.fundamental?.bookValuePerShare ?? 0, true)}
            </p>
            <p className="text-sm text-muted-foreground">Book Value Per Share</p>
          </div>
          <div>
            <p className="font-medium">
              {formatPercentage(instrument.fundamental?.divGrowthRate3Year ?? 0)}
            </p>
            <p className="text-sm text-muted-foreground">Dividend Growth Rate (3 Year)</p>
          </div>
          <div>
            <p className="font-medium">{formatNumber(instrument.fundamental?.beta ?? 0)}</p>
            <p className="text-sm text-muted-foreground">Beta</p>
          </div>
          <div>
            <p className="font-medium">
              {formatNumber(instrument.fundamental?.avg1DayVolume ?? 0)}
            </p>
            <p className="text-sm text-muted-foreground">Volume (1 Day Avg)</p>
          </div>
          <div>
            <p className="font-medium">
              {formatNumber(instrument.fundamental?.avg10DaysVolume ?? 0)}
            </p>
            <p className="text-sm text-muted-foreground">Volume (10 Day Avg)</p>
          </div>
          <div>
            <p className="font-medium">
              {formatNumber(instrument.fundamental?.avg3MonthVolume ?? 0)}
            </p>
            <p className="text-sm text-muted-foreground">Volume (3 Month Avg)</p>
          </div>
          <div>
            <p className="font-medium">
              {formatAmount(instrument.fundamental?.totalDebtToCapital ?? 0, true)}
            </p>
            <p className="text-sm text-muted-foreground">Total Debt to Capital</p>
          </div>
          <div>
            <p className="font-medium">
              {formatAmount(instrument.fundamental?.ltDebtToEquity ?? 0, true)}
            </p>
            <p className="text-sm text-muted-foreground">LT Debt to Equity</p>
          </div>
          <div>
            <p className="font-medium">
              {formatAmount(instrument.fundamental?.totalDebtToEquity ?? 0, true)}
            </p>
            <p className="text-sm text-muted-foreground">Total Debt to Equity</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="font-medium">{instrument.fundamental?.peRatio}</p>
            <p className="text-sm text-muted-foreground">P/E Ratio</p>
          </div>
          <div>
            <p className="font-medium">{instrument.fundamental?.pbRatio}</p>
            <p className="text-sm text-muted-foreground">P/B Ratio</p>
          </div>
          <div>
            <p className="font-medium">
              {formatAmount(instrument.fundamental?.dividendAmount ?? 0, true)}
            </p>
            <p className="text-sm text-muted-foreground">Dividend Amount</p>
          </div>
          <div>
            <p className="font-medium">
              {instrument.fundamental?.dividendDate
                ? formatDate(instrument.fundamental?.dividendDate)
                : '-'}
            </p>
            <p className="text-sm text-muted-foreground">Dividend Date</p>
          </div>
          <div>
            <p className="font-medium">
              {instrument.fundamental?.dividendYield
                ? formatPercentage(instrument.fundamental?.dividendYield)
                : '-'}
            </p>
            <p className="text-sm text-muted-foreground">Dividend Yield</p>
          </div>
          <div>
            <p className="font-medium">{formatAmount(instrument.fundamental?.epsTTM ?? 0, true)}</p>
            <p className="text-sm text-muted-foreground">EPS (TTM)</p>
          </div>
          <div>
            <p className="font-medium">
              {instrument.fundamental?.epsChangePercentTTM
                ? formatPercentage(instrument.fundamental?.epsChangePercentTTM / 100)
                : '-'}
            </p>
            <p className="text-sm text-muted-foreground">EPS Change Percent (TTM)</p>
          </div>
          <div>
            <p className="font-medium">
              {instrument.fundamental?.returnOnEquity
                ? formatNumber(instrument.fundamental?.returnOnEquity)
                : '-'}
            </p>
            <p className="text-sm text-muted-foreground">Return on Equity</p>
          </div>
          <div>
            <p className="font-medium">
              {instrument.fundamental?.returnOnAssets
                ? formatNumber(instrument.fundamental?.returnOnAssets)
                : '-'}
            </p>
            <p className="text-sm text-muted-foreground">Return on Assets</p>
          </div>
          <div>
            <p className="font-medium">
              {instrument.fundamental?.operatingMarginTTM
                ? formatNumber(instrument.fundamental?.operatingMarginTTM)
                : '-'}
            </p>
            <p className="text-sm text-muted-foreground">Operating Margin (TTM)</p>
          </div>
          <div>
            <p className="font-medium">
              {instrument.fundamental?.netProfitMarginTTM
                ? formatNumber(instrument.fundamental?.netProfitMarginTTM)
                : '-'}
            </p>
            <p className="text-sm text-muted-foreground">Net Profit Margin (TTM)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
