// app/mdata/account.ts
'use client'

import {
  type Position,
  type Transaction,
  getPositionsAccountPositionsGet,
  getTransactionsAccountTransactionsGet,
} from '@/lib/api'

export async function getPositions(): Promise<Position[]> {
  const response = await getPositionsAccountPositionsGet()
  console.log(response.data)
  return response.data as Position[]
}

export async function getTransactions(): Promise<Transaction[]> {
  const response = await getTransactionsAccountTransactionsGet()
  return response.data as Transaction[]
}
