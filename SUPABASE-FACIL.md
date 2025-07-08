# 🚀 SUPABASE EM 5 MINUTOS - SUPER FÁCIL!

## 🎯 **VAMOS FAZER JUNTOS - PASSO A PASSO**

### **PASSO 1: ABRIR O SUPABASE (30 segundos)**

1. **Abra uma nova aba no seu navegador**
2. **Digite exatamente:** `supabase.com`
3. **Aperte Enter**
4. **Você vai ver uma página verde/preta com o logo do Supabase**

---

### **PASSO 2: CRIAR CONTA (1 minuto)**

**Se você NÃO tem conta:**
1. **Clique no botão verde grande** que diz **"Start your project"**
2. **Preencha:**
   - **Email:** seu-email@gmail.com
   - **Senha:** uma senha que você lembra
3. **Clique "Sign Up"**
4. **Vá no seu email e clique no link de confirmação**

**Se você JÁ tem conta:**
1. **Clique "Sign In"** (canto superior direito)
2. **Digite seu email e senha**

---

### **PASSO 3: CRIAR O PROJETO (1 minuto)**

1. **Você vai ver uma tela com "Your projects"**
2. **Clique no botão verde "New project"**
3. **Preencha EXATAMENTE assim:**
   - **Project name:** `addiagnostico`
   - **Database Password:** `MinhaSenh@123` (ou outra senha forte)
   - **Region:** Escolha `South America`
4. **Clique "Create new project"**
5. **AGUARDE 2-3 minutos** (não feche a aba!)

---

### **PASSO 4: EXECUTAR OS CÓDIGOS (2 minutos)**

**4.1 - Abrir o Editor:**
1. **No menu da esquerda, clique em "SQL Editor"**
2. **Você vai ver uma tela branca grande para escrever código**

**4.2 - Primeiro Código:**
1. **COPIE** este código completo:

\`\`\`sql
-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  has_access BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Criar tabela de pagamentos
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  transaction_id VARCHAR(255) UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'pix',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de campanhas
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  valor_gasto DECIMAL(10,2),
  cpm DECIMAL(10,2),
  cpc DECIMAL(10,2),
  ctr DECIMAL(5,2),
  cpa DECIMAL(10,2),
  roas DECIMAL(5,2),
  frequencia DECIMAL(5,2),
  alcance INTEGER,
  impressoes INTEGER,
  vendas INTEGER,
  orcamento_diario DECIMAL(10,2),
  duracao_campanha INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

2. **COLE** na área branca do SQL Editor
3. **Clique no botão azul "RUN"** (canto inferior direito)
4. **Deve aparecer uma mensagem verde de sucesso**

**4.3 - Segundo Código:**
1. **APAGUE** todo o código anterior
2. **COPIE** este código:

\`\`\`sql
-- Criar usuário admin
INSERT INTO users (
  email, 
  password_hash, 
  has_access, 
  created_at, 
  updated_at
) VALUES (
  'washington.eas@gmail.com',
  '$2a$10$rQJ8K8VJvKzU9YdGzQxQzQeJ8K8VJvKzU9YdGzQxQzQzQeJ8K8VJvK',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password_hash = '$2a$10$rQJ8K8VJvKzU9YdGzQxQzQeJ8K8VJvKzU9YdGzQxQzQzQeJ8K8VJvK',
  has_access = true,
  updated_at = NOW();

-- Criar pagamento demo
INSERT INTO payments (
  email,
  transaction_id,
  amount,
  status,
  payment_method,
  created_at
) VALUES (
  'washington.eas@gmail.com',
  'ADMIN_ACCESS_001',
  0.00,
  'approved',
  'admin',
  NOW()
) ON CONFLICT (transaction_id) DO NOTHING;
\`\`\`

3. **COLE** no editor
4. **Clique "RUN"**
5. **Deve aparecer mensagem de sucesso**

---

### **PASSO 5: PEGAR AS CHAVES (1 minuto)**

1. **No menu da esquerda, clique em "Settings"**
2. **Clique em "API"**
3. **Você vai ver suas chaves. COPIE e ANOTE:**

**Project URL:** (algo como `https://abc123.supabase.co`)
**Anon Key:** (começa com `eyJhbGciOi...`)
**Service Role Key:** (também começa com `eyJhbGciOi...`)

---

## ✅ **PRONTO! SUPABASE CONFIGURADO!**

**Agora você tem:**
- ✅ Projeto criado
- ✅ Tabelas criadas
- ✅ Admin configurado
- ✅ Chaves anotadas

---

## 🆘 **SE ALGO DEU ERRADO:**

### **❌ Não consigo criar conta**
- Tente outro email
- Verifique se confirmou o email
- Tente em navegador privado

### **❌ Erro ao executar código SQL**
- Apague tudo do editor
- Copie o código novamente
- Verifique se copiou completo

### **❌ Não vejo as chaves**
- Clique em Settings → API
- Aguarde carregar
- Atualize a página

---

**🎯 ME DIGA ONDE VOCÊ TRAVOU QUE EU TE AJUDO!**
\`\`\`

Agora vou criar um script super simples para testar:
