import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ThemeProvider from '@/components/providers/ThemeProvider'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Venzura Medcor',
    template: '%s | Venzura Medcor',
  },
  description:
    'Trusted pharmaceutical manufacturing and healthcare business solutions.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-900 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="min-h-[calc(100vh-160px)]">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}