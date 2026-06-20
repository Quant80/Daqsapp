import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award, Briefcase, CheckCircle, ArrowRight,
  Mail, Phone, Linkedin, Star, BookOpen, Brain, Calculator,
  BarChart3, TrendingUp, Shield, ShieldCheck, Users,
} from "lucide-react";
import bgGold from "@/assets/daqs-bg-gold.png";

const stats = [
  { value: "10+", label: "Years Combined Experience" },
  { value: "200+", label: "Clients Served" },
  { value: "50+", label: "Training Programs" },
  { value: "98%", label: "Client Satisfaction" },
];

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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061726] via-[#0b2540] to-[#0c1f33] pt-32 pb-20">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url('${bgGold}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-5 bg-accent/15 text-accent border-accent/30 gap-1.5">
                About DAQS
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-[1.1]" style={{ fontFamily: "var(--font-serif)" }}>
                Who We{" "}
                <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-accent bg-clip-text text-transparent">
                  Are
                </span>
              </h1>
              <p className="text-white/70 text-lg max-w-xl mb-8 leading-relaxed">
                A team of world-class data scientists, financial engineers, and accounting professionals united by a passion for turning data into decisions.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <a href="#team">
                  <Button size="lg" className="rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow-lg shadow-blue-500/30 border-0">
                    Meet the Team <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <Link href="/contact" asChild>
                  <Button size="lg" variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/10 hover:text-white">
                    Get in Touch
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {["10+ Years Experience", "PhD-Level Expertise", "200+ Clients Served"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-white/70 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> {badge}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm shadow-2xl p-5">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" />
                  <span className="ml-2 text-white/50 text-xs">DAQS Team · Live</span>
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
                  <ShieldCheck className="w-3.5 h-3.5" /> CREDENTIALS VERIFIED
                </div>
                <div className="text-foreground text-sm font-semibold">BSc · MSc · PhD</div>
                <div className="text-muted-foreground text-xs">Academic rigour across both founders</div>
              </div>

              <div className="absolute -bottom-8 -left-6 bg-white rounded-xl shadow-xl p-4 w-56 hidden xl:block">
                <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-1">
                  <Users className="w-3.5 h-3.5" /> FOUNDED BY
                </div>
                <div className="text-foreground text-sm font-semibold">2 Industry Experts</div>
                <div className="text-muted-foreground text-xs">Data science meets financial acumen</div>
              </div>
            </div>
          </div>
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
      <section className="py-16 bg-gradient-to-br from-[#0b2540] to-[#061726]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Work With Our Expert Team
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Reach out today to discuss how DAQS can support your organisation's data and financial goals.
          </p>
          <Link href="/contact" asChild>
            <Button size="lg" className="rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow-lg shadow-blue-500/30 border-0">
              Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
