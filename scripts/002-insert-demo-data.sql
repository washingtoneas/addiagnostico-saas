-- Inserir usuários de demonstração
INSERT INTO users (email, password_hash, has_access, created_at) VALUES
('demo@addiagnostico.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', true, NOW()),
('teste@exemplo.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', true, NOW())
ON CONFLICT (email) DO NOTHING;

-- Inserir pagamentos de demonstração
INSERT INTO payments (email, transaction_id, amount, status, created_at) VALUES
('demo@addiagnostico.com', 'DEMO_001', 19.90, 'approved', NOW()),
('teste@exemplo.com', 'DEMO_002', 19.90, 'approved', NOW())
ON CONFLICT (transaction_id) DO NOTHING;
