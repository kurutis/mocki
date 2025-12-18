// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mocki - Дизайнер',
  description: 'Портфолио дизайнера',
  icons: {
    icon: [
      {
        url: '/logo.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/logo.png',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/logo.png',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="h-full">
      <head>
        {/* Favicon для старых браузеров */}
        <link rel="shortcut icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`${inter.className} h-full`}>
        {/* Главное содержимое */}
        {children}
        
        {/* Футер */}
        <Footer />
      </body>
    </html>
  );
}
