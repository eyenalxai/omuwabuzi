import { removeChat } from '@/app/actions'
import { SidebarActions } from '@/components/sidebar/sidebar-actions'
import { SidebarItem } from '@/components/sidebar/sidebar-item'
import { Chat } from '@/lib/types'

export interface SidebarListProps {
  chats: Chat[]
}

export async function SidebarList({ chats }: SidebarListProps) {
  return (
    <div className="flex-1 overflow-auto">
      {chats?.length ? (
        <div className="space-y-2 px-2">
          {chats.map(
            chat =>
              chat && (
                <SidebarItem key={chat?.id} chat={chat}>
                  <SidebarActions chat={chat} removeChat={removeChat} />
                </SidebarItem>
              )
          )}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No chat history</p>
        </div>
      )}
    </div>
  )
}
