import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import { ReactNode } from "react";

interface KPICardProps {
  value: string | number;
  label: string;
  icon: ReactNode;
  gradient?: string;
  watermarkIcon?: ReactNode;
  className?: string;
}

export function KPICard({
  value,
  label,
  icon,
  gradient = "bg-gradient-to-br from-[#1E293B] via-[#334155] to-[#1E293B]",
  watermarkIcon = <Crown className="absolute -bottom-4 -right-8 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 text-[var(--axe-gold)]/20 -rotate-12 pointer-events-none z-0" strokeWidth={1.5} />,
  className,
}: KPICardProps) {
  return (
    <div className={cn(
      "col-span-1 relative overflow-hidden rounded-2xl p-4 sm:p-6 shadow-lg h-full min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] group transition-all hover:scale-[1.02]",
      gradient,
      className
    )}>
      {/* Textura de granulação quase imperceptível */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      
      {/* Marca d'água (Watermark) */}
      {watermarkIcon}
      
      {/* Luz de topo para dar volume */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 via-transparent to-transparent pointer-events-none"></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        
        {/* Topo: Identificação (Label + Ícone Pequeno) */}
        <div className="flex items-center gap-2 mb-1 sm:mb-2">
          <div className="w-4 h-4 sm:w-5 sm:h-5 text-white/80">
            {icon}
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-white/90 uppercase tracking-widest">
            {label}
          </span>
        </div>

        {/* Base: O Dado (Hero) */}
        <div className="mt-auto">
          <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-md">
            {value}
          </span>
          
          {/* Subtexto opcional para dar contexto */}
          <div className="mt-1 sm:mt-2 text-white/80 text-xs sm:text-sm font-medium">
            <span>Filhos da Casa</span>
          </div>
        </div>
      </div>
    </div>
  );
}