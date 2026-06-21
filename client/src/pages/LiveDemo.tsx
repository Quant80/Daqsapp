import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, MessageSquareText, ArrowRight, HeartPulse, GraduationCap } from "lucide-react";
import TextAnalyzerDemo from "@/components/TextAnalyzerDemo";
import AskAnalystDemo from "@/components/AskAnalystDemo";
import bgNeon from "@/assets/daqs-bg-neon.png";

export default function LiveDemo() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061726] via-[#0b2540] to-[#0c1f33] pt-32 pb-16">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url('${bgNeon}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />

        <div className="container relative z-10 text-center">
          <Badge className="mb-5 bg-emerald-400/15 text-emerald-300 border-emerald-400/30 gap-1.5 mx-auto">
            <Zap className="w-3.5 h-3.5" /> Live Demo
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
            See Our{" "}
            <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-accent bg-clip-text text-transparent">
              AI in Action
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            No demo video, no slides — two live tools running on the same AI infrastructure we build for clients. Try them yourself, right now.
          </p>
        </div>
      </section>

      {/* Demos */}
      <section className="py-16 bg-[#061726]">
        <div className="container max-w-3xl">
          <Tabs defaultValue="analyzer" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-white/5 border border-white/10 p-2 rounded-xl mb-10 justify-center mx-auto w-fit">
              <TabsTrigger
                value="analyzer"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-white/70"
              >
                <Zap className="w-4 h-4" /> Text Analyzer
              </TabsTrigger>
              <TabsTrigger
                value="analyst"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-white/70"
              >
                <MessageSquareText className="w-4 h-4" /> Ask Our AI Analyst
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analyzer" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                  Real-Time Sentiment & Risk Analysis
                </h2>
                <p className="text-white/60 max-w-xl mx-auto">
                  Paste a customer review, an email, or a report excerpt and watch our AI extract sentiment, key themes, and business risk in real time.
                </p>
              </div>
              <TextAnalyzerDemo />
            </TabsContent>

            <TabsContent value="analyst" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                  Ask a Data, AI, or Finance Question
                </h2>
                <p className="text-white/60 max-w-xl mx-auto">
                  Get a sharp, consultant-grade answer in seconds — the same expertise behind every DAQS engagement.
                </p>
              </div>
              <AskAnalystDemo />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Proof / CTA */}
      <section className="py-16 bg-[#0b2540]">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              This Isn't a Mockup — It's What We Build
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              The same AI infrastructure powering these demos is already running in production for our clients.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
            <Link href="/projects">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 hover:border-blue-400/40 hover:bg-white/[0.07] transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-rose-500/15 flex items-center justify-center mb-3">
                  <HeartPulse className="w-5 h-5 text-rose-300" />
                </div>
                <div className="font-semibold text-white text-sm mb-1 group-hover:text-sky-300 transition-colors">SmartCare AI</div>
                <div className="text-white/55 text-xs">Real-time hospital risk scoring, live in production</div>
              </div>
            </Link>
            <Link href="/projects">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 hover:border-blue-400/40 hover:bg-white/[0.07] transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center mb-3">
                  <GraduationCap className="w-5 h-5 text-sky-300" />
                </div>
                <div className="font-semibold text-white text-sm mb-1 group-hover:text-sky-300 transition-colors">DUT Student Success</div>
                <div className="text-white/55 text-xs">AI risk scoring across 67,000+ students, live today</div>
              </div>
            </Link>
          </div>
          <div className="text-center">
            <Link href="/contact" asChild>
              <Button size="lg" className="rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow-lg shadow-blue-500/30 border-0">
                Talk to Us About Your Use Case <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
