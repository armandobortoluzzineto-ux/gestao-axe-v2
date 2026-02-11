# Design System – Gestão Axé 2.0

**Tema:** "Noite de Gira" (Dark Mystical SaaS)
**Estética:** Profundidade, Degradês, Glows e Texturas Culturais.

---

## 1. Atmosfera e Cores (Nativo Dark)

O sistema opera exclusivamente em modo escuro para garantir imersão e elegância mística.

### Paleta Base - "Ouro sobre Noite"
- **Fundo Global:** `#0B0E14` (Azul Petróleo quase preto).
- **Sidebar & Superfícies:** `#0D1117` (Azul Noturno) e `#141A24` (Azul Noturno Profundo).
- **Glassmorphism:** Uso intensivo de `bg-white/5` com `backdrop-blur-md` e bordas `border-white/10`.

### Acentos de Luz
- **Dourado Champanhe:** `#D4AF37` - Usado para glows de fundo, ícones e ações primárias.
- **Ouro Velho:** `#996515` - Usado para destaques secundários e bordas.
- **Textos:** Branco Marfim (`#F9F9F9`) para títulos, Cinza Azulado (`#94A3B8`) para metadados.

### Gradientes de Cards
- **Azul Noturno:** `from-[#1E293B]/90 to-[#334155]/90` – usado para eventos de gira (Caboclo).
- **Dourado Champanhe:** `from-[#996515]/90 to-[#D4AF37]/90` – usado para eventos de Ogum.
- **Verde Axé:** `from-[#047857]/90 to-[#10B981]/90` – usado para eventos de limpeza.
- **Opacidade:** 90% para manter legibilidade do texto sobre o gradiente.
- **Direção:** Sempre vertical (`bg-gradient-to-b`) para criar sensação de profundidade.

---

## 2. Componentes Estruturais

### Hero Card (Evento em Destaque)
- **Degradê:** `from-[#6D28D9] via-[#312E81] to-[#1E1B4B]`.
- **Textura:** Overlay de stardust/poeira estelar (opacidade 20-30%).
- **Sombra:** `shadow-[0_30px_60px_-15px_rgba(109,40,217,0.3)]`.

### Cards de Eventos (Dashboard)
- **Estrutura:** Layout de duas colunas com Date Block à esquerda (gradiente vertical) e detalhes à direita.
- **Date Block:** Gradiente vertical suave com cores temáticas (Roxo `#6D28D9`, Dourado `#D97706`, Verde `#10B981`) e opacidade 90%.
- **Tipografia Heroica:** Data em `text-3xl font-black`, mês em `text-[10px] font-bold tracking-[0.25em] uppercase`.
- **Badge de Hora:** Texto pequeno com cor dourada `text-[#C5A059]` e fundo semitransparente `bg-[#C5A059]/10`.
- **Harmonia Visual:** Contraste adequado entre gradiente e texto branco, bordas sutis `border-white/10`, hover states com aumento de opacidade.
- **Critérios de Aceite:**
  - Gradiente vertical deve ser suave, sem bandas visíveis.
  - Texto permanece legível em qualquer cor de fundo.
  - Badge deve destacar a hora sem competir com o título.
  - Transições suaves em hover (`transition-colors`).
- **Exemplo de Código Tailwind:**
  ```html
  <div class="flex bg-[#1E1B4B]/40 rounded-xl overflow-hidden hover:bg-[#1E1B4B]/60 transition-colors">
    <!-- Date Block -->
    <div class="bg-gradient-to-b from-[#5B21B6]/90 to-[#7C3AED]/90 w-16 flex flex-col items-center justify-center">
      <div class="text-3xl font-black text-white">12</div>
      <div class="text-[10px] font-bold tracking-[0.25em] text-white uppercase">FEV</div>
    </div>
    <!-- Detalhes -->
    <div class="flex-1 p-3">
      <div class="flex justify-between items-start">
        <h4 class="text-sm font-bold text-white leading-tight">Gira de Caboclo</h4>
        <span class="text-[10px] font-bold text-[#C5A059] bg-[#C5A059]/10 rounded px-1.5 py-0.5">19h</span>
      </div>
      <div class="flex items-center gap-1 mt-1">
        <MapPin class="w-3 h-3 text-gray-400" />
        <span class="text-xs text-gray-400 truncate">Terreiro Principal</span>
      </div>
    </div>
  </div>
  ```

