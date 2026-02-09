const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hrhhnsmnttmnujcmwatj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_lHJkXeGOKn3tpDGNDhK8Ag_V-55DCgf';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkPolicies() {
  console.log('Consultando políticas RLS...');
  
  // Usar a função rls do Supabase? Vamos fazer uma query SQL via supabase.rpc ou usar supabase.from('pg_policies') não é possível.
  // Em vez disso, vamos usar a API de consulta SQL direta (supabase.rpc) se houver uma função.
  // Vou criar uma função no banco, mas por enquanto vou usar uma query simples via supabase.from('pg_policies') não é permitido.
  // Alternativa: usar o serviço de query SQL do Supabase (supabase.sql) não disponível no cliente JS.
  // Vou usar o método supabase.from('organizations').select('*').limit(1) para ver se temos acesso.
  
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('Erro ao consultar organizations:', error);
  } else {
    console.log('Consulta SELECT funcionou (RLS permite):', data.length, 'registros');
  }
  
  // Tentar inserir uma linha de teste (vai falhar devido a RLS, mas podemos ver a mensagem)
  const { error: insertError } = await supabase
    .from('organizations')
    .insert({ name: 'Test', slug: 'test-' + Date.now(), dirigente: 'Test', endereco_completo: 'Test' })
    .select();
  
  if (insertError) {
    console.error('Erro ao inserir (esperado):', insertError);
  } else {
    console.log('Inserção funcionou (RLS permite)');
  }
}

checkPolicies().catch(console.error);