'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Position } from '@/lib/api'
import { useMemo, useState } from 'react'

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

const formatPercentage = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(
    value / 100,
  )
}

const AssetTypeTable = ({ positions, assetType }: { positions: Position[]; assetType: string }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{assetType}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Mark</TableHead>
              <TableHead>Trade Price</TableHead>
              <TableHead>Open P/L</TableHead>
              <TableHead>Open P/L %</TableHead>
              <TableHead>Day P/L</TableHead>
              <TableHead>Day P/L %</TableHead>
              <TableHead>Market Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position, index) => (
              <TableRow key={index}>
                <TableCell>{position.instrument?.symbol}</TableCell>
                <TableCell>
                  {position.longQuantity
                    ? position.longQuantity
                    : position.shortQuantity
                      ? -position.shortQuantity
                      : 0}
                </TableCell>
                <TableCell>
                  {formatCurrency(
                    position.longQuantity
                      ? (position.marketValue || 0) / position.longQuantity
                      : position.shortQuantity
                        ? -(position.marketValue || 0) / position.shortQuantity
                        : 0,
                  )}
                </TableCell>
                <TableCell>{formatCurrency(position.averagePrice || 0)}</TableCell>
                <TableCell>
                  {formatCurrency(position.longOpenProfitLoss || position.shortOpenProfitLoss || 0)}
                </TableCell>
                <TableCell>
                  {formatPercentage(
                    (position.longOpenProfitLoss || position.shortOpenProfitLoss || 0) /
                      (position.marketValue || 0),
                  )}
                </TableCell>
                <TableCell>{formatCurrency(position.currentDayProfitLoss || 0)}</TableCell>
                <TableCell>
                  {formatPercentage(position.currentDayProfitLossPercentage || 0)}
                </TableCell>
                <TableCell>{formatCurrency(position.marketValue || 0)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export function PositionsTable({ positions }: { positions: Position[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPositions = useMemo(() => {
    return positions.filter((position) =>
      position.instrument?.symbol?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [positions, searchTerm])

  const groupedPositions = useMemo(() => {
    return filteredPositions.reduce(
      (acc, position) => {
        const assetType = position.instrument?.assetType || 'Other'
        if (!acc[assetType]) {
          acc[assetType] = []
        }
        acc[assetType].push(position)
        return acc
      },
      {} as Record<string, Position[]>,
    )
  }, [filteredPositions])

  return (
    <div>
      <input
        type="text"
        placeholder="Search by symbol..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      {Object.entries(groupedPositions).map(([assetType, positions]) => (
        <AssetTypeTable key={assetType} positions={positions} assetType={assetType} />
      ))}
    </div>
  )
}