### Administrativo (Deck de Métricas)
- **Estilo:** Cards translúcidos com bordas finas.
- **Métricas:** Destaque para números em branco puro contrastando com o fundo escuro.

### Axé da Semana (Feed)
- **Avatares:** Contornos com gradientes `from-primary/30 to-accent/30`.
- **Interatividade:** Hover states com mudança de cor do texto para o Dourado.

---

## 3. Sidebar "Mystical"
- **Fundo:** `#080415` (Preto azulado).
- **Indicador Ativo:** Barra lateral dourada com glow externo.
- **Perfil:** Container flutuante na base com efeito glass.

---

## 4. Tipografia
- **Fontes:** Inter / Geist (Sans-serif moderno).
- **Hierarquia:**
  - Títulos de Seção: `text-2xl font-bold uppercase tracking-widest` (sutil).
  - Boas-vindas/Eventos: `text-6xl font-bold tracking-tighter`.

---

## 5. Layout Grade de 3 Colunas (Densidade de Informação)
A partir de Fevereiro 2026, o Dashboard adota uma grade de 3 colunas com proporção 30%‑35%‑35% focada em densidade de informação e hierarquia visual, ocupando exatamente 100vh (tela única).

### Viewport Control
- **Container Principal:** `h-screen max-h-screen overflow-hidden bg-[#0F051D]` para ocupar exatamente a altura da tela com fundo roxo profundo.
- **Grade:** Grid de 3 colunas (`grid-cols-1 md:grid-cols-12`) com gap generoso (`gap-6`).

### Distribuição das Colunas
- **Coluna 1 (30% - Agenda e Comunicação):**
  - Próximos Rituais: Cards compactos com borda colorida indicando tipo de gira.
  - Mural da Casa: Alertas em balões de chat estilo WhatsApp/Glass.
  - Removido botão de "Confirmar Presença" - apenas informativo.

- **Coluna 2 (35% - Gestão e Métricas):**
  - Status do Terreiro: Visualização da "Energia do Dia" ou Orixá Regente.
  - Membros Ativos: Contador grande + gráfico mini de linha (sparkline).
  - Financeiro: Visibilidade condicional (ocultável para membros).
  - Comportamento flexível: Cards expandem verticalmente quando financeiro está oculto.

- **Coluna 3 (35% - A Comunidade):**
  - Topo (50%): Aniversariantes do Mês (Vida) com scroll interno.
  - Base (50%): Aniversários de Axé (Feitura) com design de card upgrade.
  - Cards de Membro: Avatar com anel gradiente (Roxo→Dourado), nome em Inter Bold.

### Responsividade Crítica
- **Desktop:** Sidebar fixa à esquerda.
- **Mobile (< md):** Grid vira pilha vertical, sidebar escondida, bottom bar fixa.
- **Agenda e Recados:** Transformados em carrosséis horizontais (swipe) para economizar altura.
- **Sem rolagem na página principal em desktop:** Visão total do "Painel de Controle".

### Estética "Noite de Gira" (Atualizada)
- **Fundo:** Roxo Profundo (`#0F051D`) com textura CSS de granulação (2% opacity).
- **Cores de Acento:**
  - Ouro Champagne (`#C5A059`): Ícones financeiros, datas importantes, bordas de destaque.
  - Roxo Neon (`#7C3AED`): Brilhos (glows) e elementos ativos.
- **Tipografia:** Exclusivamente Inter/Geist. Títulos em Bold, textos em Medium/Regular.
- **Glassmorphism:** Todos os containers principais com `backdrop-blur-md`, `bg-[#1E1B4B]/30` e `border-white/10`.

---

## 6. Componentes do Dashboard (Refatoração com Design System)

A partir de Fevereiro 2026, o dashboard utiliza componentes reutilizáveis que encapsulam o design aprovado, substituindo valores hardcoded por variáveis semânticas do Design System.

### Variáveis Semânticas do Design System Axé

```css
/* Adicionar ao :root no globals.css */
--axe-page: #0B0E14;           /* Fundo global - Azul Petróleo */
--axe-sidebar: #0D1117;        /* Sidebar - Azul Noturno */
--axe-card: #141A24;           /* Cards padrão - Azul Noturno Profundo */
--axe-gold: #D4AF37;           /* Dourado Champanhe */
--axe-gold-secondary: #996515; /* Ouro Velho */
--axe-text-primary: #F9F9F9;   /* Branco Marfim */
--axe-text-muted: #94A3B8;     /* Cinza Azulado */
--axe-destructive: #F43F5E;    /* Rose suave para ações destrutivas */
```

