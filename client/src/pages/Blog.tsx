import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Search, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Financial Services",
    slug: "future-ai-financial-services",
    excerpt: "Explore how artificial intelligence is transforming banking, investment management, and risk analysis.",
    category: "AI & Finance",
    author: "Trymore Ncube",
    date: "2026-02-20",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/hero-ai-analytics-R4UxxJ4tfpB8KAQpfHBsRh.webp",
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
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/hero-business-analytics-Gvyzr6kAwiaQvBKrqDNhbj.webp",
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
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/hero-business-analytics-Gvyzr6kAwiaQvBKrqDNhbj.webp",
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
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/hero-ai-analytics-R4UxxJ4tfpB8KAQpfHBsRh.webp",
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
      <section className="relative min-h-[400px] bg-gradient-to-br from-[oklch(0.15_0.04_280)] via-[oklch(0.12_0.03_260)] to-[oklch(0.18_0.05_290)] overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663388520255/oBpzHXffbabrEHDhvgYr92/hero-ai-analytics-R4UxxJ4tfpB8KAQpfHBsRh.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.04_280/0.85)] via-[oklch(0.12_0.03_260/0.75)] to-[oklch(0.18_0.05_290/0.85)]" />

        <div className="container relative z-10">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            Insights & Trends
          </h1>
          <p className="text-white/75 text-xl max-w-2xl mb-8">
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
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[oklch(0.72_0.14_75)] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ── FILTERS ────────────────────────── */}
      <section className="bg-white/50 backdrop-blur-sm border-b border-border py-8">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-white border border-border text-foreground hover:border-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG POSTS ────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container">
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
      <section className="py-16 bg-gradient-to-br from-[oklch(0.15_0.04_280)] to-[oklch(0.18_0.05_290)]">
        <div className="container text-center">
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
            <Button className="daqs-gold-gradient text-foreground font-semibold border-0">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
