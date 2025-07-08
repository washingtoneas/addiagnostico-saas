import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AdDiagnóstico PRO - Diagnóstico Completo de Campanhas Facebook Ads",
  description:
    "Descubra onde suas campanhas de Facebook Ads estão falhando e receba sugestões práticas detalhadas. Acesso vitalício por apenas R$ 19,90 via Pix.",
  keywords: "facebook ads, diagnóstico, campanhas, marketing digital, roas, cpc, ctr, otimização",
  authors: [{ name: "AdDiagnóstico PRO" }],
  openGraph: {
    title: "AdDiagnóstico PRO - Pare de perder dinheiro com anúncios",
    description: "Diagnóstico completo das suas campanhas do Facebook Ads com sugestões práticas de melhoria",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
