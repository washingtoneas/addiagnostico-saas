"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Target, Lock, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface CampanhaData {
  nomeCampanha: string
  valorGasto: string
  cpm: string
  cpc: string
  ctr: string
  cpa: string
  roas: string
  frequencia: string
  alcance: string
  impressoes: string
  vendas: string
  orcamentoDiario: string
  duracaoCampanha: string
}

interface Analise {
  metrica: string
  valor: string
  status: "bom" | "atencao" | "ruim"
  sugestao: string
}

export default function RelatorioGratuitoPage() {
  const [campanhaData, setCampanhaData] = useState<CampanhaData | null>(null)
  const [analises, setAnalises] = useState<Analise[]>([])

  useEffect(() => {
    const data = localStorage.getItem("campanhaData")
    if (data) {
      const parsedData: CampanhaData = JSON.parse(data)
      setCampanhaData(parsedData)
      gerarAnaliseGratuita(parsedData)
    }
  }, [])

  const gerarAnaliseGratuita = (data: CampanhaData) => {
    const analises: Analise[] = []

    // CTR Analysis (primeira métrica gratuita)
    const ctr = Number.parseFloat(data.ctr)
    if (ctr >= 1.5) {
      analises.push({
        metrica: "CTR (Taxa de Cliques)",
        valor: `${ctr}%`,
        status: "bom",
        sugestao: "Acima da média (ótimo engajamento com o criativo)",
      })
    } else if (ctr >= 1.0) {
      analises.push({
        metrica: "CTR (Taxa de Cliques)",
        valor: `${ctr}%`,
        status: "atencao",
        sugestao: "Na média. Considere testar novos criativos.",
      })
    } else {
      analises.push({
        metrica: "CTR (Taxa de Cliques)",
        valor: `${ctr}%`,
        status: "ruim",
        sugestao: "Abaixo da média. Criativo precisa de melhoria urgente.",
      })
    }

    // CPC Analysis (segunda métrica gratuita)
    const cpc = Number.parseFloat(data.cpc)
    if (cpc <= 2.0) {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "bom",
        sugestao: "Excelente! Custo por clique dentro do ideal.",
      })
    } else if (cpc <= 3.0) {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "atencao",
        sugestao: "Acima do ideal. Teste outro público.",
      })
    } else {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "ruim",
        sugestao: "Muito alto! Revise urgentemente seu público-alvo.",
      })
    }

    // ROAS Analysis (terceira métrica gratuita)
    const roas = Number.parseFloat(data.roas)
    if (roas >= 1.5) {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "bom",
        sugestao: "Ótimo retorno! Campanha rentável.",
      })
    } else if (roas >= 1.0) {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "atencao",
        sugestao: "No limite. Monitore de perto.",
      })
    } else {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "ruim",
        sugestao: "Retorno abaixo do mínimo recomendado. Ajuste sua oferta.",
      })
    }

    setAnalises(analises)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "bom":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "atencao":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "ruim":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "bom":
        return "border-l-green-500 bg-green-50"
      case "atencao":
        return "border-l-yellow-500 bg-yellow-50"
      case "ruim":
        return "border-l-red-500 bg-red-50"
      default:
        return ""
    }
  }

  if (!campanhaData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-slate-600 mb-4">Nenhum dado encontrado.</p>
            <Link href="/formulario">
              <Button>Fazer Diagnóstico</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/formulario">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-slate-800">AdDiagnóstico PRO</span>
            </div>
          </div>
        </div>
      </header>

      {/* Report Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <Badge className="bg-green-100 text-green-700 mb-4">Análise Gratuita</Badge>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Diagnóstico Parcial</h1>
            <p className="text-slate-600">
              Campanha: <span className="font-semibold">{campanhaData.nomeCampanha}</span>
            </p>
          </div>

          {/* Free Analysis */}
          <div className="space-y-4 mb-8">
            {analises.map((analise, index) => (
              <Card key={index} className={`border-l-4 ${getStatusColor(analise.status)} shadow-md`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {getStatusIcon(analise.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-800">{analise.metrica}</h3>
                        <span className="font-bold text-lg text-slate-700">{analise.valor}</span>
                      </div>
                      <p className="text-slate-600">{analise.sugestao}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upgrade CTA */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl border-0 mb-8">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Lock className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                <h2 className="text-2xl font-bold mb-4">
                  Quer o relatório completo com todas as sugestões detalhadas?
                </h2>
                <div className="text-4xl font-bold mb-2">R$ 9,90</div>
                <p className="text-blue-100 mb-6">Pagamento via Pix • Acesso imediato</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold mb-3 text-blue-100">O que você vai receber:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-sm">Diagnóstico completo das 10+ métricas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-sm">Sugestões práticas de melhoria para cada ponto</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-sm">Checklist de ação rápida</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-blue-100">Bônus inclusos:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-sm">Guia com ideias de criativos vencedores</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-sm">Templates de headlines que convertem</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-sm">Estratégias de segmentação avançada</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Link href="/pagamento">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold">
                    <Zap className="mr-2 h-5 w-5" />
                    Gerar Pix e Desbloquear Relatório Completo
                  </Button>
                </Link>
                <p className="text-xs text-blue-200 mt-2">
                  Acesso liberado automaticamente após confirmação do pagamento
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Actions */}
          <div className="text-center">
            <Link href="/formulario">
              <Button variant="outline" className="mr-4 bg-transparent">
                Analisar Outra Campanha
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">Voltar ao Início</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
