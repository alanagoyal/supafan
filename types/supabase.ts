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
          created_at: string | null;
          gif_url: string | null;
          id: number;
          message_text: string | null;
        };
        Insert: {
          created_at?: string | null;
          gif_url?: string | null;
          id?: number;
          message_text?: string | null;
        };
        Update: {
          created_at?: string | null;
          gif_url?: string | null;
          id?: number;
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
