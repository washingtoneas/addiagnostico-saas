import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingDown, Zap, CheckCircle, Star, ArrowRight, DollarSign } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-800">AdDiagnóstico</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                PRO
              </Badge>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/login" className="text-slate-600 hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link href="/diagnostico">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Começar Grátis
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="mb-6">
            <Badge className="bg-red-100 text-red-700 border-red-200 mb-4">
              <TrendingDown className="h-4 w-4 mr-1" />
              Alerta: 73% das campanhas estão no prejuízo
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Suas campanhas do <span className="text-red-600">Facebook Ads</span>
            <br />
            estão dando <span className="text-red-600">prejuízo</span>?
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            <span className="font-semibold text-blue-600">Descubra em segundos</span> onde você está errando e como
            melhorar. Diagnóstico gratuito + relatório completo por apenas R$ 19,90.
          </p>
          <Link href="/diagnostico">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Zap className="mr-2 h-5 w-5" />
              Começar Diagnóstico
            </Button>
          </Link>
          <p className="text-sm text-slate-500 mt-4">
            ✅ Teste grátis • ✅ Resultado em 30 segundos • ✅ Sem cadastro inicial
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Por que suas campanhas estão falhando?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">❌</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">CTR baixo</h3>
                <p className="text-sm text-slate-600">Criativos fracos que não chamam atenção do público</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">💸</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">CPC alto</h3>
                <p className="text-sm text-slate-600">Público mal segmentado aumenta o custo por clique</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">📉</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">ROAS baixo</h3>
                <p className="text-sm text-slate-600">Retorno insuficiente sobre o investimento em anúncios</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Como o AdDiagnóstico PRO resolve</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Insira os dados</h3>
                <p className="text-sm text-slate-600">Preencha as métricas da sua campanha em 2 minutos</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Diagnóstico grátis</h3>
                <p className="text-sm text-slate-600">Receba análise parcial instantânea das principais métricas</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Pague R$ 19,90</h3>
                <p className="text-sm text-slate-600">Desbloqueie relatório completo com acesso vitalício</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Aplique e lucre</h3>
                <p className="text-sm text-slate-600">Implemente as sugestões e melhore seu ROI</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-slate-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Investimento que se paga</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="border-2 border-slate-600">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Diagnóstico Gratuito</h3>
                <div className="text-3xl font-bold text-slate-800 mb-4">R$ 0</div>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-slate-600">3-4 métricas analisadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-slate-600">Diagnóstico básico</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-slate-600">Sem cadastro</span>
                  </li>
                </ul>
                <Link href="/diagnostico">
                  <Button variant="outline" className="w-full bg-transparent">
                    Começar Grátis
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">Recomendado</Badge>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Acesso Vitalício</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">R$ 19,90</div>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-slate-600">Todas as métricas analisadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-slate-600">Sugestões práticas detalhadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-slate-600">Painel pessoal vitalício</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-slate-600">Relatórios ilimitados</span>
                  </li>
                </ul>
                <Link href="/diagnostico">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Começar Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Resultados reais dos nossos usuários</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-700 mb-4">
                  "ROAS subiu de 1.2x para 3.1x em 15 dias seguindo as dicas!"
                </blockquote>
                <cite className="text-slate-600 text-sm">— Carlos M., E-commerce</cite>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-700 mb-4">
                  "Economizei R$ 2.400 no primeiro mês otimizando o CPC."
                </blockquote>
                <cite className="text-slate-600 text-sm">— Ana L., Consultora</cite>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-700 mb-4">
                  "CTR aumentou 180% mudando apenas o criativo sugerido."
                </blockquote>
                <cite className="text-slate-600 text-sm">— Pedro R., Agência</cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Pare de queimar dinheiro com anúncios ineficientes</h2>
          <p className="text-xl text-slate-600 mb-8">
            Descubra exatamente onde sua campanha está falhando e como corrigir em minutos
          </p>
          <Link href="/diagnostico">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              <ArrowRight className="mr-2 h-5 w-5" />
              Começar Diagnóstico Gratuito
            </Button>
          </Link>
          <p className="text-sm text-slate-500 mt-4">Mais de 5.000 campanhas já analisadas</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Target className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-slate-800">AdDiagnóstico PRO</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-slate-600 hover:text-blue-600 text-sm">
                Login
              </Link>
              <p className="text-slate-600 text-sm">© 2024 AdDiagnóstico PRO. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
