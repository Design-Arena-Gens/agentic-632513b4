import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kids English Learning Agents',
  description: 'Interactive English learning agents for children',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
