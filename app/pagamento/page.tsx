"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Target, ExternalLink, CheckCircle, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PagamentoPage() {
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handlePayment = () => {
    setIsRedirecting(true)
    // Redirecionar para o link da Cakto
    window.open("https://pay.cakto.com.br/54ksi6g_455807", "_blank")

    // Simular redirecionamento após alguns segundos
    setTimeout(() => {
      setIsRedirecting(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/relatorio-parcial">
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

      {/* Payment Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Pagamento Seguro</Badge>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Finalizar Compra</h1>
            <p className="text-slate-600">
              Você será redirecionado para pagamento via Pix. Após o pagamento, seu acesso vitalício será liberado
              automaticamente.
            </p>
          </div>

          {/* Product Summary */}
          <Card className="shadow-lg border-0 mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">Resumo da Compra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Produto:</span>
                  <span className="font-semibold">AdDiagnóstico PRO - Acesso Vitalício</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Valor:</span>
                  <span className="text-2xl font-bold text-green-600">R$ 19,90</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-slate-800">O que você receberá:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-600">Relatório completo com todas as métricas analisadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-600">Sugestões práticas e personalizadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-600">Painel pessoal com acesso vitalício</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-600">Relatórios ilimitados para novas campanhas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-600">Login automático criado com seu e-mail</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card className="shadow-lg border-0 mb-6">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Como funciona</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-slate-700 font-medium">Clique no botão abaixo</p>
                    <p className="text-slate-600 text-sm">Você será redirecionado para a página de pagamento segura</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-slate-700 font-medium">Pague via Pix</p>
                    <p className="text-slate-600 text-sm">Pagamento instantâneo e seguro</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-slate-700 font-medium">Acesso liberado automaticamente</p>
                    <p className="text-slate-600 text-sm">Receba e-mail com link para criar sua senha</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Button */}
          <div className="text-center">
            <Button
              onClick={handlePayment}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold w-full mb-4"
              disabled={isRedirecting}
            >
              {isRedirecting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Redirecionando...
                </>
              ) : (
                <>
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Pagar R$ 19,90 via Pix
                </>
              )}
            </Button>

            <p className="text-sm text-slate-500 mb-4">
              🔒 Pagamento 100% seguro via Cakto • Processamento instantâneo
            </p>

            {/* Demo Button for Testing */}
            <div className="border-t pt-4">
              <p className="text-sm text-slate-500 mb-2">Para demonstração (não usar em produção):</p>
              <Link href="/login">
                <Button variant="outline" className="border-dashed bg-transparent">
                  <Zap className="mr-2 h-4 w-4" />
                  Simular Pagamento Aprovado (Demo)
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
