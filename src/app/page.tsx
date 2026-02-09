import { redirect } from "next/navigation";
import { createClient as createClientServer } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClientServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
