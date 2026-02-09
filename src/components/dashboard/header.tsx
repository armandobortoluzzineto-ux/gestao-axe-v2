"use client";

import { LogOut, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const supabase = createClient();
  const [userName, setUserName] = useState<string>("Usuário");
  const [userInitial, setUserInitial] = useState<string>("U");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || "Usuário";
        setUserName(fullName);
        setUserInitial(fullName.charAt(0).toUpperCase());
        
        // Também buscar perfil para possível avatar
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", user.id)
          .single();
        
        if (profile?.full_name) {
          setUserName(profile.full_name);
          setUserInitial(profile.full_name.charAt(0).toUpperCase());
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [supabase.auth]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erro ao sair: " + error.message);
    } else {
      toast.success("Você saiu da sua conta.");
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-6 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 rounded-md hover:bg-muted">
          <Menu className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h2 className="text-xl font-semibold font-serif text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Bem-vindo de volta, {userName}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3 text-sm text-foreground">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            {loading ? (
              <User className="h-4 w-4 text-primary" />
            ) : (
              <span className="font-bold text-primary">{userInitial}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{userName}</span>
            <span className="text-xs text-muted-foreground">Administrador</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </header>
  );
}