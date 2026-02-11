"use client";

import { Home, Users, Calendar, DollarSign, Settings, User, LogOut } from "lucide-react";
import Avatar from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Início", href: "/dashboard", icon: Home },
  { label: "Membros", href: "/dashboard/members", icon: Users },
  { label: "Eventos", href: "/dashboard/events", icon: Calendar },
  { label: "Financeiro", href: "/dashboard/financial", icon: DollarSign },
  { label: "Configurações", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full p-4 sm:p-6 bg-[var(--axe-sidebar)] border-r border-white/10 shadow-2xl shadow-axe-gold/5 relative overflow-hidden">
      {/* Glow Decorativo - Dourado Sutil */}
      <div className="absolute -top-20 -left-20 h-40 w-40 bg-axe-gold/5 rounded-full blur-3xl" />
      
      {/* Logo "Dark Mystical" */}
      <div className="mb-6 sm:mb-10 relative z-10">
        <h1 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tighter flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(217,119,6,0.8)]" />
          Gestão Axé
        </h1>
        <p className="text-[9px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-widest mt-1 sm:mt-1.5 font-sans font-bold">Luz na Escuridão</p>
      </div>

      {/* Navegação */}
      <nav className="space-y-1 sm:space-y-2 flex-1 relative z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 sm:gap-3 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-xs sm:text-sm font-medium transition-all duration-300 font-sans group relative",
                isActive
                  ? "text-accent bg-white/10"
                  : "text-muted-foreground/80 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-4 sm:h-6 bg-accent rounded-full shadow-[0_0_12px_rgba(217,119,6,0.9)]" />
              )}
              <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5 transition-colors", isActive ? "text-accent" : "group-hover:text-primary")} />
              <span className="truncate font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Perfil Clean - Sem box */}
      <div className="mt-auto relative z-10 pt-4 sm:pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 sm:gap-3 p-2">
          <Avatar
            name="Armando"
            size="md"
            gradient="gold"
            bordered={false}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-bold text-white truncate font-sans">Armando</p>
            <p className="text-[9px] sm:text-[10px] text-accent font-medium uppercase tracking-tight mt-0.5">Pai de Santo</p>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground/70 truncate font-sans mt-0.5">Ilê Axé Ayô</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-muted-foreground/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}