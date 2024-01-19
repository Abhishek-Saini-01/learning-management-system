import { ConfettiProvider } from '@/components/providers/confettiProvider'
import ToasterProvider from '@/components/providers/toasterProvider'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  weight: ["200","300","400","500","600","700","800","900"],
  subsets: ["latin", "devanagari"],
  style: ["normal","italic"]
 })

export const metadata: Metadata = {
  title: 'LMS',
  description: 'learning management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <ConfettiProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
