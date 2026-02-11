# Gestão Axé 2.0 – SaaS Multi‑tenant

Sistema de gestão para comunidades religiosas, escalado para um modelo SaaS multi‑tenant com isolamento de dados por organização.

## Stack Tecnológica

- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4 + Design System “Misticismo Moderno”
- **Componentes**: Shadcn UI (customizado com tema roxo/dourado)
- **Banco de Dados**: Supabase (PostgreSQL + Auth + RLS)
- **PWA**: @ducanh2912/next-pwa (desativado em desenvolvimento)
- **Ícones**: Lucide React

## Funcionalidades Implementadas

### 1. Autenticação Multi‑tenant
- Cadastro separado (`/signup`) com nome, email e senha.
- Login dedicado (`/login`) com redirecionamento para dashboard.
- Autenticação via Supabase Auth com sessão server‑side e client‑side.

### 2. Onboarding Guiado
- Barreira automática no dashboard: usuários sem `organization_id` são redirecionados para `/onboarding`.
- Wizard de 3 passos:
  1. Informações da organização (nome, descrição, setor).
  2. Configuração (plano, número de usuários).
  3. Confirmação e criação.
- Integração com Supabase: cria organização e atualiza perfil do usuário com `organization_id` e `role='owner'`.

### 3. Design System "Misticismo Moderno"
- **Cores Primárias**: Roxo profundo (`#6D28D9`) para ações principais, Dourado (`#D97706`) para destaques.
- **Tipografia**: Playfair Display (`font-serif`) para títulos, Inter (`font-sans`) para corpo.
- **Componentes**: Botões, cards, inputs e selects estilizados com as variáveis CSS do tema.
- **Cards de Eventos**: Design refinado com gradientes verticais suaves, tipografia heroica e badges suaves, seguindo critérios de harmonia visual e contraste.
- **Dashboard Unificado**: Componente "Celebrações do Mês" que unifica aniversários e tempo de casa em uma única lista cronológica, com badges diferenciados (rosa para aniversários, dourado para tempo de casa) e scroll integrado.
- **Consistência**: Todas as páginas (login, signup, onboarding, dashboard) seguem o mesmo padrão visual.

### 4. Refatoração com Design System Global (Fevereiro 2026)
Implementação de componentes reutilizáveis que preservam o layout aprovado enquanto substituem valores hardcoded por variáveis semânticas:

#### Variáveis CSS do Design System Axé
Adicionadas ao arquivo `src/app/globals.css`:
- `--axe-page: #0F051D` (Fundo global)
- `--axe-sidebar: #11052C` (Sidebar)
- `--axe-card: #150a26` (Cards padrão)
- `--axe-gold: #C5A059` (Dourado)
- `--axe-purple: #7c3aed` (Roxo principal)
- Gradientes temáticos para membros, caboclo, ogum e limpeza

#### Componentes Criados
1. **`<KPICard />`** (`src/components/dashboard/kpi-card.tsx`)
   - Exibe métricas principais com gradiente vibrante e watermark
   - Preserva layout aprovado: hierarquia visual, efeitos hover, textura de granulação
   - Props: `value`, `label`, `icon`, `gradient`, `watermarkIcon`

2. **`<EventStrip />`** (`src/components/dashboard/event-strip.tsx`)
   - Exibe eventos com faixa lateral colorida (Date Strip)
   - Mantém layout de 3 colunas com badges de hora e ícones temáticos
   - Props: `title`, `date`, `day`, `time`, `location`, `type`, `month`

3. **`<StandardCard />`** (`src/components/dashboard/standard-card.tsx`)
   - Container padrão para conteúdo estruturado (Financeiro, Listas)
   - Preserva fundo, bordas, header com ícone e glow dourado
   - Props: `title`, `icon`, `children`, `actionButton`, `height`

#### Padronização de Títulos de Cards (Fevereiro 2026)
- Todos os títulos de cards (Financeiro, Próximos Eventos, Próximas Celebrações, Mural do Terreiro) seguem o mesmo formato visual:
  - Fonte: Inter, tamanho `text-sm`, peso `font-bold`, cor `text-gray-200`, `uppercase`, `tracking-wider`
  - Ícone com container dourado: `p-2 bg-[#C5A059]/10 rounded-lg flex items-center justify-center`
  - Ícone: `w-5 h-5 text-[#C5A059]`
