import { useState, useCallback } from 'react'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface UseChatStreamResult {
  messages: ChatMessage[]
  streaming: boolean
  send: (message: string) => void
  reset: () => void
}

export function useChatStream(): UseChatStreamResult {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streaming, setStreaming] = useState(false)

  const send = useCallback((userMessage: string) => {
    if (streaming || !userMessage.trim()) return

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setStreaming(true)

    const assistantIndex = messages.length + 1

    fetch('/api/v1/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    })
      .then(async (response) => {
        if (!response.body) throw new Error('No response body')

        setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let accumulated = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const token = line.slice(6)
              if (token === '[DONE]') continue
              accumulated += token
              setMessages((prev) => {
                const updated = [...prev]
                updated[assistantIndex] = { role: 'assistant', content: accumulated }
                return updated
              })
            }
          }
        }
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Connection error'
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Erreur de connexion: ${message}` },
        ])
      })
      .finally(() => {
        setStreaming(false)
      })
  }, [messages.length, streaming])

  const reset = useCallback(() => {
    setMessages([])
    setStreaming(false)
  }, [])

  return { messages, streaming, send, reset }
}
