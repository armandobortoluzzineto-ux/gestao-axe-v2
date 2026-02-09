import { createClient as createClientBrowser } from "@/lib/supabase/client";
import { createClient as createClientServer } from "@/lib/supabase/server";

// Exemplo de componente que usa Supabase no servidor e no cliente
export default async function ExemploSupabasePage() {
  // No servidor (Server Component)
  const supabaseServer = await createClientServer();
  const { data: serverData } = await supabaseServer
    .from("filhos_de_santo")
    .select("*")
    .limit(5);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Exemplo de Integração Supabase</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-slate-50 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Dados do Servidor</h2>
          <p className="mb-4">
            Esta lista é carregada no servidor (Server Component) usando
            <code className="bg-slate-200 px-2 py-1 rounded">createClientServer()</code>.
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(serverData || [], null, 2)}
          </pre>
          <p className="mt-4 text-sm text-slate-600">
            Total de registros: {serverData?.length || 0}
          </p>
        </section>

        <section className="bg-white border border-slate-200 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Interação no Cliente</h2>
          <p className="mb-4">
            No cliente, use <code>createClientBrowser()</code> para operações
            interativas (login, mutations, realtime).
          </p>
          <div className="space-y-4">
            <button
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
              onClick={async () => {
                // Exemplo de chamada no cliente
                const supabase = createClientBrowser();
                const { error } = await supabase.auth.signInWithOtp({
                  email: "exemplo@email.com",
                });
                if (error) alert("Erro: " + error.message);
                else alert("Link de login enviado!");
              }}
            >
              Simular Login com OTP
            </button>
            <p className="text-sm text-slate-500">
              Este botão executa no navegador usando o cliente Supabase do
              lado do cliente.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl">
        <h3 className="text-2xl font-bold mb-4">Próximos Passos</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Gere os tipos reais do seu banco com:{" "}
            <code className="bg-slate-800 text-white px-2 py-1 rounded">
              npx supabase gen types typescript --project-id seu-project-id
            </code>
          </li>
          <li>
            Configure políticas de RLS (Row Level Security) no Supabase para
            cada tabela.
          </li>
          <li>
            Crie um middleware para autenticação em{" "}
            <code>src/middleware.ts</code>.
          </li>
          <li>
            Adicione componentes de autenticação (login, registro) usando
            Supabase Auth.
          </li>
        </ul>
      </div>
    </div>
  );
}