### Componente `<KPICard />`
**Propósito:** Exibir métricas principais com destaque visual (gradiente + watermark).
**Características preservadas:**
- Gradiente vibrante `from-[#4c1d95] via-[#7c3aed] to-[#d946ef]`
- Ícone Crown como watermark (opacidade 20%, posição bottom-right)
- Hierarquia visual: ícone pequeno → valor heroico (text-7xl) → subtexto
- Efeito hover: `scale-[1.02]` com transição suave
- Textura de granulação no fundo (2% opacity)

**Uso:**
```tsx
<KPICard
  value="142"
  label="Membros Ativos"
  icon={<UsersRound />}
  gradient="from-[#4c1d95] via-[#7c3aed] to-[#d946ef]"
/>
```

### Componente `<EventStrip />`
**Propósito:** Exibir eventos em formato compacto com faixa lateral colorida (Date Strip).
**Características preservadas:**
- Layout de faixa lateral ocupando toda altura (w-16 md:w-20)
- Badge de hora no canto superior direito
- Ícone MapPin com cor correspondente ao tipo de evento
- Gradientes temáticos por tipo:
  - `caboclo`: `from-[#5B21B6]/90 to-[#7C3AED]/90`
  - `ogum`: `from-[#B45309]/90 to-[#D97706]/90`
  - `limpeza`: `from-[#047857]/90 to-[#10B981]/90`

**Uso:**
```tsx
<EventStrip
  title="Gira de Caboclo"
  date="12/02"
  day="SEX"
  time="19h"
  location="Terreiro Principal"
  type="caboclo"
  month="FEV"
/>
```

### Componente `<StandardCard />`
**Propósito:** Container padrão para conteúdo estruturado (Financeiro, Listas, etc.).
**Características preservadas:**
- Fundo `#150a26` com borda `border-white/5`
- Header com ícone e título alinhados
- Decoração de fundo sutil (glow dourado no canto superior direito)
- Padding consistente (p-6)
- Altura ajustável (padrão: auto, Financeiro: h-[420px])

**Uso:**
```tsx
<StandardCard
  title="Financeiro"
  icon={<DollarSign />}
  actionButton={<Button>Ver Extrato</Button>}
  height="h-[420px]"
>
  {/* Conteúdo do card */}
</StandardCard>
```

### Princípios de Refatoração
1. **Preservação de Layout:** Geometria visual mantida idêntica
2. **Substituição de Hardcoded:** Cores hexadecimais → variáveis semânticas
3. **Consistência:** Uso uniforme do Design System em todo o dashboard
4. **Reutilização:** Componentes encapsulam padrões visuais aprovados

### Padrão de Títulos de Cards (Atualizado em Fevereiro 2026)
A partir de Fevereiro 2026, todos os títulos de cards (Financeiro, Próximos Eventos, Próximas Celebrações, Mural do Terreiro) devem seguir o mesmo formato visual para garantir consistência:

- **Fonte:** Inter (font-sans)
- **Tamanho:** `text-sm` (14px)
- **Peso:** `font-bold` (700)
- **Cor:** `text-gray-200`
- **Transformação:** `uppercase`
- **Espaçamento entre letras:** `tracking-wider`
- **Alinhamento:** flex items-center gap-2
- **Container do ícone:** `p-2 bg-[#C5A059]/10 rounded-lg flex items-center justify-center`
- **Ícone:** `w-5 h-5 text-[#C5A059]` (cor dourada --axe-gold)

**Componentes afetados:**
- `<StandardCard />` – já implementa o padrão
- Card "Próximos Eventos" – usa o mesmo padrão com container dourado
- Título "Mural do Terreiro" – aplicado no sidebar direito

**Exemplo de código:**
```tsx
<div className="flex items-center gap-2 mb-4">
  <div className="p-2 bg-[#C5A059]/10 rounded-lg flex items-center justify-center">
    <Icon className="w-5 h-5 text-[#C5A059]" />
  </div>
  <span className="text-sm font-bold text-gray-200 uppercase tracking-wider">
    Título do Card
  </span>
</div>
```

---

