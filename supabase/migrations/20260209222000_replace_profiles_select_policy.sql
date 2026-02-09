-- Substituir política de SELECT de profiles para evitar recursão
-- Primeiro, remover todas as políticas de SELECT existentes

-- Remover política "Users can view own profile" se existir
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Remover política "Users can view profiles in their organization" se existir
DROP POLICY IF EXISTS "Users can view profiles in their organization" ON public.profiles;

-- Criar nova política de SELECT segura: usuários podem ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (id = auth.uid());

-- Nota: A política de UPDATE "Users can update own profile" já existe e permanece.