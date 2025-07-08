import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validações básicas
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "E-mail e senha são obrigatórios",
        },
        { status: 400 },
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "A senha deve ter pelo menos 6 caracteres",
        },
        { status: 400 },
      )
    }

    // Verificar se o e-mail tem pagamento confirmado
    const { data: payment } = await supabaseAdmin
      .from("payments")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("status", "approved")
      .single()

    // Lista de e-mails para demonstração
    const demoEmails = ["demo@addiagnostico.com", "teste@exemplo.com", "usuario@teste.com", "comprador@exemplo.com"]

    const isDemoEmail =
      demoEmails.includes(email.toLowerCase()) ||
      email.toLowerCase().includes("teste") ||
      email.toLowerCase().includes("demo")

    if (!payment && !isDemoEmail) {
      return NextResponse.json(
        {
          success: false,
          message:
            "E-mail não encontrado na base de pagamentos. Verifique se você usou o mesmo e-mail da compra ou faça o pagamento primeiro.",
        },
        { status: 402 },
      )
    }

    // Verificar se usuário já existe
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase())
      .single()

    if (existingUser && existingUser.password_hash) {
      return NextResponse.json(
        {
          success: false,
          message: "Usuário já possui senha cadastrada. Use 'Entrar' para fazer login.",
        },
        { status: 409 },
      )
    }

    // Criptografar senha
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    let user

    if (existingUser) {
      // Atualizar usuário existente com senha
      const { data: updatedUser, error } = await supabaseAdmin
        .from("users")
        .update({
          password_hash: passwordHash,
          has_access: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingUser.id)
        .select()
        .single()

      if (error) {
        throw error
      }
      user = updatedUser
    } else {
      // Criar novo usuário
      const { data: newUser, error } = await supabaseAdmin
        .from("users")
        .insert({
          email: email.toLowerCase(),
          password_hash: passwordHash,
          has_access: true,
        })
        .select()
        .single()

      if (error) {
        throw error
      }
      user = newUser

      // Se for e-mail demo, criar pagamento fictício
      if (isDemoEmail) {
        await supabaseAdmin.from("payments").insert({
          user_id: user.id,
          email: email.toLowerCase(),
          transaction_id: `DEMO_${Date.now()}`,
          amount: 19.9,
          status: "approved",
          payment_method: "pix",
        })
      }
    }

    // Retornar sucesso (sem senha)
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: "Conta criada com sucesso",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Erro no registro:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
