// Tipos do banco de dados Supabase
// Execute `npx supabase gen types typescript --project-id <project-id> --schema public > src/lib/supabase/types.ts`
// para gerar os tipos reais a partir do seu projeto Supabase.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // Adicione as definições das tabelas aqui após gerar os tipos
    };
    Views: {
      [key: string]: {
        Row: Record<string, Json>;
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
    Enums: {
      [key: string]: string[];
    };
  };
}