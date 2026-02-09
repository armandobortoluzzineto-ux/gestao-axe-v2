"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, Activity, Home } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [organizationName, setOrganizationName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const loadOrganization = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Buscar perfil para obter organization_id
      const { data: profile } = await supabase
        .from("profiles")
        .select("organization_id")
        .eq("id", user.id)
        .single();

      if (profile?.organization_id) {
        const { data: org } = await supabase
          .from("organizations")
          .select("name")
          .eq("id", profile.organization_id)
          .single();
        if (org) {
          setOrganizationName(org.name);
        }
      }
      setLoading(false);
    };
    loadOrganization();
  }, [supabase]);

  return (
    <div className="p-6">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Home className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-serif text-4xl font-bold text-foreground">
              {loading ? "Carregando..." : `Boas‑vindas de volta!`}
            </h1>
            <p className="font-sans text-muted-foreground mt-2 text-lg">
              {organizationName ? (
                <>
                  Você está gerenciando o terreiro <strong className="text-primary font-semibold">{organizationName}</strong>.
                </>
              ) : (
                "Aqui está um resumo da sua comunidade. Use o menu lateral para navegar."
              )}
            </p>
          </div>
        </div>
        {organizationName && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Home className="h-4 w-4" />
            Terreiro: {organizationName}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold font-sans text-foreground">Total de Membros</CardTitle>
            <Users className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">0</div>
            <p className="text-sm text-muted-foreground mt-2">
              Nenhum membro cadastrado ainda.
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <button className="text-sm font-medium text-primary hover:underline">
                Cadastrar primeiro membro →
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold font-sans text-foreground">Próximo Evento</CardTitle>
            <Calendar className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">Nenhum</div>
            <p className="text-sm text-muted-foreground mt-2">
              Agende um evento na página de Eventos.
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <button className="text-sm font-medium text-accent hover:underline">
                Criar evento →
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold font-sans text-foreground">Saldo em Caixa</CardTitle>
            <DollarSign className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">R$ 0,00</div>
            <p className="text-sm text-muted-foreground mt-2">
              Atualizado em tempo real.
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <button className="text-sm font-medium text-primary hover:underline">
                Ver extrato →
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="font-serif text-2xl font-bold text-foreground">Atividade Recente</CardTitle>
            <CardDescription className="font-sans text-muted-foreground">
              Suas últimas ações no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-5 p-4 rounded-xl bg-muted/50 border border-border hover:bg-muted transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Nenhuma atividade registrada.</p>
                  <p className="text-sm text-muted-foreground">
                    Comece cadastrando membros ou eventos para ver atividades aqui.
                  </p>
                </div>
              </div>
              <div className="text-center py-6 text-muted-foreground font-sans">
                <p>O dashboard será preenchido conforme você usar o sistema.</p>
                <p className="text-sm mt-2">Explore as funcionalidades no menu lateral.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}