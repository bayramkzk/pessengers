export const unwrapVariable = (variable: string | undefined) => {
  if (!variable) throw new Error(`Environment variable ${variable} is not set`);
  return variable;
};

export const SUPABASE_URL = unwrapVariable(process.env.SUPABASE_URL);
export const SUPABASE_KEY = unwrapVariable(process.env.SUPABASE_KEY);
export const SUPABASE_SECRET = unwrapVariable(process.env.SUPABASE_SECRET);
export const THY_URL = unwrapVariable(process.env.THY_URL);
export const THY_KEY = unwrapVariable(process.env.THY_KEY);
export const THY_SECRET = unwrapVariable(process.env.THY_SECRET);
