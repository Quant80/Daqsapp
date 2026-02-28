import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain, Calculator, BarChart3, BookOpen, Clock, Users,
  Award, CheckCircle, ArrowRight, Star, GraduationCap,
  Laptop, Calendar, TrendingUp, Cpu, LineChart
} from "lucide-react";

const categories = [
  {
    id: "data-science",
    label: "Data Science",
    icon: BarChart3,
    courses: [
      {
        title: "Foundations of Data Science",
        level: "Beginner",
        duration: "6 Weeks",
        format: "Online / In-Person",
        price: "Contact for Pricing",
        description: "A comprehensive introduction to data science covering Python programming, statistics, data wrangling, and visualisation. Ideal for professionals transitioning into data roles.",
        topics: ["Python for Data Science", "Statistical Foundations", "Data Cleaning & Wrangling", "Exploratory Data Analysis", "Data Visualisation with Matplotlib & Seaborn", "Introduction to Pandas & NumPy"],
        outcomes: ["Analyse real-world datasets", "Create professional visualisations", "Apply statistical thinking to business problems"],
      },
      {
        title: "Advanced Data Analytics",
        level: "Intermediate",
        duration: "8 Weeks",
        format: "Online / In-Person",
        price: "Contact for Pricing",
        description: "Deep dive into advanced analytical techniques including time series analysis, A/B testing, regression modelling, and business intelligence tools.",
        topics: ["Advanced Statistical Modelling", "Time Series Analysis & Forecasting", "A/B Testing & Experimentation", "SQL for Analytics", "Power BI & Tableau", "Predictive Analytics"],
        outcomes: ["Build predictive models", "Design and analyse experiments", "Create executive-level dashboards"],
      },
      {
        title: "Business Intelligence & Dashboards",
        level: "Beginner",
        duration: "4 Weeks",
        format: "Online",
        price: "Contact for Pricing",
        description: "Master the art of data storytelling and business intelligence using Power BI, Tableau, and Excel to create compelling, actionable dashboards.",
        topics: ["Power BI Fundamentals", "Tableau Desktop", "DAX & Data Modelling", "KPI Design", "Dashboard Best Practices", "Data Storytelling"],
        outcomes: ["Build interactive dashboards", "Connect to multiple data sources", "Present insights to stakeholders"],
      },
    ],
  },
  {
    id: "ml-ai",
    label: "ML & AI",
    icon: Brain,
    courses: [
      {
        title: "Machine Learning Fundamentals",
        level: "Intermediate",
        duration: "10 Weeks",
        format: "Online / In-Person",
        price: "Contact for Pricing",
        description: "A rigorous introduction to machine learning covering supervised and unsupervised learning, model evaluation, and practical implementation using scikit-learn.",
        topics: ["Supervised Learning (Regression, Classification)", "Unsupervised Learning (Clustering, PCA)", "Model Evaluation & Cross-Validation", "Feature Engineering", "Ensemble Methods (Random Forest, XGBoost)", "Hyperparameter Tuning"],
        outcomes: ["Build and evaluate ML models", "Apply ML to real business problems", "Understand model selection and validation"],
      },
      {
        title: "Deep Learning & Neural Networks",
        level: "Advanced",
        duration: "12 Weeks",
        format: "Online / In-Person",
        price: "Contact for Pricing",
        description: "Comprehensive deep learning training covering neural network architectures, CNNs, RNNs, Transformers, and practical implementation with TensorFlow and PyTorch.",
        topics: ["Neural Network Fundamentals", "Convolutional Neural Networks (CNNs)", "Recurrent Networks & LSTMs", "Transformer Architecture", "Transfer Learning", "Model Deployment"],
        outcomes: ["Design and train deep neural networks", "Implement computer vision solutions", "Build NLP applications"],
      },
      {
        title: "AI Strategy for Business Leaders",
        level: "Executive",
        duration: "2 Days",
        format: "Workshop",
        price: "Contact for Pricing",
        description: "A strategic workshop designed for executives and senior managers to understand AI capabilities, identify use cases, and lead AI transformation initiatives.",
        topics: ["AI Landscape & Capabilities", "Identifying AI Opportunities", "AI Project Management", "Ethics & Governance", "Building AI Teams", "ROI Measurement"],
        outcomes: ["Develop an AI roadmap", "Evaluate AI vendors and solutions", "Lead organisational AI adoption"],
      },
    ],
  },
  {
    id: "quant",
    label: "Quantitative Finance",
    icon: LineChart,
    courses: [
      {
        title: "Quantitative Finance Essentials",
        level: "Intermediate",
        duration: "8 Weeks",
        format: "Online / In-Person",
        price: "Contact for Pricing",
        description: "A rigorous introduction to quantitative finance covering financial mathematics, derivatives pricing, risk management, and portfolio theory.",
        topics: ["Financial Mathematics", "Options & Derivatives Pricing", "Black-Scholes Model", "Monte Carlo Simulation", "Value-at-Risk (VaR)", "Portfolio Optimisation"],
        outcomes: ["Price financial derivatives", "Implement risk models", "Optimise investment portfolios"],
      },
      {
        title: "Algorithmic Trading with Python",
        level: "Advanced",
        duration: "10 Weeks",
        format: "Online",
        price: "Contact for Pricing",
        description: "Build and backtest algorithmic trading strategies using Python, covering strategy development, backtesting frameworks, and live trading infrastructure.",
        topics: ["Strategy Development", "Backtesting with Backtrader", "Technical Analysis", "Statistical Arbitrage", "Risk Management", "Live Trading APIs"],
        outcomes: ["Develop quantitative trading strategies", "Backtest and validate strategies", "Understand market microstructure"],
      },
    ],
  },
  {
    id: "accounting",
    label: "Accounting & Finance",
    icon: Calculator,
    courses: [
      {
        title: "Professional Accounting Fundamentals",
        level: "Beginner",
        duration: "8 Weeks",
        format: "Online / In-Person",
        price: "Contact for Pricing",
        description: "A comprehensive accounting course covering double-entry bookkeeping, financial statements, management accounting, and tax fundamentals.",
        topics: ["Double-Entry Bookkeeping", "Financial Statements (P&L, Balance Sheet, Cash Flow)", "Management Accounting", "Cost Accounting", "VAT & Tax Basics", "Accounting Software (Sage, Xero)"],
        outcomes: ["Prepare financial statements", "Manage bookkeeping systems", "Understand tax obligations"],
      },
      {
        title: "Investment Analysis & Portfolio Management",
        level: "Intermediate",
        duration: "6 Weeks",
        format: "Online / In-Person",
        price: "Contact for Pricing",
        description: "A practical course on investment analysis, equity valuation, fixed income, and portfolio construction for finance professionals and investors.",
        topics: ["Equity Valuation Methods", "Fixed Income Analysis", "Portfolio Theory (MPT)", "Risk & Return", "Alternative Investments", "Investment Policy Statements"],
        outcomes: ["Analyse investment opportunities", "Construct diversified portfolios", "Evaluate risk-adjusted returns"],
      },
      {
        title: "Pension Fund Management",
        level: "Advanced",
        duration: "4 Weeks",
        format: "Workshop",
        price: "Contact for Pricing",
        description: "Specialised training for pension fund trustees, administrators, and finance professionals covering fund governance, investment strategy, and regulatory compliance.",
        topics: ["Pension Fund Governance", "Asset-Liability Management", "Investment Strategy", "Actuarial Concepts", "Regulatory Framework", "Trustee Responsibilities"],
        outcomes: ["Govern pension funds effectively", "Develop investment strategies", "Ensure regulatory compliance"],
      },
    ],
  },
  {
    id: "robotics",
    label: "Robotics & Automation",
    icon: Cpu,
    courses: [
      {
        title: "Introduction to Robotics & Automation",
        level: "Beginner",
        duration: "6 Weeks",
        format: "Online / In-Person",
        price: "Contact for Pricing",
        description: "Explore the fundamentals of robotics, control systems, and automation technologies with hands‑on projects using microcontrollers and simulation tools.",
        topics: [
          "Robotics Fundamentals & Kinematics",
          "Control Systems and Feedback",
          "Introduction to ROS (Robot Operating System)",
          "Microcontrollers (Arduino/Raspberry Pi)",
          "Sensors & Actuators",
          "Basic Automation Workflows",
        ],
        outcomes: [
          "Build simple robot prototypes",
          "Write control code for automated tasks",
          "Understand the components of industrial automation",
        ],
      },
      {
        title: "Industrial Automation Systems",
        level: "Intermediate",
        duration: "8 Weeks",
        format: "Online / In-Person",
        price: "Contact for Pricing",
        description: "Delve into programmable logic controllers (PLCs), SCADA systems, and robotics integration used in manufacturing and process control environments.",
        topics: [
          "PLC Programming & Ladder Logic",
          "SCADA and HMI Design",
          "Robot Cell Integration",
          "Safety Standards and Compliance",
          "Vision Systems for Automation",
          "PID Control Tuning",
        ],
        outcomes: [
          "Design and simulate automated production lines",
          "Program PLCs for real‑world tasks",
          "Integrate robotic arms with control systems",
        ],
      },
      {
        title: "Robotic Process Automation (RPA) & Software Automation",
        level: "Advanced",
        duration: "4 Weeks",
        format: "Online",
        price: "Contact for Pricing",
        description: "Learn to automate repetitive software tasks using popular RPA platforms and combine them with physical robotics for hybrid automation solutions.",
        topics: [
          "RPA Tools (UiPath, Automation Anywhere)",
          "Workflow Design & Orchestration",
          "Integrating RPA with Physical Devices",
          "Error Handling & Logging",
          "AI‑powered Automation",
        ],
        outcomes: [
          "Implement end‑to‑end software automation bots",
          "Bridge RPA with hardware controllers",
          "Measure ROI on automation projects",
        ],
      },
    ],
  },
];

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700 border-green-200",
  Intermediate: "bg-blue-100 text-blue-700 border-blue-200",
  Advanced: "bg-purple-100 text-purple-700 border-purple-200",
  Executive: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function Training() {
  const sectionStyle = {
    "--primary": "var(--section-training-accent)",
    "--primary-foreground": "var(--section-training-accent-foreground)",
  } as React.CSSProperties;

  return (
    <div className="min-h-screen" style={sectionStyle}>
      {/* Hero */}
      <section className="relative min-h-[400px] bg-gradient-to-br from-[oklch(0.15_0.04_280)] via-[oklch(0.12_0.03_260)] to-[oklch(0.18_0.05_290)] overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/training-page-bg-GKeRVAPZdMURsLs4ULHQQT.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.04_280/0.85)] via-[oklch(0.12_0.03_260/0.75)] to-[oklch(0.18_0.05_290/0.85)]" />
        
        <div className="container relative z-10 text-center">
          <Badge
            className="mb-4"
            style={{
              backgroundColor: "var(--section-training-accent)",
              color: "var(--section-training-accent-foreground)",
              borderColor: "transparent",
            }}
          >
            Training & Education
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Build World-Class Skills with DAQS
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-8">
            Expert-led training programs in data science, machine learning, AI, quantitative finance, and accounting — designed for professionals at every level.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { icon: Laptop, label: "Online & In-Person" },
              { icon: Users, label: "Individual & Corporate" },
              { icon: Award, label: "Certificate of Completion" },
              { icon: GraduationCap, label: "Expert Instructors" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                <item.icon className="w-4 h-4 text-[oklch(0.72_0.14_75)]" /> {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 bg-background">
        <div className="container">
          <Tabs defaultValue="data-science" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-muted p-2 rounded-xl mb-10 justify-start">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2"
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cat.courses.map((course) => (
                    <Card key={course.title} className="border border-border hover:shadow-lg transition-all group flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <Badge className={`text-xs border ${levelColors[course.level]}`}>{course.level}</Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" /> {course.duration}
                          </div>
                        </div>
                        <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                          {course.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Laptop className="w-3 h-3" /> {course.format}
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-1 gap-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">{course.description}</p>
                        <div>
                          <div className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Topics Covered</div>
                          <div className="grid grid-cols-1 gap-1">
                            {course.topics.map((topic) => (
                              <div key={topic} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                {topic}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Learning Outcomes</div>
                          {course.outcomes.map((outcome) => (
                            <div key={outcome} className="flex items-center gap-2 text-xs text-foreground mb-1">
                              <CheckCircle className="w-3.5 h-3.5 text-secondary shrink-0" />
                              {outcome}
                            </div>
                          ))}
                        </div>
                        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                          <div className="text-sm font-semibold text-primary">{course.price}</div>
                          <Link href="/contact" asChild>
                            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                              Enquire <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Corporate Training */}
      <section className="py-16 bg-muted/40">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-secondary/20 text-secondary-foreground border-secondary/30">Corporate Training</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                Tailored Training for Your Organisation
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We design and deliver bespoke training programs for corporate teams, government departments, and educational institutions. Our corporate training solutions are customised to your industry, skill level, and business objectives.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Fully customised curriculum aligned to your business needs",
                  "Flexible delivery: on-site, virtual, or blended",
                  "Group discounts for teams of 5 or more",
                  "Post-training support and mentorship",
                  "Certificate of completion for all participants",
                  "Available in multiple languages",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Request Corporate Training <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, title: "Group Training", desc: "Tailored workshops for teams of any size" },
                { icon: Laptop, title: "Virtual Delivery", desc: "Live online sessions with expert instructors" },
                { icon: Calendar, title: "Flexible Schedule", desc: "Weekday, weekend, and intensive formats" },
                { icon: Award, title: "Certification", desc: "Industry-recognised certificates issued" },
              ].map((item) => (
                <div key={item.title} className="bg-background rounded-xl p-5 border border-border hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-semibold text-foreground text-sm mb-1">{item.title}</div>
                  <div className="text-muted-foreground text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 daqs-gradient">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Invest in Your Team's Future
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Contact us to discuss your training needs and receive a customised program proposal.
          </p>
          <Link href="/contact" asChild>
            <Button size="lg" className="daqs-gold-gradient text-foreground font-semibold border-0">
              Enquire About Training <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
