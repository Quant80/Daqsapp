import { useState, useRef } from "react";
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
  FileText, Download, Upload, Plus, Search, BookOpen,
  FileBarChart, GraduationCap, Briefcase, Loader2, ExternalLink, Calendar,
  Sparkles, ShieldCheck, ArrowRight,
} from "lucide-react";
import bgSignage from "@/assets/daqs-bg-signage.png";

const docStats = [
  { value: "10+", label: "Years Combined Experience" },
  { value: "200+", label: "Clients Served" },
  { value: "50+", label: "Training Programs" },
  { value: "98%", label: "Client Satisfaction" },
];

const categoryConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  whitepaper: { label: "Whitepaper", icon: BookOpen, color: "bg-blue-100 text-blue-700 border-blue-200" },
  case_study: { label: "Case Study", icon: FileBarChart, color: "bg-purple-100 text-purple-700 border-purple-200" },
  research: { label: "Research", icon: FileText, color: "bg-teal-100 text-teal-700 border-teal-200" },
  training: { label: "Training", icon: GraduationCap, color: "bg-amber-100 text-amber-700 border-amber-200" },
  report: { label: "Report", icon: Briefcase, color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  other: { label: "Other", icon: FileText, color: "bg-gray-100 text-gray-700 border-gray-200" },
};

