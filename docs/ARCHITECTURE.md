# Arquitetura SaaS Multi‑tenant – Gestão Axé 2.0

Este documento descreve a arquitetura técnica do sistema após a escalação para um modelo SaaS multi‑tenant.

## Visão Geral

O sistema foi transformado de uma aplicação single‑tenant para um modelo SaaS onde cada organização (tenant) possui seus dados isolados, com autenticação centralizada e fluxo de onboarding.

### Pilares da Arquitetura

1. **Multi‑tenancy por organização** – Cada organização tem seu próprio espaço de dados, isolado via `organization_id`.
2. **Row Level Security (RLS)** – Políticas de segurança no banco garantem que usuários acessem apenas dados da sua organização.
3. **Onboarding guiado** – Novos usuários passam por um wizard de 3 passos para criar sua organização.
4. **Design System consistente** – Interface unificada com tema “Misticismo Moderno” (roxo/dourado, Playfair Display/Inter).
5. **Separação de telas de autenticação** – Login e cadastro são páginas independentes.

## Componentes Principais

### 1. Banco de Dados (Supabase)

#### Tabelas Core

- **`organizations`** – Dados do terreiro (nome, slug, dirigente, data_fundacao, endereco_completo, logo_url).
- **`profiles`** – Extensão da tabela `auth.users` com `organization_id` e `role`.
- **Demais tabelas de negócio** – Todas devem incluir `organization_id` para isolamento.

#### Migrações

1. `20260209212041_setup_saas_multi_tenant.sql` – cria as tabelas básicas e políticas RLS.
2. `20260209215403_add_terreiro_fields.sql` – adiciona campos específicos de terreiro (dirigente, data_fundacao, endereco_completo) e remove colunas não utilizadas.

#### Políticas RLS

- `profiles`: usuários só podem ler/atualizar seu próprio perfil.
- `organizations`: apenas owners/admin podem gerenciar sua organização.
- Demais tabelas: filtro automático por `organization_id`.

### 2. Autenticação & Autorização

- **Biblioteca**: `@supabase/ssr` (server‑side e browser‑side).
- **Fluxo**:
  1. Cadastro (`/signup`) → cria usuário no Supabase Auth.
  2. Login (`/login`) → autentica e redireciona para `/dashboard`.
  3. Barreira de onboarding (`/dashboard/layout.tsx`) → verifica se o perfil possui `organization_id`.
  4. Se não tiver, redireciona para `/onboarding`.
  5. Após criar organização, atualiza o perfil com `organization_id` e `role='owner'`.

### 3. Frontend (Next.js App Router)

#### Estrutura de Rotas

```
src/app/
├── signup/page.tsx          # Cadastro de novo usuário
├── login/page.tsx           # Login (apenas credenciais)
├── onboarding/page.tsx      # Formulário único para cadastro do terreiro (nome, dirigente, data de fundação, endereço)
├── dashboard/
│   ├── layout.tsx           # Barreira de onboarding + sidebar
│   └── page.tsx             # Dashboard principal (a ser desenvolvido)
└── exemplo-supabase/page.tsx # Página de exemplo (legado)
```

#### Componentes

- **Server Components** para lógica de autenticação e dados (ex: `dashboard/layout.tsx`).
- **Client Components** para interatividade (formulários, toggles).
- **Shadcn UI** com customização do tema (cores roxo/dourado).

#### Tratamento de Erros

- **Erros de API**: As chamadas ao Supabase devem capturar erros e exibir mensagens amigáveis via toast (usando `sonner`).
- **Log detalhado**: Em desenvolvimento, os erros são logados no console com detalhes completos (message, details, hint, code) para facilitar debugging.
- **Validação de formulários**: Campos obrigatórios são validados no cliente antes da submissão, com feedback visual.
- **Exemplo**: No formulário de onboarding (`/onboarding`), erros de duplicidade de slug, RLS ou falhas de rede são tratados e exibidos ao usuário.

### 4. Design System

#### Cores (Variáveis CSS)

- `--primary`: `#6D28D9` (roxo profundo) – ações principais.
- `--accent`: `#D97706` (dourado) – destaques, badges.
- `--background`, `--foreground`, `--card`, etc. definidos em `globals.css`.

#### Tipografia

- **Títulos**: Playfair Display (`font-serif`).
- **Corpo**: Inter (`font-sans`).

#### Componentes Themed

- Botões usam `bg-primary` por padrão.
- Cards com borda `border-primary/20`.
- Indicadores de passo usam `bg-primary` (ativo) e `bg-accent` (completo).

## Fluxo de Usuário

```mermaid
graph TD
    A[Visitante] --> B{Conta existente?}
    B -->|Não| C[/signup]
    B -->|Sim| D[/login]
    C --> E[Autenticação Supabase]
    D --> E
    E --> F[/dashboard]
    F --> G{Perfil tem organization_id?}
    G -->|Não| H[/onboarding]
    G -->|Sim| I[Dashboard principal]
    H --> I
```

## Decisões Técnicas

### 1. Multi‑tenancy por `organization_id`

- Todas as queries devem incluir `organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())`.
- RLS garante isolamento mesmo se a query esquecer do filtro.

### 2. Onboarding como barreira

- Implementado no `dashboard/layout.tsx` como um `redirect` condicional.
- Evita que usuários acessem funcionalidades sem organização.

### 3. Separação de telas de autenticação

- Login e signup são páginas independentes para melhor UX e manutenção.
- Ambas seguem o Design System.

### 4. Tipos TypeScript

- Os tipos do Supabase ainda não foram gerados (erros de `never`).
- **Ação futura**: executar `supabase gen types` para gerar tipos corretos.

## Próximos Passos (Roadmap)

1. **Gerar tipos do Supabase** – Corrigir erros de TypeScript nas queries.
2. **Desenvolver dashboard** – Criar widgets e funcionalidades por organização.
3. **Implementar CRUD de entidades** – Filhos de santo, consultas, contribuições.
4. **Adicionar testes** – Unitários e de integração para fluxos críticos.
5. **Configurar deploy automatizado** – Vercel com variáveis de ambiente.

## Referências

- [Design System](DESIGN_SYSTEM.md) – Detalhes visuais.
- [.clinerules](.clinerules) – Regras de implementação.
- [Supabase Docs](https://supabase.com/docs) – RLS, autenticação, migrações.