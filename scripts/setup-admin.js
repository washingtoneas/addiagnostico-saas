const bcrypt = require("bcryptjs")

async function setupAdmin() {
  const adminEmail = "washington.eas@gmail.com"
  const adminPassword = "212221*"

  console.log("🔐 Configurando usuário administrador...")
  console.log("📧 Email:", adminEmail)
  console.log("🔑 Senha:", adminPassword)

  try {
    // Gerar hash da senha
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds)

    console.log("\n✅ Hash da senha gerado:")
    console.log(passwordHash)

    // Verificar se o hash está correto
    const isValid = await bcrypt.compare(adminPassword, passwordHash)
    console.log("\n🔍 Verificação do hash:", isValid ? "✅ VÁLIDO" : "❌ INVÁLIDO")

    // SQL para inserir no banco
    console.log("\n📝 Execute este SQL no seu Supabase:")
    console.log("----------------------------------------")
    console.log(`
-- Adicionar usuário administrador
INSERT INTO users (
  email, 
  password_hash, 
  has_access, 
  created_at, 
  updated_at
) VALUES (
  '${adminEmail}',
  '${passwordHash}',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  has_access = true,
  updated_at = NOW();

-- Adicionar pagamento de acesso admin
INSERT INTO payments (
  user_id,
  email,
  transaction_id,
  amount,
  status,
  payment_method,
  created_at
) 
SELECT 
  u.id,
  '${adminEmail}',
  'ADMIN_FULL_ACCESS_${Date.now()}',
  0.00,
  'approved',
  'admin_access',
  NOW()
FROM users u 
WHERE u.email = '${adminEmail}'
ON CONFLICT (transaction_id) DO NOTHING;
    `)
    console.log("----------------------------------------")

    console.log("\n🎉 Configuração concluída!")
    console.log("👤 Agora você pode fazer login com:")
    console.log("📧 Email: washington.eas@gmail.com")
    console.log("🔑 Senha: 212221*")
  } catch (error) {
    console.error("❌ Erro ao configurar admin:", error)
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  setupAdmin()
}

module.exports = { setupAdmin }
