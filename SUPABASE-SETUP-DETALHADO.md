# 🎯 PARTE 1: CONFIGURAÇÃO SUPABASE - GUIA ULTRA DETALHADO

## 📋 **ANTES DE COMEÇAR**
- ✅ Tenha um email válido
- ✅ Tenha uma senha forte em mente
- ✅ Abra uma aba nova no navegador
- ✅ Tempo estimado: 10-15 minutos

---

## 🚀 **PASSO 1.1: CRIAR CONTA NO SUPABASE**

### **1.1.1 - Acessar o Site**
1. Abra nova aba no navegador
2. Digite: `https://supabase.com`
3. Pressione Enter
4. Aguarde carregar (página verde/preta)

### **1.1.2 - Fazer Cadastro/Login**
1. **Se NÃO tem conta:**
   - Clique no botão **"Start your project"** (verde, no centro)
   - OU clique **"Sign Up"** (canto superior direito)
   - Preencha:
     - **Email:** seu-email@gmail.com
     - **Password:** senha-forte-123
   - Clique **"Sign Up"**
   - **IMPORTANTE:** Vá no seu email e clique no link de confirmação

2. **Se JÁ tem conta:**
   - Clique **"Sign In"** (canto superior direito)
   - Digite email e senha
   - Clique **"Sign In"**

### **1.1.3 - Verificar Dashboard**
Após login, você deve ver:
- Tela com título "Your projects"
- Botão verde "New project"
- Sidebar esquerda com menu

---

## 🚀 **PASSO 1.2: CRIAR PROJETO**

### **1.2.1 - Iniciar Novo Projeto**
1. Clique no botão **"New project"** (verde, grande)
2. Uma tela modal vai abrir com formulário

### **1.2.2 - Preencher Dados do Projeto**
**PREENCHA EXATAMENTE ASSIM:**

1. **Organization:** 
   - Deixe selecionado sua organização pessoal
   - (Geralmente seu nome ou email)

2. **Project name:** 
   - Digite: `addiagnostico-pro`
   - (sem espaços, só letras minúsculas e hífen)

3. **Database Password:**
   - Crie uma senha FORTE (anote ela!)
   - Exemplo: `MinhaSenh@123!`
   - **⚠️ ANOTE ESTA SENHA - VOCÊ VAI PRECISAR!**

4. **Region:**
   - Selecione: `South America (São Paulo)`
   - (Para melhor performance no Brasil)

5. **Pricing Plan:**
   - Deixe selecionado: **"Free"** (R$ 0/mês)

### **1.2.3 - Criar Projeto**
1. Clique no botão **"Create new project"** (verde)
2. Aguarde a criação (2-4 minutos)
3. Você verá uma tela de loading com progresso
4. **NÃO FECHE A ABA** durante este processo

### **1.2.4 - Confirmar Criação**
Quando terminar, você verá:
- Dashboard do projeto
- Menu lateral esquerdo
- Título "addiagnostico-pro" no topo
- Várias abas: Table Editor, SQL Editor, etc.

---

## 🚀 **PASSO 1.3: EXECUTAR SCRIPTS SQL**

### **1.3.1 - Acessar SQL Editor**
1. No menu lateral ESQUERDO, clique em **"SQL Editor"**
2. Você verá uma tela com editor de código
3. Área grande branca para escrever SQL

### **1.3.2 - Executar Script 1 - Criar Tabelas**
1. **COPIE** todo o conteúdo do arquivo `scripts/001-create-tables.sql`
2. **COLE** na área do SQL Editor (apague qualquer código que já estiver lá)
3. Clique no botão **"RUN"** (azul, canto inferior direito)
4. Aguarde execução (5-10 segundos)
5. **RESULTADO ESPERADO:** 
   - Mensagem verde: "Success. No rows returned"
   - OU lista de tabelas criadas

**⚠️ SE DEU ERRO:**
- Verifique se copiou o código completo
- Apague tudo e cole novamente
- Tente executar novamente

### **1.3.3 - Executar Script 2 - Dados Demo**
1. **APAGUE** todo o código do editor
2. **COPIE** todo o conteúdo do arquivo `scripts/002-insert-demo-data.sql`
3. **COLE** no SQL Editor
4. Clique **"RUN"**
5. **RESULTADO ESPERADO:**
   - Mensagem verde com "2 rows affected" ou similar

### **1.3.4 - Executar Script 3 - Admin**
1. **APAGUE** todo o código do editor
2. **COPIE** todo o conteúdo do arquivo `scripts/005-final-admin-setup.sql`
3. **COLE** no SQL Editor
4. Clique **"RUN"**
5. **RESULTADO ESPERADO:**
   - Mensagem verde
   - Tabela mostrando dados do admin criado

