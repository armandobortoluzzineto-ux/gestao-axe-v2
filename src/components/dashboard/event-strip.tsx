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
  // Determinar cores baseadas no tipo - Paleta clara
  let bgColor = "bg-gray-50";
  let hoverBorder = "hover:border-gray-300";
  let iconColor = "text-gray-600";
  let stripColor = "bg-gray-200";
  let textColor = "text-gray-900";
  let timeBg = "bg-gray-100";
  let timeText = "text-gray-700";
  
  if (type === "ogum") {
    stripColor = "bg-[#D97706]";
    bgColor = "bg-[#D97706]/5";
    hoverBorder = "hover:border-[#D97706]/30";
    iconColor = "text-[#D97706]";
    timeBg = "bg-[#D97706]/10";
    timeText = "text-[#D97706]";
  } else if (type === "limpeza") {
    stripColor = "bg-emerald-600";
    bgColor = "bg-emerald-50";
    hoverBorder = "hover:border-emerald-300";
    iconColor = "text-emerald-600";
    timeBg = "bg-emerald-100";
    timeText = "text-emerald-700";
  } else if (type === "caboclo") {
    stripColor = "bg-[#6D28D9]";
    bgColor = "bg-[#6D28D9]/5";
    hoverBorder = "hover:border-[#6D28D9]/30";
    iconColor = "text-[#6D28D9]";
    timeBg = "bg-[#6D28D9]/10";
    timeText = "text-[#6D28D9]";
  }
  
  // Extrair dia e mês da data
  const dayNumber = date.split('/')[0];
  const monthAbbr = month || (date.split('/')[1] === '02' ? 'FEV' : 'MAR');

  return (
    <div className={cn(
      "flex group rounded-lg border border-gray-200 overflow-hidden h-full",
      bgColor,
      hoverBorder,
      "transition-all",
      className
    )}>
      {/* Faixa Lateral (Data) - Ocupa toda a altura */}
      <div
        className={cn(
          "w-12 sm:w-16 md:w-20 flex flex-col items-center justify-center shrink-0",
          stripColor,
          "group-hover:opacity-95 transition-colors"
        )}
      >
        <span className="text-xl sm:text-2xl font-bold text-white leading-none">{dayNumber}</span>
        <span className="text-[9px] sm:text-[10px] font-bold text-white/90 uppercase mt-0.5 sm:mt-1 tracking-wider">{monthAbbr}</span>
      </div>
      
      {/* Conteúdo */}
      <div className="p-3 sm:p-4 flex flex-col justify-center w-full">
        <span className={cn("font-bold leading-tight line-clamp-1 mb-1 sm:mb-2 text-sm sm:text-base", textColor)}>{title}</span>
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
          <MapPin className={cn("w-3 h-3 sm:w-4 sm:h-4", iconColor)} />
          <span className="truncate">{location}</span>
        </div>
        
        {/* Linha com horário e dia da semana */}
        <div className="flex items-center justify-between mt-auto">
          <div className="text-[10px] sm:text-xs text-gray-500 font-medium">
            {day}
          </div>
          <div className={cn(
            "text-[10px] sm:text-xs px-2 py-1 rounded-md font-medium",
            timeBg,
            timeText
          )}>
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}