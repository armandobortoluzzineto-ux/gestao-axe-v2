-- Tentativa final: política de INSERT baseada em role
-- Primeiro, garantir que RLS está habilitado
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Remover todas as políticas de INSERT existentes
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;

-- Criar política de INSERT para usuários com role 'authenticated' (padrão do Supabase)
CREATE POLICY "Authenticated users can create organizations"
  ON public.organizations
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Nota: auth.role() retorna 'authenticated' para usuários autenticados, 'anon' para anônimos.
-- Isso deve permitir inserção apenas para usuários autenticados.