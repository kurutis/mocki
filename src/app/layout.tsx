// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mocki - Дизайнер',
  description: 'Портфолио дизайнера',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="h-full">
      <body className={`${inter.className} h-full`}>
        {/* Главное содержимое */}
        {children}
        
        {/* Футер */}
        <Footer />
      </body>
    </html>
  );
}