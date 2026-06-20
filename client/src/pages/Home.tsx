import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3, Brain, Calculator, TrendingUp, BookOpen, Shield,
  ArrowRight, CheckCircle, ChevronRight, Star, Users, Award, Globe,
  Database, Cpu, PieChart, Briefcase, GraduationCap, LineChart, Sparkles
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TestimonialsSection from "@/components/TestimonialsSection";

const stats = [
  { value: "10+", label: "Years Combined Experience", icon: Award },
  { value: "200+", label: "Clients Served", icon: Users },
  { value: "50+", label: "Training Programs", icon: GraduationCap },
  { value: "98%", label: "Client Satisfaction", icon: Star },
];

const services = [
  {
    icon: BarChart3,
    title: "Data Analysis",
    desc: "Transform raw data into actionable insights using advanced statistical methods, exploratory analysis, and predictive modelling.",
    color: "from-blue-600 to-blue-800",
    href: "/services#data-analysis",
  },
  {
    icon: Brain,
    title: "Machine Learning & AI",
    desc: "Build intelligent systems with supervised, unsupervised, and reinforcement learning models tailored to your business needs.",
    color: "from-purple-600 to-purple-800",
    href: "/services#ml-ai",
  },
  {
    icon: Cpu,
    title: "Deep Learning",
    desc: "Leverage neural networks, computer vision, and NLP for complex pattern recognition and automation at scale.",
    color: "from-indigo-600 to-indigo-800",
    href: "/services#ml-ai",
  },
  {
    icon: LineChart,
    title: "Quantitative Solutions",
    desc: "Mathematical modelling, risk analysis, derivatives pricing, and algorithmic trading strategy development.",
    color: "from-teal-600 to-teal-800",
    href: "/services#quant",
  },
  {
    icon: Calculator,
    title: "Accounting Services",
    desc: "Comprehensive accounting, auditing, tax planning, and financial reporting for businesses of all sizes.",
    color: "from-emerald-600 to-emerald-800",
    href: "/services#accounting",
  },
  {
    icon: PieChart,
    title: "Investment & Pension Analysis",
    desc: "Portfolio optimisation, pension fund management, and strategic investment advisory backed by quantitative research.",
    color: "from-amber-600 to-amber-700",
    href: "/services#accounting",
  },
];

const whyUs = [
  "PhD-level expertise in data science and financial engineering",
  "Microsoft Certified Data Scientist professionals",
  "End-to-end solutions from analysis to deployment",
  "Customised training programs for teams and individuals",
  "Proven track record across multiple industries",
  "Cutting-edge AI and ML methodologies",
];

