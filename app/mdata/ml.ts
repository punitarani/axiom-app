// app/mdata/ml.ts

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export interface WeeklyResistance {
  symbol: string
  high: number
  low: number
}

export async function getWeeklyResistance(symbol: string): Promise<WeeklyResistance> {
  const response = await fetch(`${backendUrl}/ml/weekly-resistance?symbol=${symbol}`)
  return await response.json()
}
