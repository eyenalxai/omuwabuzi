import { type Message } from 'ai'

export interface Chat extends Record<string, any> {
  id: string
  model: ModelName
  title: string
  createdAt: Date
  userId: string
  path: string
  price: number
  messages: Message[]
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export type ModelName = 'gpt-3.5-turbo' | 'gpt-4'

export type Role = Exclude<Message['role'], 'system'>
