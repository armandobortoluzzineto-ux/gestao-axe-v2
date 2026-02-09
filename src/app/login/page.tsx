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
    console.log("Tentando login com:", email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erro no login:", error);
      toast.error("Erro no login: " + error.message);
    } else {
      console.log("Login bem-sucedido, dados:", data);
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-3 sm:p-4 md:p-6">
      <Toaster richColors position="top-center" />
      <Card className="w-full max-w-sm sm:max-w-md shadow-2xl border-primary/20 dark:border-primary/30">
        <CardHeader className="space-y-1 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center font-serif text-primary">
            Gestão Axé
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground text-sm sm:text-base">
            Entre com suas credenciais para acessar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
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
          <div className="text-right">
            <a
              href="#"
              className="text-xs sm:text-sm text-primary hover:text-primary/80"
            >
              Esqueceu a senha?
            </a>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:space-y-3 p-4 sm:p-6 pt-0">
          <Button
            className="w-full text-sm sm:text-base"
            onClick={handleLogin}
            disabled={loading}
            size="lg"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:text-primary/80"
            >
              Cadastre-se
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}