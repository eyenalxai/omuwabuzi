'use client'

import { type Message, useChat } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { ComponentProps, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { clsx } from 'clsx'

export interface ChatProps extends ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const [model, setModel] = useState<'gpt-3.5-turbo' | 'gpt-4'>('gpt-3.5-turbo')
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
        previewToken: null,
        model: model
      }
    })
  return (
    <div className={clsx('flex', 'flex-col', 'items-center')}>
      <Select
        onValueChange={value => setModel(value as 'gpt-3.5-turbo' | 'gpt-4')}
        defaultValue={model}
      >
        <SelectTrigger className={clsx('w-44', 'mt-4')}>
          <SelectValue placeholder="GPT Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>GPT Models</SelectLabel>
            <SelectItem value="gpt-3.5-turbo">GPT 3.5 Turbo</SelectItem>
            <SelectItem value="gpt-4">GPT 4</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length > 0 && (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </div>
  )
}
