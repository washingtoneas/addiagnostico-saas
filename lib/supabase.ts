import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Cliente para server-side (com service role key para operações administrativas)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Tipos do banco de dados
export interface User {
  id: string
  email: string
  password_hash?: string
  has_access: boolean
  created_at: string
  updated_at: string
  last_login?: string
}

export interface Payment {
  id: string
  user_id?: string
  email: string
  transaction_id: string
  amount: number
  status: string
  payment_method: string
  created_at: string
}

export interface Campaign {
  id: string
  user_id: string
  name: string
  valor_gasto?: number
  cpm?: number
  cpc?: number
  ctr?: number
  cpa?: number
  roas?: number
  frequencia?: number
  alcance?: number
  impressoes?: number
  vendas?: number
  orcamento_diario?: number
  duracao_campanha?: number
  created_at: string
  updated_at: string
}
