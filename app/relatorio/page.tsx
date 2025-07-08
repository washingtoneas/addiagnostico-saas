"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Download, RefreshCw, Target } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface CampanhaData {
  nomeCampanha: string
  cpc: string
  cpm: string
  ctr: string
  cpa: string
  roas: string
  frequencia: string
  valorGasto: string
}

interface Analise {
  metrica: string
  valor: string
  status: "bom" | "atencao" | "ruim"
  sugestao: string
}

export default function RelatorioPage() {
  const [campanhaData, setCampanhaData] = useState<CampanhaData | null>(null)
  const [analises, setAnalises] = useState<Analise[]>([])

  useEffect(() => {
    const data = localStorage.getItem("campanhaData")
    if (data) {
      const parsedData: CampanhaData = JSON.parse(data)
      setCampanhaData(parsedData)
      gerarAnalises(parsedData)
    }
  }, [])

  const gerarAnalises = (data: CampanhaData) => {
    const analises: Analise[] = []

    // CTR Analysis
    const ctr = Number.parseFloat(data.ctr)
    if (ctr >= 1.5) {
      analises.push({
        metrica: "CTR (Taxa de Cliques)",
        valor: `${ctr}%`,
        status: "bom",
        sugestao: "Excelente! Seu CTR está acima da média. Continue com esse criativo.",
      })
    } else if (ctr >= 1.0) {
      analises.push({
        metrica: "CTR (Taxa de Cliques)",
        valor: `${ctr}%`,
        status: "atencao",
        sugestao: "CTR na média. Considere testar novos criativos para melhorar ainda mais.",
      })
    } else {
      analises.push({
        metrica: "CTR (Taxa de Cliques)",
        valor: `${ctr}%`,
        status: "ruim",
        sugestao: "CTR abaixo da média. Revise seu criativo, headline e chamada para ação.",
      })
    }

    // CPC Analysis
    const cpc = Number.parseFloat(data.cpc)
    if (cpc <= 2.0) {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "bom",
        sugestao: "Ótimo CPC! Você está pagando um valor justo por clique.",
      })
    } else if (cpc <= 3.0) {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "atencao",
        sugestao: "CPC um pouco alto. Considere refinar seu público-alvo.",
      })
    } else {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "ruim",
        sugestao: "CPC muito alto. Revise seu público-alvo e otimize seu anúncio para relevância.",
      })
    }

    // CPA Analysis
    const cpa = Number.parseFloat(data.cpa)
    if (cpa <= 30.0) {
      analises.push({
        metrica: "CPA (Custo por Aquisição)",
        valor: `R$ ${cpa.toFixed(2)}`,
        status: "bom",
        sugestao: "Excelente CPA! Você está adquirindo clientes com eficiência.",
      })
    } else if (cpa <= 50.0) {
      analises.push({
        metrica: "CPA (Custo por Aquisição)",
        valor: `R$ ${cpa.toFixed(2)}`,
        status: "atencao",
        sugestao: "CPA moderado. Analise se o valor do cliente justifica esse custo.",
      })
    } else {
      analises.push({
        metrica: "CPA (Custo por Aquisição)",
        valor: `R$ ${cpa.toFixed(2)}`,
        status: "ruim",
        sugestao: "CPA alto. Melhore a segmentação e otimize o funil de conversão.",
      })
    }

    // ROAS Analysis
    const roas = Number.parseFloat(data.roas)
    if (roas >= 1.5) {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "bom",
        sugestao: "Ótimo ROAS! Sua campanha está gerando bom retorno financeiro.",
      })
    } else if (roas >= 1.0) {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "atencao",
        sugestao: "ROAS no limite. Considere melhorar sua oferta ou processo de vendas.",
      })
    } else {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "ruim",
        sugestao: "ROAS baixo. Revise sua oferta, preços e estratégia de persuasão.",
      })
    }

    // Frequência Analysis
    const frequencia = Number.parseFloat(data.frequencia)
    if (frequencia <= 4.0) {
      analises.push({
        metrica: "Frequência",
        valor: `${frequencia.toFixed(1)}`,
        status: "bom",
        sugestao: "Frequência ideal! Seu público não está saturado.",
      })
    } else if (frequencia <= 6.0) {
      analises.push({
        metrica: "Frequência",
        valor: `${frequencia.toFixed(1)}`,
        status: "atencao",
        sugestao: "Frequência um pouco alta. Monitore a fadiga do anúncio.",
      })
    } else {
      analises.push({
        metrica: "Frequência",
        valor: `${frequencia.toFixed(1)}`,
        status: "ruim",
        sugestao: "Frequência alta! Público saturado. Renove o criativo ou expanda o público.",
      })
    }

    // CPM Analysis
    const cpm = Number.parseFloat(data.cpm)
    if (cpm <= 20.0) {
      analises.push({
        metrica: "CPM (Custo por Mil Impressões)",
        valor: `R$ ${cpm.toFixed(2)}`,
        status: "bom",
        sugestao: "CPM excelente! Você está alcançando seu público com eficiência.",
      })
    } else if (cpm <= 35.0) {
      analises.push({
        metrica: "CPM (Custo por Mil Impressões)",
        valor: `R$ ${cpm.toFixed(2)}`,
        status: "atencao",
        sugestao: "CPM moderado. Considere expandir seu público-alvo.",
      })
    } else {
      analises.push({
        metrica: "CPM (Custo por Mil Impressões)",
        valor: `R$ ${cpm.toFixed(2)}`,
        status: "ruim",
        sugestao: "CPM alto! Tente públicos mais amplos ou revise a segmentação.",
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

  const metricas = {
    boas: analises.filter((a) => a.status === "bom").length,
    atencao: analises.filter((a) => a.status === "atencao").length,
    ruins: analises.filter((a) => a.status === "ruim").length,
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
              <span className="text-xl font-bold text-slate-800">AdDiagnóstico</span>
            </div>
          </div>
        </div>
      </header>

      {/* Report Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Relatório de Diagnóstico</h1>
            <p className="text-slate-600">
              Campanha: <span className="font-semibold">{campanhaData.nomeCampanha}</span>
            </p>
          </div>

          {/* Summary */}
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">Resumo Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{metricas.boas}</div>
                  <div className="text-sm text-green-700">Métricas Boas</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{metricas.atencao}</div>
                  <div className="text-sm text-yellow-700">Precisam Atenção</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{metricas.ruins}</div>
                  <div className="text-sm text-red-700">Precisam Melhoria</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
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

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="mr-2 h-4 w-4" />
              Baixar PDF
            </Button>
            <Link href="/formulario">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refazer Análise
              </Button>
            </Link>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Quer sugestões mais avançadas?</h3>
              <p className="mb-6 text-blue-100">
                Em breve: versão PRO com IA para análises ainda mais detalhadas e personalizadas!
              </p>
              <Button variant="secondary" size="lg">
                Seja notificado do lançamento
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
