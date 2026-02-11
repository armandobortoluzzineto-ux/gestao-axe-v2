# Plano de Migração - Padronização de Avatares

## Objetivo
Atualizar todos os componentes existentes para usar o novo componente `Avatar` padronizado, eliminando inconsistências visuais.

## Componentes a Atualizar

### 1. Header (`src/components/dashboard/header.tsx`)
**Situação atual**: Avatar customizado com inicial em div
**Mudanças necessárias**:
- Importar componente `Avatar`
- Substituir div customizada por `<Avatar>`
- Passar `src` (avatar_url), `name` (userName), `size="md"`
- Manter comportamento de loading

**Código atual** (linhas 78-84):
```tsx
<div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
  {loading ? (
    <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
  ) : (
    <span className="font-bold text-primary text-sm sm:text-base">{userInitial}</span>
  )}
</div>
```

**Código proposto**:
```tsx
<Avatar
  src={profile?.avatar_url}
  name={userName}
  size="md"
  bordered={true}
  gradient="default"
/>
```

### 2. Sidebar (`src/components/dashboard/sidebar.tsx`)
**Situação atual**: Avatar com gradiente fixo e ícone User
**Mudanças necessárias**:
- Importar componente `Avatar`
- Substituir div complexa por `<Avatar>`
- Passar `name="Armando"`, `size="lg"`, `gradient="purple"`
- Remover borda (`bordered={false}`)

**Código atual** (linhas 62-66):
```tsx
<div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 p-[1.5px]">
  <div className="h-full w-full rounded-full bg-[#080415] flex items-center justify-center">
    <User className="h-4.5 w-4.5 text-white/80" />
  </div>
</div>
```

**Código proposto**:
```tsx
<Avatar
  name="Armando"
  size="lg"
  gradient="purple"
  bordered={false}
/>
```

### 3. Dashboard - Aniversários (`src/app/dashboard/page.tsx`)
**Situação atual**: Avatar com gradiente personalizado (`corAvatar`) e inicial
**Mudanças necessárias**:
- Importar componente `Avatar`
- Substituir div com gradiente dinâmico
- Mapear `corAvatar` para gradiente do Design System
- Passar `name={evento.nome}`, `size="md"`

**Código atual** (linhas 216-218):
```tsx
<div className={`w-10 h-10 rounded-full bg-gradient-to-br ${evento.corAvatar} flex items-center justify-center text-white text-xs font-bold`}>
  {evento.avatar}
</div>
```

**Código proposto**:
```tsx
<Avatar
  name={evento.nome}
  size="md"
  gradient={mapCorAvatarToGradient(evento.corAvatar)}
/>
```

**Função de mapeamento**:
```typescript
const mapCorAvatarToGradient = (corAvatar: string): AvatarProps["gradient"] => {
  if (corAvatar.includes("pink") || corAvatar.includes("purple")) return "purple";
  if (corAvatar.includes("amber") || corAvatar.includes("orange")) return "gold";
  if (corAvatar.includes("emerald") || corAvatar.includes("teal")) return "green";
  if (corAvatar.includes("blue") || corAvatar.includes("cyan")) return "blue";
  return "default";
};
```

### 4. Dashboard - Recados (`src/app/dashboard/page.tsx`)
**Situação atual**: Avatar com gradiente dourado e iniciais do nome
**Mudanças necessárias**:
- Importar componente `Avatar`
- Substituir div com gradiente fixo
- Passar `name={recado.autor}`, `size="sm"`, `gradient="gold"`

**Código atual** (linhas 260-262):
```tsx
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C5A059] to-[#705020] flex items-center justify-center text-xs font-bold text-white ring-2 ring-[#0F051D]">
  {recado.autor.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2)}
</div>
```

**Código proposto**:
```tsx
<Avatar
  name={recado.autor}
  size="sm"
  gradient="gold"
  bordered={false}
/>
```

## Ordem de Implementação

1. **Criar componente `Avatar`** ✅
   - Arquivo: `src/components/ui/avatar.tsx`
   - Status: Pronto para implementação

2. **Atualizar Header** 
   - Impacto: Baixo (apenas visual)
   - Risco: Baixo
   - Dependências: Nenhuma

3. **Atualizar Sidebar**
   - Impacto: Baixo (apenas visual)
   - Risco: Baixo
   - Dependências: Nenhuma

4. **Atualizar Dashboard - Aniversários**
   - Impacto: Médio (requer mapeamento de cores)
   - Risco: Médio
   - Dependências: Componente Avatar

5. **Atualizar Dashboard - Recados**
   - Impacto: Baixo
   - Risco: Baixo
   - Dependências: Componente Avatar

## Testes Necessários

### Testes Visuais
- [ ] Avatar com imagem carrega corretamente
- [ ] Avatar sem imagem mostra iniciais
- [ ] Avatar sem imagem e sem nome mostra ícone User
- [ ] Todos os tamanhos (sm, md, lg) renderizam corretamente
- [ ] Todos os gradientes têm contraste adequado
- [ ] Borda aparece quando `bordered={true}`

### Testes Funcionais
- [ ] Header mantém funcionalidade de loading
- [ ] Sidebar mantém estilo glassmorphism
- [ ] Aniversários mantém cores temáticas
- [ ] Recados mantém estilo de chat

### Testes de Responsividade
- [ ] Avatares escalam corretamente em mobile
- [ ] Header adapta tamanho do avatar em tablets
- [ ] Sidebar mantém proporções em diferentes telas

## Rollback Plan
Se problemas ocorrerem:
1. Reverter commits individualmente
2. Manter componente `Avatar` para uso futuro
3. Restaurar código original nos 4 componentes

## Cronograma Estimado
1. Implementação do componente: 1 hora
2. Atualização dos 4 componentes: 2 horas
3. Testes e ajustes: 1 hora
4. Documentação final: 30 minutos

## Métricas de Sucesso
- [ ] Todos os avatares seguem padrão visual único
- [ ] Nenhum regressão visual identificada
- [ ] Código mais limpo e reutilizável
- [ ] Documentação atualizada
- [ ] Feedback positivo da equipe

---

*Plano criado em 11 de Fevereiro de 2026 para padronização de avatares no Gestão Axé.*