- Garante consistência visual em todo o dashboard.

#### Princípios de Implementação
- **Preservação de Layout**: Geometria visual mantida idêntica aos cards aprovados
- **Substituição de Hardcoded**: Cores hexadecimais → variáveis semânticas
- **Reutilização**: Componentes encapsulam padrões visuais para uso futuro
- **Documentação**: Atualizado `docs/DESIGN_SYSTEM.md` com exemplos de uso

### 4. Arquitetura SaaS
- Banco de dados com tabelas `organizations` e `profiles`.
- Row Level Security (RLS) habilitada para isolamento de dados por `organization_id`.
- Migração SQL versionada (`supabase/migrations/20260209212041_setup_saas_multi_tenant.sql`).
- Fluxo completo: signup → login → onboarding → dashboard.

### 5. Responsividade Mobile-First (Fevereiro 2026)
Implementação completa de design responsivo em toda a aplicação, seguindo abordagem mobile-first com Tailwind CSS:

#### Breakpoints Padrão
- **xs (extra small):** < 375px - Ajustes específicos para telas muito pequenas
- **sm (small):** ≥ 640px - Smartphones em modo paisagem
- **md (medium):** ≥ 768px - Tablets
- **lg (large):** ≥ 1024px - Desktops

#### Componentes Otimizados
- **Dashboard:** Grid responsivo (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)
- **Sidebar:** Padding e fontes escaláveis (`p-4 sm:p-6`, `text-sm sm:text-base`)
- **Header:** Botões touch-friendly (`min-h-[44px]`), avatar visível em mobile
- **Cards KPI:** Textos escaláveis (`text-5xl sm:text-6xl lg:text-7xl`)
- **Páginas de autenticação:** Cards com largura responsiva (`max-w-xs xs:max-w-sm sm:max-w-md`)

#### CSS Global para Mobile
- **Touch-friendly:** Elementos interativos com altura mínima de 44px
- **Prevenção de zoom iOS:** `font-size: 16px` em inputs
- **Media queries específicas:** Para telas < 375px
- **Scrollbars estilizadas:** Melhor experiência em mobile

#### Componente Mobile Recados Drawer
- **Localização:** `src/components/dashboard/mobile-recados-drawer.tsx`
- **Funcionalidade:** Drawer lateral para feed de recados em dispositivos móveis
- **Design:** Overlay escuro com animação slide-in, interface otimizada para toque

#### Testes e Validação
- Verificação com ferramentas de desenvolvedor (Chrome DevTools)
- Testes em breakpoints padrão
- Validação de TypeScript: `npx tsc --noEmit --skipLibCheck`

