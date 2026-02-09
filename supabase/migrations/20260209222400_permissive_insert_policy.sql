-- Política de INSERT permissiva para teste
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;

-- Reativar RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Política de INSERT: qualquer usuário autenticado pode inserir qualquer linha
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;
CREATE POLICY "Authenticated users can create organizations"
  ON public.organizations
  FOR INSERT
  WITH CHECK (true);

-- Manter outras políticas como antes
DROP POLICY IF EXISTS "Users can view their own organization" ON public.organizations;
CREATE POLICY "Users can view their own organization"
  ON public.organizations
  FOR SELECT
  USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
  );