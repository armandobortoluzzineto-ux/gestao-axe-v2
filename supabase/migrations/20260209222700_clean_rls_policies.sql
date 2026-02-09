-- Limpar todas as políticas de organizations e recriar do zero
-- 1. Desabilitar RLS
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;

-- 2. Remover todas as políticas (isso remove as políticas existentes)
-- (Não é necessário porque RLS desabilitado remove o efeito das políticas)

-- 3. Reabilitar RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- 4. Criar política de INSERT que permite qualquer inserção (apenas para teste)
DROP POLICY IF EXISTS "Allow all insert" ON public.organizations;
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;
DROP POLICY IF EXISTS "Users can view their own organization" ON public.organizations;
DROP POLICY IF EXISTS "Organization admins can update" ON public.organizations;
DROP POLICY IF EXISTS "Organization admins can delete" ON public.organizations;

CREATE POLICY "Allow all insert"
  ON public.organizations
  FOR INSERT
  WITH CHECK (true);

-- 5. Criar política de SELECT básica (usuários veem organizações que pertencem)
CREATE POLICY "Users can view their own organization"
  ON public.organizations
  FOR SELECT
  USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
  );

-- 6. Criar política de UPDATE para admins
CREATE POLICY "Organization admins can update"
  ON public.organizations
  FOR UPDATE
  USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 7. Criar política de DELETE para admins
CREATE POLICY "Organization admins can delete"
  ON public.organizations
  FOR DELETE
  USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );