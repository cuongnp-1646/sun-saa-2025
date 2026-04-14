'use client'

import Image from 'next/image'
import { useState } from 'react'
import { createClient } from '@/libs/supabase/client'

interface LoginButtonProps {
  initialError?: string
}

export function LoginButton({ initialError }: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(initialError ?? null)

  const handleLogin = async () => {
    if (isLoading) return

    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (oauthError) {
      setIsLoading(false)
      setError(oauthError.message)
    }
  }

  const errorMessage = error
    ? error === 'auth_failed'
      ? 'Authentication failed. Please try again.'
      : error
    : null

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={handleLogin}
        disabled={isLoading}
        aria-label="Sign in with Google"
        aria-busy={isLoading}
        className="w-full max-w-[400px] md:w-[305px] md:max-w-none h-[60px] flex flex-row items-center justify-between bg-[#FFEA9E] rounded-lg py-4 px-6 cursor-pointer transition-all duration-150 ease-in-out hover:shadow-[0_4px_12px_rgba(255,234,158,0.35)] hover:-translate-y-px active:translate-y-0 focus:outline focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
      >
        {isLoading ? (
          <span className="font-montserrat flex items-center gap-3 mx-auto text-[#00101A] font-bold text-[22px] leading-7">
            <svg
              className="animate-spin h-5 w-5 text-[#00101A]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Signing in…
          </span>
        ) : (
          <>
            <span className="font-montserrat text-[#00101A] font-bold text-[22px] leading-7">
              LOGIN With Google
            </span>
            <Image
              src="/assets/login/icons/google-icon.svg"
              alt="Google"
              width={24}
              height={24}
              aria-hidden={true}
            />
          </>
        )}
      </button>

      {errorMessage && (
        <p role="alert" className="font-montserrat text-[#FF6B6B] text-sm font-medium leading-5 mt-2">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
