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

    // Verificar se é o admin
    const isAdmin = email.toLowerCase() === "washington.eas@gmail.com"

    // Buscar usuário no banco
    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase())
      .single()

    if (error || !user) {
      // Se for admin e não existir, criar automaticamente
      if (isAdmin && password === "212221*") {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const { data: newUser, error: createError } = await supabaseAdmin
          .from("users")
          .insert({
            email: email.toLowerCase(),
            password_hash: passwordHash,
            has_access: true,
          })
          .select()
          .single()

        if (createError) {
          console.error("Erro ao criar admin:", createError)
          return NextResponse.json(
            {
              success: false,
              message: "Erro ao criar usuário admin",
            },
            { status: 500 },
          )
        }

        // Criar pagamento fictício para o admin
        await supabaseAdmin.from("payments").insert({
          user_id: newUser.id,
          email: email.toLowerCase(),
          transaction_id: `ADMIN_${Date.now()}`,
          amount: 0,
          status: "approved",
          payment_method: "admin_access",
        })

        // Retornar sucesso para admin recém-criado
        const { password_hash, ...userWithoutPassword } = newUser
        return NextResponse.json({
          success: true,
          message: "Admin logado com sucesso",
          user: userWithoutPassword,
        })
      }

      return NextResponse.json(
        {
          success: false,
          message: "E-mail não encontrado. Verifique se você já fez a compra ou crie uma conta no 'Primeiro Acesso'",
        },
        { status: 401 },
      )
    }

    // Verificar se tem senha cadastrada
    if (!user.password_hash) {
      return NextResponse.json(
        {
          success: false,
          message: "Senha não cadastrada. Use 'Primeiro Acesso' para criar sua senha",
        },
        { status: 401 },
      )
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Senha incorreta",
        },
        { status: 401 },
      )
    }

    // Verificar se tem acesso (admin sempre tem acesso)
    if (!user.has_access && !isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Acesso não liberado. Verifique se o pagamento foi processado",
        },
        { status: 403 },
      )
    }

    // Garantir que admin sempre tenha acesso
    if (isAdmin && !user.has_access) {
      await supabaseAdmin.from("users").update({ has_access: true }).eq("id", user.id)
      user.has_access = true
    }

    // Atualizar último login
    await supabaseAdmin.from("users").update({ last_login: new Date().toISOString() }).eq("id", user.id)

    // Retornar sucesso (sem senha)
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: "Login realizado com sucesso",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
