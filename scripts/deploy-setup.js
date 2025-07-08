const fs = require("fs")
const path = require("path")

console.log("🚀 Preparando projeto para deploy na Vercel...\n")

// Verificar se os arquivos necessários existem
const requiredFiles = ["package.json", "next.config.js", "vercel.json", ".env.production"]

console.log("📋 Verificando arquivos necessários:")
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} - FALTANDO!`)
  }
})

// Verificar dependências
console.log("\n📦 Verificando dependências:")
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))
const requiredDeps = ["@supabase/supabase-js", "bcryptjs", "next", "react", "react-dom"]

requiredDeps.forEach((dep) => {
  if (packageJson.dependencies[dep]) {
    console.log(`✅ ${dep}`)
  } else {
    console.log(`❌ ${dep} - FALTANDO!`)
  }
})

console.log("\n🎯 Próximos passos:")
console.log("1. ✅ Arquivos preparados")
console.log("2. 🔧 Configure suas variáveis de ambiente no Supabase")
console.log("3. 🚀 Faça deploy na Vercel")
console.log("4. 🔗 Configure webhook na Cakto")
console.log("\n📖 Siga o guia completo no README!")
