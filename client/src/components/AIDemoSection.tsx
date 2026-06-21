import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Zap, Loader2, AlertTriangle, CheckCircle2, Smile, Meh, Frown } from "lucide-react";

const examples = [
  {
    label: "Happy customer",
    text: "I just wanted to say how impressed I am with the new dashboard. The team rolled it out ahead of schedule and the support during onboarding was fantastic. We're already seeing faster reporting cycles.",
  },
  {
    label: "Frustrated customer",
    text: "This is the third time this month our reports have come in late, and nobody from the account team has gotten back to us. We're seriously considering moving to a different provider if this keeps happening.",
  },
  {
    label: "Business report excerpt",
    text: "Q3 churn ticked up 4% in the mid-market segment, primarily attributed to onboarding friction. Support ticket volume rose 18% week-over-week. Sales pipeline remains healthy with a 22% increase in qualified leads.",
  },
];

const sentimentStyles = {
  positive: { icon: Smile, color: "text-emerald-400", bar: "bg-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
  neutral: { icon: Meh, color: "text-sky-300", bar: "bg-sky-300", bg: "bg-sky-400/10", border: "border-sky-400/30" },
  negative: { icon: Frown, color: "text-rose-400", bar: "bg-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/30" },
};

export default function AIDemoSection() {
  const [text, setText] = useState("");
  const [cooldown, setCooldown] = useState(false);

  const analyze = trpc.demo.analyze.useMutation({
    onError: (err: { message: string }) => toast.error(err.message || "The AI couldn't process that. Please try again."),
  });

  const handleAnalyze = () => {
    if (text.trim().length < 10) {
      toast.error("Please enter at least a sentence or two for the AI to analyse.");
      return;
    }
    if (cooldown) return;
    analyze.mutate({ text: text.trim() });
    setCooldown(true);
    setTimeout(() => setCooldown(false), 3000);
  };

  const result = analyze.data;
  const sentimentStyle = result ? sentimentStyles[result.sentiment] : null;
  const SentimentIcon = sentimentStyle?.icon;

  return (
    <section id="ai-demo" className="py-20 bg-[#061726]">
      <div className="container">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-emerald-400/15 text-emerald-300 border-emerald-400/30 gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Live Demo
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            See Our AI in Action
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Paste a customer review, an email, or a report excerpt below and watch our AI extract sentiment, key themes, and business risk in real time — no demo video, the real thing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Input */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste any business text here — a customer review, an email, a report excerpt..."
              className="min-h-[160px] bg-white/5 border-white/15 text-white placeholder:text-white/40 resize-none"
              maxLength={1000}
            />
            <div className="flex flex-wrap gap-2 mt-3 mb-5">
              {examples.map((ex) => (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => setText(ex.text)}
                  className="text-xs text-white/60 hover:text-sky-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-colors"
                >
                  Try: {ex.label}
                </button>
              ))}
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={analyze.isPending || cooldown}
              className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow-lg shadow-blue-500/20 border-0"
            >
              {analyze.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analysing...</>
              ) : (
                <><Zap className="w-4 h-4 mr-2" /> Analyse with AI</>
              )}
            </Button>
          </div>

          {/* Results */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 flex flex-col">
            {!result && !analyze.isPending && (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-white/40 py-12">
                <Zap className="w-8 h-8 mb-3 opacity-40" />
                <p className="text-sm">Your AI-generated analysis will appear here.</p>
              </div>
            )}

            {analyze.isPending && (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-white/50 py-12">
                <Loader2 className="w-8 h-8 mb-3 animate-spin" />
                <p className="text-sm">Running live analysis...</p>
              </div>
            )}

            {result && sentimentStyle && SentimentIcon && !analyze.isPending && (
              <div className="space-y-5">
                <div className={`flex items-center gap-3 rounded-xl border p-4 ${sentimentStyle.bg} ${sentimentStyle.border}`}>
                  <SentimentIcon className={`w-7 h-7 shrink-0 ${sentimentStyle.color}`} />
                  <div className="flex-1">
                    <div className={`text-sm font-bold capitalize ${sentimentStyle.color}`}>{result.sentiment} sentiment</div>
                    <div className="h-1.5 rounded-full bg-white/10 mt-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${sentimentStyle.bar}`}
                        style={{ width: `${result.sentimentScore}%` }}
                      />
                    </div>
                  </div>
                  <div className={`text-lg font-bold ${sentimentStyle.color}`}>{result.sentimentScore}%</div>
                </div>

                <div>
                  <div className="text-white/40 text-[11px] font-semibold uppercase tracking-wider mb-2">Key Themes</div>
                  <div className="flex flex-wrap gap-2">
                    {result.themes.map((theme) => (
                      <span key={theme} className="text-xs text-sky-300 bg-sky-400/10 border border-sky-400/20 rounded-full px-3 py-1">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-white/40 text-[11px] font-semibold uppercase tracking-wider mb-2">Summary</div>
                  <p className="text-white/80 text-sm leading-relaxed">{result.summary}</p>
                </div>

                <div className={`flex items-start gap-2.5 rounded-xl p-3 border ${result.riskFlag ? "bg-amber-400/10 border-amber-400/30" : "bg-emerald-400/10 border-emerald-400/30"}`}>
                  {result.riskFlag ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <div className="text-xs">
                    <div className={`font-semibold mb-0.5 ${result.riskFlag ? "text-amber-400" : "text-emerald-400"}`}>
                      {result.riskFlag ? "Risk flagged" : "No risk flagged"}
                    </div>
                    <div className="text-white/60">{result.riskReason || "Nothing in this text suggests an immediate business risk."}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
