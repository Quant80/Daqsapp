import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import {
  Youtube, Facebook, Video, Play, Plus, ExternalLink,
  Mic, BookOpen, Presentation, MoreHorizontal, Loader2
} from "lucide-react";

// Helper: extract embed URL from various platforms
function getEmbedUrl(url: string, platform: string): string {
  if (platform === "youtube") {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&\s?]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
  }
  if (platform === "facebook") {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560`;
  }
  if (platform === "tiktok") {
    const match = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
    if (match) return `https://www.tiktok.com/embed/v2/${match[1]}`;
  }
  if (platform === "vimeo") {
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match) return `https://player.vimeo.com/video/${match[1]}`;
  }
  return url;
}

const platformIcons: Record<string, React.ElementType> = {
  youtube: Youtube,
  facebook: Facebook,
  tiktok: Video,
  vimeo: Video,
  other: Video,
};

const platformColors: Record<string, string> = {
  youtube: "bg-red-100 text-red-700 border-red-200",
  facebook: "bg-blue-100 text-blue-700 border-blue-200",
  tiktok: "bg-slate-100 text-slate-700 border-slate-200",
  vimeo: "bg-sky-100 text-sky-700 border-sky-200",
  other: "bg-gray-100 text-gray-700 border-gray-200",
};

const categoryIcons: Record<string, React.ElementType> = {
  podcast: Mic,
  tutorial: BookOpen,
  webinar: Presentation,
  talk: Video,
  other: Play,
};

// Sample placeholder media items for display
const sampleMedia = [
  {
    id: 1,
    title: "Introduction to Machine Learning for Business",
    description: "A comprehensive overview of how machine learning is transforming modern business operations and decision-making.",
    platform: "youtube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "tutorial",
    isPublished: true,
  },
  {
    id: 2,
    title: "DAQS Podcast: The Future of AI in Finance",
    description: "Trymore Ncube discusses the intersection of artificial intelligence and financial services in this insightful podcast episode.",
    platform: "youtube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "podcast",
    isPublished: true,
  },
  {
    id: 3,
    title: "Quantitative Finance Masterclass — Session 1",
    description: "First session of our popular quantitative finance masterclass covering derivatives pricing and risk management fundamentals.",
    platform: "youtube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "webinar",
    isPublished: true,
  },
];

function VideoCard({ item }: { item: typeof sampleMedia[0] }) {
  const [playing, setPlaying] = useState(false);
  const PlatformIcon = platformIcons[item.platform] || Video;
  const CategoryIcon = categoryIcons[item.category] || Play;

  return (
    <Card className="overflow-hidden border border-border hover:shadow-lg transition-all group">
      <div className="relative aspect-video bg-muted">
        {playing ? (
          <iframe
            src={item.embedUrl}
            title={item.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 cursor-pointer" onClick={() => setPlaying(true)}>
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-white ml-1" />
            </div>
            <div className="absolute bottom-3 left-3">
              <Badge className={`text-xs border ${platformColors[item.platform]}`}>
                <PlatformIcon className="w-3 h-3 mr-1" />
                {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
              </Badge>
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <CategoryIcon className="w-3 h-3 mr-1" />
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </Badge>
          </div>
        </div>
        <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 line-clamp-2">{item.title}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{item.description}</p>
      </CardContent>
    </Card>
  );
}

function AddMediaDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    platform: "youtube",
    embedUrl: "",
    category: "tutorial",
  });

  const addMedia = trpc.media.add.useMutation({
    onSuccess: () => {
      toast.success("Media added successfully!");
      setOpen(false);
      setForm({ title: "", description: "", platform: "youtube", embedUrl: "", category: "tutorial" });
      onSuccess();
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.embedUrl) {
      toast.error("Please fill in all required fields");
      return;
    }
    const processedUrl = getEmbedUrl(form.embedUrl, form.platform);
    addMedia.mutate({
      title: form.title,
      description: form.description || undefined,
      platform: form.platform as "youtube" | "facebook" | "tiktok" | "vimeo" | "other",
      embedUrl: processedUrl,
      category: form.category as "podcast" | "tutorial" | "webinar" | "talk" | "other",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add Media
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Media</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Video or podcast title" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description" rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Platform *</Label>
              <Select value={form.platform} onValueChange={(v) => setForm({ ...form, platform: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="vimeo">Vimeo</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="podcast">Podcast</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="talk">Talk</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="embedUrl">Video URL *</Label>
            <Input id="embedUrl" value={form.embedUrl} onChange={(e) => setForm({ ...form, embedUrl: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." />
            <p className="text-xs text-muted-foreground mt-1">Paste the full URL from YouTube, Facebook, TikTok, or Vimeo</p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground" disabled={addMedia.isPending}>
              {addMedia.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Media
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Media() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const sectionStyle = {
    "--primary": "var(--section-media-accent)",
    "--primary-foreground": "var(--section-media-accent-foreground)",
  } as React.CSSProperties;

  const { data: mediaData, refetch } = trpc.media.list.useQuery();
  const allMedia = [...sampleMedia, ...(mediaData || [])];

  const categories = ["all", "podcast", "tutorial", "webinar", "talk", "other"];

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
              backgroundColor: "var(--section-media-accent)",
              color: "var(--section-media-accent-foreground)",
              borderColor: "transparent",
            }}
          >
            Media Hub
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Podcasts, Webinars & Educational Content
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Explore our library of expert-led videos, podcasts, and educational content across data science, AI, and finance.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            {[
              { icon: Youtube, label: "YouTube" },
              { icon: Facebook, label: "Facebook" },
              { icon: Video, label: "TikTok" },
              { icon: Video, label: "Vimeo" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-sm">
                <p.icon className="w-4 h-4" /> {p.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-serif)" }}>All Content</h2>
              <p className="text-muted-foreground text-sm mt-1">{allMedia.length} videos and podcasts available</p>
            </div>
            {isAdmin && <AddMediaDialog onSuccess={refetch} />}
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-muted p-2 rounded-xl mb-8 justify-start">
              {categories.map((cat) => {
                const Icon = cat === "all" ? Play : (categoryIcons[cat] || Play);
                return (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 capitalize"
                  >
                    <Icon className="w-4 h-4" />
                    {cat === "all" ? "All Content" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allMedia.map((item) => (
                  <VideoCard key={item.id} item={item as typeof sampleMedia[0]} />
                ))}
              </div>
            </TabsContent>

            {categories.slice(1).map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allMedia
                    .filter((item) => item.category === cat)
                    .map((item) => (
                      <VideoCard key={item.id} item={item as typeof sampleMedia[0]} />
                    ))}
                  {allMedia.filter((item) => item.category === cat).length === 0 && (
                    <div className="col-span-3 text-center py-16 text-muted-foreground">
                      <Video className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>No {cat} content available yet. Check back soon!</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Submit Content CTA */}
      <section className="py-16 bg-muted/40">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            Want to Collaborate?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Interested in featuring your content or collaborating on a podcast or webinar with DAQS? We'd love to hear from you.
          </p>
          <a href="/contact">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get in Touch <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
