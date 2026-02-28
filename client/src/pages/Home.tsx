import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3, Brain, Calculator, TrendingUp, BookOpen, Shield,
  ArrowRight, CheckCircle, ChevronRight, Star, Users, Award, Globe,
  Database, Cpu, PieChart, Briefcase, GraduationCap, LineChart
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
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/hero-ai-analytics-R4UxxJ4tfpB8KAQpfHBsRh.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.04_280/0.85)] via-[oklch(0.12_0.03_260/0.75)] to-[oklch(0.18_0.05_290/0.85)]" />
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
              <Badge className="mb-6 bg-[oklch(0.72_0.14_75/0.2)] text-[oklch(0.82_0.12_80)] border-[oklch(0.72_0.14_75/0.3)] hover:bg-[oklch(0.72_0.14_75/0.3)]">
                <Star className="w-3 h-3 mr-1" /> Microsoft Certified Data Scientists
              </Badge>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Transforming Data into{" "}
                <span className="daqs-text-gradient">Strategic Intelligence</span>
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-xl">
                DAQS delivers world-class expertise in data analytics, machine learning, AI, quantitative finance, and accounting — empowering organisations to make smarter, faster decisions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services" asChild>
                  <Button size="lg" className="daqs-gold-gradient text-foreground font-semibold border-0 shadow-lg hover:opacity-90 transition-opacity">
                    Explore Services <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact" asChild>
                  <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/50 backdrop-blur-sm">
                    Book Consultation
                  </Button>
                </Link>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mt-10">
                {["Microsoft Certified", "PhD-Level Expertise", "10+ Years Experience"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-white/70 text-sm">
                    <CheckCircle className="w-4 h-4 text-[oklch(0.72_0.14_75)]" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Service cards preview */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { icon: BarChart3, title: "Data Analytics", val: "Advanced Insights" },
                { icon: Brain, title: "Machine Learning", val: "AI-Powered" },
                { icon: TrendingUp, title: "Investment Analysis", val: "Portfolio Optimisation" },
                { icon: Calculator, title: "Accounting", val: "Full Financial Suite" },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="glass-card rounded-xl p-5 hover:bg-white/80 transition-all duration-300 group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-3 group-hover:bg-primary/25 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">{item.title}</div>
                  <div className="text-muted-foreground text-xs mt-1">{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 33.3C1200 26.7 1320 13.3 1380 6.7L1440 0V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="oklch(0.98 0.005 240)" />
          </svg>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/15 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-serif)" }}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="py-20 bg-muted/40">
        <div className="container">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Our Expertise</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              Comprehensive Solutions for the Modern Enterprise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From raw data to boardroom decisions — we provide end-to-end analytical and financial services backed by deep academic and industry expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const serviceImages = [
                "https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/service-data-analytics.png",
                "https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/service-machine-learning.png",
                "https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/service-investment-analysis.png",
                "https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/service-accounting.png",
              ];
              const hasImage = idx < 4;
              return (
                <Link key={service.title} href={service.href} className="h-full">
                  <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer daqs-card-hover overflow-hidden">
                    {hasImage && (
                      <div className="relative h-40 bg-gradient-to-br from-[oklch(0.15_0.04_280)] to-[oklch(0.12_0.03_260)] overflow-hidden">
                        <img
                          src={serviceImages[idx]}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.04_280/0.7)] to-transparent" />
                      </div>
                    )}
                    <CardContent className={`${hasImage ? "p-5" : "p-6"}`}>
                      {!hasImage && (
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                      <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" asChild>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                View All Services <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MISSION ─────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-secondary/20 text-secondary-foreground border-secondary/30">Our Mission</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                Democratising Data Intelligence for Every Organisation
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                At DAQS, we believe every organisation — regardless of size or sector — deserves access to world-class data analytics and quantitative expertise. Our mission is to bridge the gap between complex data science and practical business outcomes.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Founded by two highly qualified professionals with combined expertise spanning mathematics, financial engineering, machine learning, AI, and accounting, DAQS brings academic rigour and real-world experience to every engagement.
              </p>
              <ul className="space-y-3">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="daqs-gradient rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-serif)" }}>Vision</h3>
                <p className="text-white/80 leading-relaxed">
                  To be the leading data analytics and quantitative solutions firm in Africa and beyond, driving innovation through the power of data, AI, and financial intelligence.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/10 rounded-xl p-5 border border-secondary/20">
                  <div className="text-2xl font-bold text-secondary mb-1" style={{ fontFamily: "var(--font-serif)" }}>BSc</div>
                  <div className="text-sm text-muted-foreground">Mathematics & Accounting foundations</div>
                </div>
                <div className="bg-primary/8 rounded-xl p-5 border border-primary/15">
                  <div className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: "var(--font-serif)" }}>MSc</div>
                  <div className="text-sm text-muted-foreground">Financial Engineering & ML/AI</div>
                </div>
                <div className="bg-primary/8 rounded-xl p-5 border border-primary/15">
                  <div className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: "var(--font-serif)" }}>PhD</div>
                  <div className="text-sm text-muted-foreground">Data Science (in progress)</div>
                </div>
                <div className="bg-secondary/10 rounded-xl p-5 border border-secondary/20">
                  <div className="text-2xl font-bold text-secondary mb-1" style={{ fontFamily: "var(--font-serif)" }}>MCA</div>
                  <div className="text-sm text-muted-foreground">Microsoft Certified Associate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ─────────────────────────────────────── */}
      <section className="py-16 bg-muted/40">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              Industries We Serve
            </h2>
            <p className="text-muted-foreground">Delivering specialised expertise across diverse sectors</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind) => (
              <div key={ind.label} className="bg-background rounded-xl p-4 text-center border border-border hover:border-primary/30 hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/15 transition-colors">
                  <ind.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs font-medium text-foreground">{ind.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 daqs-gradient relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Ready to Unlock the Power of Your Data?
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
            Partner with DAQS for expert-led analytics, AI solutions, and financial intelligence that drives measurable results.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" asChild>
              <Button size="lg" className="daqs-gold-gradient text-foreground font-semibold border-0 shadow-lg hover:opacity-90">
                Start Your Journey <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/training" asChild>
              <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/50">
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
