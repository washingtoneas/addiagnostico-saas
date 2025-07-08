# ✅ CHECKLIST SUPABASE - ACOMPANHE SEU PROGRESSO

## 🎯 **ETAPA 1: CRIAR CONTA E PROJETO**

### **Criar Conta**
- [ ] Acessei https://supabase.com
- [ ] Cliquei em "Start your project" ou "Sign Up"
- [ ] Preenchi email e senha
- [ ] Confirmei email na caixa de entrada
- [ ] Fiz login com sucesso

### **Criar Projeto**
- [ ] Cliquei em "New project"
- [ ] Nome do projeto: `addiagnostico-pro`
- [ ] Senha do banco anotada: `________________`
- [ ] Região: South America (São Paulo)
- [ ] Plano: Free
- [ ] Cliquei "Create new project"
- [ ] Aguardei criação (2-4 minutos)
- [ ] Vejo dashboard do projeto

---

## 🎯 **ETAPA 2: EXECUTAR SCRIPTS SQL**

### **Script 1 - Criar Tabelas**
- [ ] Cliquei em "SQL Editor" no menu lateral
- [ ] Copiei conteúdo de `scripts/001-create-tables.sql`
- [ ] Colei no editor (apaguei código existente)
- [ ] Cliquei "RUN"
- [ ] Vi mensagem de sucesso (verde)

### **Script 2 - Dados Demo**
- [ ] Apaguei código anterior
- [ ] Copiei conteúdo de `scripts/002-insert-demo-data.sql`
- [ ] Colei no editor
- [ ] Cliquei "RUN"
- [ ] Vi mensagem "2 rows affected" ou similar

### **Script 3 - Admin**
- [ ] Apaguei código anterior
- [ ] Copiei conteúdo de `scripts/005-final-admin-setup.sql`
- [ ] Colei no editor
- [ ] Cliquei "RUN"
- [ ] Vi tabela com dados do admin criado

---

## 🎯 **ETAPA 3: VERIFICAR TABELAS**

### **Verificação Visual**
- [ ] Cliquei em "Table Editor" no menu lateral
- [ ] Vejo tabela "users" na lista
- [ ] Vejo tabela "payments" na lista
- [ ] Vejo tabela "campaigns" na lista
- [ ] Cliquei na tabela "users"
- [ ] Vejo registro com email "washington.eas@gmail.com"
- [ ] Campo "has_access" = true
- [ ] Campo "password_hash" preenchido

---

## 🎯 **ETAPA 4: ANOTAR CREDENCIAIS**

### **Acessar Configurações**
- [ ] Cliquei em "Settings" no menu lateral
- [ ] Cliquei em "API" no submenu
- [ ] Vejo página com credenciais

### **Project URL**
- [ ] Encontrei seção "Project URL"
- [ ] Copiei URL completa
- [ ] Anotei: `https://________________.supabase.co`

### **Anon Key**
- [ ] Encontrei seção "Project API keys"
- [ ] Encontrei "anon public"
- [ ] Cliquei no ícone copiar
- [ ] Anotei: `eyJhbGciOi________________`

### **Service Role Key**
- [ ] Na mesma seção "Project API keys"
- [ ] Encontrei "service_role secret"
- [ ] Cliquei no ícone copiar
- [ ] Anotei: `eyJhbGciOi________________`

---

## 🎯 **ETAPA 5: TESTE FINAL**

### **Executar Verificação**
- [ ] Executei: `node scripts/verify-supabase.js`
- [ ] Inseri Project URL
- [ ] Inseri Anon Key
- [ ] Inseri Service Role Key
- [ ] Todos os testes passaram (✅)
- [ ] Arquivo .env.local foi criado

---

## 📋 **MINHAS CREDENCIAIS** (anote aqui)

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://________________.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi________________
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi________________
\`\`\`

**Senha do Banco:** `________________`

---

## ✅ **STATUS FINAL**

- [ ] ✅ **TUDO CONFIGURADO!** Posso prosseguir para Parte 2
- [ ] ❌ **ALGO DEU ERRADO** - Preciso revisar os passos

---

## 🆘 **SE ALGO DEU ERRADO**

### **Não vejo as tabelas**
1. Atualize a página (F5)
2. Execute os scripts SQL novamente
3. Verifique se copiou o código completo

### **Erro ao executar SQL**
1. Apague todo código do editor
2. Copie novamente o script
3. Verifique conexão com internet

### **Não encontro as credenciais**
1. Vá em Settings > API
2. Aguarde alguns segundos carregar
3. Procure por "Project URL" e "Project API keys"

### **Admin não aparece**
1. Execute novamente o script 3
2. Verifique na tabela "users"
3. Procure por "washington.eas@gmail.com"

---

**🎯 QUANDO TODOS OS ✅ ESTIVEREM MARCADOS, VOCÊ PODE PROSSEGUIR!**
\`\`\`

Agora vou atualizar o package.json com o novo script:
