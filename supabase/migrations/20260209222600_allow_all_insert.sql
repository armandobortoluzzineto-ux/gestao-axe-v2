-- Permitir INSERT para todos (sem verificação) apenas para teste
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Remover todas as políticas de INSERT
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;

-- Criar política que permite INSERT sem restrições
CREATE POLICY "Allow all insert"
  ON public.organizations
  FOR INSERT
  WITH CHECK (true);

-- Manter políticas de SELECT, UPDATE, DELETE conforme necessário
DROP POLICY IF EXISTS "Users can view their own organization" ON public.organizations;
CREATE POLICY "Users can view their own organization"
  ON public.organizations
  FOR SELECT
  USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
  );