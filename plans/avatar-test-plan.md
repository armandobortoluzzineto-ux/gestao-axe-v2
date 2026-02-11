# Plano de Testes - Padronização de Avatares

## Objetivo
Validar que a implementação do componente `Avatar` e a migração dos componentes existentes funcionam corretamente em todos os cenários.

## Escopo de Testes

### 1. Testes do Componente `Avatar`

#### 1.1 Renderização Básica
- [ ] Componente renderiza sem erros
- [ ] Props padrão aplicados corretamente
- [ ] Classes CSS aplicadas conforme esperado

#### 1.2 Tamanhos
- [ ] `size="sm"` renderiza com 32px (w-8 h-8)
- [ ] `size="md"` renderiza com 40px (w-10 h-10)
- [ ] `size="lg"` renderiza com 48px (w-12 h-12)

#### 1.3 Estados com Imagem
- [ ] Imagem válida carrega e exibe corretamente
- [ ] `alt` text usa `name` quando disponível
- [ ] Imagem cobre todo o avatar (`object-cover`)
- [ ] Erro de carregamento cai para fallback

#### 1.4 Estados sem Imagem
- [ ] Com `name`: exibe iniciais (ex: "Maria Silva" → "MS")
- [ ] Nome curto: exibe primeira letra (ex: "João" → "J")
- [ ] Sem `name`: exibe ícone `User`
- [ ] Ícone tem tamanho proporcional

#### 1.5 Gradientes
- [ ] `gradient="default"`: roxo→dourado
- [ ] `gradient="purple"`: roxo profundo
- [ ] `gradient="gold"`: dourado sagrado
- [ ] `gradient="green"`: verde axé
- [ ] `gradient="blue"`: azul profundo

#### 1.6 Bordas
- [ ] `bordered={true}`: mostra borda `border-white/10`
- [ ] `bordered={false}`: sem borda
- [ ] Borda não interfere no conteúdo

### 2. Testes do Componente `AvatarGroup`

#### 2.1 Renderização
- [ ] Renderiza múltiplos avatares
- [ ] Aplica espaçamento negativo (`spacing`)
- [ ] Limita número com `max`

#### 2.2 Comportamento
- [ ] Avatares sobrepostos corretamente
- [ ] Contador "+X" aparece quando excede `max`
- [ ] Contador tem estilo consistente

### 3. Testes de Integração

#### 3.1 Header (`src/components/dashboard/header.tsx`)
- [ ] Avatar aparece no canto superior direito
- [ ] Loading state funciona (ícone User)
- [ ] Com dados: mostra inicial ou imagem
- [ ] Responsividade: esconde/mostra conforme breakpoint
- [ ] Borda visível (`border-primary/20`)

#### 3.2 Sidebar (`src/components/dashboard/sidebar.tsx`)
- [ ] Avatar no perfil inferior
- [ ] Gradiente roxo aplicado
- [ ] Sem borda (`bordered={false}`)
- [ ] Tamanho large (48px)
- [ ] Integração com glassmorphism

#### 3.3 Dashboard - Aniversários (`src/app/dashboard/page.tsx`)
- [ ] Avatares em lista de aniversários
- [ ] Mapeamento de `corAvatar` para gradiente
- [ ] Tamanho medium (40px)
- [ ] Iniciais corretas dos nomes
- [ ] Integração com hover states

#### 3.4 Dashboard - Recados (`src/app/dashboard/page.tsx`)
- [ ] Avatares no feed de mensagens
- [ ] Gradiente dourado aplicado
- [ ] Tamanho small (32px)
- [ ] Iniciais do autor
- [ ] Integração com balões de chat

### 4. Testes de Responsividade

#### 4.1 Breakpoints
- [ ] Mobile (< 640px): avatares ajustam tamanho
- [ ] Tablet (640px-1024px): layout adaptativo
- [ ] Desktop (> 1024px): layout completo

#### 4.2 Componentes Específicos
- [ ] Header: avatar visível apenas em tablets+
- [ ] Sidebar: avatar mantém proporções
- [ ] Dashboard: grids adaptam espaçamento

### 5. Testes de Acessibilidade

#### 5.1 Semântica
- [ ] Imagens têm `alt` text apropriado
- [ ] Elementos não visuais têm `aria-hidden`
- [ ] Contraste de cores adequado

#### 5.2 Navegação
- [ ] Foco visível em elementos interativos
- [ ] Ordem de tabulação lógica
- [ ] Screen readers anunciam corretamente

### 6. Testes de Performance

#### 6.1 Carregamento
- [ ] Imagens usam lazy loading
- [ ] Fallback rápido quando imagem falha
- [ ] Sem layout shift

#### 6.2 Memória
- [ ] Event listeners limpos adequadamente
- [ ] Sem memory leaks
- [ ] Estado gerencia erro de imagem

## Métodos de Teste

### Testes Manuais
1. **Navegação visual**: Verificar cada componente em diferentes estados
2. **Responsividade**: Redimensionar janela e testar breakpoints
3. **Cenários de erro**: URLs de imagem inválidas, nomes vazios

### Testes Automatizados (Futuro)
```typescript
// Exemplo de teste com Testing Library
describe('Avatar', () => {
  it('renders initials when no image provided', () => {
    render(<Avatar name="Maria Silva" />);
    expect(screen.getByText('MS')).toBeInTheDocument();
  });
});
```

## Ambiente de Teste

### Navegadores
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Dispositivos
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Estados da Aplicação
- [ ] Usuário logado com imagem
- [ ] Usuário logado sem imagem
- [ ] Usuário convidado
- [ ] Dados de perfil incompletos

## Critérios de Aceitação

### Funcionais
- [ ] Todos os avatares usam componente `Avatar`
- [ ] Comportamento consistente em todos os cenários
- [ ] Nenhum regressão visual identificada
- [ ] Performance igual ou melhor que anterior

### Visuais
- [ ] Cores alinhadas com Design System
- [ ] Proporções mantidas em todos os tamanhos
- [ ] Efeitos visuais (bordas, sombras) consistentes
- [ ] Transições suaves onde aplicável

### Técnicos
- [ ] Código mais limpo e reutilizável
- [ ] Documentação atualizada
- [ ] Sem warnings ou erros no console
- [ ] TypeScript sem erros de tipo

## Rollback Criteria
Interromper testes e reverter se:
- [ ] Regressão funcional crítica
- [ ] Performance degradada significativa
- [ ] Problemas de acessibilidade graves
- [ ] Incompatibilidade com navegadores principais

## Checklist de Validação Final

### Pré-Implantação
- [ ] Componente `Avatar` criado e testado
- [ ] Todos os componentes atualizados
- [ ] Documentação atualizada
- [ ] Testes manuais realizados

### Pós-Implantação
- [ ] Monitoramento de erros ativado
- [ ] Feedback da equipe coletado
- [ ] Métricas de uso analisadas
- [ ] Issues abertas para ajustes finos

---

*Plano de testes criado em 11 de Fevereiro de 2026 para validação da padronização de avatares.*