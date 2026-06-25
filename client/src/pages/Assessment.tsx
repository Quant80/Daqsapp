import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  ArrowRight, ArrowLeft, Loader2, ClipboardCheck,
  BarChart3, Brain, LineChart, Calculator, Lock, RotateCcw,
  Award, Users, GraduationCap, Star,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const heroStats = [
  { value: 10, suffix: "+", label: "Years Combined Experience", icon: Award },
  { value: 200, suffix: "+", label: "Clients Served", icon: Users },
  { value: 50, suffix: "+", label: "Training Programs", icon: GraduationCap },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: Star },
];
import bgGold from "@/assets/daqs-bg-gold.png";

type Track = "data-science" | "ml-ai" | "quant" | "accounting";

interface Option {
  label: string;
  score?: number;
  track?: Track;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: "orgSize",
    question: "What's the size of your organisation?",
    options: [
      { label: "Solo / Startup (1–10 people)" },
      { label: "Small business (11–50 people)" },
      { label: "Mid-size company (51–200 people)" },
      { label: "Enterprise (200+ people)" },
    ],
  },
  {
    id: "dataInfra",
    question: "How would you describe your current data infrastructure?",
    options: [
      { label: "We don't track data systematically", score: 1, track: "data-science" },
      { label: "We rely mostly on spreadsheets", score: 2, track: "data-science" },
      { label: "We have BI dashboards / reporting tools", score: 3, track: "data-science" },
      { label: "We have a mature data warehouse and pipelines", score: 4, track: "ml-ai" },
    ],
  },
  {
    id: "aiUsage",
    question: "Are you currently using AI or machine learning in your business?",
    options: [
      { label: "Not at all", score: 1, track: "ml-ai" },
      { label: "Exploring / considering it", score: 2, track: "ml-ai" },
      { label: "Piloting a few use cases", score: 3, track: "ml-ai" },
      { label: "Actively using ML/AI in production", score: 4, track: "ml-ai" },
    ],
  },
  {
    id: "challenge",
    question: "What's your biggest data or AI challenge right now?",
    options: [
      { label: "We don't know where to start", score: 2, track: "data-science" },
      { label: "Our data is messy or disorganised", score: 2, track: "data-science" },
      { label: "We need to upskill our team", score: 2, track: "ml-ai" },
      { label: "We need expert help implementing solutions", score: 3, track: "ml-ai" },
    ],
  },
  {
    id: "goal",
    question: "What's your primary goal for the next 12 months?",
    options: [
      { label: "Build foundational data literacy", score: 2, track: "data-science" },
      { label: "Launch our first AI/ML project", score: 2, track: "ml-ai" },
      { label: "Optimise financial or quantitative decisions", score: 2, track: "quant" },
      { label: "Improve accounting, audit, or investment processes", score: 2, track: "accounting" },
    ],
  },
  {
    id: "teamSkill",
    question: "How would you rate your team's technical skill level?",
    options: [
      { label: "Beginner — little to no data/coding experience", score: 1 },
      { label: "Intermediate — some analysts, basic tools", score: 2 },
      { label: "Advanced — dedicated data/dev team", score: 3 },
      { label: "Expert — established data science function", score: 4 },
    ],
  },
];

const trackInfo: Record<Track, { label: string; desc: string; icon: React.ElementType; href: string }> = {
  "data-science": {
    label: "Data Science",
    desc: "Start with our Foundations of Data Science and Business Intelligence courses to build a solid analytical base.",
    icon: BarChart3,
    href: "/training#courses",
  },
  "ml-ai": {
    label: "Machine Learning & AI",
    desc: "Our ML & AI track covers everything from supervised learning to deep learning and AI strategy for leaders.",
    icon: Brain,
    href: "/training#courses",
  },
  quant: {
    label: "Quantitative Finance",
    desc: "Sharpen derivatives pricing, risk modelling, and algorithmic trading skills with our Quant Finance programs.",
    icon: LineChart,
    href: "/training#courses",
  },
  accounting: {
    label: "Accounting & Finance",
    desc: "Strengthen financial reporting, auditing, and investment advisory capabilities with our Accounting track.",
    icon: Calculator,
    href: "/training#courses",
  },
};

