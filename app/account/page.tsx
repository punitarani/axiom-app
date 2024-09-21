'use client'

import { getPositions } from '@/app/mdata/account'
import { PositionsTable } from '@/components/PositionsTable'
import { useEffect, useState } from 'react'

import type { Position } from '@/lib/api'

export default function AccountPage() {
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPositions() {
      try {
        const fetchedPositions = await getPositions()
        setPositions(fetchedPositions)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch positions')
        setLoading(false)
      }
    }

    fetchPositions()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <PositionsTable positions={positions} />
    </div>
  )
}
