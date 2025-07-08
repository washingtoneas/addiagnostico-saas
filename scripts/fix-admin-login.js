const bcrypt = require("bcryptjs")

async function fixAdminLogin() {
  const adminEmail = "washington.eas@gmail.com"
  const adminPassword = "212221*"

  console.log("🔧 Corrigindo login do administrador...")
  console.log("📧 Email:", adminEmail)
  console.log("🔑 Senha:", adminPassword)

  try {
    // Gerar hash correto da senha
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds)

    console.log("\n✅ Hash correto da senha:")
    console.log(passwordHash)

    // Testar o hash
    const isValid = await bcrypt.compare(adminPassword, passwordHash)
    console.log("\n🔍 Teste do hash:", isValid ? "✅ VÁLIDO" : "❌ INVÁLIDO")

    // Gerar SQL para corrigir
    console.log("\n📝 Execute este SQL no Supabase para corrigir:")
    console.log("=".repeat(60))
    console.log(`
-- CORRIGIR LOGIN DO ADMIN
UPDATE users 
SET 
  password_hash = '${passwordHash}',
  has_access = true,
  updated_at = NOW()
WHERE email = '${adminEmail}';

-- Verificar se foi atualizado
SELECT 
  email,
  has_access,
  CASE 
    WHEN password_hash IS NOT NULL THEN '✅ Senha configurada'
    ELSE '❌ Sem senha'
  END as status_senha,
  updated_at
FROM users 
WHERE email = '${adminEmail}';
`)
    console.log("=".repeat(60))

    console.log("\n🎯 Após executar o SQL, teste o login:")
    console.log("📧 Email: washington.eas@gmail.com")
    console.log("🔑 Senha: 212221*")
  } catch (error) {
    console.error("❌ Erro:", error)
  }
}

fixAdminLogin()
