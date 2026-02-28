import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award, GraduationCap, Briefcase, CheckCircle, ArrowRight,
  Mail, Phone, Linkedin, Star, BookOpen, Brain, Calculator,
  BarChart3, TrendingUp, Shield
} from "lucide-react";

const team = [
  {
    id: "trymore",
    name: "Trymore Ncube",
    role: "CEO & Director",
    initials: "TN",
    color: "from-blue-700 to-blue-900",
    phone: "+27 60 343 1561",
    email: "Trymore.N@daqs.co.za",
    bio: "Trymore Ncube is a highly accomplished data scientist, financial engineer, and AI specialist with a distinguished academic and professional background. As co-founder and CEO of DAQS, he leads the firm's data science, machine learning, and quantitative solutions practice.",
    bio2: "Currently pursuing a PhD in Data Science, Trymore combines deep theoretical knowledge with practical industry experience to deliver transformative analytical solutions. He is a certified Microsoft Data Scientist Associate and has extensive experience applying advanced AI and ML techniques across finance, healthcare, and enterprise sectors.",
    credentials: [
      { label: "BSc Mathematics", institution: "Undergraduate Degree", icon: GraduationCap },
      { label: "MSc Financial Engineering", institution: "Postgraduate Degree", icon: TrendingUp },
      { label: "MSc Machine Learning & AI", institution: "Postgraduate Degree", icon: Brain },
      { label: "PhD Data Science", institution: "Doctoral Candidate (Current)", icon: Star },
      { label: "Microsoft Certified Data Scientist Associate", institution: "Professional Certification", icon: Award },
    ],
    expertise: [
      "Advanced Machine Learning & Deep Learning",
      "Financial Engineering & Derivatives Pricing",
      "Natural Language Processing & Computer Vision",
      "Quantitative Risk Management",
      "Algorithmic Trading Systems",
      "Data Science Strategy & Leadership",
      "Statistical Modelling & Econometrics",
      "AI Product Development",
    ],
    icons: [BarChart3, Brain, TrendingUp, Award],
  },
  {
    id: "albert",
    name: "Albert Ncube",
    role: "CEO & Director",
    initials: "AN",
    color: "from-emerald-700 to-emerald-900",
    phone: "+263 77 327 8724",
    email: "A.ncube@daqs.co.za",
    bio: "Albert Ncube is a seasoned accounting and finance professional with extensive expertise in financial management, auditing, pension administration, and investment advisory. As co-founder and CEO of DAQS, he leads the firm's accounting, finance, and investment services division.",
    bio2: "With both a BSc and MSc in Accounting, Albert brings rigorous academic training and years of practical experience to every client engagement. His deep understanding of financial reporting standards, tax legislation, and investment principles makes him an invaluable advisor to businesses and individuals alike.",
    credentials: [
      { label: "BSc Accounting", institution: "Undergraduate Degree", icon: GraduationCap },
      { label: "MSc Accounting", institution: "Postgraduate Degree", icon: Award },
    ],
    expertise: [
      "Financial Accounting & Reporting (IFRS/GAAP)",
      "Auditing & Assurance Services",
      "Tax Planning & Compliance",
      "Pension Fund Management & Advisory",
      "Investment Analysis & Portfolio Management",
      "Corporate Finance & Valuations",
      "Management Accounting",
      "Regulatory Compliance",
    ],
    icons: [Calculator, Shield, TrendingUp, BookOpen],
  },
];

