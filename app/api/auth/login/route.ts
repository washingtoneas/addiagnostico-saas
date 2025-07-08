import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("🔐 Tentativa de login:", { email, hasPassword: !!password })

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

    const emailLower = email.toLowerCase()
    const isAdmin = emailLower === "washington.eas@gmail.com"

    console.log("👤 Verificando usuário:", { email: emailLower, isAdmin })

    // Buscar usuário no banco
    const { data: user, error } = await supabaseAdmin.from("users").select("*").eq("email", emailLower).single()

    console.log("🔍 Resultado da busca:", {
      found: !!user,
      hasPassword: !!user?.password_hash,
      hasAccess: user?.has_access,
      error: error?.message,
    })

    // Se não encontrou o usuário
    if (error || !user) {
      // Se for admin, criar automaticamente
      if (isAdmin) {
        console.log("🛠️ Criando usuário admin automaticamente...")

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const { data: newUser, error: createError } = await supabaseAdmin
          .from("users")
          .insert({
            email: emailLower,
            password_hash: passwordHash,
            has_access: true,
          })
          .select()
          .single()

        if (createError) {
          console.error("❌ Erro ao criar admin:", createError)
          return NextResponse.json(
            {
              success: false,
              message: "Erro ao criar usuário admin",
            },
            { status: 500 },
          )
        }

        console.log("✅ Admin criado com sucesso")

        // Criar pagamento fictício
        await supabaseAdmin.from("payments").insert({
          user_id: newUser.id,
          email: emailLower,
          transaction_id: `ADMIN_${Date.now()}`,
          amount: 0,
          status: "approved",
          payment_method: "admin_access",
        })

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
      // Se for admin sem senha, criar a senha
      if (isAdmin) {
        console.log("🔧 Admin sem senha, criando...")

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const { error: updateError } = await supabaseAdmin
          .from("users")
          .update({
            password_hash: passwordHash,
            has_access: true,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id)

        if (updateError) {
          console.error("❌ Erro ao atualizar senha admin:", updateError)
          return NextResponse.json(
            {
              success: false,
              message: "Erro ao configurar senha admin",
            },
            { status: 500 },
          )
        }

        console.log("✅ Senha admin configurada")
        user.password_hash = passwordHash
        user.has_access = true
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Senha não cadastrada. Use 'Primeiro Acesso' para criar sua senha",
          },
          { status: 401 },
        )
      }
    }

    // Verificar senha
    console.log("🔑 Verificando senha...")
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    console.log("🔍 Senha válida:", isPasswordValid)

    if (!isPasswordValid) {
      // Para admin, tentar recriar a senha se não bater
      if (isAdmin && password === "212221*") {
        console.log("🔧 Recriando senha do admin...")

        const saltRounds = 10
        const newPasswordHash = await bcrypt.hash(password, saltRounds)

        const { error: updateError } = await supabaseAdmin
          .from("users")
          .update({
            password_hash: newPasswordHash,
            has_access: true,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id)

        if (!updateError) {
          console.log("✅ Senha admin recriada com sucesso")
          user.password_hash = newPasswordHash
          user.has_access = true
        }
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Senha incorreta",
          },
          { status: 401 },
        )
      }
    }

    // Verificar acesso (admin sempre tem)
    if (!user.has_access) {
      if (isAdmin) {
        console.log("🔧 Liberando acesso para admin...")
        await supabaseAdmin.from("users").update({ has_access: true }).eq("id", user.id)
        user.has_access = true
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Acesso não liberado. Verifique se o pagamento foi processado",
          },
          { status: 403 },
        )
      }
    }

    // Atualizar último login
    await supabaseAdmin.from("users").update({ last_login: new Date().toISOString() }).eq("id", user.id)

    console.log("✅ Login realizado com sucesso para:", emailLower)

    // Retornar sucesso (sem senha)
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: "Login realizado com sucesso",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("❌ Erro no login:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
