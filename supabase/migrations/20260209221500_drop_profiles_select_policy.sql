-- Remove todas as políticas de SELECT da tabela profiles para eliminar recursão

DROP POLICY IF EXISTS "Users can view profiles in their organization" ON public.profiles;

-- Nota: Pode haver outras políticas de SELECT (como "Enable read access for all users" do Supabase Auth)
-- Vamos listar e remover apenas a que criamos.
-- Para segurança, não removemos políticas padrão do Supabase.