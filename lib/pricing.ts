import { Chat, ModelName } from '@/lib/types'
import { ChatCompletionRequestMessage } from 'openai-edge/types/types/chat'
import { encode } from 'gpt-tokenizer'

export const GPT_4 = 0.00003
export const GPT_35_TURBO = 0.0000015

export const calculatePrice = (
  messages: ChatCompletionRequestMessage[],
  model: ModelName,
  oldPrice: string | null
) => {
  const oldPriceFloat = oldPrice ? parseFloat(oldPrice) : 0

  const tokens = messages.map((m: ChatCompletionRequestMessage) =>
    encode(m.content)
  )

  const tokensCount = tokens.reduce(
    (accumulator: number, current: number[]) => {
      return accumulator + current.length
    },
    0
  )

  if (model === 'gpt-3.5-turbo')
    return tokensCount * GPT_35_TURBO + oldPriceFloat
  if (model === 'gpt-4') return tokensCount * GPT_4 + oldPriceFloat

  throw new Error('Invalid model')
}

export const calculateUsage = (chats: Chat[]) => {
  const prices = chats?.map(chat => chat?.price)
  const totalSpent = prices?.reduce((a, b) => a + b, 0)
  const pricesThisMonth = chats?.filter(
    chat => new Date(chat?.createdAt).getMonth() === new Date().getMonth()
  )
  const totalSpentThisMonth = pricesThisMonth?.reduce((a, b) => a + b.price, 0)

  return {
    totalSpent,
    totalSpentThisMonth
  }
}
