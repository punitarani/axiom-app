import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAmount(amount: number, decimal = false): string {
  const amt = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return decimal ? amt : amt.slice(0, -3)
}

export function formatPercentage(percentage: number): string {
  return `${(percentage * 100).toFixed(2)}%`
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatNumber(number: number): string {
  return number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
