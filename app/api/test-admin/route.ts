import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const adminEmail = "washington.eas@gmail.com"
    const adminPassword = "212221*"

    console.log("🧪 Testando configuração do admin...")

    // Buscar usuário admin
    const { data: user, error } = await supabaseAdmin.from("users").select("*").eq("email", adminEmail).single()

    const result = {
      email: adminEmail,
      userExists: !!user,
      hasPassword: !!user?.password_hash,
      hasAccess: user?.has_access,
      error: error?.message,
      passwordTest: null as boolean | null,
    }

    // Testar senha se existir
    if (user?.password_hash) {
      result.passwordTest = await bcrypt.compare(adminPassword, user.password_hash)
    }

    // Se não existir ou tiver problemas, criar/corrigir
    if (!user || !user.password_hash || !result.passwordTest) {
      console.log("🔧 Corrigindo admin...")

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(adminPassword, saltRounds)

      if (user) {
        // Atualizar usuário existente
        await supabaseAdmin
          .from("users")
          .update({
            password_hash: passwordHash,
            has_access: true,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id)
      } else {
        // Criar novo usuário
        await supabaseAdmin.from("users").insert({
          email: adminEmail,
          password_hash: passwordHash,
          has_access: true,
        })
      }

      result.passwordTest = true
      result.hasPassword = true
      result.hasAccess = true
    }

    return NextResponse.json({
      success: true,
      message: "Teste do admin concluído",
      result,
      loginInstructions: {
        email: adminEmail,
        password: adminPassword,
        url: "/login",
      },
    })
  } catch (error) {
    console.error("❌ Erro no teste admin:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro no teste",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminEmail = "washington.eas@gmail.com"
    const adminPassword = "212221*"

    console.log("🔧 Forçando criação/correção do admin...")

    // Deletar admin existente se houver
    await supabaseAdmin.from("users").delete().eq("email", adminEmail)

    // Criar hash da senha
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds)

    // Criar usuário admin
    const { data: newUser, error } = await supabaseAdmin
      .from("users")
      .insert({
        email: adminEmail,
        password_hash: passwordHash,
        has_access: true,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    // Criar pagamento
    await supabaseAdmin.from("payments").insert({
      user_id: newUser.id,
      email: adminEmail,
      transaction_id: `ADMIN_FORCE_${Date.now()}`,
      amount: 0,
      status: "approved",
      payment_method: "admin_access",
    })

    // Testar login
    const isPasswordValid = await bcrypt.compare(adminPassword, passwordHash)

    return NextResponse.json({
      success: true,
      message: "Admin criado/corrigido com sucesso",
      user: {
        id: newUser.id,
        email: newUser.email,
        has_access: newUser.has_access,
      },
      passwordTest: isPasswordValid,
      loginData: {
        email: adminEmail,
        password: adminPassword,
      },
    })
  } catch (error) {
    console.error("❌ Erro ao forçar criação admin:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao criar admin",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
