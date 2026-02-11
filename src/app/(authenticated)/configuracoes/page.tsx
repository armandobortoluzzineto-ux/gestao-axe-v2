"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { StandardCard } from "@/components/dashboard/standard-card";

export default function ConfiguracoesPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar hidratação incorreta
  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = [
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Escuro", icon: Moon },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Título da página */}
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">
        Configurações
      </h1>
      <p className="text-sm sm:text-base text-[var(--muted-foreground)] mb-8">
        Personalize a aparência do sistema de acordo com sua preferência.
      </p>

      {/* Card de Aparência */}
      <StandardCard
        title="Aparência"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        }
        height="auto"
        showGoldGlow={true}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Tema
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">
              Escolha entre os temas claro ou escuro.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = mounted && theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`
                    flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 transition-all duration-200
                    ${isActive
                      ? "border-[var(--primary)] bg-[var(--primary)]/10"
                      : "border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--card)]/50"
                    }
                  `}
                  aria-label={`Selecionar tema ${option.label}`}
                >
                  <div className={`p-3 rounded-lg mb-3 ${isActive ? "bg-[var(--primary)]/20" : "bg-[var(--card)]"}`}>
                    <Icon className={`w-6 h-6 ${isActive ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"}`} />
                  </div>
                  <span className={`font-medium ${isActive ? "text-[var(--primary)]" : "text-[var(--text-primary)]"}`}>
                    {option.label}
                  </span>
                  {isActive && (
                    <div className="mt-2 w-3 h-3 rounded-full bg-[var(--primary)]"></div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--muted-foreground)]">
              O tema escuro é recomendado para uso noturno e economiza energia em telas OLED.
            </p>
          </div>
        </div>
      </StandardCard>

      {/* Outras seções podem ser adicionadas aqui */}
      <div className="mt-8 text-center text-sm text-[var(--muted-foreground)]">
        Mais configurações em breve.
      </div>
    </div>
  );
}