const bcrypt = require("bcryptjs")

async function generateAdminHash() {
  const password = "212221*"
  const saltRounds = 10

  try {
    const hash = await bcrypt.hash(password, saltRounds)
    console.log("🔐 Hash gerado para a senha admin:")
    console.log(hash)

    // Verificar se o hash está correto
    const isValid = await bcrypt.compare(password, hash)
    console.log("✅ Verificação do hash:", isValid ? "VÁLIDO" : "INVÁLIDO")

    return hash
  } catch (error) {
    console.error("❌ Erro ao gerar hash:", error)
  }
}

generateAdminHash()
