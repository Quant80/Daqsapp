import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Search, ChevronRight, TrendingUp, FileText } from "lucide-react";
import { Link } from "wouter";
import bgMountain from "@/assets/daqs-bg-mountain.png";
import bgGold from "@/assets/daqs-bg-gold.png";
import bgBillboard from "@/assets/daqs-bg-billboard.png";
import bgSignage from "@/assets/daqs-bg-signage.png";

const blogStats = [
  { value: "10+", label: "Years Combined Experience" },
  { value: "200+", label: "Clients Served" },
  { value: "50+", label: "Training Programs" },
  { value: "98%", label: "Client Satisfaction" },
];

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Financial Services",
    slug: "future-ai-financial-services",
    excerpt: "Explore how artificial intelligence is transforming banking, investment management, and risk analysis.",
    category: "AI & Finance",
    author: "Trymore Ncube",
    date: "2026-02-20",
    imageUrl: bgGold,
    content: "Artificial intelligence is revolutionizing the financial services industry. From algorithmic trading to fraud detection, AI systems are becoming increasingly sophisticated and essential. In this comprehensive guide, we explore the latest trends, challenges, and opportunities in AI-driven finance.",
  },
  {
    id: 2,
    title: "Machine Learning Best Practices for Data Scientists",
    slug: "ml-best-practices",
    excerpt: "Learn essential techniques for building robust, scalable machine learning models in production environments.",
    category: "Machine Learning",
    author: "Trymore Ncube",
    date: "2026-02-15",
    imageUrl: bgBillboard,
    content: "Building production-grade machine learning systems requires more than just data science knowledge. This article covers best practices for model development, validation, deployment, and monitoring.",
  },
  {
    id: 3,
    title: "Quantitative Analysis: From Theory to Practice",
    slug: "quantitative-analysis-practice",
    excerpt: "Discover how quantitative methods are applied in real-world investment and risk management scenarios.",
    category: "Quantitative Solutions",
    author: "Albert Ncube",
    date: "2026-02-10",
    imageUrl: bgMountain,
    content: "Quantitative analysis combines mathematics, statistics, and programming to solve complex financial problems. Learn how DAQS applies these techniques to deliver measurable results for clients.",
  },
  {
    id: 4,
    title: "Deep Learning for Time Series Forecasting",
    slug: "deep-learning-time-series",
    excerpt: "Advanced neural network architectures for predicting trends in financial markets and business metrics.",
    category: "Deep Learning",
    author: "Trymore Ncube",
    date: "2026-02-05",
    imageUrl: bgSignage,
    content: "Time series forecasting is critical for business planning and financial analysis. Discover how LSTM, Transformer, and other deep learning architectures can capture complex temporal patterns.",
  },
];

const categories = ["All", "AI & Finance", "Machine Learning", "Deep Learning", "Quantitative Solutions", "Data Analytics"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* ── HERO ────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061726] via-[#0b2540] to-[#0c1f33] pt-32 pb-20">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url('${bgMountain}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="mb-5 bg-accent/15 text-accent border-accent/30 gap-1.5">
                DAQS Insights
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-[1.1]" style={{ fontFamily: "var(--font-serif)" }}>
                Insights &{" "}
                <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-accent bg-clip-text text-transparent">
                  Trends
                </span>
              </h1>
              <p className="text-white/70 text-lg max-w-xl mb-8 leading-relaxed">
                Stay updated with the latest developments in data analytics, AI, machine learning, and quantitative finance.
              </p>

              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-sky-300 transition-colors"
                />
              </div>
            </div>

            <div className="relative hidden lg:block pt-8 w-3/4 ml-auto">
              <div className="rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl shadow-2xl p-3">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-400/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                  <span className="w-2 h-2 rounded-full bg-green-400/80" />
                  <span className="ml-1.5 text-white/65 text-[10px]">DAQS Insights · Live</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {blogStats.map((s) => (
                    <div key={s.label} className="rounded-xl bg-white/10 border border-white/20 p-2.5">
                      <div className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>{s.value}</div>
                      <div className="text-white/75 text-[10px] leading-tight mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-12 -right-3 bg-white/15 backdrop-blur-xl border border-white/30 rounded-lg shadow-lg p-2 w-40 hidden xl:block z-10">
                <div className="flex items-center gap-1.5 text-emerald-300 text-[10px] font-semibold mb-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> TRENDING
                </div>
                <div className="text-white text-[11px] font-semibold leading-tight">AI in Financial Services</div>
                <div className="text-white/70 text-[10px] leading-tight mt-0.5">Most-read article this month</div>
              </div>

              <div className="absolute bottom-4 -left-3 bg-white/15 backdrop-blur-xl border border-white/30 rounded-lg shadow-lg p-2 w-40 hidden xl:block z-10">
                <div className="flex items-center gap-1.5 text-sky-300 text-[10px] font-semibold mb-0.5">
                  <FileText className="w-3.5 h-3.5" /> NEW POST
                </div>
                <div className="text-white text-[11px] font-semibold leading-tight">Weekly Insights</div>
                <div className="text-white/70 text-[10px] leading-tight mt-0.5">Fresh analysis, every week</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTERS ────────────────────────── */}
      <section className="bg-[#0b2540] border-b border-white/10 py-8">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 border border-white/20 text-white/80 hover:border-primary hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG POSTS ────────────────────────── */}
      <section className="relative py-16 bg-background overflow-hidden">
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: `url('${bgMountain}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="container relative z-10">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found. Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                    </div>

                    <Link href={`/blog/${post.slug}`} asChild>
                      <Button variant="ghost" className="w-full justify-between text-primary hover:text-primary hover:bg-primary/10">
                        Read More
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ────────────────────────── */}
      <section className="relative py-16 bg-gradient-to-br from-[oklch(0.15_0.04_280)] to-[oklch(0.18_0.05_290)] overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url('${bgMountain}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
            Get the latest insights on data analytics, AI trends, and quantitative solutions delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[oklch(0.72_0.14_75)]"
            />
            <Button className="rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold border-0">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
