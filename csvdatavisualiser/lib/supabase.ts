import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabaseBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

export type DashboardRecord = {
  id: string;
  user_id: string;
  title: string;
  source_file_name: string;
  parsed_json: unknown;
  ai_insights: unknown;
  share_id: string;
  plan_type: "free" | "pro";
  created_at: string;
};
