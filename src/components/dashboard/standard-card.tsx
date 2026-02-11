import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StandardCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  actionButton?: ReactNode;
  height?: string;
  className?: string;
  showGoldGlow?: boolean;
}

export function StandardCard({
  title,
  icon,
  children,
  actionButton,
  height = "auto",
  className,
  showGoldGlow = true,
}: StandardCardProps) {
  // Determinar se a altura é um valor arbitrário (contém colchetes) ou uma classe Tailwind
  const isArbitraryHeight = height.startsWith('[') && height.endsWith(']');
  
  return (
    <div
      className={cn(
        "w-full bg-[var(--axe-card)] rounded-2xl p-4 sm:p-6 border border-white/5 flex flex-col justify-between relative overflow-hidden group",
        !isArbitraryHeight && `h-${height}`,
        className
      )}
      style={isArbitraryHeight ? { height: height.slice(1, -1) } : undefined}
    >
      {/* Decoração de Fundo (Sutil) - Glow Dourado */}
      {showGoldGlow && (
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-[var(--axe-gold)]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      )}

      {/* Header do Card */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 sm:p-2 bg-[var(--axe-gold)]/10 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--axe-gold)] flex items-center justify-center">
              {icon}
            </div>
          </div>
          <span className="text-xs sm:text-sm font-bold text-[var(--axe-text-primary)] uppercase tracking-wider">{title}</span>
        </div>
        {actionButton && (
          <div className="flex items-center gap-2">
            {actionButton}
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="relative z-10 flex-1">
        {children}
      </div>
    </div>
  );
}