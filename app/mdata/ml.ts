// app/mdata/ml.ts

import { getWeeklyResistanceMlWeeklyResistanceGet } from '@/lib/api'

export interface WeeklyResistance {
  symbol: string
  high: number
  low: number
}

export async function getWeeklyResistance(symbol: string): Promise<WeeklyResistance> {
  const response = await getWeeklyResistanceMlWeeklyResistanceGet({ query: { symbol: symbol } })
  return response.data as WeeklyResistance
}
