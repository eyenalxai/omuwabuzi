import { Message } from 'ai'
import { removeMessagesToFitLimit } from '@/lib/limits'
import { ModelName } from '@/lib/types'

const generateGibberish = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const getRandomCharacter = () =>
    characters.charAt(Math.floor(Math.random() * characters.length))

  return Array.from({ length }, getRandomCharacter).join('')
}

const sampleMessages: Message[] = [
  {
    id: '1',
    content: generateGibberish(6000),
    role: 'user'
  },
  {
    id: '2',
    content: generateGibberish(6000),
    role: 'assistant'
  },
  {
    id: '3',
    content: 'test',
    role: 'user'
  }
]

describe('removeMessagesToFitLimit', () => {
  test('should remove messages until they fit in the tokens limit', () => {
    const modelName: ModelName = 'gpt-3.5-turbo'
    const result = removeMessagesToFitLimit(sampleMessages, modelName)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe('3')
    expect(result[0].content).toBe('test')
  })
})