Para detalhes completos sobre padrões de responsividade, consulte a seção 9 do [Design System](docs/DESIGN_SYSTEM.md#9-responsividade-e-mobile-first).

## Estrutura do Projeto

```
gestao-axe-v2/
├── src/app/
│   ├── signup/page.tsx          # Página de cadastro
│   ├── login/page.tsx           # Página de login
│   ├── onboarding/page.tsx      # Wizard de onboarding (3 passos)
│   ├── dashboard/
│   │   ├── layout.tsx           # Layout com barreira de onboarding
│   │   └── page.tsx             # Dashboard principal (a desenvolver)
│   ├── layout.tsx               # Layout raiz (fontes e tema)
│   └── globals.css              # Variáveis CSS do Design System
├── src/components/ui/           # Componentes Shadcn UI (button, card, input, etc.)
├── src/lib/supabase/            # Clientes Supabase (server, client, types)
├── supabase/migrations/         # Migrações do banco de dados
├── docs/
│   ├── ARCHITECTURE.md          # Documentação da arquitetura SaaS
│   └── DESIGN_SYSTEM.md         # Especificações do Design System
└── .clinerules                  # Regras de implementação (golden rule)
```

## Configuração para Desenvolvimento

### Pré‑requisitos
- Node.js 18+
- Conta no Supabase (https://supabase.com)

### Passos

1. **Clone o repositório**
   ```bash
   git clone <repo>
   cd gestao-axe-v2
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env.local` com:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
   ```

4. **Execute as migrações no Supabase**
   - Acesse o SQL Editor do seu projeto Supabase.
   - Copie o conteúdo de `supabase/migrations/20260209212041_setup_saas_multi_tenant.sql` e execute.

5. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:3000`.

## Scripts Disponíveis

```bash
npm run dev       # Inicia servidor de desenvolvimento (com Turbopack)
npm run build     # Build de produção (verifica TypeScript)
npm run start     # Inicia servidor de produção
npm run lint      # Executa ESLint (se configurado)
```

## Acessibilidade Mobile

O sistema agora inclui um menu lateral responsivo que se adapta a dispositivos móveis:

- **Desktop (> 1024px)**: Sidebar fixa à esquerda.
- **Mobile (< 1024px)**: Sidebar oculta; um botão de hambúrguer no header permite abrir um drawer sobreposto.

**Funcionalidades implementadas**:
- Botão de menu no header visível apenas em mobile.
- Drawer com overlay que pode ser fechado tocando fora ou no botão "X".
- Navegação completa entre as páginas do dashboard (Início, Membros, Eventos, Financeiro, Configurações).
- Estado de drawer gerenciado localmente no componente Header.

**Como usar**:
1. Em uma tela pequena, clique no ícone de menu (três linhas) no canto superior esquerdo.
2. O drawer abrirá com as opções de navegação.
3. Toque em qualquer opção para navegar ou toque fora do drawer para fechar.

## Correções de Layout

### Botão de enviar no mural (Fevereiro 2026)

O botão de enviar mensagem no mural (sidebar direita e mobile drawer) estava com problemas de alinhamento vertical e sobreposição de texto. Foram realizados os seguintes ajustes:

- **Aumento do padding direito** do input (`pr-14`) para garantir espaço adequado.
- **Botão com tamanho fixo** (`w-10 h-10`) e ícone centralizado (`flex items-center justify-center`).
- **Posicionamento refinado** (`right-3`, `top-1/2`, `-translate-y-1/2`) para alinhamento vertical preciso.
- **Ícone maior** (`w-5 h-5`) para melhor visibilidade.

Essas alterações garantem que o texto digitado não fique atrás do botão e que o ícone fique perfeitamente centralizado, seguindo os princípios do Design System.

## Solução de Problemas

### Erro de TypeScript ao construir no Vercel

Se você encontrar um erro de TypeScript como:

```
Type error: No overload matches this call.
  Argument of type '"filhos_de_santo"' is not assignable to parameter of type '"organizations" | "profiles"'.
```

Isso significa que a tabela referenciada não existe no banco de dados ou os tipos do Supabase estão desatualizados.

**Solução**:

1. **Verifique se a tabela existe**:
   - Acesse o SQL Editor do Supabase e execute `SELECT * FROM information_schema.tables WHERE table_name = 'filhos_de_santo';`
   - Se não existir, crie a tabela via migração ou altere o código para usar uma tabela existente (ex.: `organizations`).

2. **Atualize os tipos do Supabase**:
   ```bash
   npx supabase gen types typescript --project-id <seu-project-id> --schema public > src/lib/supabase/types.ts
   ```
   Substitua `<seu-project-id>` pelo ID do seu projeto (extraído da URL do Supabase).

3. **Corrija o código**:
   - No exemplo `src/app/exemplo-supabase/page.tsx`, substitua `"filhos_de_santo"` por `"organizations"`.

**Prevenção**:
- Sempre gere os tipos após criar/alterar tabelas.
- Mantenha os tipos atualizados no repositório.
- Use tabelas existentes em exemplos de código.

Para mais detalhes, consulte a seção [Erros Comuns e Soluções](docs/ARCHITECTURE.md#erros-comuns-e-soluções) na documentação de arquitetura.

## Próximos Passos (Roadmap)

1. **Gerar tipos do Supabase** – Corrigir erros de TypeScript (`supabase gen types`).
2. **Desenvolver dashboard** – Criar widgets e funcionalidades específicas por organização.
3. **Implementar CRUD de entidades** – Filhos de santo, consultas, contribuições.
4. **Adicionar testes** – Unitários e de integração para fluxos críticos.
5. **Configurar deploy automatizado** – Vercel com variáveis de ambiente.

## Documentação Relacionada

- [Arquitetura SaaS](docs/ARCHITECTURE.md) – Detalhes técnicos da implementação multi‑tenant.
- [Design System](docs/DESIGN_SYSTEM.md) – Paleta, tipografia e componentes.
- [Regras do Projeto](.clinerules) – Diretrizes críticas para desenvolvimento.

## Licença

Uso interno da comunidade religiosa.
