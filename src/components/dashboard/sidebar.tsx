"use client";

import { Home, Users, Calendar, DollarSign, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Início", href: "/dashboard", icon: Home },
  { label: "Membros", href: "/dashboard/members", icon: Users },
  { label: "Eventos", href: "/dashboard/events", icon: Calendar },
  { label: "Financeiro", href: "/dashboard/financial", icon: DollarSign },
  { label: "Configurações", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full p-4 sm:p-6">
      <div className="mb-8 px-2">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground font-serif">Gestão Axé</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Administração</p>
      </div>

      <nav className="space-y-1 sm:space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 sm:gap-3 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent/10 text-accent-foreground border-l-4 border-accent"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 sm:pt-6 border-t border-border">
        <div className="px-2 text-xs text-muted-foreground">
          <p>Versão 1.0.0</p>
          <p className="mt-1">© 2026 Gestão Axé</p>
        </div>
      </div>
    </div>
  );
}