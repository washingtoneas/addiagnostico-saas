"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Target,
  LogOut,
  Plus,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Calendar,
  DollarSign,
  Lightbulb,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import type { Campaign } from "@/lib/supabase"

interface AnaliseCompleta {
  metrica: string
  valor: string
  status: "bom" | "atencao" | "ruim"
  problema: string
  sugestao: string
  exemplo?: string
}

export default function PainelPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")
  const [userId, setUserId] = useState("")
  const [campanhas, setCampanhas] = useState<Campaign[]>([])
  const [showNewCampaignForm, setShowNewCampaignForm] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [analises, setAnalises] = useState<AnaliseCompleta[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    valor_gasto: "",
    cpm: "",
    cpc: "",
    ctr: "",
    cpa: "",
    roas: "",
    frequencia: "",
    alcance: "",
    impressoes: "",
    vendas: "",
    orcamento_diario: "",
    duracao_campanha: "",
  })

  useEffect(() => {
    // Verificar se o usuário está logado
    const isLoggedIn = localStorage.getItem("userLoggedIn")
    const email = localStorage.getItem("userEmail")
    const id = localStorage.getItem("userId")

    if (!isLoggedIn || !email || !id) {
      router.push("/login")
      return
    }

    setUserEmail(email)
    setUserId(id)
    loadCampanhas(id)
  }, [router])

  const loadCampanhas = async (userId: string) => {
    try {
      const response = await fetch(`/api/campaigns?userId=${userId}`)
      const result = await response.json()

      if (result.success) {
        setCampanhas(result.campaigns)
      }
    } catch (error) {
      console.error("Erro ao carregar campanhas:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userId")
    router.push("/")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitNewCampaign = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          ...formData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Recarregar campanhas
        await loadCampanhas(userId)

        // Gerar análise completa
        gerarAnaliseCompleta(result.campaign)
        setSelectedCampaign(result.campaign)
        setShowNewCampaignForm(false)

        // Limpar formulário
        setFormData({
          name: "",
          valor_gasto: "",
          cpm: "",
          cpc: "",
          ctr: "",
          cpa: "",
          roas: "",
          frequencia: "",
          alcance: "",
          impressoes: "",
          vendas: "",
          orcamento_diario: "",
          duracao_campanha: "",
        })
      } else {
        alert(result.message || "Erro ao criar campanha")
      }
    } catch (error) {
      console.error("Erro ao criar campanha:", error)
      alert("Erro de conexão. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const gerarAnaliseCompleta = (data: Campaign) => {
    const analises: AnaliseCompleta[] = []

    // CTR Analysis
    const ctr = data.ctr || 0
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
        problema: "Criativo fraco. Anúncio não está chamando atenção do público",
        sugestao: "Teste nova headline e thumbnail mais chamativas",
        exemplo:
          "Headlines que funcionam: '🚨 Você está perdendo dinheiro sem saber?' ou '⚡ Descubra o segredo que 97% não sabe'",
      })
    }

    // CPC Analysis
    const cpc = data.cpc || 0
    if (cpc > 2.5) {
      analises.push({
        metrica: "CPC (Custo por Clique)",
        valor: `R$ ${cpc.toFixed(2)}`,
        status: "ruim",
        problema: "Público pouco responsivo. Segmentação inadequada",
        sugestao: "Segmente melhor o público-alvo e teste novos interesses",
        exemplo:
          "Teste públicos lookalike de 1-3% dos seus melhores clientes ou interesses mais amplos relacionados ao seu nicho.",
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

    // CPA Analysis
    const cpa = data.cpa || 0
    if (cpa > 30.0) {
      analises.push({
        metrica: "CPA (Custo por Aquisição)",
        valor: `R$ ${cpa.toFixed(2)}`,
        status: "ruim",
        problema: "Pode ser o funil de venda. Conversão baixa",
        sugestao: "Teste oferta e copy da landing page",
        exemplo: "Simplifique o checkout (menos campos), adicione Pix como opção, teste headlines mais diretas na LP.",
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

    // ROAS Analysis
    const roas = data.roas || 0
    if (roas < 1.5) {
      analises.push({
        metrica: "ROAS (Retorno sobre Gasto)",
        valor: `${roas.toFixed(1)}x`,
        status: "ruim",
        problema: "A campanha não está sendo lucrativa",
        sugestao: "Teste novos criativos ou canais de aquisição",
        exemplo:
          "Teste ofertas como: 'Somente hoje: 50% OFF + Frete Grátis' ou 'Últimas 24h para garantir o bônus exclusivo'",
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

    // Frequência Analysis
    const frequencia = data.frequencia || 0
    if (frequencia > 4) {
      analises.push({
        metrica: "Frequência",
        valor: `${frequencia.toFixed(1)}`,
        status: "ruim",
        problema: "Saturação. Anúncio visto muitas vezes pelo mesmo público",
        sugestao: "Troque o criativo urgentemente",
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

    // CPM Analysis
    const cpm = data.cpm || 0
    if (cpm > 25.0) {
      analises.push({
        metrica: "CPM (Custo por Mil Impressões)",
        valor: `R$ ${cpm.toFixed(2)}`,
        status: "ruim",
        problema: "Audiência cara. Segmentação muito específica",
        sugestao: "Use públicos semelhantes ou mais amplos",
        exemplo:
          "Experimente públicos de interesse amplo (ex: 'Marketing Digital' ao invés de 'Facebook Ads para E-commerce')",
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

  // Calcular estatísticas
  const stats = {
    totalCampanhas: campanhas.length,
    roasMedia:
      campanhas.length > 0
        ? (campanhas.reduce((acc, camp) => acc + (camp.roas || 0), 0) / campanhas.length).toFixed(1)
        : "0.0",
    gastoTotal: campanhas.reduce((acc, camp) => acc + (camp.valor_gasto || 0), 0).toFixed(2),
    ultimaAnalise: campanhas.length > 0 ? new Date(campanhas[0].created_at).toLocaleDateString("pt-BR") : "Nenhuma",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-slate-800">AdDiagnóstico PRO</span>
              <Badge className="bg-green-100 text-green-700">Painel</Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">Olá, {userEmail}</span>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {!selectedCampaign && !showNewCampaignForm && (
            <>
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">Painel de Campanhas</h1>
                  <p className="text-slate-600">Gerencie e analise suas campanhas do Facebook Ads</p>
                </div>
                <Button onClick={() => setShowNewCampaignForm(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Análise
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Total de Análises</p>
                        <p className="text-2xl font-bold text-slate-800">{stats.totalCampanhas}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">ROAS Médio</p>
                        <p className="text-2xl font-bold text-slate-800">{stats.roasMedia}x</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <DollarSign className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Gasto Total</p>
                        <p className="text-2xl font-bold text-slate-800">R$ {stats.gastoTotal}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <Calendar className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Última Análise</p>
                        <p className="text-2xl font-bold text-slate-800">{stats.ultimaAnalise}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Campaigns List */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800">Suas Campanhas</CardTitle>
                </CardHeader>
                <CardContent>
                  {campanhas.length === 0 ? (
                    <div className="text-center py-12">
                      <BarChart3 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">Nenhuma campanha analisada</h3>
                      <p className="text-slate-500 mb-6">Comece criando sua primeira análise de campanha</p>
                      <Button onClick={() => setShowNewCampaignForm(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Criar Primeira Análise
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {campanhas.map((campanha) => (
                        <div
                          key={campanha.id}
                          className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedCampaign(campanha)
                            gerarAnaliseCompleta(campanha)
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-slate-800">{campanha.name}</h3>
                              <p className="text-sm text-slate-600">
                                Analisada em {new Date(campanha.created_at).toLocaleDateString("pt-BR")} • Gasto: R${" "}
                                {campanha.valor_gasto?.toFixed(2)} • ROAS: {campanha.roas?.toFixed(1)}x
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  (campanha.roas || 0) >= 1.5
                                    ? "bg-green-100 text-green-700"
                                    : (campanha.roas || 0) >= 1.0
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }
                              >
                                {(campanha.roas || 0) >= 1.5 ? "Boa" : (campanha.roas || 0) >= 1.0 ? "Regular" : "Ruim"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* New Campaign Form */}
          {showNewCampaignForm && (
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-slate-800">Nova Análise de Campanha</CardTitle>
                  <Button onClick={() => setShowNewCampaignForm(false)} variant="ghost" size="sm">
                    Cancelar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitNewCampaign} className="space-y-6">
                  {/* Nome da Campanha */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da campanha *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Black Friday 2024 - Conversão"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  {/* Grid de campos */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="valor_gasto">Valor gasto total (R$) *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">R$</span>
                        <Input
                          id="valor_gasto"
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          className="pl-8"
                          value={formData.valor_gasto}
                          onChange={(e) => handleInputChange("valor_gasto", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orcamento_diario">Orçamento diário (R$)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">R$</span>
                        <Input
                          id="orcamento_diario"
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          className="pl-8"
                          value={formData.orcamento_diario}
                          onChange={(e) => handleInputChange("orcamento_diario", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpm">CPM (R$) *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">R$</span>
                        <Input
                          id="cpm"
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          className="pl-8"
                          value={formData.cpm}
                          onChange={(e) => handleInputChange("cpm", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpc">CPC (R$) *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">R$</span>
                        <Input
                          id="cpc"
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          className="pl-8"
                          value={formData.cpc}
                          onChange={(e) => handleInputChange("cpc", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ctr">CTR (%) *</Label>
                      <div className="relative">
                        <Input
                          id="ctr"
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          className="pr-8"
                          value={formData.ctr}
                          onChange={(e) => handleInputChange("ctr", e.target.value)}
                          required
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpa">CPA (R$) *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">R$</span>
                        <Input
                          id="cpa"
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          className="pl-8"
                          value={formData.cpa}
                          onChange={(e) => handleInputChange("cpa", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="roas">ROAS (x) *</Label>
                      <Input
                        id="roas"
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={formData.roas}
                        onChange={(e) => handleInputChange("roas", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="frequencia">Frequência *</Label>
                      <Input
                        id="frequencia"
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={formData.frequencia}
                        onChange={(e) => handleInputChange("frequencia", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="alcance">Alcance</Label>
                      <Input
                        id="alcance"
                        type="number"
                        placeholder="0"
                        value={formData.alcance}
                        onChange={(e) => handleInputChange("alcance", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="impressoes">Impressões</Label>
                      <Input
                        id="impressoes"
                        type="number"
                        placeholder="0"
                        value={formData.impressoes}
                        onChange={(e) => handleInputChange("impressoes", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vendas">Vendas</Label>
                      <Input
                        id="vendas"
                        type="number"
                        placeholder="0"
                        value={formData.vendas}
                        onChange={(e) => handleInputChange("vendas", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duracao_campanha">Duração (dias)</Label>
                      <Input
                        id="duracao_campanha"
                        type="number"
                        placeholder="0"
                        value={formData.duracao_campanha}
                        onChange={(e) => handleInputChange("duracao_campanha", e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Gerando Relatório...
                      </>
                    ) : (
                      "Gerar Relatório Completo"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Campaign Analysis */}
          {selectedCampaign && analises.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">Relatório Completo</h1>
                  <p className="text-slate-600">
                    Campanha: <span className="font-semibold">{selectedCampaign.name}</span>
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setSelectedCampaign(null)
                    setAnalises([])
                  }}
                  variant="outline"
                >
                  Voltar à Lista
                </Button>
              </div>

              {/* Summary */}
              <Card className="mb-8 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800">Resumo Executivo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {analises.filter((a) => a.status === "bom").length}
                      </div>
                      <div className="text-sm text-green-700">Métricas Excelentes</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {analises.filter((a) => a.status === "atencao").length}
                      </div>
                      <div className="text-sm text-yellow-700">Precisam Atenção</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {analises.filter((a) => a.status === "ruim").length}
                      </div>
                      <div className="text-sm text-red-700">Críticas - Ação Urgente</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 text-center">
                      <strong>Valor investido:</strong> R$ {selectedCampaign.valor_gasto?.toFixed(2)} •
                      <strong> ROAS atual:</strong> {selectedCampaign.roas?.toFixed(1)}x •
                      <strong> Potencial de melhoria:</strong> +
                      {analises.filter((a) => a.status === "ruim").length * 15 +
                        analises.filter((a) => a.status === "atencao").length * 8}
                      % ROI
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Analysis */}
              <div className="space-y-6">
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
            </>
          )}
        </div>
      </section>
    </div>
  )
}
