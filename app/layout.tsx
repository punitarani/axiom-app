// app/layout.tsx

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import type React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Axiom',
  description: 'Axiom App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
