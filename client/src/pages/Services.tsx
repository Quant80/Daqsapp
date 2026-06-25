import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3, Brain, Calculator, Cpu,
  LineChart, ArrowRight, CheckCircle, Zap,
  BookOpen, FileText, Target, Users,
  Activity, ShieldCheck, Award, GraduationCap, Star,
} from "lucide-react";
import { useEffect } from "react";
import bgBillboard from "@/assets/daqs-bg-billboard.png";
import bgGold from "@/assets/daqs-bg-gold.png";
import bgMountain from "@/assets/daqs-bg-mountain.png";
import bgSignage from "@/assets/daqs-bg-signage.png";
import bgNeon from "@/assets/daqs-bg-neon.png";
import logoSmall from "@/assets/logo-small.png";
import SlideshowBanner from "@/components/SlideshowBanner";

const bannerImages = [logoSmall, bgNeon, bgGold, bgBillboard, bgMountain, bgSignage];

const stats = [
  { value: "10+", label: "Years Combined Experience", icon: Award },
  { value: "200+", label: "Clients Served", icon: Users },
  { value: "50+", label: "Training Programs", icon: GraduationCap },
  { value: "98%", label: "Client Satisfaction", icon: Star },
];

const serviceCategories = [
  {
    id: "data-analysis",
    label: "Data Analysis",
    icon: BarChart3,
    color: "from-blue-600 to-blue-800",
    title: "Advanced Data Analysis",
    subtitle: "Transform raw data into strategic intelligence",
    description: "Our data analysis services leverage cutting-edge statistical methods, exploratory data analysis, and visualisation techniques to uncover hidden patterns and actionable insights within your data.",
    services: [
      { title: "Exploratory Data Analysis (EDA)", desc: "Comprehensive statistical summaries, distribution analysis, correlation studies, and outlier detection to understand your data landscape." },
      { title: "Statistical Modelling", desc: "Regression analysis, hypothesis testing, ANOVA, time series analysis, and Bayesian inference for robust data-driven conclusions." },
      { title: "Business Intelligence & Dashboards", desc: "Interactive dashboards and KPI tracking systems that give stakeholders real-time visibility into business performance." },
      { title: "Predictive Analytics", desc: "Forward-looking models that forecast trends, demand, risk, and opportunities using historical data patterns." },
      { title: "Data Pipeline Engineering", desc: "End-to-end data infrastructure design, ETL processes, and data warehouse solutions for scalable analytics." },
      { title: "Custom Reporting", desc: "Tailored analytical reports and presentations that communicate complex findings clearly to decision-makers." },
    ],
    tools: ["Python", "R", "SQL", "Tableau", "Power BI", "Excel"],
  },
  {
    id: "ml-ai",
    label: "ML & AI",
    icon: Brain,
    color: "from-purple-600 to-purple-800",
    title: "Machine Learning, Deep Learning & AI",
    subtitle: "Intelligent systems that learn and adapt",
    description: "We design, build, and deploy state-of-the-art machine learning and AI solutions — from classical algorithms to advanced neural networks — that automate processes, enhance decision-making, and create competitive advantage.",
    services: [
      { title: "Supervised Learning Models", desc: "Classification and regression models including Random Forest, XGBoost, SVM, and ensemble methods for accurate predictions." },
      { title: "Unsupervised Learning", desc: "Clustering, dimensionality reduction, anomaly detection, and pattern discovery in unlabelled datasets." },
      { title: "Deep Neural Networks", desc: "Custom architectures including CNNs, RNNs, LSTMs, and Transformers for complex pattern recognition tasks." },
      { title: "Natural Language Processing (NLP)", desc: "Text classification, sentiment analysis, named entity recognition, and large language model fine-tuning." },
      { title: "Computer Vision", desc: "Image classification, object detection, segmentation, and visual inspection systems for industrial and commercial use." },
      { title: "Reinforcement Learning", desc: "Autonomous decision-making systems and optimisation agents for dynamic environments." },
      { title: "MLOps & Model Deployment", desc: "End-to-end model lifecycle management, CI/CD pipelines, monitoring, and production deployment." },
      { title: "AI Strategy Consulting", desc: "Roadmap development, use-case identification, and AI readiness assessments for organisations." },
    ],
    tools: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "HuggingFace", "OpenAI APIs"],
  },
  {
    id: "robotics",
    label: "Robotics & Automation",
    icon: Cpu,
    color: "from-yellow-600 to-yellow-800",
    title: "Robotics & Automation Solutions",
    subtitle: "Intelligent machines driving efficiency",
    description: "We provide end-to-end robotics and automation consulting – from prototyping and control systems to large-scale industrial automation and robotic process automation (RPA).",
    services: [
      { title: "Industrial Robotics Integration", desc: "Design and deploy robotic cells, coordinate multi-robot systems, and implement safety interlocks for manufacturing environments." },
      { title: "Automation System Design", desc: "PLC/SCADA architecture, HMI development, and process control solutions for reliable automated operations." },
      { title: "Robotic Process Automation", desc: "Software bots and workflow automation to eliminate repetitive tasks across business applications and back-office systems." },
      { title: "Robot Vision & Machine Perception", desc: "Implement camera-based inspection, object tracking, and guidance systems for robots using computer vision techniques." },
      { title: "Custom Robot Prototyping", desc: "Build and program custom robotic platforms using ROS, Arduino, Raspberry Pi, and embedded controllers." },
      { title: "Automation Strategy Consulting", desc: "Evaluate opportunities for automation, develop transformation roadmaps, and estimate ROI for robotics projects." },
    ],
    tools: ["ROS", "PLC", "Arduino", "Raspberry Pi", "UiPath", "Python"],
  },
  {
    id: "quant",
    label: "Quantitative",
    icon: LineChart,
    color: "from-teal-600 to-teal-800",
    title: "Quantitative Solutions",
    subtitle: "Mathematical precision for financial markets",
    description: "Our quantitative solutions combine advanced mathematics, statistics, and financial theory to address the most complex challenges in risk management, derivatives pricing, portfolio optimisation, and algorithmic trading.",
    services: [
      { title: "Financial Modelling", desc: "DCF models, Monte Carlo simulations, scenario analysis, and sensitivity testing for investment and corporate finance decisions." },
      { title: "Risk Management", desc: "Value-at-Risk (VaR), Expected Shortfall, stress testing, and comprehensive risk framework design." },
      { title: "Derivatives Pricing", desc: "Options pricing using Black-Scholes, binomial trees, and advanced stochastic models for structured products." },
      { title: "Portfolio Optimisation", desc: "Mean-variance optimisation, Black-Litterman models, factor investing, and multi-asset allocation strategies." },
      { title: "Algorithmic Trading", desc: "Quantitative strategy development, backtesting, and automated execution systems for financial markets." },
      { title: "Actuarial & Stochastic Modelling", desc: "Survival analysis, mortality modelling, and stochastic differential equations for insurance and pensions." },
    ],
    tools: ["Python", "MATLAB", "R", "Bloomberg", "QuantLib", "Excel/VBA"],
  },
  {
    id: "accounting",
    label: "Accounting & Finance",
    icon: Calculator,
    color: "from-emerald-600 to-emerald-800",
    title: "Accounting, Pensions & Investment Advisory",
    subtitle: "Comprehensive financial expertise you can trust",
    description: "Led by Albert Ncube (MSc, BSc Accounting), our accounting and financial services division provides full-spectrum financial management, pension administration, and investment advisory services with the highest professional standards.",
    services: [
      { title: "Full Accounting Services", desc: "Bookkeeping, financial statement preparation, management accounts, and year-end accounts for businesses and individuals." },
      { title: "Auditing & Assurance", desc: "Internal and external audit services, compliance reviews, and financial controls assessment." },
      { title: "Tax Planning & Compliance", desc: "Corporate and personal tax planning, VAT returns, PAYE administration, and regulatory compliance." },
      { title: "Pension Fund Management", desc: "Pension scheme design, trustee advisory, actuarial valuations, and regulatory compliance for pension funds." },
      { title: "Investment Analysis & Advisory", desc: "Equity research, fixed income analysis, alternative investments, and personalised investment portfolio management." },
      { title: "Corporate Finance", desc: "Mergers and acquisitions advisory, business valuations, capital raising, and financial due diligence." },
      { title: "Financial Planning", desc: "Personal and corporate financial planning, budgeting, cash flow forecasting, and wealth management." },
      { title: "Regulatory Compliance", desc: "IFRS/GAAP compliance, financial reporting standards, and regulatory filing support." },
    ],
    tools: ["Sage", "QuickBooks", "Xero", "Excel", "IFRS Standards", "Bloomberg"],
  },
];

