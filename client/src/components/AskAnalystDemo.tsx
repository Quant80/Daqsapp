import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Send, Loader2, Bot } from "lucide-react";

const sampleQuestions = [
  "What's the difference between supervised and unsupervised learning?",
  "How do you price a financial derivative?",
  "What should a small business check before adopting AI?",
];

export default function AskAnalystDemo() {
  const [question, setQuestion] = useState("");
  const [cooldown, setCooldown] = useState(false);

  const ask = trpc.demo.ask.useMutation({
    onError: (err: { message: string }) => toast.error(err.message || "The AI couldn't process that. Please try again."),
  });

  const handleAsk = () => {
    if (question.trim().length < 5) {
      toast.error("Please enter a full question for the AI to answer.");
      return;
    }
    if (cooldown) return;
    ask.mutate({ question: question.trim() });
    setCooldown(true);
    setTimeout(() => setCooldown(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 max-w-2xl mx-auto">
      <div className="flex gap-2 mb-3">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Ask our AI Analyst a data, AI, or finance question..."
          className="bg-white/5 border-white/15 text-white placeholder:text-white/40"
          maxLength={500}
        />
        <Button
          onClick={handleAsk}
          disabled={ask.isPending || cooldown}
          className="shrink-0 rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold border-0"
        >
          {ask.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {sampleQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setQuestion(q)}
            className="text-xs text-white/60 hover:text-sky-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 min-h-[140px] flex items-center">
        {!ask.data && !ask.isPending && (
          <div className="w-full flex flex-col items-center justify-center text-center text-white/40 py-4">
            <Bot className="w-7 h-7 mb-2 opacity-40" />
            <p className="text-sm">Your AI Analyst's answer will appear here.</p>
          </div>
        )}
        {ask.isPending && (
          <div className="w-full flex flex-col items-center justify-center text-center text-white/50 py-4">
            <Loader2 className="w-7 h-7 mb-2 animate-spin" />
            <p className="text-sm">Thinking...</p>
          </div>
        )}
        {ask.data && !ask.isPending && (
          <div className="flex gap-3 items-start w-full">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-sky-300" />
            </div>
            <p className="text-white/85 text-sm leading-relaxed">{ask.data.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
