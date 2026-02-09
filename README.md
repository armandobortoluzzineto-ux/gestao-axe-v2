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

### 3. Design System “Misticismo Moderno”
- **Cores Primárias**: Roxo profundo (`#6D28D9`) para ações principais, Dourado (`#D97706`) para destaques.
- **Tipografia**: Playfair Display (`font-serif`) para títulos, Inter (`font-sans`) para corpo.
- **Componentes**: Botões, cards, inputs e selects estilizados com as variáveis CSS do tema.
- **Consistência**: Todas as páginas (login, signup, onboarding, dashboard) seguem o mesmo padrão visual.

### 4. Arquitetura SaaS
- Banco de dados com tabelas `organizations` e `profiles`.
- Row Level Security (RLS) habilitada para isolamento de dados por `organization_id`.
- Migração SQL versionada (`supabase/migrations/20260209212041_setup_saas_multi_tenant.sql`).
- Fluxo completo: signup → login → onboarding → dashboard.

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
