import { createBrowserClient } from '@supabase/ssr';

// Ensure these environment variables are set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Helper function for server-side Supabase client (e.g., in API routes or server components)
// This example uses cookie-based auth, typical for Next.js with SSR/App Router
// You might need to adjust based on your specific auth strategy for server components/actions.
// For client components, the browser client above is usually sufficient.
// import { createServerClient, type CookieOptions } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export function createSupabaseServerClient() {
//   const cookieStore = cookies()
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           cookieStore.set({ name, value, ...options })
//         },
//         remove(name: string, options: CookieOptions) {
//           cookieStore.set({ name, value: '', ...options })
//         },
//       },
//     }
//   )
// }
