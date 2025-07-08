console.log("🧪 TESTE RÁPIDO DO SUPABASE")
console.log("=".repeat(40))

// Solicitar apenas as informações essenciais
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

async function testSupabase() {
  try {
    console.log("📋 Vou testar sua configuração do Supabase")
    console.log("Preciso de 3 informações:\n")

    const url = await question("1️⃣ Cole sua Project URL: ")
    const anonKey = await question("2️⃣ Cole sua Anon Key: ")
    const serviceKey = await question("3️⃣ Cole sua Service Role Key: ")

    console.log("\n🔍 TESTANDO...")

    // Teste básico de formato
    if (!url.includes("supabase.co")) {
      console.log("❌ URL parece incorreta. Deve conter 'supabase.co'")
      return
    }

    if (!anonKey.startsWith("eyJ")) {
      console.log("❌ Anon Key parece incorreta. Deve começar com 'eyJ'")
      return
    }

    if (!serviceKey.startsWith("eyJ")) {
      console.log("❌ Service Key parece incorreta. Deve começar com 'eyJ'")
      return
    }

    console.log("✅ Formato das chaves: OK")

    // Criar arquivo .env
    const envContent = `# Configuração Supabase
NEXT_PUBLIC_SUPABASE_URL=${url}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}
SUPABASE_SERVICE_ROLE_KEY=${serviceKey}
NEXT_PUBLIC_APP_URL=http://localhost:3000
`

    require("fs").writeFileSync(".env.local", envContent)
    console.log("✅ Arquivo .env.local criado!")

    console.log("\n🎉 TESTE CONCLUÍDO!")
    console.log("✅ Suas chaves parecem corretas")
    console.log("✅ Arquivo de configuração criado")
    console.log("\n🚀 Agora você pode testar o projeto:")
    console.log("npm run dev")
  } catch (error) {
    console.log("❌ Erro:", error.message)
  } finally {
    rl.close()
  }
}

testSupabase()
