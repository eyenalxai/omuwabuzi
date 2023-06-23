import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await auth()
  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center gap-2 py-10">
      <h3>
        If you haven&apos;t been invited, please don&apos;t bother logging in.
      </h3>
      <LoginButton />
    </div>
  )
}