### **1.3.5 - Verificar Tabelas Criadas**
1. No menu lateral, clique em **"Table Editor"**
2. Você deve ver 3 tabelas:
   - **users** (com alguns registros)
   - **payments** (com alguns registros)
   - **campaigns** (vazia ou com dados demo)

**✅ SE VÊ AS 3 TABELAS = SUCESSO!**

---

## 🚀 **PASSO 1.4: ANOTAR CREDENCIAIS**

### **1.4.1 - Acessar Configurações**
1. No menu lateral, clique em **"Settings"** (ícone de engrenagem)
2. No submenu, clique em **"API"**
3. Você verá uma página com várias informações

### **1.4.2 - Copiar Project URL**
1. Procure a seção **"Project URL"**
2. Você verá algo como: `https://abcdefgh.supabase.co`
3. **COPIE** esta URL completa
4. **ANOTE** em um bloco de notas:
   \`\`\`
   SUPABASE_URL=https://abcdefgh.supabase.co
   \`\`\`

### **1.4.3 - Copiar Anon Key**
1. Procure a seção **"Project API keys"**
2. Encontre **"anon public"**
3. Clique no ícone de **"copiar"** ao lado
4. **ANOTE** no bloco de notas:
   \`\`\`
   ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   \`\`\`

### **1.4.4 - Copiar Service Role Key**
1. Na mesma seção **"Project API keys"**
2. Encontre **"service_role secret"**
3. **⚠️ CUIDADO:** Esta é a chave SECRETA
4. Clique no ícone de **"copiar"**
5. **ANOTE** no bloco de notas:
   \`\`\`
   SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   \`\`\`

### **1.4.5 - Formato Final das Credenciais**
Seu bloco de notas deve ter algo assim:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY...
\`\`\`

**⚠️ GUARDE ESTAS INFORMAÇÕES COM CUIDADO!**

---

## 🚀 **PASSO 1.5: TESTAR CONFIGURAÇÃO**

### **1.5.1 - Verificar Dados do Admin**
1. Volte para **"Table Editor"**
2. Clique na tabela **"users"**
3. Procure por linha com email: `washington.eas@gmail.com`
4. Verifique se `has_access` = `true`

### **1.5.2 - Verificar Estrutura**
Suas tabelas devem ter:

**Tabela `users`:**
- Colunas: id, email, password_hash, has_access, created_at, updated_at, last_login
- Pelo menos 1 registro (admin)

**Tabela `payments`:**
- Colunas: id, user_id, email, transaction_id, amount, status, payment_method, created_at
- Pelo menos 1 registro

**Tabela `campaigns`:**
- Colunas: id, user_id, name, valor_gasto, cpm, cpc, ctr, cpa, roas, frequencia, alcance, impressoes, vendas, orcamento_diario, duracao_campanha, created_at, updated_at
- Pode estar vazia

---

## ✅ **CHECKLIST FINAL - PARTE 1**

Marque cada item conforme completa:

- [ ] ✅ Conta Supabase criada
- [ ] ✅ Email confirmado
- [ ] ✅ Projeto "addiagnostico-pro" criado
- [ ] ✅ Script 1 executado (tabelas criadas)
- [ ] ✅ Script 2 executado (dados demo)
- [ ] ✅ Script 3 executado (admin criado)
- [ ] ✅ 3 tabelas visíveis no Table Editor
- [ ] ✅ Project URL anotada
- [ ] ✅ Anon Key anotada
- [ ] ✅ Service Role Key anotada
- [ ] ✅ Admin existe na tabela users

---

## 🆘 **PROBLEMAS COMUNS E SOLUÇÕES**

### **❌ "Failed to create project"**
**Solução:**
- Tente nome diferente: `addiagnostico-pro-2024`
- Verifique conexão com internet
- Tente em navegador diferente

### **❌ "SQL Error" ao executar scripts**
**Solução:**
1. Apague todo código do editor
2. Copie novamente o script completo
3. Verifique se não tem caracteres estranhos
4. Execute novamente

### **❌ "Permission denied"**
**Solução:**
- Confirme que está logado
- Verifique se o projeto foi criado corretamente
- Tente fazer logout e login novamente

### **❌ Não encontro as credenciais**
**Solução:**
1. Menu lateral → Settings
2. Submenu → API
3. Procure por "Project URL" e "Project API keys"
4. Se não aparecer, aguarde alguns minutos

### **❌ Tabelas não aparecem**
**Solução:**
1. Atualize a página (F5)
2. Clique em Table Editor novamente
3. Se ainda não aparecer, execute os scripts SQL novamente

---

## 🎯 **PRÓXIMO PASSO**

**✅ PARABÉNS! SUPABASE CONFIGURADO!**

Agora você pode prosseguir para:
**PARTE 2: Subir código para GitHub**

Suas credenciais estão prontas para usar na Vercel! 🚀
\`\`\`

Agora vou criar um script de verificação específico para o Supabase:
