// components/PriceHistoryChart.tsx
'use client'

import * as React from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { CandleList } from '@/app/mdata'

const chartConfig = {
  close: {
    label: 'Closing Price',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

type CandleChartProps = {
  data: CandleList
}

export default function CandleChart({ data }: CandleChartProps) {
  const [timeRange, setTimeRange] = React.useState('1y')

  const filteredData = React.useMemo(() => {
    const now = new Date()

    let yearsToSubtract = 20
    let monthsToSubtract = 0

    if (timeRange === '10y') {
      yearsToSubtract = 10
    } else if (timeRange === '5y') {
      yearsToSubtract = 5
    } else if (timeRange === '1y') {
      yearsToSubtract = 1
    } else if (timeRange === '6m') {
      yearsToSubtract = 0
      monthsToSubtract = 6
    } else if (timeRange === '1m') {
      yearsToSubtract = 0
      monthsToSubtract = 1
    }

    let startDate = new Date(
      now.getFullYear() - yearsToSubtract,
      now.getMonth() - monthsToSubtract,
      now.getDate(),
    )
    const availableDates = data.candles?.map(
      (candle) => new Date(candle.datetime || ''),
    )
    if (
      availableDates &&
      availableDates.length > 0 &&
      startDate < availableDates[0]
    ) {
      startDate = availableDates[0]
    }

    return data.candles
      ?.filter((candle) => {
        const date = new Date(candle.datetime || '')
        return date >= startDate
      })
      .map((candle) => ({
        datetime: new Date(candle.datetime || '').toISOString().split('T')[0],
        close: candle.close,
      }))
  }, [data.candles, timeRange])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 border-b py-5">
        <CardTitle>Chart</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px]" aria-label="Select a value">
            <SelectValue placeholder="Last 20 years" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="20y" className="rounded-lg">
              Last 20 years
            </SelectItem>
            <SelectItem value="10y" className="rounded-lg">
              Last 10 years
            </SelectItem>
            <SelectItem value="5y" className="rounded-lg">
              Last 5 years
            </SelectItem>
            <SelectItem value="1y" className="rounded-lg">
              Last 1 year
            </SelectItem>
            <SelectItem value="6m" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="1m" className="rounded-lg">
              Last 1 month
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="datetime"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                />
              }
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              domain={['auto', 'auto']}
            />
            <Line
              yAxisId="left"
              dataKey="close"
              type="natural"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