const values = [
  { icon: Star, title: "Excellence", desc: "We hold ourselves to the highest academic and professional standards in every engagement." },
  { icon: Shield, title: "Integrity", desc: "Honest, transparent, and ethical conduct underpins every client relationship and deliverable." },
  { icon: Brain, title: "Innovation", desc: "We continuously adopt cutting-edge methodologies to keep our clients ahead of the curve." },
  { icon: CheckCircle, title: "Impact", desc: "We measure success by the tangible, measurable outcomes we deliver for our clients." },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[350px] bg-gradient-to-br from-[oklch(0.15_0.04_280)] via-[oklch(0.12_0.03_260)] to-[oklch(0.18_0.05_290)] overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/about-page-bg-cwrPVwksorUU7LQJPqUUxa.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.04_280/0.85)] via-[oklch(0.12_0.03_260/0.75)] to-[oklch(0.18_0.05_290/0.85)]" />
        
        <div className="container relative z-10 text-center">
          <Badge className="mb-4 bg-[oklch(0.72_0.14_75/0.2)] text-[oklch(0.82_0.12_80)] border-[oklch(0.72_0.14_75/0.3)]">
            About DAQS
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Who We Are
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            A team of world-class data scientists, financial engineers, and accounting professionals united by a passion for turning data into decisions.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              Our Story
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Data Analytics and Quantitative Solutions (DAQS) was founded by Trymore Ncube and Albert Ncube — two professionals who recognised a critical gap in the market: organisations needed not just data, but the analytical intelligence to act on it decisively.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Combining expertise that spans mathematics, financial engineering, machine learning, artificial intelligence, and accounting, DAQS was built to offer a truly integrated service — one where quantitative rigour meets financial acumen. We serve clients ranging from startups to established enterprises, government bodies to individual investors.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, DAQS is a growing force in the data analytics and financial services landscape, with a commitment to continuous learning, innovation, and delivering measurable value to every client we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-muted/40">
        <div className="container">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Leadership Team</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              Meet Our Co-Founders & CEOs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Two exceptional leaders whose combined expertise spans data science, AI, financial engineering, and accounting.
            </p>
          </div>

          <div className="space-y-16">
            {team.map((member, idx) => (
              <div key={member.id} id={member.id} className={`grid lg:grid-cols-3 gap-10 items-start ${idx % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                {/* Profile Card */}
                <div className="lg:col-span-1">
                  <div className={`bg-gradient-to-br ${member.color} rounded-2xl p-8 text-white text-center`}>
                    <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 ring-4 ring-white/30">
                      <span className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>{member.initials}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-serif)" }}>{member.name}</h3>
                    <p className="text-white/70 text-sm mb-6">{member.role}</p>
                    <div className="space-y-3 text-left">
                      <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/80 hover:text-white text-sm transition-colors">
                        <Phone className="w-4 h-4 shrink-0" /> {member.phone}
                      </a>
                      <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-white/80 hover:text-white text-sm transition-colors">
                        <Mail className="w-4 h-4 shrink-0" /> {member.email}
                      </a>
                    </div>
                    <div className="flex justify-center gap-3 mt-6">
                      {member.icons.map((Icon, i) => (
                        <div key={i} className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-white/80" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Credentials */}
                  <div className="mt-4 space-y-2">
                    {member.credentials.map((cred) => (
                      <div key={cred.label} className="flex items-center gap-3 bg-background rounded-lg p-3 border border-border">
                        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                          <cred.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{cred.label}</div>
                          <div className="text-xs text-muted-foreground">{cred.institution}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio & Expertise */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-serif)" }}>{member.name}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
                    <p className="text-muted-foreground leading-relaxed">{member.bio2}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" /> Areas of Expertise
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {member.expertise.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a href={`mailto:${member.email}`}>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Mail className="w-4 h-4 mr-2" /> Email {member.name.split(" ")[0]}
                      </Button>
                    </a>
                    <a href={`tel:${member.phone.replace(/\s/g, "")}`}>
                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" /> Call
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-serif)" }}>Our Core Values</h2>
            <p className="text-muted-foreground">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <Card key={val.title} className="border-0 shadow-sm hover:shadow-md transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <val.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{val.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 daqs-gradient">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Work With Our Expert Team
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Reach out today to discuss how DAQS can support your organisation's data and financial goals.
          </p>
          <Link href="/contact" asChild>
            <Button size="lg" className="daqs-gold-gradient text-foreground font-semibold border-0">
              Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
