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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Toaster richColors position="top-right" />
      <Card className="w-full max-w-md shadow-2xl border-primary/20 dark:border-primary/30">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center font-serif text-purple-900 dark:text-purple-100">
            Criar Conta
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400">
            Preencha seus dados para começar a usar o Gestão Axé
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
              Nome Completo
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
              Email
            </Label>
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
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Ao cadastrar, você concorda com nossos{" "}
            <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">
              Política de Privacidade
            </a>
            .
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            className="w-full"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </Button>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
            >
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}