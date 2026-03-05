import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import Mascot from './Mascot';
import './ChatBot.css';

const API_URL = process.env.REACT_APP_CHAT_API_URL || '';

const SUGGESTIONS = [
  'What does Esha specialize in?',
  'Tell me about her projects',
  'What are her key skills?',
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({ api: API_URL }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const mascotState: 'idle' | 'thinking' | 'talking' =
    status === 'submitted' ? 'thinking' :
    status === 'streaming' ? 'talking' :
    'idle';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput('');
    await sendMessage({ text });
  };

  const handleSuggestion = async (text: string) => {
    if (isLoading) return;
    await sendMessage({ text });
  };

  if (!API_URL) return null;

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Mascot scale={0.3} state={mascotState} />
              </div>
              <div>
                <div className="chatbot-header-title">Ask about Esha</div>
                <div className="chatbot-header-subtitle">
                  {mascotState === 'thinking' ? 'Thinking...' :
                   mascotState === 'talking' ? 'Responding...' :
                   'AI-powered assistant'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="chatbot-close-btn"
              aria-label="Close chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="chatbot-welcome">
                <p className="chatbot-welcome-text">
                  Hi! I can answer questions about Esha's experience, skills, and projects.
                </p>
                <div className="chatbot-suggestions">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="chatbot-suggestion-btn"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message chatbot-message--${message.role}`}
              >
                {message.parts
                  .filter((part) => part.type === 'text')
                  .map((part, i) => (
                    <span key={i}>{part.type === 'text' ? part.text : null}</span>
                  ))}
              </div>
            ))}
            {error && (
              <div className="chatbot-message chatbot-message--error">
                Something went wrong. Please try again.
              </div>
            )}
            {status === 'submitted' && (
              <div className="chatbot-message chatbot-message--assistant chatbot-typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chatbot-input-form">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="chatbot-input"
              disabled={isLoading}
              aria-label="Chat message"
              maxLength={4000}
            />
            {isLoading ? (
              <button type="button" onClick={stop} className="chatbot-send-btn" aria-label="Stop">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                className="chatbot-send-btn"
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            )}
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-toggle ${isOpen ? 'chatbot-toggle--open' : ''}`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
