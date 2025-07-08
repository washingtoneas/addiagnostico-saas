# 🆘 PROBLEMAS COMUNS NO SUPABASE

## ❌ **"NÃO CONSIGO ACESSAR O SITE"**

### **Soluções:**
1. **Verifique a URL:** Digite `supabase.com` (sem www)
2. **Limpe o cache:** Ctrl+F5 ou Cmd+Shift+R
3. **Tente outro navegador:** Chrome, Firefox, Edge
4. **Desative VPN** se estiver usando

---

## ❌ **"NÃO CONSIGO CRIAR CONTA"**

### **Soluções:**
1. **Use email diferente:** Gmail, Outlook, etc.
2. **Verifique spam:** Procure email de confirmação
3. **Senha forte:** Mínimo 8 caracteres, números e símbolos
4. **Tente navegador privado/anônimo**

---

## ❌ **"ERRO AO CRIAR PROJETO"**

### **Soluções:**
1. **Nome diferente:** `addiagnostico2024` ou `meu-projeto-ads`
2. **Aguarde mais:** Pode demorar até 5 minutos
3. **Recarregue a página** e tente novamente
4. **Verifique conexão** com internet

---

## ❌ **"ERRO AO EXECUTAR SQL"**

### **Soluções:**
1. **Copie código completo:**
   - Selecione TUDO (Ctrl+A no código)
   - Copie (Ctrl+C)
   - Cole no editor (Ctrl+V)

2. **Apague código anterior:**
   - Selecione tudo no editor (Ctrl+A)
   - Delete
   - Cole o novo código

3. **Verifique caracteres especiais:**
   - Não deve ter aspas "curvas"
   - Só aspas "retas"

---

## ❌ **"NÃO VEJO AS TABELAS"**

### **Soluções:**
1. **Atualize a página:** F5
2. **Clique em "Table Editor"** no menu esquerdo
3. **Execute os códigos SQL novamente**
4. **Aguarde alguns segundos** para carregar

---

## ❌ **"NÃO ENCONTRO AS CHAVES"**

### **Onde encontrar:**
1. **Menu esquerdo:** Settings
2. **Submenu:** API
3. **Procure por:**
   - "Project URL" 
   - "Project API keys"

### **Se não aparecer:**
1. **Aguarde carregar** (pode demorar)
2. **Atualize a página**
3. **Verifique se o projeto foi criado**

---

## ❌ **"CHAVES NÃO FUNCIONAM"**

### **Verificações:**
1. **Project URL deve:**
   - Começar com `https://`
   - Terminar com `.supabase.co`
   - Exemplo: `https://abc123.supabase.co`

2. **Anon Key deve:**
   - Começar com `eyJ`
   - Ser bem longa (centenas de caracteres)

3. **Service Key deve:**
   - Começar com `eyJ`
   - Ser diferente da Anon Key

---

## 🔧 **TESTE RÁPIDO**

Execute este comando para testar:
\`\`\`bash
npm run test:supabase
\`\`\`

Ou use o teste manual:
\`\`\`bash
node scripts/test-supabase-simple.js
\`\`\`

---

## 🆘 **AINDA COM PROBLEMA?**

### **Me diga EXATAMENTE:**
1. **Em que passo você travou?**
2. **Qual mensagem de erro aparece?**
3. **O que você vê na tela?**
4. **Qual navegador está usando?**

### **Envie print ou descreva:**
- A tela que você está vendo
- A mensagem de erro completa
- O que acontece quando clica

---

## 🎯 **ALTERNATIVA RÁPIDA**

Se nada funcionar, posso:
1. **Criar o projeto para você** (me passe um email)
2. **Fazer uma videochamada** para resolver junto
3. **Usar outro banco** (mais simples)

**💬 ME FALE ONDE VOCÊ TRAVOU!**
\`\`\`

Agora vou atualizar o package.json com o teste simples:
