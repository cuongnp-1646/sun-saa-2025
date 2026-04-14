import { redirect } from 'next/navigation'
import { createClient } from '@/libs/supabase/server'
import { LoginPage } from '@/components/login/LoginPage'

export const revalidate = 0
export const dynamic = 'force-dynamic'

interface LoginPageRouteProps {
  searchParams: Promise<{ error?: string }>
}

export default async function LoginPageRoute({ searchParams }: LoginPageRouteProps) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  const { error } = await searchParams

  return <LoginPage error={error} />
}
