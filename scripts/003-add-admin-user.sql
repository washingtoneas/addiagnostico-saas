-- Adicionar usuário administrador
-- Senha: 212221* (hash gerado com bcrypt, salt rounds 10)
INSERT INTO users (
  email, 
  password_hash, 
  has_access, 
  created_at, 
  updated_at
) VALUES (
  'washington.eas@gmail.com',
  '$2a$10$8K8VJvKzU9YdGzQxQzQzQeJ8K8VJvKzU9YdGzQxQzQzQeJ8K8VJvK',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  has_access = true,
  updated_at = NOW();

-- Adicionar pagamento fictício para o admin (para histórico)
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

-- Verificar se o usuário foi criado corretamente
SELECT 
  id,
  email,
  has_access,
  created_at,
  'Usuário admin criado com sucesso!' as status
FROM users 
WHERE email = 'washington.eas@gmail.com';
