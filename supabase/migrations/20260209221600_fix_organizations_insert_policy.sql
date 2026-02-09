-- Garantir que a política de INSERT para organizations permita criação por usuários autenticados

-- Remover política existente (se houver)
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;

-- Recriar política
CREATE POLICY "Authenticated users can create organizations"
  ON public.organizations
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);