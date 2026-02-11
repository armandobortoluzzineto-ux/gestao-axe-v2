"use client";

import { CalendarDays, MessageSquare, UsersRound, DollarSign, MapPin, Send, Crown, ArrowRight, PartyPopper, TrendingUp } from "lucide-react";
import Avatar from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { KPICard } from "@/components/dashboard/kpi-card";
import { EventStrip } from "@/components/dashboard/event-strip";
import { StandardCard } from "@/components/dashboard/standard-card";

// Função para mapear corAvatar para gradiente do Design System
const mapCorAvatarToGradient = (corAvatar: string): "default" | "purple" | "gold" | "green" | "blue" => {
  if (corAvatar.includes("pink") || corAvatar.includes("purple")) return "purple";
  if (corAvatar.includes("amber") || corAvatar.includes("orange") || corAvatar.includes("yellow")) return "gold";
  if (corAvatar.includes("emerald") || corAvatar.includes("teal") || corAvatar.includes("green")) return "green";
  if (corAvatar.includes("blue") || corAvatar.includes("cyan") || corAvatar.includes("indigo")) return "blue";
  return "default";
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("Usuário");
  const supabase = createClient();

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || "Usuário";
        setUserName(fullName);
        
        // Buscar perfil para nome completo
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();
        
        if (profile?.full_name) {
          setUserName(profile.full_name);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Dados mockados para demonstração
  const proximosRituais = [
    { id: 1, titulo: "Gira de Caboclo", data: "12/02", local: "Terreiro Principal", tipo: "caboclo" as const, dia: "12", mes: "FEV", hora: "19h", diaSemana: "SEX" },
    { id: 2, titulo: "Batuque de Ogum", data: "15/02", local: "Sala Externa", tipo: "ogum" as const, dia: "15", mes: "FEV", hora: "15h", diaSemana: "SAB" },
    { id: 3, titulo: "Limpeza de Corpo", data: "18/02", local: "Sala de Ervas", tipo: "limpeza" as const, dia: "18", mes: "FEV", hora: "10h", diaSemana: "DOM" },
  ];

  const recados = [
    { id: 1, texto: "Tragam velas brancas para a gira de sexta", autor: "Pai de Santo", hora: "14:30" },
    { id: 2, texto: "Reunião de Ogãs às 18h no barracão", autor: "Mãe Pequena", hora: "10:15" },
    { id: 3, texto: "Contribuição para o almoço comunitário", autor: "Cambono", hora: "09:45" },
  ];

  // Dados unificados para celebrações do mês (aniversários + tempo de casa)
  const celebracoesUnificadas = [
    // Aniversários (tipo: "aniversario")
    { id: 1, nome: "Mariana de Oxum", data: "12/02", tipo: "aniversario" as const, avatar: "MO", anos: null, corAvatar: "from-pink-600 to-purple-600" },
    { id: 2, nome: "João de Xangô", data: "15/02", tipo: "aniversario" as const, avatar: "JX", anos: null, corAvatar: "from-purple-600 to-indigo-600" },
    { id: 3, nome: "Cristina de Iemanjá", data: "25/02", tipo: "aniversario" as const, avatar: "CI", anos: null, corAvatar: "from-blue-600 to-cyan-600" },
    { id: 4, nome: "Ana de Oxalá", data: "01/03", tipo: "aniversario" as const, avatar: "AO", anos: null, corAvatar: "from-emerald-600 to-teal-600" },
    // Tempo de casa (tipo: "tempo_casa")
    { id: 5, nome: "Pai Márcio", data: "20/02", tipo: "tempo_casa" as const, avatar: "PM", anos: "7 Anos", corAvatar: "from-amber-500 to-orange-600" },
    { id: 6, nome: "Filha Luciana", data: "22/02", tipo: "tempo_casa" as const, avatar: "FL", anos: "1 Ano", corAvatar: "from-yellow-500 to-amber-600" },
    { id: 7, nome: "Pedro de Ogum", data: "28/02", tipo: "tempo_casa" as const, avatar: "PO", anos: "5 Anos", corAvatar: "from-orange-500 to-red-600" },
  ].sort((a, b) => {
    // Ordenar por data (convertendo DD/MM para número do dia)
    const diaA = parseInt(a.data.split('/')[0]);
    const diaB = parseInt(b.data.split('/')[0]);
    return diaA - diaB;
  });

  return (
    <div className="flex h-screen bg-[var(--axe-page)] overflow-hidden">
      {/* Textura de granulação quase imperceptível */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* 1. NAVEGAÇÃO (Esquerda) */}
      {/* O Sidebar já é renderizado pelo layout.tsx, então não precisamos incluí-lo aqui */}

      {/* 2. ÁREA PRINCIPAL (Centro - O Dashboard) */}
      <main className="flex-1 h-full overflow-y-auto p-3 sm:p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-800">
         <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            
            {/* Cabeçalho da Página */}
            <header className="mb-10 sm:mb-12">
               <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Bem-vindo, {userName}!</h1>
               <p className="text-gray-400 text-xs sm:text-sm">
                 Hoje é {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
               </p>
            </header>

            {/* O GRID DE 4 COLUNAS (Bento Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
               
               {/* Card Destaque: Membros Ativos usando KPICard */}
               <KPICard 
                 value="142"
                 label="Membros Ativos"
                 icon={<UsersRound className="w-5 h-5" />}
               />

               {/* B. Próximos Eventos (Grid Horizontal - 3 Colunas) */}
               <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-[var(--axe-card)] rounded-2xl p-4 sm:p-6 border border-white/5 flex flex-col justify-between h-full min-h-[140px] sm:min-h-[160px] lg:min-h-[180px]">
                  
                  {/* Header: Alinhado com o topo do card vizinho */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                     <div className="p-1.5 sm:p-2 bg-[var(--axe-gold)]/10 rounded-lg flex items-center justify-center">
                        <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--axe-gold)]" />
                     </div>
                     <span className="text-xs sm:text-sm font-bold text-[var(--axe-text-primary)] uppercase tracking-wider">
                        Próximos Eventos
                     </span>
                  </div>

                  {/* A Grid Interna (3 Colunas) - Usando EventStrip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 flex-1">
                    {proximosRituais.map((ritual) => (
                      <EventStrip
                        key={ritual.id}
                        title={ritual.titulo}
                        date={ritual.data}
                        day={ritual.diaSemana}
                        time={ritual.hora}
                        location={ritual.local}
                        type={ritual.tipo}
                        month={ritual.mes}
                      />
                    ))}
                 </div>
               </div>

               {/* --- SEGUNDA LINHA DO GRID --- */}

               {/* 1. COLUNA ESQUERDA (Apenas Financeiro) */}
               <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
                  
                  {/* Card Financeiro usando StandardCard */}
                  <StandardCard
                    title="Financeiro"
                    icon={<DollarSign />}
                    actionButton={
                      <button className="text-xs text-[var(--axe-gold)] hover:underline flex items-center gap-1 bg-[var(--axe-gold)]/10 hover:bg-[var(--axe-gold)]/20 px-3 py-1.5 rounded-lg transition-colors">
                        Ver Extrato <ArrowRight className="w-3 h-3" />
                      </button>
                    }
                  >
                    {/* Grid de Informações */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
                       
                       {/* 1. O SALDO (Hero Metric) */}
                       <div className="flex flex-col">
                          <span className="text-gray-400 text-xs sm:text-sm font-medium mb-1">Saldo Disponível</span>
                          <div className="flex items-baseline gap-1">
                             <span className="text-gray-400 text-xl sm:text-2xl font-light">R$</span>
                             <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--axe-text-primary)] tracking-tight">12.450</span>
                             <span className="text-gray-400 text-xl sm:text-2xl font-light">,00</span>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                              <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                                 <TrendingUp className="w-3 h-3" /> +15% esse mês
                              </span>
                          </div>
                       </div>

                       {/* 2. OS SECUNDÁRIOS (Previsão & Pendências) */}
                       <div className="grid grid-cols-2 gap-4 border-l border-white/10 pl-6 md:pl-8">
                          
                          {/* A Receber */}
                          <div className="flex flex-col gap-1">
                             <div className="flex items-center gap-1.5 text-[#94A3B8] text-xs font-medium uppercase">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]"></div>
                                A Receber
                             </div>
                             <span className="text-xl font-bold text-[var(--axe-text-primary)]">R$ 3.280</span>
                             <span className="text-[10px] text-[#94A3B8]">Mensalidades Fev</span>
                          </div>

                          {/* Pendências (Alerta) */}
                          <div className="flex flex-col gap-1">
                             <div className="flex items-center gap-1.5 text-[var(--axe-destructive)] text-xs font-medium uppercase">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--axe-destructive)] animate-pulse"></div>
                                Pendências
                             </div>
                             <span className="text-xl font-bold text-[var(--axe-text-primary)]">R$ 850</span>
                             <span className="text-[10px] text-[var(--axe-destructive)]">5 filhos em atraso</span>
                          </div>

                       </div>
                    </div>
                  </StandardCard>
               </div>

               {/* 2. COLUNA DIREITA (Card Único: Celebrações do Mês) */}
               <StandardCard
                 title="Próximas Celebrações"
                 icon={<PartyPopper />}
                 className="col-span-1 md:col-span-2"
                 showGoldGlow={false}
               >
                 {/* LISTA (Top 5) - Sem scroll */}
                 <div className="flex-1 overflow-hidden p-4 space-y-3">
                    {celebracoesUnificadas.slice(0,5).map((evento) => {
                       // Extrair dia e mês da data (formato "DD/MM")
                       const [dia, mes] = evento.data.split('/');
                       const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                       const mesNome = meses[parseInt(mes) - 1] || 'Fevereiro';
                       
                       return (
                       <div key={evento.id} className="flex items-center justify-between p-3 rounded-xl bg-[var(--muted)]/30 border border-white/5 hover:bg-[var(--muted)]/50 transition-all group">
                          <div className="flex items-center gap-3">
                             {/* Avatar */}
                             <Avatar
                               name={evento.nome}
                               size="md"
                               gradient={mapCorAvatarToGradient(evento.corAvatar)}
                               bordered={false}
                             />
                             <div className="flex flex-col">
                                <span className="text-sm font-bold text-white group-hover:text-pink-200">{evento.nome}</span>
                                <span className="text-xs text-[var(--axe-text-muted)]">{dia} {mesNome}</span>
                             </div>
                          </div>
                          {evento.tipo === 'aniversario' ? (
                             <div className="px-2 py-1 rounded bg-[var(--axe-gold)]/10 text-[var(--axe-gold)] text-[10px] font-bold border border-[var(--axe-gold)]/20 uppercase">
                                Niver
                             </div>
                          ) : (
                             <div className="px-2 py-1 rounded bg-[var(--axe-gold)]/10 text-[var(--axe-gold)] text-[10px] font-bold border border-[var(--axe-gold)]/20 uppercase">
                                {evento.anos}
                             </div>
                          )}
                       </div>
                    )})}
                 </div>
               </StandardCard>
            </div>
         </div>
      </main>

      {/* 3. FEED DE RECADOS (Direita - Coluna Fixa) - Oculto em mobile */}
      <aside className="hidden lg:flex w-80 h-full bg-[var(--axe-sidebar)] border-l border-white/5 flex flex-col shrink-0">
         <div className="p-6 border-b border-white/5 sticky top-0 bg-[var(--axe-sidebar)] z-10 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <div className="p-2 bg-[var(--axe-gold)]/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-[var(--axe-gold)]" />
               </div>
               <span className="text-sm font-bold text-[var(--axe-text-primary)] uppercase tracking-wider">
                  Mural do Terreiro
               </span>
            </div>
         </div>
         
         {/* Área de Rolagem - Feed de Mensagens no estilo Chat */}
         <div className="flex-1 overflow-y-auto p-6 pt-6">
            {recados.map((recado) => (
              <div key={recado.id} className="flex items-start gap-3 mb-5 last:mb-0">
                 {/* 1. O Avatar (Esquerda) */}
                 <div className="shrink-0">
                    <Avatar
                      name={recado.autor}
                      size="sm"
                      gradient="gold"
                      bordered={false}
                    />
                 </div>

                 {/* 2. O Balão de Fala */}
                 <div className="flex flex-col gap-1 max-w-[85%]">
                    {/* Nome e Cargo (Fora do balão ou dentro, estilo Grupo) */}
                    <span className="text-[10px] text-[var(--axe-text-muted)] font-medium ml-1">
                       {recado.autor}
                    </span>

                    {/* O Balão em si */}
                    <div className="bg-[var(--muted)] p-3 rounded-2xl rounded-tl-none border border-white/5 text-sm text-[var(--axe-text-primary)] shadow-sm relative group hover:bg-[var(--muted)]/80 transition-colors">
                       <p className="leading-snug break-words whitespace-normal text-wrap">
                          {recado.texto}
                       </p>
                       {/* Hora dentro do balão (canto inferior) */}
                       <div className="text-[9px] text-[var(--axe-text-muted)]/70 text-right mt-1 font-medium">
                          {recado.hora}
                       </div>
                    </div>
                 </div>
              </div>
            ))}
         </div>

         {/* Área de Input (Rodapé Fixo) */}
         <div className="p-6 bg-[var(--axe-sidebar)] border-t border-white/5 sticky bottom-0">
            <div className="relative">
               <input
                  type="text"
                  placeholder="Digite uma mensagem..."
                  className="w-full bg-[var(--axe-page)] text-sm text-white rounded-full pl-4 pr-12 py-3.5 border border-white/10 focus:outline-none focus:border-[var(--axe-gold)]/50 placeholder-gray-500"
               />
               <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[var(--axe-gold)] rounded-full text-[var(--axe-sidebar)] hover:bg-[var(--axe-gold)]/80 transition shadow-md">
                  <Send className="w-4 h-4" />
               </button>
            </div>
         </div>
      </aside>
    </div>
  );
}
