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
    <div className="flex flex-col h-full p-6">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-bold text-slate-800">Gestão Axé</h1>
        <p className="text-sm text-slate-500 mt-1">Administração</p>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-200">
        <div className="px-2 text-xs text-slate-500">
          <p>Versão 1.0.0</p>
          <p className="mt-1">© 2026 Gestão Axé</p>
        </div>
      </div>
    </div>
  );
}