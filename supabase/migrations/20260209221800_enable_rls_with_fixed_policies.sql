-- Reabilita RLS para organizations com políticas corrigidas

-- 1. Reabilitar RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- 2. Política de INSERT: usuários autenticados podem criar organizações
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;
CREATE POLICY "Authenticated users can create organizations"
  ON public.organizations
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- 3. Política de SELECT: usuários podem ver organizações às quais pertencem
DROP POLICY IF EXISTS "Users can view their own organization" ON public.organizations;
CREATE POLICY "Users can view their own organization"
  ON public.organizations
  FOR SELECT
  USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
  );

-- 4. Política de UPDATE: apenas admins podem atualizar
DROP POLICY IF EXISTS "Organization admins can update" ON public.organizations;
CREATE POLICY "Organization admins can update"
  ON public.organizations
  FOR UPDATE
  USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 5. Política de DELETE: apenas admins podem deletar
DROP POLICY IF EXISTS "Organization admins can delete" ON public.organizations;
CREATE POLICY "Organization admins can delete"
  ON public.organizations
  FOR DELETE
  USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 6. Recriar política de SELECT para profiles (segura)
DROP POLICY IF EXISTS "Users can view profiles in their organization" ON public.profiles;
CREATE POLICY "Users can view profiles in their organization"
  ON public.profiles
  FOR SELECT
  USING (
    organization_id IS NOT NULL
    AND organization_id = (
      SELECT organization_id
      FROM public.profiles
      WHERE id = auth.uid()
      LIMIT 1
    )
  );

-- 7. Política de UPDATE para profiles (usuários podem atualizar seu próprio perfil)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());