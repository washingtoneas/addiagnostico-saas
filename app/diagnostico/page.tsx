"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Target, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DiagnosticoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nomeCampanha: "",
    valorGasto: "",
    cpm: "",
    cpc: "",
    ctr: "",
    cpa: "",
    roas: "",
    frequencia: "",
    alcance: "",
    impressoes: "",
    vendas: "",
    orcamentoDiario: "",
    duracaoCampanha: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica dos campos principais
    const requiredFields = ["nomeCampanha", "valorGasto", "cpm", "cpc", "ctr", "cpa", "roas", "frequencia"]
    const missingFields = requiredFields.filter((field) => !formData[field])

    if (missingFields.length > 0) {
      alert("Por favor, preencha todos os campos obrigatórios marcados com *")
      return
    }

    // Salvar dados no localStorage e redirecionar
    localStorage.setItem("campanhaData", JSON.stringify(formData))
    router.push("/relatorio-parcial")
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

      {/* Form Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Diagnóstico da sua campanha</h1>
            <p className="text-slate-600">
              Preencha os dados da sua campanha do Facebook Ads para receber o diagnóstico gratuito
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">Dados da Campanha</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome da Campanha */}
                <div className="space-y-2">
                  <Label htmlFor="nomeCampanha">Nome da campanha *</Label>
                  <Input
                    id="nomeCampanha"
                    placeholder="Ex: Black Friday 2024 - Conversão"
                    value={formData.nomeCampanha}
                    onChange={(e) => handleInputChange("nomeCampanha", e.target.value)}
                    required
                  />
                </div>

                {/* Primeira linha - Valor gasto e Orçamento diário */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="valorGasto">Valor gasto total (R$) *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">R$</span>
                      <Input
                        id="valorGasto"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        className="pl-8"
                        value={formData.valorGasto}
                        onChange={(e) => handleInputChange("valorGasto", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orcamentoDiario">Orçamento diário (R$)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">R$</span>
                      <Input
                        id="orcamentoDiario"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        className="pl-8"
                        value={formData.orcamentoDiario}
                        onChange={(e) => handleInputChange("orcamentoDiario", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Segunda linha - CPM e CPC */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpm">CPM - Custo por Mil Impressões (R$) *</Label>
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
                    <Label htmlFor="cpc">CPC - Custo por Clique (R$) *</Label>
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

                {/* Terceira linha - CTR e CPA */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ctr">CTR - Taxa de Cliques (%) *</Label>
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
                    <Label htmlFor="cpa">CPA - Custo por Aquisição (R$) *</Label>
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

                {/* Quarta linha - ROAS e Frequência */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roas">ROAS - Retorno sobre Gasto (x) *</Label>
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

                {/* Quinta linha - Alcance e Impressões */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="alcance">Alcance (pessoas únicas)</Label>
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

                {/* Sexta linha - Vendas e Duração */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vendas">Quantidade de vendas</Label>
                    <Input
                      id="vendas"
                      type="number"
                      placeholder="0"
                      value={formData.vendas}
                      onChange={(e) => handleInputChange("vendas", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duracaoCampanha">Duração da campanha (dias)</Label>
                    <Input
                      id="duracaoCampanha"
                      type="number"
                      placeholder="0"
                      value={formData.duracaoCampanha}
                      onChange={(e) => handleInputChange("duracaoCampanha", e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                    Gerar Relatório Parcial
                  </Button>
                  <p className="text-center text-sm text-slate-500 mt-2">* Campos obrigatórios para análise</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
