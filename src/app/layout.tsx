import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'Scale Quest 🎹', description: 'Piano scale trainer — MIDI, Synthesia roll, gamification' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=clash-display@500,600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-dvh bg-bg text-white font-body antialiased">{children}</body>
    </html>
  )
}
