# Plano de Melhorias para o Dashboard

## Contexto
O usuário solicitou três ajustes visuais/funcionais no dashboard:

1. **Card Financeiro**: Ajustar o espaçamento interno (padding) superior para igualar ao inferior.
2. **Mural do Terreiro**: Adicionar um ícone de chat ao título.
3. **Título Principal**: Substituir "Visão Geral" por uma mensagem de boas-vindas personalizada com a data atual.

## Análise Técnica

### 1. Card Financeiro (linha 172)
- **Problema**: O padding superior parece menor que o inferior devido à estrutura do card.
- **Solução**: Ajustar a classe `p-6` para garantir padding uniforme. O card já tem `p-6` em todas as direções, mas o header tem `mb-6` que pode estar comprimindo. Podemos reduzir o `mb-6` do header ou adicionar padding-top extra.
- **Localização**: `src/app/dashboard/page.tsx` linha 172.

### 2. Mural do Terreiro (linha 314)
- **Problema**: O título "Mural do Terreiro" não tem ícone.
- **Solução**: Adicionar o ícone `MessageSquare` (já importado) ao lado do texto.
- **Localização**: `src/app/dashboard/page.tsx` linha 314.

### 3. Título Principal (linha 64)
- **Problema**: O título "Visão Geral" é genérico.
- **Solução**: Substituir por "Bem-vindo, [Nome do Usuário]!" com a data formatada.
- **Dados do usuário**: O componente `Header` já busca o nome do usuário via Supabase (perfil `full_name` ou metadata). Podemos replicar essa lógica no `DashboardPage` ou passar como prop.
- **Data atual**: Formatar em português (ex: "10 de fevereiro de 2026").

## Plano de Implementação

### Passo 1: Ajuste do Card Financeiro
- Modificar a linha 178: reduzir `mb-6` para `mb-4` ou ajustar padding geral.
- Verificar se há necessidade de ajuste no padding superior do container.

### Passo 2: Ícone no Mural do Terreiro
- Modificar a linha 314: `<h2 className="font-bold text-white">Mural do Terreiro</h2>` para incluir `<MessageSquare className="w-5 h-5 mr-2" />`.
- Garantir que o ícone esteja alinhado verticalmente.

### Passo 3: Mensagem de Boas-vindas
- Adicionar estado para `userName` e `currentDate` no componente `DashboardPage`.
- Buscar o perfil do usuário usando `supabase.auth.getUser()` e `supabase.from("profiles").select("full_name")`.
- Formatar a data com `new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })`.
- Substituir o título na linha 64.

### Passo 4: Testes
- Verificar visualmente o padding do card financeiro.
- Confirmar que o ícone aparece corretamente.
- Validar que o nome do usuário e data são exibidos.

## Considerações Técnicas

### Autenticação
- O dashboard já é protegido pelo `DashboardLayout` que verifica autenticação.
- O componente `Header` já implementa a busca do nome do usuário; podemos reutilizar essa lógica ou criar um hook customizado.

### Performance
- A busca do perfil deve ser feita apenas uma vez (useEffect).
- Considerar usar `React.Suspense` se necessário.

### Design System
- Manter cores do tema (roxo #6D28D9, dourado #D97706).
- Usar tipografia consistente (Playfair Display para títulos, Inter para corpo).

## Arquivos a Modificar
1. `src/app/dashboard/page.tsx` - principais alterações
2. (Opcional) `src/lib/supabase/client.ts` - já existe

## Riscos
- A busca do perfil pode falhar se o usuário não tiver `full_name`; fallback para email.
- Timezone da data: usar UTC-3 (America/Sao_Paulo).

## Próximos Passos
1. Implementar as mudanças no modo "Code".
2. Testar localmente.
3. Atualizar documentação se necessário (conforme .clinerules).