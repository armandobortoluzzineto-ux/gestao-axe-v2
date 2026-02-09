-- Garantir que a política de INSERT para organizations funcione
-- Remover qualquer política de INSERT conflitante e recriar

-- Remover política de INSERT existente (se houver múltiplas)
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;

-- Criar política de INSERT simples: qualquer usuário autenticado pode criar uma organização
CREATE POLICY "Authenticated users can create organizations"
  ON public.organizations
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Nota: A trigger handle_new_organization irá vincular o usuário à organização como admin.