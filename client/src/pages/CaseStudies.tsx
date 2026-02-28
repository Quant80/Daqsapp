import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, BarChart3, PieChart } from "lucide-react";
import { Link } from "wouter";

const caseStudies = [
  {
    id: 1,
    title: "Predictive Analytics for Investment Portfolio Optimization",
    industry: "Finance & Investment",
    challenge: "A major investment firm struggled with portfolio optimization, losing competitive advantage due to manual analysis processes.",
    solution: "DAQS implemented machine learning models to analyze market trends, correlations, and risk factors in real-time, enabling data-driven portfolio decisions.",
    results: "25% improvement in portfolio returns, 40% reduction in analysis time, enhanced risk management capabilities.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/hero-business-analytics-Gvyzr6kAwiaQvBKrqDNhbj.webp",
    clientName: "Global Investment Partners",
    icon: TrendingUp,
  },
  {
    id: 2,
    title: "AI-Powered Fraud Detection System",
    industry: "Banking & Financial Services",
    challenge: "A banking institution faced increasing fraud losses and needed a more sophisticated detection system beyond rule-based approaches.",
    solution: "DAQS developed a deep learning model trained on historical transaction data to identify fraudulent patterns with high accuracy.",
    results: "92% fraud detection rate, 60% reduction in false positives, saved millions in fraud losses annually.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/hero-ai-analytics-R4UxxJ4tfpB8KAQpfHBsRh.webp",
    clientName: "Premier Bank Corporation",
    icon: BarChart3,
  },
  {
    id: 3,
    title: "Revenue Forecasting & Demand Planning",
    industry: "Retail & E-commerce",
    challenge: "An e-commerce company struggled with inventory management and revenue forecasting, leading to stockouts and excess inventory.",
    solution: "DAQS built time series forecasting models incorporating seasonality, trends, and external factors for accurate demand prediction.",
    results: "35% improvement in forecast accuracy, 20% reduction in inventory costs, 15% increase in revenue.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/hero-business-analytics-Gvyzr6kAwiaQvBKrqDNhbj.webp",
    clientName: "Digital Commerce Solutions",
    icon: PieChart,
  },
  {
    id: 4,
    title: "Pension Fund Performance Analysis & Optimization",
    industry: "Pension & Retirement Services",
    challenge: "A pension fund manager needed comprehensive analysis and optimization of asset allocation across multiple investment vehicles.",
    solution: "DAQS conducted quantitative analysis using modern portfolio theory and risk modeling to optimize asset allocation.",
    results: "18% improvement in risk-adjusted returns, enhanced compliance reporting, better stakeholder communication.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/hero-ai-analytics-R4UxxJ4tfpB8KAQpfHBsRh.webp",
    clientName: "National Pension Fund",
    icon: TrendingUp,
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen">
      {/* ── HERO ────────────────────────── */}
      <section className="relative min-h-[400px] bg-gradient-to-br from-[oklch(0.15_0.04_280)] via-[oklch(0.12_0.03_260)] to-[oklch(0.18_0.05_290)] overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/hero-business-analytics-Gvyzr6kAwiaQvBKrqDNhbj.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.04_280/0.85)] via-[oklch(0.12_0.03_260/0.75)] to-[oklch(0.18_0.05_290/0.85)]" />

        <div className="container relative z-10">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            Success Stories
          </h1>
          <p className="text-white/75 text-xl max-w-2xl">
            Discover how DAQS has delivered measurable results for clients across diverse industries through data-driven solutions.
          </p>
        </div>
      </section>

      {/* ── CASE STUDIES ────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="space-y-12">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              const isEven = index % 2 === 0;

              return (
                <Card key={study.id} className="border-0 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
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
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
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
                      </div>

                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-4">Client: <span className="font-semibold text-foreground">{study.clientName}</span></p>
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
      <section className="py-16 bg-gradient-to-br from-[oklch(0.15_0.04_280)] to-[oklch(0.18_0.05_290)]">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
            Let DAQS help you unlock the potential of your data and achieve measurable business results.
          </p>
          <Link href="/contact" asChild>
            <Button size="lg" className="daqs-gold-gradient text-foreground font-semibold border-0">
              Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
