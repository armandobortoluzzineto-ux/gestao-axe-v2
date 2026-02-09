const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hrhhnsmnttmnujcmwatj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_lHJkXeGOKn3tpDGNDhK8Ag_V-55DCgf';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testOrganizationCreation() {
  console.log('Testando criação de organização com RLS habilitado...');
  
  // 1. Primeiro, criar um usuário de teste (signup)
  const email = `test${Date.now()}@example.com`;
  const password = 'password123';
  
  console.log(`Criando usuário: ${email}`);
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: 'Test User',
      },
    },
  });
  
  if (signUpError) {
    console.error('Erro ao criar usuário:', signUpError);
    return;
  }
  
  const user = authData.user;
  console.log(`Usuário criado: ${user.id}`);
  
  // 2. Tentar criar uma organização (como o usuário autenticado)
  const organizationData = {
    name: 'Terreiro Teste RLS',
    slug: 'terreiro-teste-rls',
    dirigente: 'Test User',
    endereco_completo: 'Rua Teste, 123',
  };
  
  console.log('Criando organização...');
  const { data: orgData, error: orgError } = await supabase
    .from('organizations')
    .insert(organizationData)
    .select()
    .single();
  
  if (orgError) {
    console.error('Erro ao criar organização:', orgError);
  } else {
    console.log('Organização criada com sucesso:', orgData);
  }
  
  // 3. Limpar: deletar usuário (opcional)
  console.log('Teste concluído.');
}

testOrganizationCreation().catch(console.error);