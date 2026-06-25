import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, TrendingUp, BarChart3, PieChart, ExternalLink, HeartPulse, GraduationCap,
  Brain, AlertTriangle, Building2, LayoutDashboard, UploadCloud, ShieldCheck,
  ChevronDown, LineChart, RefreshCw, Target, FileText, Lock, Award, Users, Star,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const heroStats = [
  { value: 10, suffix: "+", label: "Years Combined Experience", icon: Award },
  { value: 200, suffix: "+", label: "Clients Served", icon: Users },
  { value: 50, suffix: "+", label: "Training Programs", icon: GraduationCap },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: Star },
];
import { Link } from "wouter";
import bgBillboard from "@/assets/daqs-bg-billboard.png";
import bgGold from "@/assets/daqs-bg-gold.png";
import bgMountain from "@/assets/daqs-bg-mountain.png";
import bgSignage from "@/assets/daqs-bg-signage.png";
import bgNeon from "@/assets/daqs-bg-neon.png";
import logoSmall from "@/assets/logo-small.png";

const liveProjects = [
  {
    name: "SmartCare AI",
    tagline: "Intelligent Hospital Management Platform",
    industry: "Healthcare & AI",
    challenge: "Hospital staff relied on disconnected charts and manual rounds, making it hard to spot patient deterioration early enough to act.",
    solution: "DAQS built SmartCare AI — a real-time hospital management platform that unifies every patient's vitals, alerts, and bed status into one live dashboard, powered by AI risk scoring.",
    results: "94% AI model accuracy in flagging at-risk patients, full visibility across all 186 beds, and 24/7 live monitoring for clinical teams.",
    imageUrl: logoSmall,
    url: "https://smartcare-systems.netlify.app/",
    icon: HeartPulse,
    useLogo: true,
    capabilities: [
      { icon: LayoutDashboard, title: "Real-Time Patient Dashboard", desc: "Live, ward-by-ward view of every active patient's vitals and status." },
      { icon: Brain, title: "AI-Powered Risk Scoring", desc: "XGBoost models continuously flag patient deterioration before it becomes critical." },
      { icon: AlertTriangle, title: "Critical Alert System", desc: "Instant notifications when vitals breach safe thresholds, with recommended actions." },
      { icon: Building2, title: "Bed Capacity Management", desc: "Real-time occupancy tracking across all 186 beds for smarter resource planning." },
    ],
    badges: ["POPIA Compliant", "256-bit Encryption", "HPCSA Aligned", "99.9% Uptime SLA"],
    stats: [
      { value: "94%", label: "AI Model Accuracy" },
      { value: "186", label: "Beds Tracked" },
      { value: "24/7", label: "Live Monitoring" },
    ],
  },
  {
    name: "Student Success Intelligent System",
    tagline: "Academic Risk & Analytics Platform",
    industry: "Education & Analytics",
    challenge: "Advisors often only learned a student was struggling once it was too late to intervene, with enrolment and academic records scattered across separate systems.",
    solution: "DAQS built the Student Success Intelligent System, unifying enrolment and academic data into a single live dashboard with AI risk scoring that flags students needing support in real time.",
    useLogo: true,
    results: "94% AI model accuracy across 67,000+ students monitored, with individual risk scores generated in under 3 seconds.",
    imageUrl: bgSignage,
    imagePosition: "85% center",
    url: "https://dut-student-success-dashboard.netlify.app/",
    icon: GraduationCap,
    capabilities: [
      { icon: LayoutDashboard, title: "Unified Student Dashboard", desc: "A single live view of every student's academic journey and risk status." },
      { icon: Brain, title: "AI Risk Scoring", desc: "XGBoost models generate a quantified risk probability for every student in real time." },
      { icon: AlertTriangle, title: "Critical Intervention Alerts", desc: "Immediate flags for students who need urgent advisor intervention." },
      { icon: UploadCloud, title: "Bulk Data Ingestion", desc: "Institutions upload enrolment and academic records directly to keep analytics current." },
    ],
    badges: ["POPIA Compliant", "256-bit Encryption", "DHET Aligned", "99.9% Uptime SLA"],
    stats: [
      { value: "67k", label: "Students Monitored" },
      { value: "94%", label: "AI Model Accuracy" },
      { value: "<3s", label: "Risk Score Generation" },
    ],
  },
];

