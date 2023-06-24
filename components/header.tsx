import * as React from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import { getAllChats, getRecentChats } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Sidebar } from '@/components/sidebar/sidebar'
import { SidebarList } from '@/components/sidebar/sidebar-list'
import { IconOpenAI, IconSeparator } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { calculateUsage } from '@/lib/pricing'

export async function Header() {
  const session = await auth()

  const recentChats = await getRecentChats(session?.user?.id)

  const allChats = await getAllChats(session?.user?.id)
  const { totalSpent, totalSpentThisMonth } = calculateUsage(allChats)

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        {session?.user ? (
          <Sidebar>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              {/* @ts-ignore */}
              <SidebarList chats={recentChats} />
            </React.Suspense>
          </Sidebar>
        ) : (
          <Link href="/" target="_blank" rel="nofollow">
            <IconOpenAI className="mr-2 block h-6 w-6" />
          </Link>
        )}
        <div className="flex items-center">
          <IconSeparator className="h-6 w-6 text-muted-foreground/50" />
          {session?.user ? (
            <UserMenu
              user={session.user}
              totalSpent={totalSpent}
              totalSpentThisMonth={totalSpentThisMonth}
            />
          ) : (
            <Button variant="link" asChild className="-ml-2">
              <Link href="/sign-in?callbackUrl=/">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
