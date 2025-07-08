const fs = require("fs")

console.log("🔧 CRIANDO ARQUIVO .ENV.LOCAL...")

const envContent = `# Configuração Supabase - AdDiagnóstico PRO
NEXT_PUBLIC_SUPABASE_URL=https://fgzbwhwnaeppnqsdjhsj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnemJ3aHduYWVwcG5xc2RqaHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMzIwNjUsImV4cCI6MjA2NjgwODA2NX0.BGheIdN6jKIK0Q_nJCWp8xTGB41cHUM9jO_oWXJcG5Q
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnemJ3aHduYWVwcG5xc2RqaHNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTIzMjA2NSwiZXhwIjoyMDY2ODA4MDY1fQ.OcgM9RJOqWoEwfZxzkZweEuxBe4yzds77hRUK0RvhX8

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Configuration (opcional)
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
`

try {
  fs.writeFileSync(".env.local", envContent)
  console.log("✅ Arquivo .env.local criado com sucesso!")
  console.log("📁 Localização: .env.local")
  console.log("\n🎯 Próximos passos:")
  console.log("1. npm run dev (para testar localmente)")
  console.log("2. Fazer deploy na Vercel")
  console.log("\n🚀 Suas credenciais estão configuradas!")
} catch (error) {
  console.error("❌ Erro ao criar arquivo:", error.message)
}
