"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Target,
  Download,
  RefreshCw,
  Star,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

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

interface AnaliseCompleta {
  metrica: string
  valor: string
  status: "bom" | "atencao" | "ruim"
  problema: string
  sugestao: string
  exemplo?: string
}

export default function RelatorioCompletoPage() {
  const router = useRouter()
  const [campanhaData, setCampanhaData] = useState<CampanhaData | null>(null)
  const [analises, setAnalises] = useState<AnaliseCompleta[]>([])

  useEffect(() => {
    // Verificar se o pagamento foi confirmado
    const paymentConfirmed = localStorage.getItem("paymentConfirmed")
    if (!paymentConfirmed) {
      router.push("/pagamento")
      return
    }

    const data = localStorage.getItem("campanhaData")
    if (data) {
      const parsedData: CampanhaData = JSON.parse(data)
      setCampanhaData(parsedData)
      gerarAnaliseCompleta(parsedData)
    }
  }, [router])

  const gerarAnaliseCompleta = (data: CampanhaData) => {
    const analises: AnaliseCompleta[] = []

    // CTR Analysis
    const ctr = Number.parseFloat(data.ctr)
    if (ctr >= 1.5) {
      analises.push({
        metrica: "CTR (Taxa de Cliques)",
        valor: `${ctr}%`,
        status: "bom",
        problema: "Nenhum problema identificado",
        sugestao: "Continue com esse criativo! Teste variações para escalar ainda mais.",
        exemplo: "Crie 3-5 variações do mesmo conceito mudando apenas cores ou textos menores.",
      })
    } else {
      analises.push({
        metrica: "CTR (Taxa de Cliques)",
        valor: `${ctr}%`,
        status: "ruim",
        problema: "Anúncio com pouco apelo visual ou copy fraca",
        sugestao: "Use ganchos mais fortes e adicione emojis no início da headline",
        exemplo:
          "Teste headlines como: '🚨 Você está perdendo dinheiro sem saber?' ou '⚡ Descubra o segredo que 97% não sabe'",
      })
    }

    // CPC Analysis
    const cpc = Number.parseFloat(data.cpc)
    if (cpc > 3.0) {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "ruim",
        problema: "Público muito específico ou anúncio com baixa relevância",
        sugestao: "Expanda seu público-alvo e melhore a relevância do anúncio",
        exemplo:
          "Teste públicos lookalike de 1-3% dos seus melhores clientes ou interesses mais amplos relacionados ao seu nicho.",
      })
    } else if (cpc > 2.0) {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "atencao",
        problema: "CPC ligeiramente acima do ideal",
        sugestao: "Teste novos públicos ou otimize o criativo",
        exemplo:
          "Experimente públicos de comportamento (compradores online recentes) ou teste novos formatos de anúncio.",
      })
    } else {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "bom",
        problema: "Nenhum problema identificado",
        sugestao: "CPC excelente! Mantenha essa estratégia e escale o orçamento.",
        exemplo: "Aumente o orçamento gradualmente (20-30% por dia) mantendo o mesmo público e criativo.",
      })
    }

    // Frequência Analysis
    const frequencia = Number.parseFloat(data.frequencia)
    if (frequencia > 4.0) {
      analises.push({
        metrica: "Frequência",
        valor: `${frequencia.toFixed(1)}`,
        status: "ruim",
        problema: "Público vendo demais o mesmo anúncio (saturação)",
        sugestao: "Crie novas variações criativas ou segmente novos públicos",
        exemplo:
          "Teste 3 novos criativos: 1) Mudança de thumbnail, 2) Novo ângulo da oferta, 3) Formato carrossel vs vídeo.",
      })
    } else {
      analises.push({
        metrica: "Frequência",
        valor: `${frequencia.toFixed(1)}`,
        status: "bom",
        problema: "Nenhum problema identificado",
        sugestao: "Frequência ideal! Público não está saturado.",
        exemplo: "Continue monitorando. Quando chegar a 3.5, prepare novos criativos.",
      })
    }

    // ROAS Analysis
    const roas = Number.parseFloat(data.roas)
    if (roas < 1.0) {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "ruim",
        problema: "Sua campanha está gastando mais do que retorna",
        sugestao: "Reveja sua oferta, adicione urgência e escassez",
        exemplo:
          "Teste ofertas como: 'Somente hoje: 50% OFF + Frete Grátis' ou 'Últimas 24h para garantir o bônus exclusivo'",
      })
    } else if (roas < 1.5) {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "atencao",
        problema: "ROAS no limite mínimo aceitável",
        sugestao: "Otimize o funil de vendas e teste novas ofertas",
        exemplo: "Adicione prova social na landing page: depoimentos, número de clientes, garantia de 30 dias.",
      })
    } else {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "bom",
        problema: "Nenhum problema identificado",
        sugestao: "Excelente ROAS! Escale com confiança.",
        exemplo: "Duplique o orçamento e teste públicos similares para expandir o alcance mantendo a rentabilidade.",
      })
    }

    // CPM Analysis
    const cpm = Number.parseFloat(data.cpm)
    if (cpm > 35.0) {
      analises.push({
        metrica: "CPM (Custo por Mil Impressões)",
        valor: `R$ ${cpm.toFixed(2)}`,
        status: "ruim",
        problema: "Audiência muito cara ou específica demais",
        sugestao: "Teste públicos mais amplos ou horários diferentes",
        exemplo:
          "Experimente públicos de interesse amplo (ex: 'Marketing Digital' ao invés de 'Facebook Ads para E-commerce')",
      })
    } else if (cpm > 20.0) {
      analises.push({
        metrica: "CPM (Custo por Mil Impressões)",
        valor: `R$ ${cpm.toFixed(2)}`,
        status: "atencao",
        problema: "CPM um pouco elevado",
        sugestao: "Monitore e considere expandir o público",
        exemplo: "Teste adicionar mais faixas etárias ou expandir a localização geográfica.",
      })
    } else {
      analises.push({
        metrica: "CPM (Custo por Mil Impressões)",
        valor: `R$ ${cpm.toFixed(2)}`,
        status: "bom",
        problema: "Nenhum problema identificado",
        sugestao: "CPM excelente! Público bem segmentado.",
        exemplo: "Mantenha essa segmentação e teste criativos similares para esse público.",
      })
    }

    // CPA Analysis
    const cpa = Number.parseFloat(data.cpa)
    if (cpa > 50.0) {
      analises.push({
        metrica: "CPA (Custo por Aquisição)",
        valor: `R$ ${cpa.toFixed(2)}`,
        status: "ruim",
        problema: "Custo de aquisição muito alto para ser sustentável",
        sugestao: "Otimize todo o funil: anúncio → landing page → checkout",
        exemplo: "Simplifique o checkout (menos campos), adicione Pix como opção, teste headlines mais diretas na LP.",
      })
    } else if (cpa > 30.0) {
      analises.push({
        metrica: "CPA (Custo por Aquisição)",
        valor: `R$ ${cpa.toFixed(2)}`,
        status: "atencao",
        problema: "CPA moderado, analise se o LTV justifica",
        sugestao: "Calcule o valor vitalício do cliente para validar",
        exemplo: "Se LTV > R$ 90, está ok. Se menor, otimize a conversão da landing page com mais prova social.",
      })
    } else {
      analises.push({
        metrica: "CPA (Custo por Aquisição)",
        valor: `R$ ${cpa.toFixed(2)}`,
        status: "bom",
        problema: "Nenhum problema identificado",
        sugestao: "CPA excelente! Escale essa campanha.",
        exemplo: "Aumente orçamento e teste públicos lookalike dos compradores para manter esse CPA baixo.",
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
            <p className="text-slate-600 mb-4">Carregando relatório...</p>
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
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Início
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-slate-800">AdDiagnóstico PRO</span>
              <Badge className="bg-green-100 text-green-700">Relatório Completo</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Report Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
              <Badge className="bg-green-100 text-green-700">Relatório Premium Desbloqueado</Badge>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Diagnóstico Completo</h1>
            <p className="text-slate-600">
              Campanha: <span className="font-semibold">{campanhaData.nomeCampanha}</span>
            </p>
          </div>

          {/* Summary */}
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">Resumo Executivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{metricas.boas}</div>
                  <div className="text-sm text-green-700">Métricas Excelentes</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{metricas.atencao}</div>
                  <div className="text-sm text-yellow-700">Precisam Atenção</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{metricas.ruins}</div>
                  <div className="text-sm text-red-700">Críticas - Ação Urgente</div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-center">
                  <strong>Valor investido:</strong> R$ {Number.parseFloat(campanhaData.valorGasto).toFixed(2)} •
                  <strong> Potencial de melhoria:</strong> +{metricas.ruins * 15 + metricas.atencao * 8}% ROI
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="space-y-6 mb-8">
            {analises.map((analise, index) => (
              <Card key={index} className={`border-l-4 ${getStatusColor(analise.status)} shadow-lg`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {getStatusIcon(analise.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg text-slate-800">{analise.metrica}</h3>
                        <span className="font-bold text-xl text-slate-700">{analise.valor}</span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-1">📊 Diagnóstico:</h4>
                          <p className="text-slate-600">{analise.problema}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-700 mb-1">💡 Sugestão:</h4>
                          <p className="text-slate-600">{analise.sugestao}</p>
                        </div>

                        {analise.exemplo && (
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <h4 className="font-semibold text-slate-700 mb-1 flex items-center gap-1">
                              <Lightbulb className="h-4 w-4" />
                              Exemplo Prático:
                            </h4>
                            <p className="text-slate-600 text-sm">{analise.exemplo}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bonus Content */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">🎯 Checklist de Ação Rápida</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Pausar anúncios com CTR &lt; 1%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Criar 3 variações do melhor criativo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Testar públicos lookalike 1-3%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Adicionar urgência na oferta</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Otimizar landing page mobile</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">🚀 Headlines Vencedoras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm font-medium">"🚨 Últimas 24h: 50% OFF"</p>
                    <p className="text-xs text-green-700">Urgência + Desconto</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm font-medium">"Descubra o segredo que 97% não sabe"</p>
                    <p className="text-xs text-blue-700">Curiosidade + Exclusividade</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="text-sm font-medium">"Como [resultado] em [tempo] sem [objeção]"</p>
                    <p className="text-xs text-purple-700">Fórmula comprovada</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="mr-2 h-4 w-4" />
              Baixar Relatório PDF
            </Button>
            <Link href="/formulario">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                <RefreshCw className="mr-2 h-4 w-4" />
                Analisar Nova Campanha
              </Button>
            </Link>
          </div>

          {/* Testimonial */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg text-slate-700 mb-4">
                "Implementei as sugestões do AdDiagnóstico e meu ROAS subiu de 1.2x para 2.8x em apenas 2 semanas!"
              </blockquote>
              <cite className="text-slate-600">— Marina Silva, E-commerce de Moda</cite>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
