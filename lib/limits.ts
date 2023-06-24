import { ModelName } from '@/lib/types'
import { Message } from 'ai/react/dist'
import { encode } from 'gpt-tokenizer'

export const GPT_4_TOKENS_LIMIT = 8000
export const GPT_3_5_TURBO_TOKENS_LIMIT = 4000

export const MODEL_TOKENS_LIMITS: Record<ModelName, number> = {
  'gpt-3.5-turbo': GPT_3_5_TURBO_TOKENS_LIMIT,
  'gpt-4': GPT_4_TOKENS_LIMIT
}

export const removeMessagesToFitLimit = (
  messages: Message[],
  model: ModelName
): Message[] => {
  const limit = MODEL_TOKENS_LIMITS[model]
  let totalTokens = 0

  for (const message of messages) {
    const tokens = encode(message.content)
    totalTokens += tokens.length
  }

  while (totalTokens > limit && messages.length > 0) {
    const removedMessage = messages.shift()

    if (removedMessage) {
      const removedTokens = encode(removedMessage.content)
      totalTokens -= removedTokens.length
    }
  }

  return messages
}