## 7. Premissas de Padronização (Consolidação UI)

A partir de Fevereiro 2026, todas as interfaces devem seguir estas premissas para garantir consistência visual entre sidebar, dashboard e demais componentes.

### 7.1 Cores de Fundo
- **Página (Global):** `#0B0E14` (`--axe-page`) - Azul Petróleo
- **Sidebar:** `#0D1117` (`--axe-sidebar`) - Azul Noturno
- **Cards padrão:** `#141A24` (`--axe-card`) - Azul Noturno Profundo
- **Cards secundários (eventos):** `#1E293B/40` (transparência 40%)
- **Feed lateral:** `#0D1117` (`--axe-sidebar`)

### 7.2 Bordas e Divisores
- **Borda padrão:** `border border-white/5` (opacidade 5%)
- **Borda de destaque (sidebar):** `border-white/10` (opacidade 10%)
- **Arredondamento padrão:** `rounded-2xl` (16px)
- **Arredondamento menor:** `rounded-xl` (12px)

### 7.3 Tipografia
- **Fonte primária:** Inter (font-sans)
- **Fonte secundária:** Playfair Display (font-serif) - apenas para títulos decorativos
- **Hierarquia:**
  - Títulos de seção: `text-2xl font-bold`
  - Títulos de card: `text-sm font-bold uppercase tracking-wider`
  - Texto corpo: `text-sm` ou `text-xs`
  - Números heroicos: `text-7xl font-black`

### 7.4 Espaçamentos
- **Padding de container:** `p-6` (24px)
- **Padding interno de cards:** `p-6` (24px)
- **Padding de itens de lista:** `p-3` (12px)
- **Gap entre elementos:** `gap-6` (24px) para seções, `gap-4` (16px) para grids internos

### 7.5 Efeitos Visuais
- **Glassmorphism:** `bg-white/5 backdrop-blur-md` para elementos flutuantes
- **Glow (brilho):** Usar `bg-[#C5A059]/5 blur-3xl` para efeitos dourados
- **Sombra:** `shadow-2xl shadow-primary/5` para profundidade
- **Transições:** `transition-all duration-300` para interações

### 7.6 Sidebar Específico
- **Fundo:** `#11052C` (alinhado com design system)
- **Item ativo:** Barra lateral dourada `bg-accent` com glow `shadow-[0_0_12px_rgba(217,119,6,0.9)]`
- **Item hover:** `bg-white/5` com borda `border-white/10`
- **Perfil:** `bg-white/5 backdrop-blur-md` com borda `border-white/10`

