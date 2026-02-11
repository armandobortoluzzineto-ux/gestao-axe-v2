# Plano de Refatoração com Preservação de Layout (Design System)

## Objetivo
Implementar o Design System global mantendo a estrutura visual (layout) dos cards aprovados, substituindo apenas cores e espaçamentos "hardcoded" pelas novas variáveis do Design System.

## Diretriz de Segurança Crítica
⚠️ **REGRA DE OURO**: NÃO ALTERAR A ESTRUTURA VISUAL (LAYOUT) DOS CARDS APROVADOS. O usuário já aprovou o layout interno dos cards (especialmente o "Date Strip" dos Eventos e o "Gradiente Watermark" dos Membros). O trabalho é apenas substituir as cores e espaçamentos "hardcoded" pelas novas variáveis do Design System, mantendo a geometria visual idêntica.

## Análise do Estado Atual

### 1. Cores Atuais Identificadas no Dashboard
- `#0F051D` - Fundo global (Roxo Deep Space)
- `#11052C` - Sidebar
- `#150a26` - Cards padrão
- `#C5A059` - Dourado (gold)
- `#7c3aed` - Roxo principal e variações para gradientes
- `#4c1d95` → `#7c3aed` → `#d946ef` - Gradiente do card de Membros
- `#5B21B6` → `#7C3AED` - Gradiente para eventos tipo "caboclo"
- `#B45309` → `#D97706` - Gradiente para eventos tipo "ogum"
- `#047857` → `#10B981` - Gradiente para eventos tipo "limpeza"

### 2. Componentes Atuais no Dashboard
1. **Card de Membros Ativos**: Gradiente vibrante com ícone Crown como watermark
2. **Card de Próximos Eventos**: Grid de 3 colunas com faixa lateral colorida (Date Strip)
3. **Card Financeiro**: Container padrão com métricas de saldo
4. **Card Celebrações**: Lista de aniversários e tempo de casa

## Plano de Implementação

### 1. Configurar Variáveis Semânticas no globals.css

Adicionar as seguintes variáveis CSS customizadas na seção `:root` do arquivo `src/app/globals.css`:

```css
/* Variáveis do Design System Axé */
--axe-page: #0F051D;
--axe-sidebar: #11052C;
--axe-card: #150a26;
--axe-gold: #C5A059;
--axe-purple: #7c3aed;
--axe-purple-light: #8b5cf6;
--axe-purple-dark: #5b21b6;
--axe-gradient-members: linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #d946ef 100%);
--axe-gradient-caboclo: linear-gradient(to bottom, #5B21B6 0%, #7C3AED 100%);
--axe-gradient-ogum: linear-gradient(to bottom, #B45309 0%, #D97706 100%);
--axe-gradient-limpeza: linear-gradient(to bottom, #047857 0%, #10B981 100%);
```

### 2. Criar Componentes que "Espelham" o Design Atual

#### Componente 1: `<KPICard />`
**Localização**: `src/components/dashboard/kpi-card.tsx`
**Propriedades**:
- `value: string | number` - Valor principal (ex: "142")
- `label: string` - Rótulo (ex: "Membros Ativos")
- `icon: React.ReactNode` - Ícone Lucide React
- `gradient?: string` - Classe CSS para gradiente (padrão: gradiente dos membros)
- `watermarkIcon?: React.ReactNode` - Ícone de watermark (padrão: Crown)

**Características de preservação**:
- Manter exatamente o layout atual: gradiente de fundo, posicionamento do watermark
- Ícone pequeno no topo, valor heroico (text-7xl), subtexto contextual
- Efeitos hover: `hover:scale-[1.02]`
- Textura de granulação no fundo

#### Componente 2: `<EventStrip />`
**Localização**: `src/components/dashboard/event-strip.tsx`
**Propriedades**:
- `title: string` - Título do evento
- `date: string` - Data formatada (ex: "12/02")
- `day: string` - Dia da semana (ex: "SEX")
- `time: string` - Hora (ex: "19h")
- `location: string` - Local
- `type: 'caboclo' | 'ogum' | 'limpeza' | 'default'` - Tipo que define cores
- `month?: string` - Mês abreviado (ex: "FEV")

**Características de preservação**:
- Layout de faixa lateral (width: 16-20) ocupando toda altura
- Badge de hora no canto superior direito
- Ícone MapPin com cor correspondente ao tipo
- Hover states com bordas sutis

#### Componente 3: `<StandardCard />`
**Localização**: `src/components/dashboard/standard-card.tsx`
**Propriedades**:
- `title: string` - Título do card
- `icon: React.ReactNode` - Ícone do cabeçalho
- `children: React.ReactNode` - Conteúdo do card
- `actionButton?: React.ReactNode` - Botão de ação (opcional)
- `height?: string` - Altura customizada (padrão: auto)
- `className?: string` - Classes adicionais

**Características de preservação**:
- Fundo `#150a26` com borda `border-white/5`
- Header com ícone e título alinhados
- Decoração de fundo sutil (glow dourado)
- Padding consistente (p-6)

### 3. Refatorar o Dashboard (page.tsx)

**Estratégia de substituição**:
1. **Card de Membros**: Substituir por `<KPICard value="142" label="Membros Ativos" icon={<UsersRound />} />`
2. **Card de Eventos**: Manter grid de 3 colunas, substituir cada item por `<EventStrip />`
3. **Card Financeiro**: Usar `<StandardCard>` com conteúdo interno atual
4. **Card Celebrações**: Usar `<StandardCard>` com lista interna atual

**Regras de preservação**:
- Manter todas as dimensões: `h-[420px]`, `min-h-[180px]`, etc.
- Manter todos os espaçamentos: `gap-4`, `p-6`, `mb-4`, etc.
- Manter todas as animações e transições
- Manter a estrutura de grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

### 4. Testes de Preservação Visual

**Critérios de aceitação**:
1. Print "antes vs depois" deve mostrar design 99% idêntico
2. Cores devem ser mais consistentes (usando variáveis)
3. Nenhuma mudança na geometria dos elementos
4. Todos os hover states funcionando
5. Responsividade mantida

### 5. Documentação

**Atualizações necessárias no `docs/DESIGN_SYSTEM.md`**:
1. Adicionar seção "Componentes do Dashboard"
2. Documentar as variáveis CSS do Design System
3. Incluir exemplos de uso dos novos componentes
4. Adicionar guia de migração para futuros desenvolvedores

## Cronograma de Implementação

1. **Fase 1**: Criar variáveis CSS no globals.css
2. **Fase 2**: Implementar componentes (KPICard, EventStrip, StandardCard)
3. **Fase 3**: Refatorar dashboard/page.tsx
4. **Fase 4**: Testes visuais e ajustes
5. **Fase 5**: Documentação

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Alteração involuntária do layout | Usar ferramentas de diff visual, manter todas as classes de dimensão |
| Quebra de responsividade | Testar em breakpoints (mobile, tablet, desktop) |
| Perda de funcionalidade | Manter todas as props e estados existentes |
| Inconsistência de cores | Criar paleta centralizada e usar variáveis CSS |

## Benefícios Esperados

1. **Código mais limpo**: Remoção de valores hardcoded
2. **Manutenibilidade**: Centralização das definições de design
3. **Consistência**: Uso de variáveis semânticas em todo o projeto
4. **Extensibilidade**: Fácil criação de novos componentes seguindo o padrão
5. **Documentação**: Referência clara para futuros desenvolvedores

---

*Plano criado em 10 de Fevereiro de 2026 - Modo Architect*