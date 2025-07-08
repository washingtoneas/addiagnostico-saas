import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

// GET - Listar campanhas do usuário
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, message: "ID do usuário é obrigatório" }, { status: 400 })
    }

    const { data: campaigns, error } = await supabaseAdmin
      .from("campaigns")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      campaigns: campaigns || [],
    })
  } catch (error) {
    console.error("Erro ao buscar campanhas:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}

// POST - Criar nova campanha
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, ...campaignData } = body

    if (!userId) {
      return NextResponse.json({ success: false, message: "ID do usuário é obrigatório" }, { status: 400 })
    }

    // Validar campos obrigatórios
    const requiredFields = ["name", "valor_gasto", "cpm", "cpc", "ctr", "cpa", "roas", "frequencia"]
    const missingFields = requiredFields.filter((field) => !campaignData[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Campos obrigatórios faltando: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      )
    }

    const { data: campaign, error } = await supabaseAdmin
      .from("campaigns")
      .insert({
        user_id: userId,
        name: campaignData.name,
        valor_gasto: Number.parseFloat(campaignData.valor_gasto),
        cpm: Number.parseFloat(campaignData.cpm),
        cpc: Number.parseFloat(campaignData.cpc),
        ctr: Number.parseFloat(campaignData.ctr),
        cpa: Number.parseFloat(campaignData.cpa),
        roas: Number.parseFloat(campaignData.roas),
        frequencia: Number.parseFloat(campaignData.frequencia),
        alcance: campaignData.alcance ? Number.parseInt(campaignData.alcance) : null,
        impressoes: campaignData.impressoes ? Number.parseInt(campaignData.impressoes) : null,
        vendas: campaignData.vendas ? Number.parseInt(campaignData.vendas) : null,
        orcamento_diario: campaignData.orcamento_diario ? Number.parseFloat(campaignData.orcamento_diario) : null,
        duracao_campanha: campaignData.duracao_campanha ? Number.parseInt(campaignData.duracao_campanha) : null,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "Campanha criada com sucesso",
      campaign,
    })
  } catch (error) {
    console.error("Erro ao criar campanha:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