const caseStudies = [
  {
    id: 1,
    title: "Predictive Analytics for Investment Portfolio Optimization",
    industry: "Finance & Investment",
    challenge: "A major investment firm struggled with portfolio optimization, losing competitive advantage due to manual analysis processes.",
    solution: "DAQS implemented machine learning models to analyze market trends, correlations, and risk factors in real-time, enabling data-driven portfolio decisions.",
    results: "25% improvement in portfolio returns, 40% reduction in analysis time, enhanced risk management capabilities.",
    imageUrl: bgGold,
    clientName: "Global Investment Partners",
    icon: TrendingUp,
    capabilities: [
      { icon: LineChart, title: "Real-Time Market Analysis", desc: "Continuous monitoring of market trends and correlations across asset classes." },
      { icon: BarChart3, title: "Risk Factor Modelling", desc: "Quantifies portfolio exposure to key risk drivers in real time." },
      { icon: RefreshCw, title: "Automated Rebalancing Signals", desc: "Flags optimal rebalancing opportunities based on live model output." },
      { icon: PieChart, title: "Performance Reporting", desc: "Clear dashboards tracking returns against benchmarks." },
    ],
  },
  {
    id: 2,
    title: "AI-Powered Fraud Detection System",
    industry: "Banking & Financial Services",
    challenge: "A banking institution faced increasing fraud losses and needed a more sophisticated detection system beyond rule-based approaches.",
    solution: "DAQS developed a deep learning model trained on historical transaction data to identify fraudulent patterns with high accuracy.",
    results: "92% fraud detection rate, 60% reduction in false positives, saved millions in fraud losses annually.",
    imageUrl: logoSmall,
    clientName: "Premier Bank Corporation",
    icon: BarChart3,
    useLogo: true,
    capabilities: [
      { icon: Brain, title: "Transaction Pattern Analysis", desc: "Deep learning models score every transaction for fraud risk." },
      { icon: AlertTriangle, title: "Real-Time Alerts", desc: "Flags suspicious activity within seconds of occurrence." },
      { icon: Target, title: "False Positive Reduction", desc: "Continuously tuned thresholds to minimise legitimate transaction blocks." },
      { icon: RefreshCw, title: "Historical Pattern Learning", desc: "Models retrained on new fraud patterns as they emerge." },
    ],
  },
  {
    id: 3,
    title: "Revenue Forecasting & Demand Planning",
    industry: "Retail & E-commerce",
    challenge: "An e-commerce company struggled with inventory management and revenue forecasting, leading to stockouts and excess inventory.",
    solution: "DAQS built time series forecasting models incorporating seasonality, trends, and external factors for accurate demand prediction.",
    results: "35% improvement in forecast accuracy, 20% reduction in inventory costs, 15% increase in revenue.",
    imageUrl: bgMountain,
    clientName: "Digital Commerce Solutions",
    icon: PieChart,
    capabilities: [
      { icon: LineChart, title: "Time Series Forecasting", desc: "Predicts demand incorporating seasonality and trend shifts." },
      { icon: Building2, title: "Inventory Optimisation", desc: "Recommends stock levels to minimise overstock and stockouts." },
      { icon: Target, title: "Scenario Planning", desc: "Models the impact of promotions and external factors on demand." },
      { icon: FileText, title: "Automated Reporting", desc: "Weekly forecast accuracy tracking for planning teams." },
    ],
  },
  {
    id: 4,
    title: "Pension Fund Performance Analysis & Optimization",
    industry: "Pension & Retirement Services",
    challenge: "A pension fund manager needed comprehensive analysis and optimization of asset allocation across multiple investment vehicles.",
    solution: "DAQS conducted quantitative analysis using modern portfolio theory and risk modeling to optimize asset allocation.",
    results: "18% improvement in risk-adjusted returns, enhanced compliance reporting, better stakeholder communication.",
    imageUrl: bgSignage,
    clientName: "National Pension Fund",
    icon: TrendingUp,
    capabilities: [
      { icon: PieChart, title: "Asset Allocation Modelling", desc: "Optimises allocation using modern portfolio theory." },
      { icon: TrendingUp, title: "Risk-Adjusted Return Analysis", desc: "Tracks performance against risk-adjusted benchmarks." },
      { icon: ShieldCheck, title: "Compliance Reporting", desc: "Automated generation of regulatory and stakeholder reports." },
      { icon: AlertTriangle, title: "Scenario Stress Testing", desc: "Simulates market shocks against current allocations." },
    ],
  },
];

