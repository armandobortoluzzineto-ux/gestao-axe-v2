"use client";

import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export interface AvatarProps {
  /** URL da imagem do avatar (opcional) */
  src?: string | null;
  /** Nome do usuário para gerar iniciais (opcional) */
  name?: string | null;
  /** Tamanho do avatar */
  size?: "sm" | "md" | "lg";
  /** Classe CSS adicional */
  className?: string;
  /** Mostrar borda (default: true) */
  bordered?: boolean;
  /** Tipo de gradiente (default: "default") */
  gradient?: "default" | "purple" | "gold" | "green" | "blue";
  /** Ícone personalizado (opcional) */
  icon?: React.ReactNode;
}

/**
 * Componente de Avatar padronizado para o Design System Gestão Axé
 * 
 * Segue o padrão visual "Noite de Gira" com gradientes da paleta roxo/dourado
 * e comportamento consistente para avatares com/sem imagem.
 */
export default function Avatar({
  src,
  name,
  size = "md",
  className,
  bordered = true,
  gradient = "default",
  icon,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const showImage = src && !hasError;

  // Determinar as iniciais do nome
  const getInitials = () => {
    if (!name) return null;
    
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  const initials = getInitials();

  // Tamanhos em Tailwind
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  // Gradientes baseados no Design System
  const gradientClasses = {
    default: "bg-gradient-to-br from-primary/50 to-accent/50",
    purple: "bg-gradient-to-br from-[#6D28D9]/60 to-[#7C3AED]/60",
    gold: "bg-gradient-to-br from-[#D97706]/60 to-[#F59E0B]/60",
    green: "bg-gradient-to-br from-[#047857]/60 to-[#10B981]/60",
    blue: "bg-gradient-to-br from-[#1D4ED8]/60 to-[#3B82F6]/60",
  };

  // Cores de texto para contraste
  const textColorClasses = {
    default: "text-primary",
    purple: "text-[#7C3AED]",
    gold: "text-[#D97706]",
    green: "text-[#10B981]",
    blue: "text-[#3B82F6]",
  };

  const sizeClass = sizeClasses[size];
  const gradientClass = gradientClasses[gradient];
  const textColorClass = textColorClasses[gradient];

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center overflow-hidden",
        sizeClass,
        !showImage && gradientClass,
        bordered && "border border-white/10",
        "shadow-sm",
        className
      )}
    >
      {/* Imagem do avatar */}
      {showImage ? (
        <img
          src={src}
          alt={name || "Avatar"}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#0F051D]/80">
          {/* Conteúdo de fallback */}
          {icon ? (
            <div className={cn("flex items-center justify-center", textColorClass)}>
              {icon}
            </div>
          ) : initials ? (
            <span className={cn("font-bold", textColorClass)}>
              {initials}
            </span>
          ) : (
            <User className={cn("w-1/2 h-1/2", textColorClass)} />
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Componente AvatarGroup para exibir múltiplos avatares sobrepostos
 */
interface AvatarGroupProps {
  /** Avatares a serem exibidos */
  avatars: Array<AvatarProps>;
  /** Número máximo de avatares a mostrar (excedente mostra +X) */
  max?: number;
  /** Tamanho dos avatares */
  size?: "sm" | "md" | "lg";
  /** Espaçamento entre avatares (em pixels negativos) */
  spacing?: number;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = "md",
  spacing = -8,
}: AvatarGroupProps) {
  const avatarsToShow = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex items-center">
      {avatarsToShow.map((avatar, index) => (
        <div
          key={index}
          className="rounded-full border-2 border-[#0F051D]"
          style={{ marginLeft: index > 0 ? `${spacing}px` : "0" }}
        >
          <Avatar
            {...avatar}
            size={size}
            bordered={false}
            className="shadow-sm"
          />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            "rounded-full flex items-center justify-center border-2 border-[#0F051D] bg-[#1E1B4B] text-white",
            size === "sm" && "w-8 h-8 text-xs",
            size === "md" && "w-10 h-10 text-sm",
            size === "lg" && "w-12 h-12 text-base"
          )}
          style={{ marginLeft: `${spacing}px` }}
        >
          <span className="font-bold">+{remaining}</span>
        </div>
      )}
    </div>
  );
}