export default function Services() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061726] via-[#0b2540] to-[#0c1f33] pt-32 pb-20">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url('${bgBillboard}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Copy */}
            <div>
              <Badge className="mb-5 bg-accent/15 text-accent border-accent/30 gap-1.5">
                Our Services
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-[1.1]" style={{ fontFamily: "var(--font-serif)" }}>
                Expert Solutions{" "}
                <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-accent bg-clip-text text-transparent">
                  Across Every Domain
                </span>
              </h1>
              <p className="text-white/70 text-lg max-w-xl mb-8 leading-relaxed">
                From data engineering to investment advisory — DAQS offers a comprehensive suite of analytical, technological, and financial services.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/contact" asChild>
                  <Button size="lg" className="rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow-lg shadow-blue-500/30 border-0">
                    Get a Consultation <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href="#data-analysis">
                  <Button size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 hover:text-white">
                    Explore Services
                  </Button>
                </a>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {["Microsoft Certified", "PhD-Level Expertise", "10+ Years Experience"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-white/70 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="relative hidden lg:block pt-8 w-3/4 ml-auto">
              <div className="rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl shadow-2xl p-3">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-400/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                  <span className="w-2 h-2 rounded-full bg-green-400/80" />
                  <span className="ml-1.5 text-white/65 text-[10px]">DAQS Insights · Live</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-xl bg-white/10 border border-white/20 p-2.5">
                      <div className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>{s.value}</div>
                      <div className="text-white/75 text-[10px] leading-tight mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-12 -right-3 bg-white/15 backdrop-blur-xl border border-white/30 rounded-lg shadow-lg p-2 w-40 hidden xl:block z-10">
                <div className="flex items-center gap-1.5 text-emerald-300 text-[10px] font-semibold mb-0.5">
                  <Activity className="w-3.5 h-3.5" /> LIVE INSIGHT
                </div>
                <div className="text-white text-[11px] font-semibold leading-tight">Churn Risk Model</div>
                <div className="text-white/70 text-[10px] leading-tight mt-0.5">Accuracy improved to 96.2%</div>
              </div>

              <div className="absolute bottom-4 -left-3 bg-white/15 backdrop-blur-xl border border-white/30 rounded-lg shadow-lg p-2 w-40 hidden xl:block z-10">
                <div className="flex items-center gap-1.5 text-sky-300 text-[10px] font-semibold mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> RISK FLAG
                </div>
                <div className="text-white text-[11px] font-semibold leading-tight">Portfolio Volatility</div>
                <div className="text-white/70 text-[10px] leading-tight mt-0.5">Within target range — 4.1% VaR</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#071428] py-14 border-y border-white/5">
        <div className="container text-center">
          <div className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">What We Deliver</div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-10" style={{ fontFamily: "var(--font-serif)" }}>
            Results <span className="text-sky-300">Backed by Numbers</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="px-4">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-serif)" }}>{s.value}</div>
                <div className="text-white/55 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-gradient-to-b from-[#071428] to-[#0b1f33]">
        <div className="container">
          <Tabs defaultValue="data-analysis" className="w-full">
            <TabsList className="flex h-auto gap-1 bg-white/5 border border-white/10 p-2 rounded-xl mb-10 w-full">
              {serviceCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  id={cat.id}
                  className="flex-1 flex items-center justify-center gap-1.5 text-white/70 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-2 py-2 text-xs sm:text-sm"
                >
                  <img src={logoSmall} alt="" className="w-3.5 h-3.5 shrink-0 object-contain" />
                  <span className="truncate">{cat.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {serviceCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="mt-0">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Overview */}
                  <div className="lg:col-span-1">
                    <div className={`bg-gradient-to-br ${cat.color} rounded-2xl text-white h-fit sticky top-24 overflow-hidden`}>
                      <SlideshowBanner images={bannerImages} className="h-40" alt="DAQS" />
                      <div className="p-8">
                        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-serif)" }}>{cat.title}</h2>
                        <p className="text-white/70 text-sm mb-4">{cat.subtitle}</p>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">{cat.description}</p>
                        <div className="mb-6">
                          <div className="text-white/60 text-xs uppercase tracking-wider mb-3">Tools & Technologies</div>
                          <div className="flex flex-wrap gap-2">
                            {cat.tools.map((tool) => (
                              <span key={tool} className="bg-white/15 text-white text-xs px-2.5 py-1 rounded-full">{tool}</span>
                            ))}
                          </div>
                        </div>
                        <Link href="/contact" asChild>
                          <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-semibold">
                            Get a Quote <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                    {cat.services.map((service, i) => (
                      <Card key={i} className="border border-transparent hover:border-blue-400/40 shadow-lg hover:shadow-xl transition-all group">
                        <CardContent className="p-5">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                              <img src={logoSmall} alt="DAQS" className="w-5 h-5 object-contain" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground text-sm mb-1.5">{service.title}</h3>
                              <p className="text-muted-foreground text-xs leading-relaxed">{service.desc}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-[#0b1f33]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>Our Engagement Process</h2>
            <p className="text-white/60">A structured approach ensuring quality outcomes every time</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: Target, title: "Discovery", desc: "We begin with a thorough understanding of your business objectives, data landscape, and key challenges." },
              { step: "02", icon: FileText, title: "Strategy & Design", desc: "Our team designs a tailored solution architecture with clear milestones, deliverables, and success metrics." },
              { step: "03", icon: Zap, title: "Execution", desc: "Expert delivery using best-in-class methodologies, with regular progress updates and stakeholder communication." },
              { step: "04", icon: Users, title: "Handover & Support", desc: "Comprehensive documentation, training, and ongoing support to ensure lasting impact and knowledge transfer." },
            ].map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-400/40 hover:bg-white/[0.07] transition-all h-full">
                  <div className="text-4xl font-bold text-sky-300/20 mb-3" style={{ fontFamily: "var(--font-serif)" }}>{step.step}</div>
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center mb-3">
                    <step.icon className="w-5 h-5 text-sky-300" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#0b2540] to-[#061726]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Ready to Get Started?
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Contact us today for a free initial consultation and let us show you how DAQS can transform your organisation.
          </p>
          <Link href="/contact" asChild>
            <Button size="lg" className="rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow-lg shadow-blue-500/30 border-0">
              Contact Us Today <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
