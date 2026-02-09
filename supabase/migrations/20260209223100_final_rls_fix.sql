-- Solução final para RLS: remover todas as políticas e recriar com cuidado
-- 1. Desabilitar RLS para limpar políticas
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;

-- 2. Reabilitar RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- 3. Remover todas as políticas existentes (usando DROP POLICY IF EXISTS para cada uma)
DROP POLICY IF EXISTS "Allow all insert" ON public.organizations;
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;
DROP POLICY IF EXISTS "Users can view their own organization" ON public.organizations;
DROP POLICY IF EXISTS "Organization admins can update" ON public.organizations;
DROP POLICY IF EXISTS "Organization admins can delete" ON public.organizations;

-- 4. Criar política de INSERT que permite inserção para qualquer usuário autenticado
-- Usando auth.uid() IS NOT NULL como condição (garante que o usuário está autenticado)
CREATE POLICY "Organizations insert policy"
  ON public.organizations
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- 5. Criar política de SELECT que permite usuários verem organizações às quais pertencem
-- Evitar recursão usando uma subquery que não referencia a mesma tabela em loop
CREATE POLICY "Organizations select policy"
  ON public.organizations
  FOR SELECT
  USING (
    id IN (
      SELECT organization_id 
      FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

-- 6. Criar política de UPDATE para admins
CREATE POLICY "Organizations update policy"
  ON public.organizations
  FOR UPDATE
  USING (
    id IN (
      SELECT organization_id 
      FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 7. Criar política de DELETE para admins
CREATE POLICY "Organizations delete policy"
  ON public.organizations
  FOR DELETE
  USING (
    id IN (
      SELECT organization_id 
      FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 8. Para profiles, garantir políticas seguras
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view profiles in their organization" ON public.profiles;

-- Política de SELECT: usuários podem ver apenas seu próprio perfil
CREATE POLICY "Profiles select policy"
  ON public.profiles
  FOR SELECT
  USING (id = auth.uid());

-- Política de UPDATE: usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Profiles update policy"
  ON public.profiles
  FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());