// Sample placeholder documents
const sampleDocs = [
  {
    id: 1,
    title: "Introduction to Machine Learning in Financial Services",
    description: "A comprehensive whitepaper exploring the applications of machine learning in banking, insurance, and investment management.",
    category: "whitepaper",
    fileName: "ml-financial-services.pdf",
    fileSize: 2400000,
    fileUrl: "#",
    createdAt: new Date("2024-11-15"),
  },
  {
    id: 2,
    title: "Case Study: Predictive Analytics for Retail Demand Forecasting",
    description: "How DAQS helped a major retailer reduce inventory costs by 23% using advanced demand forecasting models.",
    category: "case_study",
    fileName: "retail-demand-forecasting.pdf",
    fileSize: 1800000,
    fileUrl: "#",
    createdAt: new Date("2024-10-20"),
  },
  {
    id: 3,
    title: "Quantitative Risk Management: A Practitioner's Guide",
    description: "An in-depth guide to modern quantitative risk management techniques including VaR, CVaR, and stress testing.",
    category: "research",
    fileName: "quant-risk-management.pdf",
    fileSize: 3200000,
    fileUrl: "#",
    createdAt: new Date("2024-09-05"),
  },
  {
    id: 4,
    title: "Data Science for Accounting Professionals",
    description: "Training materials for accounting professionals looking to leverage data science in their practice.",
    category: "training",
    fileName: "data-science-accounting.pdf",
    fileSize: 1500000,
    fileUrl: "#",
    createdAt: new Date("2024-08-12"),
  },
  {
    id: 5,
    title: "Annual Insights Report: AI Adoption in African Markets",
    description: "DAQS annual research report on the state of AI adoption across key African markets and industries.",
    category: "report",
    fileName: "ai-adoption-africa-2024.pdf",
    fileSize: 4100000,
    fileUrl: "#",
    createdAt: new Date("2024-12-01"),
  },
  {
    id: 6,
    title: "Investment Portfolio Optimisation Using Modern Portfolio Theory",
    description: "Research paper on applying Markowitz's Modern Portfolio Theory with machine learning enhancements.",
    category: "research",
    fileName: "portfolio-optimisation-mpt.pdf",
    fileSize: 2100000,
    fileUrl: "#",
    createdAt: new Date("2024-07-28"),
  },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DocumentCard({ doc }: { doc: typeof sampleDocs[0] }) {
  const config = categoryConfig[doc.category] || categoryConfig.other;
  const Icon = config.icon;

  return (
    <Card className="border border-border hover:shadow-md transition-all group">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-14 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <Badge className={`text-xs border shrink-0 ${config.color}`}>{config.label}</Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Calendar className="w-3 h-3" />
                {doc.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </div>
            </div>
            <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {doc.title}
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-3">{doc.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{formatFileSize(doc.fileSize)}</span>
              <a href={doc.fileUrl} download={doc.fileName} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  <Download className="w-3 h-3" /> Download
                </Button>
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function UploadDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "whitepaper" });
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadDoc = trpc.documents.upload.useMutation({
    onSuccess: () => {
      toast.success("Document uploaded successfully!");
      setOpen(false);
      setFile(null);
      setForm({ title: "", description: "", category: "whitepaper" });
      onSuccess();
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !form.title) {
      toast.error("Please provide a title and select a file");
      return;
    }
    setUploading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      let binary = "";
      for (let i = 0; i < uint8.length; i++) binary += String.fromCharCode(uint8[i]);
      const base64 = btoa(binary);
      await uploadDoc.mutateAsync({
        title: form.title,
        description: form.description || undefined,
        category: form.category as "whitepaper" | "case_study" | "research" | "training" | "report" | "other",
        fileName: file.name,
        fileData: base64,
        mimeType: file.type,
        fileSize: file.size,
      });
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Upload className="w-4 h-4 mr-2" /> Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="doc-title">Document Title *</Label>
            <Input id="doc-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g., Machine Learning Whitepaper 2025" />
          </div>
          <div>
            <Label htmlFor="doc-desc">Description</Label>
            <Textarea id="doc-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description of the document" rows={2} />
          </div>
          <div>
            <Label>Category *</Label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(categoryConfig).map(([key, val]) => (
                  <SelectItem key={key} value={key}>{val.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>File *</Label>
            <div
              className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              {file ? (
                <div>
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground">Click to select a file</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, XLSX, PPTX (max 20MB)</p>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground" disabled={uploading || uploadDoc.isPending}>
              {(uploading || uploadDoc.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Upload
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Documents() {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";
  const [search, setSearch] = useState("");

  const { data: dbDocs, refetch } = trpc.documents.list.useQuery();
  type DbDoc = NonNullable<typeof dbDocs>[number];
  const allDocs = [...sampleDocs, ...(dbDocs || []).map((d: DbDoc) => ({
    ...d,
    createdAt: new Date(d.createdAt),
  }))];

  const filtered = allDocs.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.description?.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["all", ...Object.keys(categoryConfig)];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061726] via-[#0b2540] to-[#0c1f33] pt-32 pb-20">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url('${bgSignage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-5 bg-accent/15 text-accent border-accent/30 gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Document Library
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-[1.1]" style={{ fontFamily: "var(--font-serif)" }}>
                Research, Whitepapers{" "}
                <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-accent bg-clip-text text-transparent">
                  & Resources
                </span>
              </h1>
              <p className="text-white/70 text-lg max-w-xl mb-8 leading-relaxed">
                Access our curated library of whitepapers, case studies, research papers, and training materials.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#library">
                  <Button size="lg" className="rounded-full bg-blue-500 text-white hover:bg-blue-600 font-semibold shadow-lg shadow-blue-500/30 border-0">
                    Browse Library <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm shadow-2xl p-5">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" />
                  <span className="ml-2 text-white/50 text-xs">DAQS Library · Live</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {docStats.map((s) => (
                    <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>{s.value}</div>
                      <div className="text-white/55 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 w-56 hidden xl:block">
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> SECURE
                </div>
                <div className="text-foreground text-sm font-semibold">Verified Downloads</div>
                <div className="text-muted-foreground text-xs">Every document reviewed by our team</div>
              </div>

              <div className="absolute -bottom-8 -left-6 bg-white rounded-xl shadow-xl p-4 w-56 hidden xl:block">
                <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-1">
                  <BookOpen className="w-3.5 h-3.5" /> LIBRARY
                </div>
                <div className="text-foreground text-sm font-semibold">Whitepapers & Case Studies</div>
                <div className="text-muted-foreground text-xs">Updated as new research lands</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section id="library" className="relative py-16 bg-background overflow-hidden">
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: `url('${bgSignage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="container relative z-10">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {isAdmin && <UploadDialog onSuccess={refetch} />}
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-muted p-2 rounded-xl mb-8 justify-start">
              {categories.map((cat) => {
                const config = cat === "all" ? null : categoryConfig[cat];
                const Icon = config?.icon || FileText;
                return (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 capitalize"
                  >
                    <Icon className="w-4 h-4" />
                    {cat === "all" ? "All Documents" : config?.label || cat}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((doc) => (
                  <DocumentCard key={doc.id} doc={doc as typeof sampleDocs[0]} />
                ))}
                {filtered.length === 0 && (
                  <div className="col-span-2 text-center py-16 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No documents found matching your search.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {Object.keys(categoryConfig).map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered
                    .filter((d) => d.category === cat)
                    .map((doc) => (
                      <DocumentCard key={doc.id} doc={doc as typeof sampleDocs[0]} />
                    ))}
                  {filtered.filter((d) => d.category === cat).length === 0 && (
                    <div className="col-span-2 text-center py-16 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>No {categoryConfig[cat]?.label} documents available yet.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Request Document */}
      <section className="relative py-16 bg-muted/40 overflow-hidden">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: `url('${bgSignage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="container relative z-10 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            Looking for Something Specific?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Can't find the resource you need? Contact us and we'll be happy to provide tailored research or documentation.
          </p>
          <a href="/contact">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Request a Document <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
