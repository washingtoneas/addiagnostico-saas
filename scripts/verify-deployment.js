const https = require("https")

async function verifyDeployment(baseUrl) {
  console.log("🔍 Verificando deployment...\n")

  const endpoints = [
    { path: "/", name: "Homepage" },
    { path: "/login", name: "Login Page" },
    { path: "/diagnostico", name: "Diagnostic Form" },
    { path: "/api/auth/login", name: "Login API", method: "POST" },
    { path: "/api/webhook/cakto", name: "Webhook API", method: "POST" },
    { path: "/api/test-admin", name: "Admin Test API" },
  ]

  for (const endpoint of endpoints) {
    try {
      const url = `${baseUrl}${endpoint.path}`
      console.log(`Testing: ${endpoint.name}`)
      console.log(`URL: ${url}`)

      // Fazer requisição simples
      const response = await fetch(url, {
        method: endpoint.method || "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok || response.status === 405) {
        console.log(`✅ ${endpoint.name} - OK`)
      } else {
        console.log(`⚠️ ${endpoint.name} - Status: ${response.status}`)
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name} - Error: ${error.message}`)
    }
    console.log("---")
  }

  console.log("\n🎯 Verificação concluída!")
  console.log("Se todos os endpoints estão OK, seu site está funcionando!")
}

// Usar com: node scripts/verify-deployment.js https://seu-site.vercel.app
const url = process.argv[2] || "http://localhost:3000"
verifyDeployment(url)
