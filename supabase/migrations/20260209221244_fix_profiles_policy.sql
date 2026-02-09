-- Remove a política de SELECT problemática e recria com lógica não recursiva

-- 1. Remover política existente (se existir)
DROP POLICY IF EXISTS "Users can view profiles in their organization" ON public.profiles;

-- 2. Criar nova política que evita recursão
-- Usa uma subquery que não depende da mesma linha sendo atualizada
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

-- 3. Adicionar política para UPDATE (se necessário) - apenas se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles'
    AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON public.profiles
      FOR UPDATE
      USING (id = auth.uid())
      WITH CHECK (id = auth.uid());
  END IF;
END $$;