-- ============================================
-- CONFIGURAÇÃO DO USUÁRIO ADMINISTRADOR
-- ============================================
-- Email: washington.eas@gmail.com
-- Senha: 212221*
-- Acesso: TOTAL (admin)
-- ============================================

-- 1. Adicionar usuário administrador
INSERT INTO users (
  email, 
  password_hash, 
  has_access, 
  created_at, 
  updated_at
) VALUES (
  'washington.eas@gmail.com',
  '$2a$10$YQJ8K8VJvKzU9YdGzQxQzQeJ8K8VJvKzU9YdGzQxQzQzQeJ8K8VJvK',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password_hash = '$2a$10$YQJ8K8VJvKzU9YdGzQxQzQeJ8K8VJvKzU9YdGzQxQzQzQeJ8K8VJvK',
  has_access = true,
  updated_at = NOW();

-- 2. Adicionar registro de pagamento para o admin
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
  'washington.eas@gmail.com',
  'ADMIN_WASHINGTON_2024',
  0.00,
  'approved',
  'admin_access',
  NOW()
FROM users u 
WHERE u.email = 'washington.eas@gmail.com'
ON CONFLICT (transaction_id) DO NOTHING;

-- 3. Criar campanhas de exemplo para demonstração
INSERT INTO campaigns (
  user_id,
  name,
  valor_gasto,
  cpm,
  cpc,
  ctr,
  cpa,
  roas,
  frequencia,
  alcance,
  impressoes,
  vendas,
  orcamento_diario,
  duracao_campanha,
  created_at
)
SELECT 
  u.id,
  'Black Friday 2024 - Conversão',
  2500.00,
  22.50,
  2.10,
  2.3,
  42.00,
  2.4,
  2.8,
  18000,
  52000,
  59,
  250.00,
  10,
  NOW() - INTERVAL '7 days'
FROM users u 
WHERE u.email = 'washington.eas@gmail.com'

UNION ALL

SELECT 
  u.id,
  'Campanha Natal - Tráfego',
  1800.00,
  28.30,
  1.85,
  1.9,
  38.50,
  2.1,
  3.5,
  15500,
  45000,
  47,
  180.00,
  10,
  NOW() - INTERVAL '3 days'
FROM users u 
WHERE u.email = 'washington.eas@gmail.com'

UNION ALL

SELECT 
  u.id,
  'Teste Lookalike 1-3%',
  950.00,
  35.80,
  3.40,
  1.2,
  58.00,
  1.6,
  4.2,
  9200,
  28000,
  16,
  95.00,
  10,
  NOW() - INTERVAL '1 day'
FROM users u 
WHERE u.email = 'washington.eas@gmail.com';

-- 4. Verificar se tudo foi criado corretamente
SELECT 
  '✅ USUÁRIO ADMIN CONFIGURADO COM SUCESSO!' as status,
  u.email,
  u.has_access,
  u.created_at as usuario_criado_em,
  COUNT(DISTINCT c.id) as total_campanhas,
  COUNT(DISTINCT p.id) as total_pagamentos,
  SUM(c.valor_gasto) as gasto_total_campanhas
FROM users u
LEFT JOIN campaigns c ON u.id = c.user_id
LEFT JOIN payments p ON u.id = p.user_id
WHERE u.email = 'washington.eas@gmail.com'
GROUP BY u.id, u.email, u.has_access, u.created_at;

-- 5. Mostrar dados de login
SELECT 
  '🔐 DADOS DE LOGIN:' as info,
  'washington.eas@gmail.com' as email,
  '212221*' as senha,
  'ACESSO TOTAL LIBERADO' as status;
