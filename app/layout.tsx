import { Analytics } from '@vercel/analytics/next'
import { DM_Sans, Noto_Sans_Bengali, Noto_Sans_Devanagari, Noto_Sans_Kannada, Noto_Sans_Malayalam, Noto_Sans_Tamil, Noto_Sans_Telugu } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], variable: '--font-devanagari' })
const telugu = Noto_Sans_Telugu({ subsets: ['telugu'], variable: '--font-telugu' })
const tamil = Noto_Sans_Tamil({ subsets: ['tamil'], variable: '--font-tamil' })
const malayalam = Noto_Sans_Malayalam({ subsets: ['malayalam'], variable: '--font-malayalam' })
const kannada = Noto_Sans_Kannada({ subsets: ['kannada'], variable: '--font-kannada' })
const bengali = Noto_Sans_Bengali({ subsets: ['bengali'], variable: '--font-bengali' })

export const metadata: Metadata = {
  title: 'CraftBridge AI | सही बाज़ार, सही कदम',
  description: 'AI market intelligence and readiness platform for Indian artisans.',
  generator: 'CraftBridge AI',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${dmSans.variable} ${devanagari.variable} ${telugu.variable} ${tamil.variable} ${malayalam.variable} ${kannada.variable} ${bengali.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
