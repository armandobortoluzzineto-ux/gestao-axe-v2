-- Reativar RLS com política de INSERT simples que funciona
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Remover qualquer política de INSERT existente
DROP POLICY IF EXISTS "Allow all insert" ON public.organizations;
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;

-- Criar política de INSERT que permite inserção para usuários autenticados
-- Usando auth.uid() IS NOT NULL como condição
CREATE POLICY "Authenticated users can create organizations"
  ON public.organizations
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Manter outras políticas (SELECT, UPDATE, DELETE) conforme já existem
-- (Se não existirem, serão criadas em migrações anteriores)