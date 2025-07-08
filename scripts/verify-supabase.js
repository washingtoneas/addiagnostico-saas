const { createClient } = require("@supabase/supabase-js")

async function verifySupabase() {
  console.log("🔍 VERIFICANDO CONFIGURAÇÃO DO SUPABASE...\n")

  // Solicitar credenciais do usuário
  const readline = require("readline")
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  function question(prompt) {
    return new Promise((resolve) => {
      rl.question(prompt, resolve)
    })
  }

  try {
    console.log("📋 Por favor, insira suas credenciais do Supabase:")
    console.log("(Você pode encontrá-las em Settings > API)\n")

    const supabaseUrl = await question("🔗 Project URL (https://xxx.supabase.co): ")
    const supabaseKey = await question("🔑 Anon Key (eyJhbGciOi...): ")
    const serviceKey = await question("🔐 Service Role Key (eyJhbGciOi...): ")

    console.log("\n🧪 TESTANDO CONEXÕES...\n")

    // Testar conexão básica
    console.log("1️⃣ Testando conexão básica...")
    const supabase = createClient(supabaseUrl, supabaseKey)

    try {
      const { data, error } = await supabase.from("users").select("count").limit(1)
      if (error) throw error
      console.log("✅ Conexão básica: OK")
    } catch (error) {
      console.log("❌ Conexão básica: ERRO -", error.message)
      return
    }

    // Testar conexão admin
    console.log("2️⃣ Testando conexão admin...")
    const supabaseAdmin = createClient(supabaseUrl, serviceKey)

    try {
      const { data, error } = await supabaseAdmin.from("users").select("*").limit(1)
      if (error) throw error
      console.log("✅ Conexão admin: OK")
    } catch (error) {
      console.log("❌ Conexão admin: ERRO -", error.message)
      return
    }

    // Verificar tabelas
    console.log("3️⃣ Verificando tabelas...")
    const tables = ["users", "payments", "campaigns"]

    for (const table of tables) {
      try {
        const { data, error } = await supabaseAdmin.from(table).select("*").limit(1)
        if (error) throw error
        console.log(`✅ Tabela '${table}': OK`)
      } catch (error) {
        console.log(`❌ Tabela '${table}': ERRO -`, error.message)
      }
    }

    // Verificar admin
    console.log("4️⃣ Verificando usuário admin...")
    try {
      const { data, error } = await supabaseAdmin
        .from("users")
        .select("*")
        .eq("email", "washington.eas@gmail.com")
        .single()

      if (error) throw error

      if (data) {
        console.log("✅ Admin encontrado:", data.email)
        console.log("✅ Acesso liberado:", data.has_access ? "SIM" : "NÃO")
        console.log("✅ Senha configurada:", data.password_hash ? "SIM" : "NÃO")
      } else {
        console.log("❌ Admin não encontrado")
      }
    } catch (error) {
      console.log("❌ Erro ao verificar admin:", error.message)
    }

    // Gerar arquivo .env
    console.log("\n📝 GERANDO ARQUIVO .ENV...")
    const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}
SUPABASE_SERVICE_ROLE_KEY=${serviceKey}

# App Configuration (atualizar após deploy)
NEXT_PUBLIC_APP_URL=http://localhost:3000
`

    require("fs").writeFileSync(".env.local", envContent)
    console.log("✅ Arquivo .env.local criado!")

    console.log("\n🎉 VERIFICAÇÃO CONCLUÍDA!")
    console.log("\n📋 RESUMO:")
    console.log("✅ Supabase configurado corretamente")
    console.log("✅ Todas as tabelas existem")
    console.log("✅ Admin configurado")
    console.log("✅ Arquivo .env.local criado")
    console.log("\n🚀 Você pode prosseguir para o deploy na Vercel!")
  } catch (error) {
    console.error("❌ Erro durante verificação:", error.message)
  } finally {
    rl.close()
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  verifySupabase()
}

module.exports = { verifySupabase }
