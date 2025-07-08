import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Dados esperados do webhook da Cakto
    const { status, customer_email, transaction_id, amount } = body

    console.log("📥 Webhook recebido:", { status, customer_email, transaction_id, amount })

    // Verificar se o pagamento foi aprovado
    if (status === "approved" || status === "paid") {
      const email = customer_email.toLowerCase()

      // Verificar se o pagamento já foi processado
      const { data: existingPayment } = await supabaseAdmin
        .from("payments")
        .select("*")
        .eq("transaction_id", transaction_id)
        .single()

      if (existingPayment) {
        console.log(`⚠️ Pagamento já processado: ${transaction_id}`)
        return NextResponse.json({
          success: true,
          message: "Pagamento já processado anteriormente",
        })
      }

      // Verificar se usuário já existe
      const { data: existingUser } = await supabaseAdmin.from("users").select("*").eq("email", email).single()

      let userId

      if (existingUser) {
        // Atualizar usuário existente - liberar acesso
        const { error } = await supabaseAdmin
          .from("users")
          .update({
            has_access: true,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingUser.id)

        if (error) {
          throw error
        }

        userId = existingUser.id
        console.log(`✅ Acesso atualizado para usuário existente: ${email}`)
      } else {
        // Criar novo usuário sem senha (será criada no primeiro acesso)
        const { data: newUser, error } = await supabaseAdmin
          .from("users")
          .insert({
            email: email,
            has_access: true,
          })
          .select()
          .single()

        if (error) {
          throw error
        }

        userId = newUser.id
        console.log(`✅ Novo usuário criado: ${email}`)
      }

      // Registrar pagamento
      const { error: paymentError } = await supabaseAdmin.from("payments").insert({
        user_id: userId,
        email: email,
        transaction_id: transaction_id,
        amount: Number.parseFloat(amount) || 19.9,
        status: status,
        payment_method: "pix",
      })

      if (paymentError) {
        throw paymentError
      }

      // Enviar e-mail de boas-vindas
      await sendWelcomeEmail(email)

      console.log(`🎉 Pagamento processado com sucesso para: ${email}`)

      return NextResponse.json({
        success: true,
        message: "Pagamento processado e acesso liberado com sucesso",
      })
    }

    console.log(`⚠️ Pagamento não aprovado: ${status}`)
    return NextResponse.json({
      success: false,
      message: "Pagamento não aprovado",
    })
  } catch (error) {
    console.error("❌ Erro no webhook:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

// Função para enviar e-mail de boas-vindas
async function sendWelcomeEmail(email: string) {
  // Em produção, integrar com SendGrid, Resend, etc.
  console.log(`📧 Enviando e-mail de boas-vindas para: ${email}`)

  const welcomeEmailContent = `
    🎉 Pagamento Confirmado - AdDiagnóstico PRO
    
    Olá!
    
    Seu pagamento foi confirmado com sucesso! 
    
    Agora você tem acesso VITALÍCIO ao AdDiagnóstico PRO.
    
    🔑 COMO ACESSAR SEU PAINEL:
    
    1. Acesse: ${process.env.NEXT_PUBLIC_APP_URL}/login
    2. Clique em "Primeiro Acesso"
    3. Use seu e-mail: ${email}
    4. Crie sua senha de acesso
    5. Pronto! Acesso liberado para sempre
    
    🚀 O QUE VOCÊ PODE FAZER AGORA:
    
    ✅ Gerar relatórios completos ilimitados
    ✅ Analisar todas as métricas das suas campanhas
    ✅ Receber sugestões práticas personalizadas
    ✅ Salvar histórico de todas as suas análises
    ✅ Acessar exemplos de criativos vencedores
    
    💡 DICA: Comece analisando sua campanha atual para identificar 
    oportunidades de melhoria imediatas!
    
    Qualquer dúvida, responda este e-mail.
    
    Sucesso nos seus anúncios! 🎯
    
    Equipe AdDiagnóstico PRO
  `

  console.log("📧 E-mail enviado:", welcomeEmailContent)
  return true
}

// Endpoint GET para verificar status do usuário
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")

  if (!email) {
    return NextResponse.json(
      {
        success: false,
        message: "E-mail é obrigatório",
      },
      { status: 400 },
    )
  }

  const { data: user } = await supabaseAdmin.from("users").select("*").eq("email", email.toLowerCase()).single()

  const { data: payments } = await supabaseAdmin.from("payments").select("*").eq("email", email.toLowerCase())

  return NextResponse.json({
    success: true,
    hasAccess: user?.has_access || false,
    user: user ? { ...user, password_hash: undefined } : null,
    payments: payments || [],
  })
}
