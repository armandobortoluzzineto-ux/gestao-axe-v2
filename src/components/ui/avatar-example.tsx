"use client";

import Avatar, { AvatarGroup } from "./avatar";
import { User, Users, Crown, Star } from "lucide-react";

/**
 * Componente de exemplo para demonstrar o uso do Avatar padronizado
 * 
 * Este componente mostra todos os estados e variações do componente Avatar
 * para referência durante o desenvolvimento.
 */
export default function AvatarExample() {
  const sampleAvatars = [
    { src: null, name: "Maria Silva", gradient: "purple" as const },
    { src: null, name: "João Santos", gradient: "gold" as const },
    { src: null, name: "Ana Costa", gradient: "green" as const },
    { src: null, name: "Pedro Lima", gradient: "blue" as const },
    { src: null, name: "Carla", gradient: "default" as const },
  ];

  return (
    <div className="p-6 bg-[#0F051D] rounded-2xl border border-white/10">
      <h2 className="text-xl font-bold text-white mb-6 font-serif">Exemplos de Avatar</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Seção 1: Tamanhos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Tamanhos</h3>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <Avatar name="Maria Silva" size="sm" />
              <span className="text-xs text-gray-400">Small (32px)</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <Avatar name="João Santos" size="md" />
              <span className="text-xs text-gray-400">Medium (40px)</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <Avatar name="Ana Costa" size="lg" />
              <span className="text-xs text-gray-400">Large (48px)</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            Use <code className="bg-white/5 px-1 py-0.5 rounded">size="sm"</code> para listas densas, 
            <code className="bg-white/5 px-1 py-0.5 rounded mx-1">size="md"</code> para header e cards,
            <code className="bg-white/5 px-1 py-0.5 rounded mx-1">size="lg"</code> para perfil.
          </p>
        </div>
        
        {/* Seção 2: Gradientes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Gradientes</h3>
          
          <div className="flex items-center gap-3 flex-wrap">
            <Avatar name="Admin" gradient="purple" />
            <Avatar name="Destaque" gradient="gold" />
            <Avatar name="Novo" gradient="green" />
            <Avatar name="Convidado" gradient="blue" />
            <Avatar name="Padrão" gradient="default" />
          </div>
          
          <div className="text-sm text-gray-400 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#6D28D9]"></div>
              <span>Purple: Administradores</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#D97706]"></div>
              <span>Gold: Destaques, aniversários</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
              <span>Green: Novos membros</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#3B82F6]"></div>
              <span>Blue: Convidados</span>
            </div>
          </div>
        </div>
        
        {/* Seção 3: Estados */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Estados</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar src="/avatar.jpg" name="Com Imagem" />
              <span className="text-sm text-gray-300">Com imagem (fallback para erro)</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar name="Maria Silva Santos" />
              <span className="text-sm text-gray-300">Com nome (iniciais: "MS")</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar name="João" />
              <span className="text-sm text-gray-300">Nome curto (inicial: "J")</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar icon={<Crown className="w-4 h-4" />} />
              <span className="text-sm text-gray-300">Com ícone personalizado</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar />
              <span className="text-sm text-gray-300">Sem nome (ícone User)</span>
            </div>
          </div>
        </div>
        
        {/* Seção 4: AvatarGroup */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Grupo de Avatares</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">Grupo básico (max: 4)</p>
              <AvatarGroup avatars={sampleAvatars} max={4} size="md" />
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-2">Grupo pequeno</p>
              <AvatarGroup avatars={sampleAvatars.slice(0, 3)} size="sm" />
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-2">Com muitos membros (+X)</p>
              <AvatarGroup 
                avatars={[...sampleAvatars, ...sampleAvatars]} 
                max={3} 
                size="md" 
                spacing={-10}
              />
            </div>
          </div>
          
          <p className="text-sm text-gray-400">
            Use <code className="bg-white/5 px-1 py-0.5 rounded">AvatarGroup</code> para listas de membros,
            equipes ou qualquer contexto com múltiplos avatares.
          </p>
        </div>
        
      </div>
      
      {/* Seção 5: Uso em contexto real */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Exemplo de uso real</h3>
        
        <div className="bg-[#1E1B4B]/30 p-4 rounded-xl border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <Avatar name="Maria Silva" size="md" gradient="purple" />
            <div>
              <p className="text-sm font-bold text-white">Maria Silva</p>
              <p className="text-xs text-gray-400">Administradora • Online</p>
            </div>
          </div>
          
          <div className="text-sm text-gray-300">
            <p>Este é um exemplo de como o Avatar pode ser usado em um card de perfil.</p>
            <p className="mt-2 text-xs text-gray-400">
              O componente unifica a apresentação visual e garante consistência
              em toda a aplicação Gestão Axé.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-500">
        <p>
          <strong>Documentação completa:</strong> Consulte <code>docs/AVATAR_PATTERN.md</code> e 
          a seção de avatares no <code>docs/DESIGN_SYSTEM.md</code>.
        </p>
        <p className="mt-1">
          Componente criado como parte da padronização de avatares - Fevereiro 2026.
        </p>
      </div>
    </div>
  );
}