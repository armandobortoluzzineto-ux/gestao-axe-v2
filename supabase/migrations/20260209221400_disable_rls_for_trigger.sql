-- Desabilita RLS para a tabela profiles durante a trigger handle_new_organization
-- Remove políticas de UPDATE que podem causar recursão

-- 1. Remover política de UPDATE se existir
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- 2. Recriar função handle_new_organization com desabilitação de RLS
CREATE OR REPLACE FUNCTION public.handle_new_organization()
RETURNS TRIGGER AS $$
BEGIN
  -- Desabilita RLS para a tabela profiles apenas para esta transação
  EXECUTE 'SET LOCAL row_security = off';
  
  -- Update the creator's profile to link to the new organization and set role as admin
  UPDATE public.profiles
  SET organization_id = NEW.id, role = 'admin'
  WHERE id = auth.uid();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Recriar política de UPDATE (opcional, mas com cuidado)
-- Vamos adiar a criação até depois de testar a inserção.