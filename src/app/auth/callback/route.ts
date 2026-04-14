import { redirect } from 'next/navigation'
import { createClient } from '@/libs/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const supabase = await createClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      redirect('/')
    }
  }

  redirect('/login?error=auth_failed')
}
