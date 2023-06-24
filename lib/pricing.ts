import { Chat, ModelName } from '@/lib/types'
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum
} from 'openai-edge/types/types/chat'
import { encode } from 'gpt-tokenizer'

export const GPT_4_INPUT = 0.00003
export const GPT_4_OUTPUT = 0.00006

export const GPT_35_TURBO_INPUT = 0.0000015
export const GPT_35_TURBO_OUTPUT = 0.000002

const getTokenCost = (
  tokens: number,
  role: ChatCompletionRequestMessageRoleEnum,
  model: ModelName
) => {
  if (model === 'gpt-3.5-turbo') {
    if (role === 'user') return tokens * GPT_35_TURBO_INPUT
    if (role === 'assistant') return tokens * GPT_35_TURBO_OUTPUT
    throw new Error('Invalid role')
  }

  if (model === 'gpt-4') {
    if (role === 'user') return tokens * GPT_4_INPUT
    if (role === 'assistant') return tokens * GPT_4_OUTPUT
    throw new Error('Invalid role')
  }

  throw new Error('Invalid model')
}

const getMessageTokenCost = (
  message: ChatCompletionRequestMessage,
  model: ModelName
) => {
  const tokens = encode(message.content).length
  return getTokenCost(tokens, message.role, model)
}

export const calculatePrice = (
  messages: ChatCompletionRequestMessage[],
  model: ModelName,
  oldPrice: string | null
) => {
  const oldPriceFloat = oldPrice ? parseFloat(oldPrice) : 0

  const tokensCount = messages.reduce(
    (accumulator: number, message: ChatCompletionRequestMessage) => {
      return accumulator + getMessageTokenCost(message, model)
    },
    0
  )

  return tokensCount + oldPriceFloat
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
