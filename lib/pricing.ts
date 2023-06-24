import { ModelName, Role } from '@/lib/types'
import { ChatCompletionRequestMessage } from 'openai-edge/types/types/chat'
import { encode } from 'gpt-tokenizer'

export const GPT_4_INPUT = 0.00003
export const GPT_4_OUTPUT = 0.00006

export const GPT_35_TURBO_INPUT = 0.0000015
export const GPT_35_TURBO_OUTPUT = 0.000002

const getTokenPrice = (model: ModelName, role: Role): number => {
  if (model === 'gpt-3.5-turbo') {
    if (role === 'user') return GPT_35_TURBO_INPUT
    if (role === 'assistant') return GPT_35_TURBO_OUTPUT
    throw new Error('Invalid role')
  }

  if (model === 'gpt-4') {
    if (role === 'user') return GPT_4_INPUT
    if (role === 'assistant') return GPT_4_OUTPUT
    throw new Error('Invalid role')
  }

  throw new Error('Invalid model')
}

export const calculatePrice = (
  messages: ChatCompletionRequestMessage[],
  model: ModelName,
  role: Role,
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

  const tokenPrice = getTokenPrice(model, role)

  return tokensCount * tokenPrice + oldPriceFloat
}
