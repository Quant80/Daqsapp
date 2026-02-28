import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { MessageSquare, X, Send, Loader2, Bot, User, Minimize2 } from "lucide-react";
import { nanoid } from "nanoid";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hello! I'm the DAQS AI Assistant. I can help you learn about our services in data analytics, machine learning, AI, quantitative solutions, accounting, and training programs. How can I assist you today?",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => nanoid());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chat = trpc.chatbot.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm experiencing a technical issue. Please contact us directly at Trymore.N@daqs.co.za or call +27 60 343 1561." },
      ]);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || chat.isPending) return;

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const history = messages.slice(-10);
    chat.mutate({ sessionId, message: trimmed, history });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full daqs-gradient shadow-xl flex items-center justify-center hover:scale-110 transition-transform group"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[oklch(0.72_0.14_75)] rounded-full border-2 border-white" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-background rounded-2xl shadow-2xl border border-border flex flex-col transition-all duration-300 ${
            minimized ? "h-14" : "h-[520px]"
          }`}
        >
          {/* Header */}
          <div className="daqs-gradient rounded-t-2xl px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">DAQS Assistant</div>
                <div className="text-white/70 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setMinimized(!minimized)}
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.role === "user" ? "bg-primary" : "bg-muted"}`}>
                      {msg.role === "user" ? (
                        <User className="w-3.5 h-3.5 text-primary-foreground" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] px-3 py-2 text-sm leading-relaxed ${
                        msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chat.isPending && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div className="chat-bubble-bot px-4 py-3 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {["What services do you offer?", "Tell me about training programs", "How do I contact DAQS?"].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setInput(prompt)}
                      className="text-xs bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground rounded-full px-3 py-1 transition-colors border border-border"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-border flex gap-2 shrink-0">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our services..."
                  className="text-sm"
                  disabled={chat.isPending}
                />
                <Button
                  size="icon"
                  className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSend}
                  disabled={!input.trim() || chat.isPending}
                >
                  {chat.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
