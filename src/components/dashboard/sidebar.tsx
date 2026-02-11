"use client";

import { Home, Users, Calendar, DollarSign, Settings, User, LogOut, Users as UsersIcon, Sparkles } from "lucide-react";
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
{ label: "Configurações", href: "/configuracoes", icon: Settings },
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
  <div className="flex flex-col h-full p-4 sm:p-6 bg-white border-r border-gray-200 shadow-sm relative overflow-hidden">
    {/* Logo "Gestão Axé" */}
    <div className="mb-6 sm:mb-10 relative z-10">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-sans tracking-tighter flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[#6D28D9] shadow-[0_0_10px_rgba(109,40,217,0.5)]" />
        Gestão Axé
      </h1>
      <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest mt-1 sm:mt-1.5 font-sans font-bold">Luz na Escuridão</p>
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
              "flex items-center gap-2 sm:gap-3 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-xs sm:text-sm font-medium transition-all duration-300 font-sans group relative hover:shadow-sm",
              isActive
                ? "text-white bg-[#6D28D9] border-l-4 border-[#6D28D9] pl-2 sm:pl-3 shadow-md"
                : "text-gray-700 hover:text-[#6D28D9] hover:bg-gray-100 hover:border-l-4 hover:border-[#6D28D9]/30"
            )}
          >
            <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5 transition-colors", isActive ? "text-white" : "group-hover:text-[#6D28D9]")} />
            <span className="truncate font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>

    {/* Call to Action Inferior */}
    <div className="mt-6 p-3 bg-gradient-to-r from-[#6D28D9]/10 to-[#D97706]/10 rounded-xl border border-gray-200">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="h-4 w-4 text-[#6D28D9]" />
        <span className="text-xs font-bold text-gray-900">Join the community</span>
      </div>
      <p className="text-[10px] text-gray-600 mb-2">Find out more about our spiritual network</p>
      <button className="w-full py-1.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-1 hover:shadow-md active:scale-95">
        <UsersIcon className="h-3 w-3" />
        Explore
      </button>
    </div>

    {/* Perfil */}
    <div className="mt-auto relative z-10 pt-4 sm:pt-6 border-t border-gray-200">
      <div className="flex items-center gap-2 sm:gap-3 p-2">
        <Avatar
          name="Armando"
          size="md"
          gradient="gold"
          bordered={false}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-bold text-gray-900 truncate font-sans">Armando</p>
          <p className="text-[9px] sm:text-[10px] text-[#D97706] font-medium uppercase tracking-tight mt-0.5">Pai de Santo</p>
          <p className="text-[9px] sm:text-[10px] text-gray-500 truncate font-sans mt-0.5">Ilê Axé Ayô</p>
        </div>
        <button
          onClick={handleLogout}
          className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:shadow-sm"
          title="Sair"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);
}