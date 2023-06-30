import { ModelName } from '@/lib/types'
import { Message } from 'ai/react/dist'
import { encode } from 'gpt-tokenizer'

const LIMIT_MODIFIER = 0.75

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
  const limit = MODEL_TOKENS_LIMITS[model] * LIMIT_MODIFIER

  const getTotalTokens = (msgs: Message[]): number => {
    return msgs.reduce((total, message) => {
      const tokens = encode(message.content)
      return total + tokens.length
    }, 0)
  }

  const removeFirstMessage = (msgs: Message[]): Message[] => {
    return msgs.slice(1)
  }

  const shouldRemoveMoreMessages = (msgs: Message[]): boolean => {
    return getTotalTokens(msgs) > limit && msgs.length > 0
  }

  const removeMessagesRecursively = (msgs: Message[]): Message[] => {
    if (shouldRemoveMoreMessages(msgs)) {
      const updatedMessages = removeFirstMessage(msgs)
      return removeMessagesRecursively(updatedMessages)
    }
    return msgs
  }

  return removeMessagesRecursively(messages)
}
