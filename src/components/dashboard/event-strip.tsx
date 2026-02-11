import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface EventStripProps {
  title: string;
  date: string; // formato "12/02"
  day: string; // "SEX", "SAB", etc
  time: string; // "19h"
  location: string;
  type: 'caboclo' | 'ogum' | 'limpeza' | 'default';
  month?: string; // "FEV"
  className?: string;
}

export function EventStrip({
  title,
  date,
  day,
  time,
  location,
  type,
  month,
  className,
}: EventStripProps) {
  // Determinar cores baseadas no tipo - Paleta "Ouro sobre Noite"
  let bgColor = "bg-[var(--muted)]";
  let hoverBorder = "hover:border-[#334155]/50";
  let iconColor = "text-[var(--muted-foreground)]";
  let gradientStyle = { backgroundImage: "var(--axe-gradient-caboclo)" };
  
  if (type === "ogum") {
    bgColor = "bg-[var(--secondary)]";
    hoverBorder = "hover:border-[var(--primary)]/50";
    iconColor = "text-[var(--primary)]";
    gradientStyle = { backgroundImage: "var(--axe-gradient-ogum)" };
  } else if (type === "limpeza") {
    bgColor = "bg-emerald-700";
    hoverBorder = "hover:border-emerald-400/50";
    iconColor = "text-emerald-400";
    gradientStyle = { backgroundImage: "var(--axe-gradient-limpeza)" };
  }
  
  // Extrair dia e mês da data
  const dayNumber = date.split('/')[0];
  const monthAbbr = month || (date.split('/')[1] === '02' ? 'FEV' : 'MAR');

  return (
    <div className={cn(
      "flex group rounded-xl bg-[var(--muted)]/40 border border-white/5 overflow-hidden h-full",
      hoverBorder,
      "transition-all",
      className
    )}>
      {/* Faixa Lateral (Data) - Ocupa toda a altura */}
      <div
        className={cn(
          "w-12 sm:w-16 md:w-20 flex flex-col items-center justify-center shrink-0",
          "group-hover:opacity-95 transition-colors"
        )}
        style={gradientStyle}
      >
        <span className="text-xl sm:text-2xl font-bold text-white leading-none">{dayNumber}</span>
        <span className="text-[9px] sm:text-[10px] font-bold text-white/90 uppercase mt-0.5 sm:mt-1 tracking-wider">{monthAbbr}</span>
      </div>
      
      {/* Conteúdo */}
      <div className="p-2 sm:p-3 flex flex-col justify-center w-full relative">
        {/* Badge de Hora */}
        <div className={cn(
          "absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-white/5 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded text-[var(--primary)]/60 border border-[var(--primary)]/20",
          "group-hover:bg-white/10 group-hover:text-[var(--primary)]/80 transition-colors"
        )}>
          {time}
        </div>

        <span className="text-white font-bold leading-tight line-clamp-1 mb-0.5 sm:mb-1 text-sm sm:text-base">{title}</span>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[var(--muted-foreground)] group-hover:text-gray-300">
          <MapPin className={cn("w-2.5 h-2.5 sm:w-3 sm:h-3", iconColor)} />
          <span className="truncate">{location}</span>
        </div>
        
        {/* Dia da semana (opcional) */}
        <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-[10px] text-[var(--muted-foreground)]/70 font-medium">
          {day}
        </div>
      </div>
    </div>
  );
}