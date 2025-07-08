# 🎯 AdDiagnóstico PRO - Deploy na Vercel

Sistema completo de diagnóstico de campanhas Facebook Ads com pagamento via Pix.

## 🚀 Deploy Rápido na Vercel

### 1️⃣ **PREPARAR SUPABASE**

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Execute os scripts SQL na ordem:
   \`\`\`sql
   -- Execute na aba SQL do Supabase:
   scripts/001-create-tables.sql
   scripts/002-insert-demo-data.sql
   scripts/005-final-admin-setup.sql
   \`\`\`
4. Anote suas credenciais:
   - Project URL
   - Anon Key
   - Service Role Key

### 2️⃣ **DEPLOY NA VERCEL**

#### Opção A - Via GitHub (Recomendado)
1. Faça push do código para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique "New Project"
4. Importe seu repositório
5. Configure as variáveis de ambiente
6. Deploy automático!

#### Opção B - Via CLI
\`\`\`bash
npm i -g vercel
vercel login
vercel --prod
\`\`\`

### 3️⃣ **CONFIGURAR VARIÁVEIS DE AMBIENTE**

No painel da Vercel, adicione:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
NEXT_PUBLIC_APP_URL=https://seu-site.vercel.app
\`\`\`

### 4️⃣ **CONFIGURAR CAKTO**

1. Acesse seu painel Cakto
2. Configure o webhook:
   - URL: `https://seu-site.vercel.app/api/webhook/cakto`
   - Método: POST
3. Crie o produto:
   - Nome: AdDiagnóstico PRO
   - Preço: R$ 19,90
   - Método: Pix

### 5️⃣ **TESTAR TUDO**

1. **Admin Login:**
   - Email: washington.eas@gmail.com
   - Senha: 212221*

2. **Fluxo Completo:**
   - Diagnóstico gratuito
   - Pagamento via Pix
   - Acesso liberado automaticamente

## 🛠️ **Scripts Disponíveis**

\`\`\`bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm run start        # Iniciar produção
npm run admin:setup  # Configurar admin
npm run admin:fix    # Corrigir login admin
\`\`\`

## 🔧 **Estrutura do Projeto**

\`\`\`
├── app/
│   ├── api/           # APIs serverless
│   ├── login/         # Página de login
│   ├── painel/        # Dashboard admin
│   ├── diagnostico/   # Formulário
│   └── pagamento/     # Checkout
├── components/ui/     # Componentes UI
├── lib/              # Configurações
└── scripts/          # Scripts SQL
\`\`\`

## 🎯 **Funcionalidades**

- ✅ **Diagnóstico gratuito** de campanhas
- ✅ **Relatório completo** pago (R$ 19,90)
- ✅ **Pagamento via Pix** (Cakto)
- ✅ **Painel administrativo** completo
- ✅ **Sistema de usuários** com autenticação
- ✅ **Webhook automático** para liberação
- ✅ **Análise detalhada** com sugestões
- ✅ **Responsivo** para mobile

## 🆘 **Suporte**

Se tiver problemas:

1. **Verifique logs** na Vercel
2. **Teste endpoints** individualmente
3. **Confirme variáveis** de ambiente
4. **Execute scripts SQL** novamente

## 📊 **Monitoramento**

- **Vercel Analytics:** Tráfego e performance
- **Supabase Dashboard:** Banco de dados
- **Cakto Dashboard:** Pagamentos

---

**🎉 PROJETO PRONTO PARA PRODUÇÃO!**
\`\`\`

Vou criar um script para verificar se tudo está configurado corretamente:
