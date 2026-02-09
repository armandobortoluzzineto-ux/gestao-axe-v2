# Design System – Gestão Axé 2.0

**Tema:** Misticismo Moderno  
**Paleta:** Roxo Profundo, Dourado, Preto e Branco.

---

## 1. Tipografia

### Fontes
- **Títulos:** Playfair Display (classe `font-serif`)
- **Corpo/Interface:** Inter (classe `font-sans`)
- **Código/Mono:** Geist Mono (classe `font-mono`)

### Uso no CSS
As fontes são carregadas via `next/font/google` no `src/app/layout.tsx` e disponibilizadas como variáveis CSS:
- `--font-inter` → `font-sans`
- `--font-playfair` → `font-serif`
- `--font-geist-mono` → `font-mono`

### Exemplo em componentes
```tsx
<h1 className="font-serif text-3xl font-bold">Olá, [Nome]</h1>
<p className="font-sans text-base text-slate-700">Texto comum.</p>
```

---

## 2. Cores (Variáveis CSS)

### Modo Claro (`:root`)
| Variável          | Valor (OKLCH)          | HEX       | Uso                              |
|-------------------|------------------------|-----------|----------------------------------|
| `--primary`       | `oklch(0.488 0.243 302.717)` | `#6D28D9` | Botões principais, ações         |
| `--primary-foreground` | `oklch(0.984 0.003 247.858)` | `#f8fafc` | Texto sobre primary              |
| `--accent`        | `oklch(0.627 0.194 58.318)`  | `#D97706` | Destaques, badges, ícones de valor |
| `--background`    | `oklch(1 0 0)`               | `#FFFFFF` | Fundo da página                  |
| `--foreground`    | `oklch(0.129 0.042 264.695)` | `#0F172A` | Texto principal                  |
| `--muted`         | `oklch(0.968 0.007 247.896)` | `#E2E8F0` | Fundos sutis, bordas             |
| `--destructive`   | `oklch(0.577 0.245 27.325)`  | `#dc2626` | Erros, ações destrutivas         |

### Modo Escuro (`.dark`)
As variáveis são ajustadas automaticamente pelo sistema de temas. O fundo escuro é `oklch(0.129 0.042 264.695)` (Slate‑950).

### Classes Tailwind correspondentes
- `bg-primary`, `text-primary`, `border-primary`
- `bg-accent`, `text-accent`, `border-accent`
- `bg-muted`, `text-muted-foreground`

---

## 3. Componentes

### Botões
- **Primário (`variant="default"`):** `bg-primary text-primary-foreground`
- **Secundário (`variant="secondary"`):** `bg-secondary text-secondary-foreground`
- **Outline (`variant="outline"`):** `border border-input`
- **Destructive (`variant="destructive"`):** `bg-destructive text-white`

### Cards
Usar o componente `Card` do Shadcn UI com `bg-card` e `border-border`.

### Ícones de Valor/Atenção
Ícones que representam valor monetário, alertas ou status importante devem usar a cor dourada:
```tsx
<DollarSign className="h-5 w-5 text-amber-600" />
```

---

## 4. Princípios de Layout

### Espaçamento (Whitespace)
- **Padding padrão:** `p-6` em containers principais.
- **Margem entre seções:** `mt-8` ou `gap-6` em grids.
- **Evitar poluição visual:** usar bastante espaço em branco, especialmente em telas administrativas.

### Responsividade
- Sidebar fixa à esquerda apenas em desktop (`lg:block`).
- Em mobile, a sidebar é ocultada (menu hambúrguer futuro).
- Grids devem ser `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` conforme necessário.

---

## 5. Regras de Implementação

Todas as novas telas devem seguir este padrão:

1. **Títulos:** Sempre usar `font-serif` (Playfair Display) para títulos de página e seções.
2. **Textos/Inputs:** Usar `font-sans` (Inter) para parágrafos, labels, inputs e botões.
3. **Botões de Ação:** Usar a cor roxa (`bg-primary`) para ações principais (salvar, confirmar, avançar).
4. **Ícones de Valor/Atenção:** Usar dourado (`text-amber-600` ou `text-accent`).
5. **Design Limpo:** Manter padding generoso, bordas sutis (`border-border`) e evitar sobrecarregar a interface.

---

## 6. Exemplo de Uso

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

export default function Example() {
  return (
    <div className="p-6">
      <h1 className="font-serif text-4xl font-bold mb-6">Dashboard</h1>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="font-sans font-semibold">
            Saldo Atual
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-amber-600" />
            <span className="text-2xl font-bold">R$ 1.250,00</span>
          </div>
          <Button>Detalhes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

*Documento atualizado em fevereiro de 2026. Qualquer alteração nas cores ou fontes deve ser refletida aqui.*