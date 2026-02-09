"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Preencha email e senha");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Erro no login: " + error.message);
    } else {
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      toast.error("Preencha email e senha");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
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
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Toaster richColors position="top-right" />
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Gestão Axe</CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais ou crie uma nova conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Processando..." : "Entrar"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSignUp}
            disabled={loading}
          >
            Cadastrar
          </Button>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Ao cadastrar, você concorda com nossos Termos de Uso.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}