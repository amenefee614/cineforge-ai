"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
  toolUsed?: string | null;
  toolLink?: string | null;
}

interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
  messages: { role: string; content: string }[];
}

const SUGGESTED_PROMPTS = [
  "Generate a CODEx prompt",
  "Build a shot list",
  "Estimate my budget",
  "Recommend a visual style",
];

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
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [recentChats, setRecentChats] = useState<Conversation[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load recent conversations when opening
  useEffect(() => {
    if (open && session) {
      fetch("/api/cinebot/conversations")
        .then((res) => res.json())
        .then((data) => setRecentChats(data.conversations || []))
        .catch(() => {});
    }
  }, [open, session]);

  // Create a new conversation on first open
  useEffect(() => {
    if (open && session && !conversationId) {
      fetch("/api/cinebot/conversations", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          if (data.conversation) setConversationId(data.conversation.id);
        })
        .catch(() => {});
    }
  }, [open, session, conversationId]);

  if (!session) return null;

  const sendMessage = async (overrideInput?: string) => {
    const text = overrideInput || input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/cinebot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
          conversationId,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            toolUsed: data.toolUsed || null,
            toolLink: data.toolLink || null,
          },
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

  const loadConversation = (convo: Conversation) => {
    setConversationId(convo.id);
    const loaded: Message[] = convo.messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));
    if (loaded.length === 0) {
      loaded.push({
        role: "assistant",
        content: "Yo, I'm CineBot — your AI co-producer. What are we building today?",
      });
    }
    setMessages(loaded);
    setShowHistory(false);
  };

  const startNewChat = async () => {
    try {
      const res = await fetch("/api/cinebot/conversations", { method: "POST" });
      const data = await res.json();
      if (data.conversation) {
        setConversationId(data.conversation.id);
        setMessages([
          {
            role: "assistant",
            content: "Yo, I'm CineBot — your AI co-producer. What are we building today?",
          },
        ]);
        setShowHistory(false);
      }
    } catch {}
  };

  const hasUserMessages = messages.some((m) => m.role === "user");

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-on-surface flex items-center justify-center shadow-[0_10px_40px_rgba(157,111,232,0.5)] transition-all duration-150"
      >
        <span className="font-headline text-xl tracking-[0.05em]">CB</span>
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-primary-hover animate-pulse" />
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="cinebot-slide-up fixed bottom-24 right-6 z-[9999] w-[360px] sm:w-[400px] h-[520px] bg-surface border border-border-custom/50 backdrop-blur-xl flex flex-col shadow-[0_10px_40px_rgba(157,111,232,0.3)]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-custom/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-headline text-lg text-on-surface tracking-[0.05em] uppercase">
                CineBot
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-muted-text hover:text-on-surface transition-colors duration-150 p-1"
                title="Recent chats"
              >
                <span className="material-symbols-outlined text-sm">history</span>
              </button>
              <button
                onClick={startNewChat}
                className="text-muted-text hover:text-on-surface transition-colors duration-150 p-1"
                title="New chat"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-text hover:text-on-surface transition-colors duration-150 p-1"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>

          {/* Recent Chats Dropdown */}
          {showHistory && (
            <div className="border-b border-border-custom/30 bg-deep-surface max-h-40 overflow-y-auto">
              <div className="px-3 py-2">
                <span className="font-studio text-[10px] text-muted-text tracking-widest uppercase">
                  Recent Chats
                </span>
              </div>
              {recentChats.length > 0 ? (
                recentChats.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => loadConversation(c)}
                    className={`w-full text-left px-3 py-2 hover:bg-primary/10 transition-colors ${
                      c.id === conversationId ? "bg-primary/15 text-primary" : "text-on-surface"
                    }`}
                  >
                    <p className="font-body text-xs truncate">{c.title}</p>
                    <p className="font-studio text-[9px] text-muted-text/50">
                      {new Date(c.updatedAt).toLocaleDateString()}
                    </p>
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 font-body text-xs text-muted-text/50">
                  No recent chats
                </p>
              )}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[85%]">
                  <div
                    className={`px-3 py-2 font-body text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary/20 text-on-surface"
                        : "bg-deep-surface text-on-surface"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.toolUsed && msg.toolLink && (
                    <Link
                      href={msg.toolLink}
                      className="inline-flex items-center gap-1 mt-1 px-2 py-1 bg-primary/10 text-primary font-studio text-[10px] tracking-widest uppercase hover:bg-primary/20 transition-colors"
                    >
                      Open in {msg.toolUsed}
                      <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-deep-surface px-4 py-3 flex items-center gap-1.5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {!hasUserMessages && !loading && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-1.5 font-studio text-[10px] tracking-wider uppercase hover:bg-primary/20 hover:border-primary/40 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

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
                onClick={() => sendMessage()}
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
