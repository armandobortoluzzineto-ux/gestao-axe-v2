"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const [loading, setLoading] = useState(false);
  const [userFullName, setUserFullName] = useState("");
  const router = useRouter();
  const supabase = createClient();

  // Dados do formulário
  const [nomeTerreiro, setNomeTerreiro] = useState("");
  const [dirigente, setDirigente] = useState("");
  const [dataFundacao, setDataFundacao] = useState("");
  const [enderecoCompleto, setEnderecoCompleto] = useState("");

  // Carrega o nome do usuário logado para preencher o campo dirigente
  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.full_name) {
        setDirigente(user.user_metadata.full_name);
        setUserFullName(user.user_metadata.full_name);
      }
    };
    loadUser();
  }, [supabase.auth]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/[^a-z0-9]+/g, "-") // substitui não alfanuméricos por hífen
      .replace(/^-+|-+$/g, "") // remove hífens no início/fim
      .substring(0, 50);
  };

  const handleSubmit = async () => {
    // Validação
    if (!nomeTerreiro.trim()) {
      toast.error("Informe o nome do terreiro");
      return;
    }
    if (!dirigente.trim()) {
      toast.error("Informe o nome do dirigente");
      return;
    }
    if (!enderecoCompleto.trim()) {
      toast.error("Informe o endereço completo");
      return;
    }

    setLoading(true);
    try {
      // Verificar se o usuário está autenticado
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error("Usuário não autenticado. Faça login primeiro.");
      }

      // Gerar slug a partir do nome
      const slug = generateSlug(nomeTerreiro) || `terreiro-${Date.now()}`;

      // Converter data de fundação para formato ISO (YYYY-MM-DD) ou null
      const dataFundacaoISO = dataFundacao ? new Date(dataFundacao).toISOString().split('T')[0] : null;

      // Criar organização (terreiro) com as novas colunas
      const { data: org, error: orgError } = await supabase
        .from("organizations")
        .insert({
          name: nomeTerreiro,
          slug,
          dirigente,
          data_fundacao: dataFundacaoISO,
          endereco_completo: enderecoCompleto,
          // logo_url pode ser null (não temos imagem)
        })
        .select()
        .single();

      if (orgError) throw orgError;

      // O trigger handle_new_organization já atualiza o perfil do usuário
      // com organization_id e role = 'admin'. Não precisamos fazer manualmente.

      toast.success("Terreiro cadastrado com sucesso!");
      // Redirecionar para dashboard após breve delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Erro ao cadastrar terreiro:", error);
      // Extrair detalhes do erro do Supabase
      let errorMessage = "Erro desconhecido";
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.details) {
        errorMessage = error.details;
      } else if (error?.hint) {
        errorMessage = error.hint;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error);
      }
      console.error("Detalhes do erro:", { message: error?.message, details: error?.details, hint: error?.hint, code: error?.code });
      toast.error("Erro ao cadastrar terreiro: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-2 xs:p-3 sm:p-4 md:p-6">
      <Toaster richColors position="top-center" />
      <Card className="w-full max-w-md xs:max-w-lg sm:max-w-xl md:max-w-2xl shadow-2xl border-primary/20 dark:border-primary/30">
        <CardHeader className="space-y-1 p-3 sm:p-4 md:p-6">
          <CardTitle className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-center font-serif text-primary">
            Cadastro do Terreiro
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground text-xs xs:text-sm sm:text-base">
            Preencha as informações básicas do seu terreiro para começar a usar o Gestão Axé
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6">
          <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
            {/* Nome do Terreiro */}
            <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
              <Label htmlFor="nomeTerreiro" className="text-foreground text-xs xs:text-sm sm:text-base">
                Nome do Terreiro *
              </Label>
              <Input
                id="nomeTerreiro"
                placeholder="Ex: Ilê Axé Ayô"
                value={nomeTerreiro}
                onChange={(e) => setNomeTerreiro(e.target.value)}
                disabled={loading}
                className="text-xs xs:text-sm sm:text-base min-h-[44px]"
              />
              <p className="text-xs xs:text-sm text-muted-foreground pt-1">
                Nome público da casa (aparecerá no sistema)
              </p>
            </div>

            {/* Dirigente */}
            <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
              <Label htmlFor="dirigente" className="text-foreground text-xs xs:text-sm sm:text-base">
                Dirigente *
              </Label>
              <Input
                id="dirigente"
                placeholder="Ex: Pai João de Oxóssi"
                value={dirigente}
                readOnly
                className="bg-muted cursor-not-allowed text-xs xs:text-sm sm:text-base min-h-[44px]"
                disabled={loading}
              />
              <p className="text-xs xs:text-sm text-muted-foreground pt-1">
                Nome do Pai, Mãe ou Dirigente espiritual responsável (pré‑preenchido com seu nome)
                {userFullName && (
                  <span className="ml-1 text-primary font-semibold">({userFullName})</span>
                )}
              </p>
            </div>

            {/* Data de Fundação */}
            <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
              <Label htmlFor="dataFundacao" className="text-foreground text-xs xs:text-sm sm:text-base">
                Data de Fundação (opcional)
              </Label>
              <Input
                id="dataFundacao"
                type="date"
                value={dataFundacao}
                onChange={(e) => setDataFundacao(e.target.value)}
                disabled={loading}
                className="text-xs xs:text-sm sm:text-base min-h-[44px]"
              />
              <p className="text-xs xs:text-sm text-muted-foreground pt-1">
                Data em que o terreiro foi fundado
              </p>
            </div>

            {/* Endereço Completo */}
            <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
              <Label htmlFor="enderecoCompleto" className="text-foreground text-xs xs:text-sm sm:text-base">
                Endereço Completo *
              </Label>
              <Input
                id="enderecoCompleto"
                placeholder="Ex: Rua das Flores, 123, Bairro, Cidade - Estado, CEP"
                value={enderecoCompleto}
                onChange={(e) => setEnderecoCompleto(e.target.value)}
                disabled={loading}
                className="text-xs xs:text-sm sm:text-base min-h-[44px]"
              />
              <p className="text-xs xs:text-sm text-muted-foreground pt-1">
                Endereço físico completo do terreiro
              </p>
            </div>
          </div>

          {/* Resumo */}
          <div className="p-2.5 xs:p-3 sm:p-4 bg-primary/10 dark:bg-primary/20 rounded-lg mt-3 sm:mt-4">
            <h4 className="font-semibold text-primary dark:text-primary-foreground mb-1 sm:mb-2 text-xs xs:text-sm sm:text-base">Resumo</h4>
            <p className="text-xs xs:text-sm text-muted-foreground">
              Você está cadastrando o terreiro <strong>{nomeTerreiro || "(sem nome)"}</strong> sob a direção de <strong>{dirigente || "(sem dirigente)"}</strong>.
              {dataFundacao && ` Fundado em ${new Date(dataFundacao).toLocaleDateString('pt-BR')}.`}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 xs:gap-3 pt-3 sm:pt-4 md:pt-6 p-3 sm:p-4 md:p-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
            className="w-full sm:w-auto order-2 sm:order-1 min-h-[44px] text-xs xs:text-sm"
          >
            Voltar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto order-1 sm:order-2 min-h-[44px] text-xs xs:text-sm"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 xs:h-4 xs:w-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              "Cadastrar Terreiro"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}