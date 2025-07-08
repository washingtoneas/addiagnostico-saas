"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Target, Lock, Zap, Star } from "lucide-react"
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

export default function RelatorioParcialPage() {
  const [campanhaData, setCampanhaData] = useState<CampanhaData | null>(null)
  const [analises, setAnalises] = useState<Analise[]>([])

  useEffect(() => {
    const data = localStorage.getItem("campanhaData")
    if (data) {
      const parsedData: CampanhaData = JSON.parse(data)
      setCampanhaData(parsedData)
      gerarAnaliseParcial(parsedData)
    }
  }, [])

  const gerarAnaliseParcial = (data: CampanhaData) => {
    const analises: Analise[] = []

    // ROAS Analysis (primeira métrica)
    const roas = Number.parseFloat(data.roas)
    if (roas >= 1.5) {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "bom",
        sugestao: "Excelente retorno! Sua campanha está sendo lucrativa.",
      })
    } else if (roas >= 1.0) {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "atencao",
        sugestao: "No limite. Monitore de perto e considere otimizações.",
      })
    } else {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "ruim",
        sugestao: "Retorno abaixo da média. Tente reforçar a oferta ou melhorar a segmentação.",
      })
    }

    // CTR Analysis (segunda métrica)
    const ctr = Number.parseFloat(data.ctr)
    if (ctr >= 1.5) {
      analises.push({
        metrica: "CTR (Taxa de Cliques)",
        valor: `${ctr}%`,
        status: "bom",
        sugestao: "Ótimo engajamento! Seu criativo está chamando atenção.",
      })
    } else if (ctr >= 1.0) {
      analises.push({
        metrica: "CTR (Taxa de Cliques)",
        valor: `${ctr}%`,
        status: "atencao",
        sugestao: "Levemente abaixo do ideal. Teste headlines mais chamativas.",
      })
    } else {
      analises.push({
        metrica: "CTR (Taxa de Cliques)",
        valor: `${ctr}%`,
        status: "ruim",
        sugestao: "CTR baixo. Criativo precisa de melhoria urgente.",
      })
    }

    // CPC Analysis (terceira métrica)
    const cpc = Number.parseFloat(data.cpc)
    if (cpc <= 2.5) {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "bom",
        sugestao: "Custo por clique excelente! Público bem segmentado.",
      })
    } else if (cpc <= 4.0) {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "atencao",
        sugestao: "CPC um pouco alto. Considere refinar o público-alvo.",
      })
    } else {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "ruim",
        sugestao: "CPC muito alto. Público pouco responsivo. Segmente melhor.",
      })
    }

    // Frequência Analysis (quarta métrica)
    const frequencia = Number.parseFloat(data.frequencia)
    if (frequencia <= 4.0) {
      analises.push({
        metrica: "Frequência",
        valor: `${frequencia.toFixed(1)}`,
        status: "bom",
        sugestao: "Frequência ideal! Público não está saturado.",
      })
    } else {
      analises.push({
        metrica: "Frequência",
        valor: `${frequencia.toFixed(1)}`,
        status: "ruim",
        sugestao: "Saturação. Anúncio visto muitas vezes. Troque o criativo.",
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
            <Link href="/diagnostico">
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
            <Link href="/diagnostico">
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
            <Badge className="bg-green-100 text-green-700 mb-4">Diagnóstico Gratuito</Badge>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Relatório Parcial</h1>
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
                  Quer o relatório completo com sugestões práticas de melhoria para todas as métricas?
                </h2>
                <div className="text-4xl font-bold mb-2">R$ 19,90</div>
                <p className="text-blue-100 mb-6">Pagamento via Pix • Acesso vitalício ao painel</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold mb-3 text-blue-100">Relatório completo inclui:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-sm">Análise detalhada de TODAS as métricas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-sm">Sugestões práticas específicas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-sm">Exemplos de headlines e criativos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span className="text-sm">Estratégias de segmentação</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-blue-100">Acesso vitalício:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-300" />
                      <span className="text-sm">Painel pessoal exclusivo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-300" />
                      <span className="text-sm">Relatórios ilimitados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-300" />
                      <span className="text-sm">Histórico de campanhas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-300" />
                      <span className="text-sm">Atualizações automáticas</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Link href="/pagamento">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold">
                    <Zap className="mr-2 h-5 w-5" />
                    Desbloquear Relatório Completo por R$ 19,90
                  </Button>
                </Link>
                <p className="text-xs text-blue-200 mt-2">Pagamento seguro via Pix • Acesso liberado automaticamente</p>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Actions */}
          <div className="text-center">
            <Link href="/diagnostico">
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
