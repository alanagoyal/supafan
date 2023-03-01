export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          map(arg0: (message: any) => JSX.Element): import("react").ReactNode;
          created_at: string | null;
          id: number;
          is_pc: boolean | null;
          message_text: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          is_pc?: boolean | null;
          message_text?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          is_pc?: boolean | null;
          message_text?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
