import { useState } from 'react'
import { motion } from 'motion/react'
import { Copy, Check, Mail, MessageSquare, Send } from 'lucide-react'
import { Button } from '../ui/button'
import { useLang } from '../../i18n/language-context'

const EMAIL = 'amine.aabid00@gmail.com'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export function Contact() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)

  async function copyEmail() {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function sendMessage() {
    if (!input.trim() || streaming) return
    const userMessage = input.trim()
    setInput('')
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setStreaming(true)

    try {
      const res = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      const reader = res.body?.getReader()
      if (!reader) return

      let assistantContent = ''
      setMessages([...newMessages, { role: 'assistant', content: '' }])

      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break
            assistantContent += data
            setMessages([...newMessages, { role: 'assistant', content: assistantContent }])
          }
        }
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: t.contact.chatError },
      ])
    } finally {
      setStreaming(false)
    }
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Radial green glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 100%, hsl(142 72% 50% / 0.08), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            {t.contact.eyebrow}
          </span>
          <h2 className="section-title text-foreground max-w-2xl">
            {t.contact.title}
          </h2>
          <p className="font-sans text-base text-muted max-w-lg">
            {t.contact.subtitle}
          </p>

          {/* Email copy */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={copyEmail}
              className="flex items-center gap-2.5 font-mono text-sm text-foreground border border-custom rounded-lg px-5 py-3 hover:border-primary hover:text-primary transition-colors bg-surface"
              aria-label="Copy email address"
            >
              <Mail size={15} className="text-primary" />
              <span>{EMAIL}</span>
              {copied ? (
                <Check size={14} className="text-primary ml-1" />
              ) : (
                <Copy size={14} className="text-muted ml-1" />
              )}
            </button>
            <Button
              variant="outline"
              size="md"
              onClick={() => setChatOpen((v) => !v)}
              className="flex items-center gap-2"
            >
              <MessageSquare size={15} />
              {chatOpen ? t.contact.chatClose : t.contact.chatOpen}
            </Button>
          </div>

          {/* AI Chat panel */}
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl text-left border border-custom rounded-2xl overflow-hidden bg-surface"
            >
              {/* Chat header */}
              <div className="border-b border-custom px-5 py-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-blink" />
                <span className="font-mono text-xs text-muted">
                  {t.contact.chatLabel}
                </span>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-3 p-5 min-h-[160px] max-h-80 overflow-y-auto">
                {messages.length === 0 && (
                  <p className="font-mono text-xs text-muted">
                    {t.contact.chatEmpty}
                  </p>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`font-sans text-sm rounded-xl px-4 py-2.5 max-w-[80%] ${
                        msg.role === 'user'
                          ? 'bg-primary/15 border border-primary/30 text-foreground'
                          : 'bg-surface-raised border border-custom text-muted'
                      }`}
                    >
                      {msg.content}
                      {streaming && i === messages.length - 1 && msg.role === 'assistant' && (
                        <span className="cursor-blink text-primary ml-1">|</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-custom px-4 py-3 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      void sendMessage()
                    }
                  }}
                  placeholder={t.contact.chatPlaceholder}
                  className="flex-1 bg-transparent font-sans text-sm text-foreground placeholder:text-muted outline-none"
                  disabled={streaming}
                />
                <button
                  onClick={() => void sendMessage()}
                  disabled={streaming || !input.trim()}
                  className="text-primary hover:text-primary-dark disabled:opacity-40 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
