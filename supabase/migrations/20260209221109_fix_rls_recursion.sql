-- Corrige recursão infinita na política RLS da tabela profiles
-- A função handle_new_organization deve desabilitar RLS temporariamente

CREATE OR REPLACE FUNCTION public.handle_new_organization()
RETURNS TRIGGER AS $$
BEGIN
  -- Desabilita RLS para a sessão atual (apenas para esta transação)
  SET LOCAL row_security = off;
  
  -- Update the creator's profile to link to the new organization and set role as admin
  UPDATE public.profiles
  SET organization_id = NEW.id, role = 'admin'
  WHERE id = auth.uid();
  
  -- Reabilita RLS (não necessário, pois a configuração LOCAL só dura a transação)
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Nota: O trigger já existe, então não precisamos recriá-lo.