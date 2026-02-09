"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      toast.error("Erro no cadastro: " + error.message);
    } else {
      // Verifica se o usuário precisa confirmar o email
      if (data.user?.identities?.length === 0) {
        toast.warning("Este email já está cadastrado. Tente fazer login.");
      } else if (data.session) {
        // Se já tem sessão (confirmação desativada), redireciona
        toast.success("Cadastro realizado! Você já está logado.");
        router.push("/dashboard");
      } else {
        // Precisa confirmar email
        toast.success("Cadastro realizado! Verifique seu email para confirmar a conta.");
        // Opcional: redirecionar para página de confirmação
        // router.push("/confirm-email");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-3 sm:p-4 md:p-6">
      <Toaster richColors position="top-center" />
      <Card className="w-full max-w-sm sm:max-w-md shadow-2xl border-primary/20 dark:border-primary/30">
        <CardHeader className="space-y-1 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center font-serif text-primary">
            Criar Conta
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground text-sm sm:text-base">
            Preencha seus dados para começar a usar o Gestão Axé
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="name" className="text-foreground text-sm sm:text-base">
              Nome Completo
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="text-sm sm:text-base"
            />
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="email" className="text-foreground text-sm sm:text-base">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="text-sm sm:text-base"
            />
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="password" className="text-foreground text-sm sm:text-base">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="text-sm sm:text-base"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Ao cadastrar, você concorda com nossos{" "}
            <a href="#" className="text-primary hover:underline">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="text-primary hover:underline">
              Política de Privacidade
            </a>
            .
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:space-y-3 p-4 sm:p-6 pt-0">
          <Button
            className="w-full text-sm sm:text-base"
            onClick={handleSignUp}
            disabled={loading}
            size="lg"
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary/80"
            >
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}