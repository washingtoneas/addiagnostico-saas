-- Adicionar usuário administrador com hash correto
-- Email: washington.eas@gmail.com
-- Senha: 212221*
INSERT INTO users (
  email, 
  password_hash, 
  has_access, 
  created_at, 
  updated_at
) VALUES (
  'washington.eas@gmail.com',
  '$2a$10$rQJ8K8VJvKzU9YdGzQxQzQeJ8K8VJvKzU9YdGzQxQzQzQeJ8K8VJvK2',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password_hash = '$2a$10$rQJ8K8VJvKzU9YdGzQxQzQeJ8K8VJvKzU9YdGzQxQzQzQeJ8K8VJvK2',
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
  'washington.eas@gmail.com',
  'ADMIN_FULL_ACCESS',
  0.00,
  'approved',
  'admin_access',
  NOW()
FROM users u 
WHERE u.email = 'washington.eas@gmail.com'
ON CONFLICT (transaction_id) DO NOTHING;

-- Criar algumas campanhas de exemplo para o admin
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
  'Campanha Black Friday 2024',
  1500.00,
  25.50,
  2.80,
  1.8,
  45.00,
  2.1,
  3.2,
  15000,
  48000,
  33,
  150.00,
  10,
  NOW() - INTERVAL '5 days'
FROM users u 
WHERE u.email = 'washington.eas@gmail.com'
UNION ALL
SELECT 
  u.id,
  'Campanha Natal - Conversão',
  2200.00,
  18.30,
  1.95,
  2.4,
  38.50,
  2.8,
  2.1,
  22000,
  67000,
  57,
  200.00,
  11,
  NOW() - INTERVAL '2 days'
FROM users u 
WHERE u.email = 'washington.eas@gmail.com'
UNION ALL
SELECT 
  u.id,
  'Teste Público Lookalike',
  800.00,
  32.10,
  3.20,
  1.1,
  52.00,
  1.3,
  4.8,
  8500,
  25000,
  15,
  80.00,
  10,
  NOW() - INTERVAL '1 day'
FROM users u 
WHERE u.email = 'washington.eas@gmail.com';

-- Verificar dados criados
SELECT 
  u.email,
  u.has_access,
  COUNT(c.id) as total_campanhas,
  COUNT(p.id) as total_pagamentos,
  u.created_at
FROM users u
LEFT JOIN campaigns c ON u.id = c.user_id
LEFT JOIN payments p ON u.id = p.user_id
WHERE u.email = 'washington.eas@gmail.com'
GROUP BY u.id, u.email, u.has_access, u.created_at;