### 7.7 Dashboard Específico
- **Grid principal:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` com `gap-6`
- **Altura de cards:** `min-h-[180px]` para KPI, `h-[420px]` para Financeiro
- **Textura de fundo:** Granulação CSS com opacidade 2%

### 7.8 Uso de Variáveis CSS
Sempre preferir variáveis semânticas do Design System em vez de cores hardcoded:

```css
/* Exemplo de uso */
background-color: var(--axe-page);
border-color: rgb(255 255 255 / 0.05);
color: var(--axe-gold);
```

### 7.9 Checklist de Consistência
Antes de finalizar qualquer componente, verificar:
- [ ] Cores alinhadas com variáveis do design system
- [ ] Bordas consistentes (opacidade 5% ou 10%)
- [ ] Tipografia conforme hierarquia definida
- [ ] Espaçamentos seguindo escala do Tailwind (p-6, gap-6, etc.)
- [ ] Efeitos visuais (glassmorphism, glow) aplicados corretamente
- [ ] Estados de hover e ativo com transições suaves

---

## 8. Padrão de Avatares

A partir de Fevereiro 2026, todos os avatares na aplicação devem seguir um padrão unificado definido no componente `<Avatar />`.

### 8.1 Tamanhos Padronizados
- **Small (32px):** `w-8 h-8` - Listas densas, comentários
- **Medium (40px):** `w-10 h-10` - Header, cards de membros
- **Large (48px):** `w-12 h-12` - Perfil, destaques

### 8.2 Gradientes do Design System
- **Default:** `from-primary/50 to-accent/50` (Roxo → Dourado)
- **Purple:** `from-[#6D28D9]/60 to-[#7C3AED]/60` - Administradores
- **Gold:** `from-[#D97706]/60 to-[#F59E0B]/60` - Destaques
- **Green:** `from-[#047857]/60 to-[#10B981]/60` - Novos membros
- **Blue:** `from-[#1D4ED8]/60 to-[#3B82F6]/60` - Convidados

### 8.3 Comportamento Sem Foto
1. **Prioridade 1:** Exibir iniciais do nome (ex: "Maria Silva" → "MS")
2. **Prioridade 2:** Exibir ícone `User` (lucide-react)

### 8.4 Uso do Componente
```tsx
import Avatar from "@/components/ui/avatar";

// Com imagem
<Avatar src="/avatar.jpg" name="Maria Silva" size="md" />

// Sem imagem, com nome
<Avatar name="João Santos" size="lg" gradient="gold" />

// Grupo de avatares
import { AvatarGroup } from "@/components/ui/avatar";
<AvatarGroup avatars={[...]} max={4} size="md" />
```

### 8.5 Documentação Completa
Consulte `docs/AVATAR_PATTERN.md` para especificações detalhadas e guia de migração.

---

## 9. Responsividade e Mobile-First

O sistema segue uma abordagem **mobile-first** com breakpoints consistentes usando Tailwind CSS. Todas as interfaces são otimizadas para dispositivos móveis, tablets e desktops.

### 9.1 Breakpoints Padrão
- **xs (extra small):** < 375px - Ajustes específicos para telas muito pequenas
- **sm (small):** ≥ 640px - Smartphones em modo paisagem
- **md (medium):** ≥ 768px - Tablets
- **lg (large):** ≥ 1024px - Desktops
- **xl (extra large):** ≥ 1280px - Telas grandes

### 9.2 Padrões de Implementação

#### Grid Responsivo
```html
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
  <!-- Cards se ajustam automaticamente -->
</div>
```

#### Padding e Espaçamento
```html
<div className="p-2 xs:p-3 sm:p-4 md:p-6">
  <!-- Padding aumenta progressivamente com o tamanho da tela -->
</div>
```

#### Tipografia Responsiva
```html
<h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold">
  <!-- Tamanhos de fonte escaláveis -->
</h1>
```

### 9.3 Componentes Mobile-Otimizados

#### Sidebar
- Em mobile: Menu compacto com ícones e texto reduzido
- Em desktop: Menu expandido com navegação completa
- Transições suaves entre estados

#### Header
- Botões com tamanho mínimo de 44px para toque
- Avatar visível em todas as resoluções
- Texto condicional em botões (ex: "Sair" → ícone em mobile)

#### Cards (KPI, Eventos, Standard)
- Altura mínima responsiva: `min-h-[140px] sm:min-h-[160px] lg:min-h-[180px]`
- Textos escaláveis: `text-5xl sm:text-6xl lg:text-7xl`
- Elementos decorativos ajustáveis: `w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48`

### 9.4 CSS Global para Mobile
Regras adicionadas em `src/app/globals.css`:
- **Touch-friendly:** Elementos interativos com `min-height: 44px`
- **Prevenção de zoom iOS:** `font-size: 16px` em inputs
- **Scrollbars estilizadas:** Para melhor experiência em mobile
- **Media queries específicas:** Para telas < 375px

### 9.5 Páginas de Autenticação
- **Login/Signup:** Cards com `max-w-xs xs:max-w-sm sm:max-w-md`
- **Onboarding:** Formulário responsivo com `max-w-md xs:max-w-lg sm:max-w-xl md:max-w-2xl`
- **Inputs:** Altura mínima de 44px e fontes escaláveis

### 9.6 Componente Mobile Recados Drawer
Para dispositivos móveis, o feed de recados (normalmente na sidebar direita) é substituído por um drawer acessível via botão:
- Componente: `src/components/dashboard/mobile-recados-drawer.tsx`
- Acionamento: Botão no header (implementação futura)
- Design: Overlay escuro com animação slide-in

### 9.7 Testes de Responsividade
- Verificação com ferramentas de desenvolvedor (Chrome DevTools)
- Testes em breakpoints padrão
- Validação de TypeScript: `npx tsc --noEmit --skipLibCheck`

---

*Refatoração com Design System concluída em 10 de Fevereiro de 2026. Sistema mantém layout aprovado enquanto implementa variáveis semânticas para futura manutenção.*

*Atualização de Responsividade concluída em 11 de Fevereiro de 2026. Todas as interfaces foram otimizadas para mobile-first com breakpoints consistentes.*
