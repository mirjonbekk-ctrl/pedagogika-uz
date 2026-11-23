import { createClient } from '@supabase/supabase-js'

// Vercel va lokal muhitda quyidagi o‘zgaruvchilar kerak (.env.local yoki Vercel Environment Variables):
// VITE_SUPABASE_URL=https://xxxx.supabase.co
// VITE_SUPABASE_ANON_KEY=...   (anon/public kalit; maxfiy service_role kaliti bu yerga qo‘yilmaydi)
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseReady = Boolean(url && anonKey)

export const supabase = supabaseReady
  ? createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true } })
  : null

// Foydalanuvchi rolini profiles jadvalidan olamiz: super_admin | editor | moderator
export async function fetchRole(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', userId)
    .single()
  if (error) return { role: null, fullName: null }
  return { role: data.role, fullName: data.full_name }
}

export const ROLE_LABEL = {
  super_admin: 'Super Admin',
  editor: 'Muharrir',
  moderator: 'Moderator',
}