export default function CaseStudies() {
  const [openCaps, setOpenCaps] = useState<Set<string>>(new Set());
  const toggleCaps = (id: string) =>
    setOpenCaps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="min-h-screen">
      {/* ── HERO ────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#061726] via-[#0b2540] to-[#0c1f33]">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url('${bgBillboard}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061726]/65 via-[#0b2540]/45 to-[#0c1f33]/65" />

        <div className="container relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: heading */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                Success Stories
              </h1>
              <p className="text-white/75 text-xl max-w-2xl">
                Discover how DAQS has delivered measurable results for clients across diverse industries through data-driven solutions.
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
                  <TrendingUp className="w-2.5 h-2.5 shrink-0" /> LIVE PROJECTS
                </div>
                <div className="text-white text-[11px] font-semibold leading-tight">Real Platforms</div>
                <div className="text-white/70 text-[10px] leading-tight mt-0.5">Production-ready builds</div>
              </div>

              <div className="absolute bottom-4 -left-3 bg-white/15 backdrop-blur-xl border border-white/30 rounded-lg shadow-lg p-2 w-40 hidden xl:block z-10">
                <div className="flex items-center gap-1.5 text-sky-300 text-[10px] font-semibold mb-0.5">
                  <Award className="w-2.5 h-2.5 shrink-0" /> PROVEN RESULTS
                </div>
                <div className="text-white text-[11px] font-semibold leading-tight">Client Success</div>
                <div className="text-white/70 text-[10px] leading-tight mt-0.5">Measurable outcomes delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED LIVE PROJECTS ────────────────────────── */}
      <section className="relative py-16 bg-[#071428] overflow-hidden">
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: `url('${bgBillboard}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <div className="text-sky-300 text-xs font-semibold tracking-widest uppercase mb-3">Featured Work</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              Live Platforms We've Built
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Real products, in production today. See the platforms for yourself — no demo video, just the live thing.
            </p>
          </div>
          <div className="space-y-12">
            {liveProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <Card key={project.name} className="border-0 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className={`relative h-64 md:h-auto ${isEven ? "md:order-2" : "md:order-1"}`}>
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-full object-cover"
                        style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
                      />
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-primary text-primary-foreground">{project.industry}</Badge>
                      </div>
                      <div className="absolute top-6 right-6">
                        <Badge className="bg-emerald-500 text-white gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className={`p-8 flex flex-col justify-center ${isEven ? "md:order-1" : "md:order-2"}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <img src={logoSmall} alt="DAQS" className="w-9 h-9 object-contain" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-foreground">{project.name}</h3>
                          <p className="text-muted-foreground text-xs">{project.tagline}</p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
                          <p className="text-muted-foreground text-sm">{project.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Solution</h4>
                          <p className="text-muted-foreground text-sm">{project.solution}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Results</h4>
                          <p className="text-primary font-semibold text-sm">{project.results}</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => toggleCaps(`live-${project.name}`)}
                            className="w-full flex items-center justify-between gap-2 py-1 group"
                          >
                            <h4 className="font-semibold text-foreground">Capabilities</h4>
                            <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openCaps.has(`live-${project.name}`) ? "rotate-180" : ""}`} />
                          </button>
                          {openCaps.has(`live-${project.name}`) && (
                            <div className="grid sm:grid-cols-2 gap-2 mt-2">
                              {project.capabilities.map((cap) => (
                                <div key={cap.title} className="flex items-start gap-2.5 bg-muted/50 rounded-lg p-2.5">
                                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <cap.icon className="w-3.5 h-3.5 text-primary" />
                                  </div>
                                  <div>
                                    <div className="text-foreground text-xs font-semibold mb-0.5">{cap.title}</div>
                                    <div className="text-muted-foreground text-[11px] leading-snug">{cap.desc}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.badges.map((badge) => (
                          <span key={badge} className="flex items-center gap-1 bg-muted text-muted-foreground text-[11px] px-2.5 py-1 rounded-full border border-border">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" /> {badge}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {project.stats.map((s) => (
                          <div key={s.label} className="bg-muted/50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-serif)" }}>{s.value}</div>
                            <div className="text-muted-foreground text-[10px] leading-tight mt-0.5">{s.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-border space-y-3">
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            View Live Platform <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                        <Link href="/contact" asChild>
                          <Button variant="outline" className="w-full">
                            Discuss Similar Project <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ────────────────────────── */}
      <section className="relative py-16 bg-[#0b1f33] overflow-hidden">
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: `url('${bgBillboard}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="container relative z-10">
          <div className="space-y-12">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              const isEven = index % 2 === 0;

              return (
                <Card key={study.id} className="border-0 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className={`grid md:grid-cols-2 gap-0`}>
                    {/* Image */}
                    <div className={`relative h-64 md:h-auto ${isEven ? "md:order-2" : "md:order-1"}`}>
                      <img
                        src={study.imageUrl}
                        alt={study.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-primary text-primary-foreground">{study.industry}</Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className={`p-8 flex flex-col justify-center ${isEven ? "md:order-1" : "md:order-2"}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <img src={logoSmall} alt="DAQS" className="w-9 h-9 object-contain" />
                        </div>
                        <h3 className="font-bold text-xl text-foreground">{study.title}</h3>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
                          <p className="text-muted-foreground text-sm">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Solution</h4>
                          <p className="text-muted-foreground text-sm">{study.solution}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Results</h4>
                          <p className="text-primary font-semibold text-sm">{study.results}</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => toggleCaps(`study-${study.id}`)}
                            className="w-full flex items-center justify-between gap-2 py-1 group"
                          >
                            <h4 className="font-semibold text-foreground">Capabilities</h4>
                            <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openCaps.has(`study-${study.id}`) ? "rotate-180" : ""}`} />
                          </button>
                          {openCaps.has(`study-${study.id}`) && (
                            <div className="grid sm:grid-cols-2 gap-2 mt-2">
                              {study.capabilities.map((cap) => (
                                <div key={cap.title} className="flex items-start gap-2.5 bg-muted/50 rounded-lg p-2.5">
                                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <cap.icon className="w-3.5 h-3.5 text-primary" />
                                  </div>
                                  <div>
                                    <div className="text-foreground text-xs font-semibold mb-0.5">{cap.title}</div>
                                    <div className="text-muted-foreground text-[11px] leading-snug">{cap.desc}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border space-y-3">
                        <p className="text-xs text-muted-foreground">Client: <span className="font-semibold text-foreground">{study.clientName}</span></p>
                        <Button disabled className="w-full bg-muted text-muted-foreground cursor-not-allowed hover:bg-muted">
                          <Lock className="w-4 h-4 mr-2" /> Coming Soon
                        </Button>
                        <Link href="/contact" asChild>
                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Discuss Similar Project <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────── */}
      <section className="relative py-16 bg-gradient-to-br from-[#0b2540] to-[#061726] overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url('${bgBillboard}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
            Let DAQS help you unlock the potential of your data and achieve measurable business results.
          </p>
          <Link href="/contact" asChild>
            <Button size="lg" className="rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow-lg shadow-blue-500/30 border-0">
              Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
