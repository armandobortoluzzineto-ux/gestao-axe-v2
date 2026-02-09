-- Setup SaaS Multi‑Tenant: Organizations, Profiles, RLS

-- 1. Create organizations table
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add index for slug
CREATE INDEX IF NOT EXISTS organizations_slug_idx ON public.organizations(slug);

-- 2. Add organization_id column to profiles (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'profiles' AND column_name = 'organization_id') THEN
    ALTER TABLE public.profiles ADD COLUMN organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL;
  END IF;
END $$;

-- 3. Add role column to profiles (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'profiles' AND column_name = 'role') THEN
    ALTER TABLE public.profiles ADD COLUMN role TEXT NOT NULL DEFAULT 'member';
  END IF;
END $$;

-- 4. Enable RLS on organizations
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for organizations
-- Policy: Users can view organizations they belong to (via profiles.organization_id)
CREATE POLICY "Users can view their own organization"
  ON public.organizations
  FOR SELECT
  USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
  );

-- Policy: Only organization admins can update their organization
CREATE POLICY "Organization admins can update"
  ON public.organizations
  FOR UPDATE
  USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Policy: Only organization admins can delete
CREATE POLICY "Organization admins can delete"
  ON public.organizations
  FOR DELETE
  USING (
    id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Policy: Authenticated users can create organizations (they will become admin via trigger)
CREATE POLICY "Authenticated users can create organizations"
  ON public.organizations
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- 6. Create trigger to automatically set organization creator as admin
CREATE OR REPLACE FUNCTION public.handle_new_organization()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the creator's profile to link to the new organization and set role as admin
  UPDATE public.profiles
  SET organization_id = NEW.id, role = 'admin'
  WHERE id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_organization_created ON public.organizations;
CREATE TRIGGER on_organization_created
  AFTER INSERT ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_organization();

-- 7. Update RLS on profiles to enforce organization‑based access
-- (Assuming profiles already have RLS, we add a policy for organization‑scoped reads)
CREATE POLICY "Users can view profiles in their organization"
  ON public.profiles
  FOR SELECT
  USING (
    organization_id IN (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
  );

-- 8. Create a default organization for existing users (optional)
-- This step can be run manually after migration if needed.

-- 9. Add updated_at trigger for organizations
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_organizations_updated_at ON public.organizations;
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 10. Create a function to get current user's organization
CREATE OR REPLACE FUNCTION public.get_my_organization()
RETURNS SETOF public.organizations AS $$
  SELECT o.*
  FROM public.organizations o
  INNER JOIN public.profiles p ON o.id = p.organization_id
  WHERE p.id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER;