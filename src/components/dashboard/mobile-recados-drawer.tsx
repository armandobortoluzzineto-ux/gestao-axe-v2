"use client";

import { useState } from "react";
import { X, MessageSquare, Send } from "lucide-react";
import Avatar from "@/components/ui/avatar";

interface Recado {
  id: number;
  autor: string;
  texto: string;
  hora: string;
}

interface MobileRecadosDrawerProps {
  recados: Recado[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileRecadosDrawer({ recados, isOpen, onClose }: MobileRecadosDrawerProps) {
  const [mensagem, setMensagem] = useState("");

  const handleEnviarMensagem = () => {
    if (mensagem.trim()) {
      // Em uma implementação real, enviaria para o backend
      console.log("Enviando mensagem:", mensagem);
      setMensagem("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviarMensagem();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay escuro */}
      <div 
        className="fixed inset-0 bg-black/70 z-50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-[var(--axe-sidebar)] z-50 lg:hidden flex flex-col shadow-2xl border-l border-white/10 animate-slide-in-right">
        {/* Cabeçalho */}
        <div className="p-4 border-b border-white/10 bg-axe-sidebar flex items-center justify-between sticky top-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-axe-gold/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-axe-gold" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-200">Mural do Terreiro</h3>
              <p className="text-xs text-gray-400">{recados.length} mensagens</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Lista de mensagens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {recados.map((recado) => (
            <div key={recado.id} className="flex items-start gap-3">
              <div className="shrink-0">
                <Avatar
                  name={recado.autor}
                  size="sm"
                  gradient="gold"
                  bordered={false}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-300">{recado.autor}</span>
                  <span className="text-[10px] text-gray-500">{recado.hora}</span>
                </div>
                <div className="bg-axe-sidebar p-3 rounded-2xl rounded-tl-none border border-white/5 text-sm text-gray-200">
                  <p className="leading-snug break-words">{recado.texto}</p>
                </div>
              </div>
            </div>
          ))}
          
          {recados.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhuma mensagem ainda</p>
              <p className="text-xs mt-1">Seja o primeiro a enviar um recado!</p>
            </div>
          )}
        </div>

        {/* Área de input */}
        <div className="p-4 border-t border-white/10 bg-axe-sidebar sticky bottom-0">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite uma mensagem..."
              className="flex-1 bg-axe-sidebar text-sm text-white rounded-full pl-4 pr-4 py-3 border border-white/10 focus:outline-none focus:border-axe-gold/50 placeholder-gray-500"
              autoFocus
            />
            <button
              onClick={handleEnviarMensagem}
              disabled={!mensagem.trim()}
              className="shrink-0 flex items-center justify-center w-9 h-9 bg-axe-gold rounded-full text-axe-sidebar hover:bg-axe-gold/80 transition disabled:opacity-50 disabled:cursor-not-allowed p-0 leading-none"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Pressione Enter para enviar
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
}