const industries = [
  { label: "Finance & Banking", icon: Briefcase },
  { label: "Healthcare", icon: Shield },
  { label: "Retail & E-commerce", icon: Globe },
  { label: "Government & Public Sector", icon: Database },
  { label: "Insurance", icon: Shield },
  { label: "Education", icon: GraduationCap },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ── HERO ────────────────────────── */}
      <section className="relative min-h-screen bg-gradient-to-br from-[oklch(0.15_0.04_280)] via-[oklch(0.12_0.03_260)] to-[oklch(0.18_0.05_290)] overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/hero-ai-analytics-R4UxxJ4tfpB8KAQpfHBsRh.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061726]/65 via-[#0b2540]/45 to-[#0c1f33]/65" />
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(oklch(0.72 0.14 75) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.14 75) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[oklch(0.72_0.14_75/0.06)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[oklch(0.45_0.12_200/0.08)] blur-3xl pointer-events-none" />

        <div className="container relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <Badge className="mb-6 bg-sky-400/15 text-sky-300 border-sky-400/30 hover:bg-sky-400/25 gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI-Powered Data Intelligence
              </Badge>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Transforming Data into{" "}
                <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-sky-200 bg-clip-text text-transparent">
                  Strategic Intelligence
                </span>
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-xl">
                DAQS delivers world-class expertise in data analytics, machine learning, AI, quantitative finance, and accounting — empowering organisations to make smarter, faster decisions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" asChild>
                  <Button size="lg" className="rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow-lg shadow-blue-500/30 border-0">
                    Book Consultation
                  </Button>
                </Link>
                <Link href="/services" asChild>
                  <Button size="lg" variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/10 hover:text-white">
                    Explore Services <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 mt-10">
                {["Microsoft Certified", "PhD-Level Expertise", "10+ Years Experience"].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5 text-white/80 text-xs font-medium bg-white/5 border border-white/15 rounded-full px-3.5 py-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-sky-300" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Dashboard mockup */}
            <div className="relative hidden lg:block">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm shadow-2xl p-5">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" />
                  <span className="ml-2 text-white/50 text-xs">DAQS Insights · Live</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>{s.value}</div>
                      <div className="text-white/55 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 w-56 hidden xl:block">
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold mb-1">
                  <Star className="w-3.5 h-3.5" /> LIVE INSIGHT
                </div>
                <div className="text-foreground text-sm font-semibold">Portfolio Optimisation</div>
                <div className="text-muted-foreground text-xs">25% improvement in returns delivered</div>
              </div>

              <div className="absolute -bottom-8 -left-6 bg-white rounded-xl shadow-xl p-4 w-56 hidden xl:block">
                <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-1">
                  <Award className="w-3.5 h-3.5" /> TRUSTED BY
                </div>
                <div className="text-foreground text-sm font-semibold">200+ Organisations</div>
                <div className="text-muted-foreground text-xs">Across finance, retail, and public sector</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="relative bg-[#071428] py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-sky-400/10 border border-white/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-sky-300" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 33.3C1200 26.7 1320 13.3 1380 6.7L1440 0V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#0b2540" />
          </svg>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="relative py-20 bg-[#0b2540] overflow-hidden">
        <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[24rem] h-[24rem] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-accent/15 text-accent border-accent/30 gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Our Expertise
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              Comprehensive Solutions for the Modern Enterprise
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              From raw data to boardroom decisions — we provide end-to-end analytical and financial services backed by deep academic and industry expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-blue-400/40 shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2 group-hover:text-sky-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{service.desc}</p>
                  <div className="flex items-center text-sky-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" asChild>
              <Button size="lg" className="rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow-lg shadow-blue-500/20 border-0">
                View All Services <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MISSION ─────────────────────────────────────────── */}
      <section className="py-20 bg-[#061726]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-sky-400/15 text-sky-300 border-sky-400/30">Our Mission</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                Democratising Data Intelligence for Every Organisation
              </h2>
              <p className="text-white/65 leading-relaxed mb-6 text-lg">
                At DAQS, we believe every organisation — regardless of size or sector — deserves access to world-class data analytics and quantitative expertise. Our mission is to bridge the gap between complex data science and practical business outcomes.
              </p>
              <p className="text-white/65 leading-relaxed mb-8">
                Founded by two highly qualified professionals with combined expertise spanning mathematics, financial engineering, machine learning, AI, and accounting, DAQS brings academic rigour and real-world experience to every engagement.
              </p>
              <ul className="space-y-3">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-white/85 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="relative rounded-2xl p-8 text-white overflow-hidden bg-gradient-to-br from-[#0b2540] to-blue-600 shadow-xl shadow-blue-900/30">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-sky-300/15 rounded-full blur-3xl pointer-events-none" />
                <h3 className="text-2xl font-bold mb-3 relative z-10" style={{ fontFamily: "var(--font-serif)" }}>Vision</h3>
                <p className="text-white/80 leading-relaxed relative z-10">
                  To be the leading data analytics and quantitative solutions firm in Africa and beyond, driving innovation through the power of data, AI, and financial intelligence.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { deg: "BSc", desc: "Mathematics & Accounting foundations", icon: GraduationCap },
                  { deg: "MSc", desc: "Financial Engineering & ML/AI", icon: Brain },
                  { deg: "PhD", desc: "Data Science (in progress)", icon: Award },
                  { deg: "MCA", desc: "Microsoft Certified Associate", icon: Shield },
                ].map((item) => (
                  <div key={item.deg} className="rounded-xl border border-white/10 bg-white/[0.04] p-5 hover:border-blue-400/40 hover:bg-white/[0.07] transition-all">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center mb-3">
                      <item.icon className="w-4 h-4 text-sky-300" />
                    </div>
                    <div className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-serif)" }}>{item.deg}</div>
                    <div className="text-sm text-white/55">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ─────────────────────────────────────── */}
      <section className="py-16 bg-[#0c1f33]">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-accent/15 text-accent border-accent/30">Who We Serve</Badge>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              Industries We Serve
            </h2>
            <p className="text-white/60">Delivering specialised expertise across diverse sectors</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind) => (
              <div key={ind.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-5 text-center hover:border-blue-400/40 hover:bg-white/[0.07] hover:-translate-y-0.5 transition-all group">
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <ind.icon className="w-5 h-5 text-sky-300" />
                </div>
                <div className="text-xs font-medium text-white/85">{ind.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#061726] via-[#0b2540] to-blue-700">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Ready to Unlock the Power of Your Data?
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
            Partner with DAQS for expert-led analytics, AI solutions, and financial intelligence that drives measurable results.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" asChild>
              <Button size="lg" className="rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow-lg shadow-blue-500/30 border-0">
                Start Your Journey <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/training" asChild>
              <Button size="lg" variant="outline" className="rounded-full border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/50">
                <BookOpen className="w-4 h-4 mr-2" /> Explore Training
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────── */}
      <TestimonialsSection />
    </div>
  );
}
