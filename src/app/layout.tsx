import type { Metadata } from 'next'
import { Montserrat, Montserrat_Alternates } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '700'],
})

const montserratAlternates = Montserrat_Alternates({
  variable: '--font-montserrat-alt',
  subsets: ['latin', 'vietnamese'],
  weight: ['700'],
})

export const metadata: Metadata = {
  title: 'Sun Annual Awards 2025',
  description: 'SAA 2025 — Kudos and recognition platform for Sun* employees',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${montserrat.variable} ${montserratAlternates.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
