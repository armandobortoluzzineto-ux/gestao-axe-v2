import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface KPICardProps {
  value: string | number;
  label: string;
  icon: ReactNode;
  gradient?: string;
  watermarkIcon?: ReactNode;
  className?: string;
  variant?: "default" | "secondary";
}

export function KPICard({
  value,
  label,
  icon,
  gradient,
  watermarkIcon,
  className,
  variant = "default",
}: KPICardProps) {
  const isSecondary = variant === "secondary";
  const bgColor = isSecondary ? "bg-white" : "bg-white";
  const borderColor = isSecondary ? "border-gray-200" : "border-gray-200";
  const textColor = isSecondary ? "text-gray-900" : "text-gray-900";
  const iconColor = isSecondary ? "text-[var(--axe-gold)]" : "text-[var(--axe-purple)]";
  const valueColor = isSecondary ? "text-gray-900" : "text-gray-900";

  return (
    <div className={cn(
      "col-span-1 relative overflow-hidden rounded-xl p-4 sm:p-6 h-full min-h-[140px] sm:min-h-[160px] group transition-all hover:shadow-md",
      bgColor,
      "border",
      borderColor,
      "shadow-sm",
      className
    )}>
      {/* Conteúdo */}
      <div className="flex flex-col justify-between h-full">
        
        {/* Topo: Identificação (Label + Ícone Pequeno) */}
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className={cn("p-2 rounded-lg", isSecondary ? "bg-[var(--axe-gold)]/10" : "bg-[var(--axe-purple)]/10")}>
              <div className={cn("w-4 h-4 sm:w-5 sm:h-5", iconColor)}>
                {icon}
              </div>
            </div>
            <span className={cn("text-xs sm:text-sm font-bold uppercase tracking-wider", textColor)}>
              {label}
            </span>
          </div>
          {watermarkIcon && (
            <div className="opacity-20">
              {watermarkIcon}
            </div>
          )}
        </div>

        {/* Base: O Dado (Hero) */}
        <div className="mt-auto">
          <span className={cn("text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9]", valueColor)}>
            {value}
          </span>
          
          {/* Subtexto opcional para dar contexto */}
          <div className="mt-2 sm:mt-3 text-gray-600 text-xs sm:text-sm font-medium">
            <span>Total acumulado</span>
          </div>
        </div>
      </div>
    </div>
  );
}