import { createClient } from "@supabase/supabase-js";

const createSupabaseClient = () => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error("SUPABASE_URL and SUPABASE_KEY must be set");
  }

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
};

export const supabase = createSupabaseClient();
