"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function CineBot() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Yo, I'm CineBot — your AI co-producer. What are we building today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!session) return null;

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/cinebot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.slice(-10) }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection issue. Try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-on-surface flex items-center justify-center shadow-[0_10px_40px_rgba(157,111,232,0.5)] transition-all duration-150"
      >
        <span className="font-headline text-xl tracking-[0.05em]">CB</span>
        {/* Pulsing dot */}
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-primary-hover animate-pulse" />
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[9999] w-[360px] sm:w-[400px] h-[500px] bg-surface border border-border-custom/50 backdrop-blur-xl flex flex-col shadow-[0_10px_40px_rgba(157,111,232,0.3)]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-custom/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-headline text-lg text-on-surface tracking-[0.05em] uppercase">
                CineBot
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-text hover:text-on-surface transition-colors duration-150"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 font-body text-sm ${
                    msg.role === "user"
                      ? "bg-primary/20 text-on-surface"
                      : "bg-deep-surface text-on-surface"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-deep-surface px-3 py-2 text-muted-text font-body text-sm">
                  <span className="animate-pulse">CineBot is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border-custom/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask CineBot anything..."
                className="flex-1 bg-deep-surface text-on-surface font-body text-sm px-3 py-2 border border-border-custom/30 focus:border-primary/50 focus:outline-none placeholder:text-muted-text/50"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-primary hover:bg-primary-hover text-on-surface px-3 py-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
