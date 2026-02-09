-- Adiciona campos específicos de terreiro à tabela organizations
-- Mantém compatibilidade com a estrutura existente

-- 1. Adiciona coluna dirigente (text, obrigatório)
ALTER TABLE public.organizations
ADD COLUMN IF NOT EXISTS dirigente TEXT NOT NULL DEFAULT '';

-- 2. Adiciona coluna data_fundacao (date, opcional)
ALTER TABLE public.organizations
ADD COLUMN IF NOT EXISTS data_fundacao DATE;

-- 3. Adiciona coluna endereco_completo (text, obrigatório)
ALTER TABLE public.organizations
ADD COLUMN IF NOT EXISTS endereco_completo TEXT NOT NULL DEFAULT '';

-- 4. Remove colunas não utilizadas (se existirem)
-- Verifica se a coluna description existe e remove (opcional, pois pode não existir)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'organizations' AND column_name = 'description') THEN
    ALTER TABLE public.organizations DROP COLUMN description;
  END IF;
END $$;

-- Verifica se a coluna industry existe e remove
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'organizations' AND column_name = 'industry') THEN
    ALTER TABLE public.organizations DROP COLUMN industry;
  END IF;
END $$;

-- Verifica se a coluna plan existe e remove
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'organizations' AND column_name = 'plan') THEN
    ALTER TABLE public.organizations DROP COLUMN plan;
  END IF;
END $$;

-- Verifica se a coluna max_users existe e remove
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'organizations' AND column_name = 'max_users') THEN
    ALTER TABLE public.organizations DROP COLUMN max_users;
  END IF;
END $$;

-- Verifica se a coluna status existe e remove
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'organizations' AND column_name = 'status') THEN
    ALTER TABLE public.organizations DROP COLUMN status;
  END IF;
END $$;

-- 5. Atualiza a função handle_new_organization para manter a compatibilidade
-- (não precisa de alteração, pois só atualiza profiles)

-- 6. Comentários das colunas
COMMENT ON COLUMN public.organizations.dirigente IS 'Nome do Pai, Mãe ou Dirigente espiritual responsável';
COMMENT ON COLUMN public.organizations.data_fundacao IS 'Data de fundação do terreiro (opcional)';
COMMENT ON COLUMN public.organizations.endereco_completo IS 'Endereço completo do terreiro';

-- 7. Atualiza a função get_my_organization para incluir as novas colunas
-- (a função já retorna todas as colunas via SELECT o.*, então não precisa de alteração)
