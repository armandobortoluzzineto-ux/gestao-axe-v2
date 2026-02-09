# Gestão Axé 2.0

Sistema de gestão para comunidades religiosas – construído com Next.js 14+, TypeScript, Tailwind CSS, Shadcn UI e PWA.

## Stack Tecnológica

- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Componentes**: Shadcn UI (tema Slate)
- **PWA**: @ducanh2912/next-pwa (desativado em desenvolvimento)
- **Ícones**: Lucide React (pronto para uso)

## Configurações Realizadas

1. **Next.js** criado com:
   - TypeScript
   - Tailwind CSS
   - App Router
   - src directory
   - Import alias `@/*`

2. **Shadcn UI** inicializado com tema **Slate**:
   - `components.json` configurado
   - Utils em `src/lib/utils.ts`
   - CSS variables atualizadas em `src/app/globals.css`

3. **PWA** configurado em `next.config.ts`:
   - Plugin `@ducanh2912/next-pwa`
   - Desabilitado em `NODE_ENV === "development"`
   - Destino: `public`
   - Registro automático

4. **Manifest** básico em `public/manifest.json`:
   - Nome: "Gestão Axé"
   - Tema: `#ffffff`
   - Display: `standalone`
   - Ícones placeholder (192x192, 512x512)

5. **Página inicial** limpa:
   - Título "Gestão Axé 2.0 - Em Construção"
   - Design gradiente com Slate
   - Indicador de progresso

## Scripts Disponíveis

```bash
npm run dev       # Inicia servidor de desenvolvimento (com Turbopack)
npm run build     # Build de produção (verifica TypeScript)
npm run start     # Inicia servidor de produção
npm run lint      # Executa ESLint (se configurado)
```

## Próximos Passos Recomendados

1. **Adicionar componentes Shadcn UI**:
   ```bash
   npx shadcn@latest add button
   npx shadcn@latest add card
   npx shadcn@latest add dialog
   ```

2. **Configurar ícones reais**:
   - Substituir `/icon-192.png` e `/icon-512.png` em `public/`
   - Gerar favicon e apple-touch-icon

3. **Configurar ambiente Supabase**:
   - Criar projeto em [supabase.com](https://supabase.com)
   - Adicionar variáveis `.env.local`
   - Instalar `@supabase/supabase-js`

4. **Implementar autenticação**:
   - Usar NextAuth.js ou Supabase Auth
   - Criar páginas de login/proteção

5. **Desenvolver funcionalidades**:
   - Cadastro de Filhos de Santo
   - Agendamento de Consultas
   - Gestão de Mensalidades/Contribuições
   - Dashboard administrativo

## Regras do Projeto

Consulte o arquivo [.clinerules](.clinerules) para diretrizes críticas sobre:
- Preservação do sistema atual
- Padrões Supabase & RLS
- Comportamento do Roo Code
- Contexto religioso e de negócio
- Integração Vercel

## Licença

Uso interno da comunidade religiosa.