const SCORABLE_MAX = 4 + 4 + 4; // dataInfra + aiUsage + teamSkill

function getLevel(pct: number) {
  if (pct <= 35) return { label: "Just Getting Started", color: "text-amber-400 border-amber-400/30 bg-amber-400/10" };
  if (pct <= 70) return { label: "Building Momentum", color: "text-sky-300 border-sky-400/30 bg-sky-400/10" };
  return { label: "Advanced & Scaling", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" };
}

export default function Assessment() {
  const [step, setStep] = useState(0); // 0..questions.length-1 = quiz, questions.length = lead gate, questions.length+1 = results
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [lead, setLead] = useState({ name: "", email: "", company: "" });
  const [unlocked, setUnlocked] = useState(false);

  const submitLead = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setUnlocked(true);
      toast.success("Your results are ready!");
    },
    onError: (err: { message: string }) => toast.error(err.message || "Something went wrong. Please try again."),
  });

  const totalQuestions = questions.length;
  const isQuiz = step < totalQuestions;
  const isGate = step === totalQuestions && !unlocked;
  const isResults = step === totalQuestions && unlocked;

  const selectOption = (optionIndex: number) => {
    const q = questions[step];
    setAnswers((prev) => ({ ...prev, [q.id]: optionIndex }));
    setTimeout(() => setStep((s) => s + 1), 200);
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const restart = () => {
    setStep(0);
    setAnswers({});
    setUnlocked(false);
  };

  // ── Scoring ──────────────────────────────────────────────
  let rawScore = 0;
  const trackTally: Record<string, number> = {};
  questions.forEach((q) => {
    const idx = answers[q.id];
    if (idx === undefined) return;
    const opt = q.options[idx];
    if (["dataInfra", "aiUsage", "teamSkill"].includes(q.id) && opt.score) {
      rawScore += opt.score;
    }
    if (opt.track) {
      trackTally[opt.track] = (trackTally[opt.track] || 0) + 1;
    }
  });
  const pct = Math.round((rawScore / SCORABLE_MAX) * 100);
  const level = getLevel(pct);
  const topTrack = (Object.entries(trackTally).sort((a, b) => b[1] - a[1])[0]?.[0] as Track) || "data-science";
  const recommendation = trackInfo[topTrack];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name || !lead.email) {
      toast.error("Please enter your name and email to see your results.");
      return;
    }
    const transcript = questions
      .map((q) => `${q.question}\n  → ${q.options[answers[q.id]]?.label ?? "(skipped)"}`)
      .join("\n");
    submitLead.mutate({
      name: lead.name,
      email: lead.email,
      company: lead.company || undefined,
      service: "AI Readiness Assessment",
      message: `Readiness Score: ${pct}/100 (${level.label})\nRecommended Track: ${recommendation.label}\n\n${transcript}`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#061726] via-[#0b2540] to-[#0c1f33]">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url('${bgGold}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />

        <div className="container relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: heading */}
            <div>
              <Badge className="mb-5 bg-accent/15 text-accent border-accent/30 gap-1.5">
                Free Assessment
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                What's Your{" "}
                <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-accent bg-clip-text text-transparent">
                  AI & Data Readiness Score?
                </span>
              </h1>
              <p className="text-white/70 text-lg max-w-xl">
                Answer 6 quick questions and get a personalised readiness score plus a tailored training & consulting roadmap — in under 2 minutes.
              </p>
            </div>

            {/* Right: glass stats card */}
            <div className="relative hidden lg:block pt-8 w-3/4 ml-auto">
              <div className="rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl shadow-2xl p-3">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-400/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                  <span className="w-2 h-2 rounded-full bg-green-400/80" />
                  <span className="ml-1.5 text-white/65" style={{ fontSize: "10px" }}>DAQS Insights · Live</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {heroStats.map((s) => (
                    <div key={s.label} className="rounded-xl bg-white/10 border border-white/20 p-2.5">
                      <s.icon className="w-3.5 h-3.5 text-sky-300 mb-1 opacity-90" />
                      <div className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>
                        <AnimatedCounter target={s.value} suffix={s.suffix} />
                      </div>
                      <div className="text-white/75 leading-tight mt-0.5" style={{ fontSize: "10px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-12 -right-3 bg-white/15 backdrop-blur-xl border border-white/30 rounded-lg shadow-lg p-2 w-40 hidden xl:block z-10">
                <div className="flex items-center gap-1.5 text-emerald-300 text-[10px] font-semibold mb-0.5">
                  <ClipboardCheck className="w-2.5 h-2.5 shrink-0" /> LIVE QUIZ
                </div>
                <div className="text-white text-[11px] font-semibold leading-tight">AI Readiness</div>
                <div className="text-white/70 text-[10px] leading-tight mt-0.5">Get your score in 2 minutes</div>
              </div>

              <div className="absolute bottom-4 -left-3 bg-white/15 backdrop-blur-xl border border-white/30 rounded-lg shadow-lg p-2 w-40 hidden xl:block z-10">
                <div className="flex items-center gap-1.5 text-sky-300 text-[10px] font-semibold mb-0.5">
                  <Award className="w-2.5 h-2.5 shrink-0" /> CERTIFIED
                </div>
                <div className="text-white text-[11px] font-semibold leading-tight">Industry Framework</div>
                <div className="text-white/70 text-[10px] leading-tight mt-0.5">Based on global AI standards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16 bg-background">
        <div className="container max-w-2xl">
          {(isQuiz || isGate) && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
                <span>{isQuiz ? `Question ${step + 1} of ${totalQuestions}` : "Almost done!"}</span>
                <span>{isQuiz ? Math.round((step / totalQuestions) * 100) : 100}%</span>
              </div>
              <Progress value={isQuiz ? (step / totalQuestions) * 100 : 100} />
            </div>
          )}

          {isQuiz && (
            <Card className="border border-border">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                  {questions[step].question}
                </h2>
                <div className="space-y-3">
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => selectOption(idx)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                        answers[questions[step].id] === idx
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/40 hover:bg-muted/50 text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <Button variant="ghost" className="mt-6 text-muted-foreground" onClick={goBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {isGate && (
            <Card className="border border-border overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Lock className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  Your results are ready!
                </h2>
                <p className="text-muted-foreground mb-8">
                  Enter your details to unlock your personalised readiness score and training roadmap.
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-4 text-left max-w-sm mx-auto">
                  <div>
                    <Label htmlFor="lead-name">Full Name</Label>
                    <Input
                      id="lead-name"
                      value={lead.name}
                      onChange={(e) => setLead({ ...lead, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lead-email">Email Address</Label>
                    <Input
                      id="lead-email"
                      type="email"
                      value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lead-company">Company (optional)</Label>
                    <Input
                      id="lead-company"
                      value={lead.company}
                      onChange={(e) => setLead({ ...lead, company: e.target.value })}
                      placeholder="Your company"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={submitLead.isPending}>
                    {submitLead.isPending ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Unlocking...</>
                    ) : (
                      <>Unlock My Results <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {isResults && (
            <div className="space-y-6">
              <Card className="border border-border overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
                    <ClipboardCheck className="w-7 h-7 text-emerald-500" />
                  </div>
                  <div className="text-5xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                    {pct}<span className="text-2xl text-muted-foreground">/100</span>
                  </div>
                  <Badge className={`mb-4 ${level.color}`}>{level.label}</Badge>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Thanks, {lead.name.split(" ")[0]}! Based on your answers, here's where you stand and what we'd recommend next.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <recommendation.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recommended Track</div>
                      <div className="text-lg font-bold text-foreground">{recommendation.label}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{recommendation.desc}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href={recommendation.href} asChild>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Explore Recommended Training <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/contact" asChild>
                      <Button variant="outline">
                        Book a Free Consultation
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button variant="ghost" className="text-muted-foreground" onClick={restart}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Retake the Assessment
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
