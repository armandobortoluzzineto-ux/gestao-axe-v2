"use client";

import { LogOut, Menu, User, X, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";

export default function Header() {
  const router = useRouter();
  const supabase = createClient();
  const [userName, setUserName] = useState<string>("Usuário");
  const [userInitial, setUserInitial] = useState<string>("U");
  const [profile, setProfile] = useState<{ full_name: string | null; avatar_url: string | null } | null>(null);
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
        
        setProfile(profile);
        
        if (profile?.full_name) {
          setUserName(profile.full_name);
          setUserInitial(profile.full_name.charAt(0).toUpperCase());
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [supabase.auth]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erro ao sair: " + error.message);
    } else {
      toast.success("Você saiu da sua conta.");
      router.push("/login");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="lg:hidden p-1.5 sm:p-2 rounded-md hover:bg-muted transition-all duration-300 hover:shadow-sm"
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
          </button>
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold font-serif text-foreground">Dashboard</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Bem-vindo de volta, {userName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ícones de notificação e configurações */}
          <button className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 transition-all duration-300 text-gray-600 hover:text-gray-900 hover:shadow-sm">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 transition-all duration-300 text-gray-600 hover:text-gray-900 hover:shadow-sm">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Avatar e nome visíveis em tablets+ */}
          <div className="flex items-center gap-2 sm:gap-3 text-sm text-foreground">
            {loading ? (
              <div className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </div>
            ) : (
              <>
                <Avatar
                  src={profile?.avatar_url}
                  name={userName}
                  size="sm"
                  bordered={true}
                  gradient="default"
                  className="hidden xs:block"
                />
                <div className="hidden md:flex flex-col">
                  <span className="font-medium">{userName}</span>
                  <span className="text-xs text-muted-foreground">Administrador</span>
                </div>
              </>
            )}
          </div>
          
          {/* Botão de logout adaptado para mobile */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
          <div className="fixed inset-y-0 left-0 w-64 max-w-[85%] min-w-[240px] bg-sidebar border-r border-border z-50 lg:hidden overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-bold font-serif">Menu</h2>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Sidebar />
          </div>
        </>
      )}
    </>
  );
}