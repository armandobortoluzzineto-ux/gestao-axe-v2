import { redirect } from "next/navigation";
import { createClient as createClientServer } from "@/lib/supabase/server";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClientServer();
  
  // Obter usuário autenticado (mais seguro que session.user)
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  // Buscar perfil do usuário
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("organization_id, role")
    .eq("id", user.id)
    .single();

  // Se não tiver organização, redirecionar para onboarding
  if (!profile || !profile.organization_id) {
    redirect("/onboarding");
  }

  // Se a organização estiver com status "pending", podemos mostrar uma tela de espera
  // (opcional, futuramente)
  // const { data: organization } = await supabase
  //   .from("organizations")
  //   .select("status")
  //   .eq("id", profile.organization_id)
  //   .single();
  // if (organization?.status === "pending") {
  //   redirect("/waiting-approval");
  // }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:block w-[280px] h-full bg-sidebar border-r border-sidebar-border shrink-0">
        <Sidebar />
      </aside>

      {/* Conteúdo Central */}
      <div className="flex-1 flex flex-col w-full bg-background overflow-hidden">
        <main className="flex-1 w-full h-full">
          {children}
        </main>
      </div>
    </div>
  );
}