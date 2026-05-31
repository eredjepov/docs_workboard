import { createClient } from "@supabase/supabase-js";
import { supabaseAuthProvider, supabaseDataProvider } from "ra-supabase";

const requireEnv = (name: "VITE_SUPABASE_URL" | "VITE_SUPABASE_API_KEY") => {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing ${name} in Vite environment`);
  }

  return value;
};

export const supabaseUrl = requireEnv("VITE_SUPABASE_URL");
export const supabaseApiKey = requireEnv("VITE_SUPABASE_API_KEY");

// Держи Supabase client в одном месте: так его легко переиспользовать во всем приложении.
export const supabaseClient = createClient(supabaseUrl, supabaseApiKey);

// Явный dataProvider не читает OpenAPI-документацию, поэтому приложение не зависит от guesser.
export const dataProvider = supabaseDataProvider({
  instanceUrl: supabaseUrl,
  apiKey: supabaseApiKey,
  supabaseClient,
});

// RLS обычно разрешает запись только после логина, поэтому authProvider нужен для create/edit/delete.
export const authProvider = supabaseAuthProvider(supabaseClient, {});
