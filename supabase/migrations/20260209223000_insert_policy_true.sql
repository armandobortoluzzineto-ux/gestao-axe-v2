-- Política de INSERT com WITH CHECK (true) - deve permitir qualquer inserção
-- Primeiro, garantir que RLS está habilitado
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Remover política de INSERT existente
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;

-- Criar política de INSERT sem restrições
CREATE POLICY "Allow all insert"
  ON public.organizations
  FOR INSERT
  WITH CHECK (true);

-- Verificar se a política foi criada
COMMENT ON POLICY "Allow all insert" ON public.organizations IS 'Permite qualquer inserção, independente de autenticação';