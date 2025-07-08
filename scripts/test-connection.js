const { createClient } = require("@supabase/supabase-js")

async function testConnection() {
  console.log("🧪 TESTANDO CONEXÃO COM SUPABASE...")

  try {
    // Usar as credenciais que você forneceu
    const supabaseUrl = "https://fgzbwhwnaeppnqsdjhsj.supabase.co"
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnemJ3aHduYWVwcG5xc2RqaHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMzIwNjUsImV4cCI6MjA2NjgwODA2NX0.BGheIdN6jKIK0Q_nJCWp8xTGB41cHUM9jO_oWXJcG5Q"

    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log("1️⃣ Testando conexão básica...")
    const { data, error } = await supabase.from("users").select("count").limit(1)

    if (error) {
      console.log("❌ Erro na conexão:", error.message)
      return false
    }

    console.log("✅ Conexão básica: OK")

    // Testar se as tabelas existem
    console.log("2️⃣ Verificando tabelas...")
    const tables = ["users", "payments", "campaigns"]

    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select("*").limit(1)

        if (error) throw error
        console.log(`✅ Tabela '${table}': OK`)
      } catch (error) {
        console.log(`❌ Tabela '${table}': ${error.message}`)
      }
    }

    console.log("\n🎉 TESTE CONCLUÍDO!")
    console.log("✅ Supabase está funcionando!")
    console.log("\n🚀 Agora você pode:")
    console.log("1. Acessar: http://localhost:3000")
    console.log("2. Testar o login admin")
    console.log("3. Fazer o diagnóstico")

    return true
  } catch (error) {
    console.log("❌ Erro geral:", error.message)
    return false
  }
}

testConnection()
