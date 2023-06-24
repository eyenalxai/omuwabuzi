import { Message } from 'ai'

import { cn } from '@/lib/utils'
import { ChatMessageActions } from '@/components/chat-message/chat-message-actions'
import { ChatMessageContent } from '@/components/chat-message/chat-message-content'
import { ChatMessageAvatar } from '@/components/chat-message/chat-message-avatar'

export type ChatMessageProps = {
  message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <ChatMessageAvatar message={message} />
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <ChatMessageContent message={message} />
        <ChatMessageActions message={message} />
      </div>
    </div>
  )
}
