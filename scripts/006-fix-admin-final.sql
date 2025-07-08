-- DELETAR USUÁRIO ADMIN EXISTENTE (se houver problemas)
DELETE FROM campaigns WHERE user_id IN (SELECT id FROM users WHERE email = 'washington.eas@gmail.com');
DELETE FROM payments WHERE email = 'washington.eas@gmail.com';
DELETE FROM users WHERE email = 'washington.eas@gmail.com';

-- CRIAR USUÁRIO ADMIN DO ZERO
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
);

-- VERIFICAR SE FOI CRIADO
SELECT 
  id,
  email,
  has_access,
  CASE 
    WHEN password_hash IS NOT NULL THEN 'Senha OK'
    ELSE 'SEM SENHA'
  END as status_senha,
  created_at
FROM users 
WHERE email = 'washington.eas@gmail.com';

-- CRIAR PAGAMENTO ADMIN
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
  'ADMIN_FIXED_2024',
  0.00,
  'approved',
  'admin_access',
  NOW()
FROM users u 
WHERE u.email = 'washington.eas@gmail.com';

-- RESULTADO FINAL
SELECT 
  '🎉 ADMIN CONFIGURADO!' as status,
  u.email,
  u.has_access,
  COUNT(p.id) as pagamentos
FROM users u
LEFT JOIN payments p ON u.id = p.user_id
WHERE u.email = 'washington.eas@gmail.com'
GROUP BY u.id, u.email, u.has_access;
