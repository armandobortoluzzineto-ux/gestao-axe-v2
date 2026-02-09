-- Desabilitar RLS temporariamente para permitir o funcionamento do onboarding
-- Isso deve ser corrigido posteriormente com políticas adequadas
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;