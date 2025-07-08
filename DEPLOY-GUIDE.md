# 🚀 GUIA COMPLETO DE DEPLOY - VERCEL

## 📋 PRÉ-REQUISITOS

- ✅ Conta no GitHub
- ✅ Conta no Supabase
- ✅ Conta na Vercel
- ✅ Conta na Cakto

---

## 🎯 PASSO 1: CONFIGURAR SUPABASE

### 1.1 Criar Projeto
1. Acesse [supabase.com](https://supabase.com)
2. Clique "New Project"
3. Escolha nome: `addiagnostico-pro`
4. Defina senha forte
5. Aguarde criação (2-3 minutos)

### 1.2 Executar Scripts SQL
Na aba "SQL Editor" do Supabase, execute na ordem:

\`\`\`sql
-- 1. Criar tabelas
-- Cole o conteúdo de: scripts/001-create-tables.sql

-- 2. Dados demo
-- Cole o conteúdo de: scripts/002-insert-demo-data.sql

-- 3. Admin
-- Cole o conteúdo de: scripts/005-final-admin-setup.sql
\`\`\`

### 1.3 Anotar Credenciais
Na aba "Settings > API":
- ✅ **Project URL:** `https://xxx.supabase.co`
- ✅ **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- ✅ **Service Role Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 🎯 PASSO 2: PREPARAR CÓDIGO

### 2.1 Subir para GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial commit - AdDiagnóstico PRO"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/addiagnostico-pro.git
git push -u origin main
\`\`\`

### 2.2 Verificar Arquivos
Execute: `npm run deploy:setup`

---

## 🎯 PASSO 3: DEPLOY NA VERCEL

### 3.1 Conectar GitHub
1. Acesse [vercel.com](https://vercel.com)
2. Clique "New Project"
3. Conecte GitHub
4. Selecione repositório `addiagnostico-pro`

### 3.2 Configurar Deploy
- **Framework:** Next.js (detectado automaticamente)
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

### 3.3 Variáveis de Ambiente
Adicione no painel da Vercel:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
NEXT_PUBLIC_APP_URL=https://seu-site.vercel.app
\`\`\`

### 3.4 Deploy
1. Clique "Deploy"
2. Aguarde build (2-3 minutos)
3. ✅ Site online!

---

## 🎯 PASSO 4: CONFIGURAR CAKTO

### 4.1 Criar Produto
1. Acesse painel Cakto
2. Criar novo produto:
   - **Nome:** AdDiagnóstico PRO - Acesso Vitalício
   - **Preço:** R$ 19,90
   - **Método:** Pix
   - **Descrição:** Relatório completo de campanhas Facebook Ads

### 4.2 Configurar Webhook
- **URL:** `https://seu-site.vercel.app/api/webhook/cakto`
- **Método:** POST
- **Eventos:** payment.approved, payment.paid

### 4.3 Testar Webhook
Use ferramenta como Postman ou curl:
\`\`\`bash
curl -X POST https://seu-site.vercel.app/api/webhook/cakto \
  -H "Content-Type: application/json" \
  -d '{
    "status": "approved",
    "customer_email": "teste@exemplo.com",
    "transaction_id": "TEST_123",
    "amount": "19.90"
  }'
\`\`\`

---

## 🎯 PASSO 5: TESTES FINAIS

### 5.1 Testar Admin
1. Acesse: `https://seu-site.vercel.app/login`
2. Login:
   - Email: `washington.eas@gmail.com`
   - Senha: `212221*`
3. ✅ Deve acessar o painel

### 5.2 Testar Fluxo Completo
1. **Homepage:** Verificar design e links
2. **Diagnóstico:** Preencher formulário
3. **Relatório Parcial:** Ver análise gratuita
4. **Pagamento:** Testar link Cakto
5. **Webhook:** Simular pagamento aprovado
6. **Painel:** Verificar acesso liberado

### 5.3 Verificar APIs
Execute: `npm run deploy:verify https://seu-site.vercel.app`

---

## 🎯 PASSO 6: CONFIGURAÇÕES FINAIS

### 6.1 Domínio Personalizado (Opcional)
1. Compre domínio (ex: addiagnostico.com.br)
2. Na Vercel: Settings > Domains
3. Adicione domínio
4. Configure DNS

### 6.2 Analytics
1. Vercel Analytics (gratuito)
2. Google Analytics (opcional)
3. Hotjar (opcional)

### 6.3 Monitoramento
- **Uptime:** UptimeRobot
- **Errors:** Sentry
- **Performance:** Vercel Analytics

---

## ✅ CHECKLIST FINAL

- [ ] ✅ Supabase configurado
- [ ] ✅ Código no GitHub
- [ ] ✅ Deploy na Vercel
- [ ] ✅ Variáveis de ambiente
- [ ] ✅ Cakto configurado
- [ ] ✅ Webhook funcionando
- [ ] ✅ Admin login OK
- [ ] ✅ Fluxo completo testado
- [ ] ✅ Domínio configurado
- [ ] ✅ Analytics ativo

---

## 🆘 TROUBLESHOOTING

### Build Error
\`\`\`bash
# Limpar cache
rm -rf .next node_modules
npm install
npm run build
\`\`\`

### API Error
- Verificar variáveis de ambiente
- Checar logs na Vercel
- Testar endpoints individualmente

### Webhook Error
- Verificar URL na Cakto
- Testar com curl
- Checar logs da API

### Database Error
- Verificar credenciais Supabase
- Re-executar scripts SQL
- Checar permissões

---

**🎉 PARABÉNS! SEU SITE ESTÁ ONLINE!**

Agora você pode começar a vender e receber pagamentos automaticamente!
