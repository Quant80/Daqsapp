import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import daqsLogo from "@/assets/daqs-logo-final.png";
import logoSmall from "@/assets/logo-small.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Menu, ChevronDown, BarChart3, Brain, Calculator, BookOpen, Video, FileText, Phone,
  Mail, Linkedin, Twitter, Facebook, Youtube, Clock, ArrowRight,
  Home as HomeIcon, LayoutGrid, Users, GraduationCap, Newspaper, TrendingUp,
  Send, Loader2, ClipboardCheck, Zap,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const quickLinks = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Live Demo", href: "/live-demo", icon: Zap },
  { label: "Free Assessment", href: "/assessment", icon: ClipboardCheck },
  { label: "Services", href: "/services", icon: LayoutGrid },
  { label: "About", href: "/about", icon: Users },
  { label: "Training", href: "/training", icon: GraduationCap },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "Projects", href: "/projects", icon: TrendingUp },
  { label: "Media Hub", href: "/media", icon: Video },
  { label: "Documents", href: "/documents", icon: FileText },
];

const services = [
  { label: "Data Analysis", href: "/services#data-analysis", icon: BarChart3, desc: "Advanced statistical analysis and data insights" },
  { label: "Machine Learning & AI", href: "/services#ml-ai", icon: Brain, desc: "Predictive models and intelligent automation" },
  { label: "Quantitative Solutions", href: "/services#quant", icon: Calculator, desc: "Mathematical modelling and risk analysis" },
  { label: "Accounting & Finance", href: "/services#accounting", icon: Calculator, desc: "Full accounting, pensions, and investment advisory" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Training", href: "/training" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Media Hub", href: "/media" },
  { label: "Assessment", href: "/assessment" },
  { label: "Documents", href: "/documents" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [quickForm, setQuickForm] = useState({ name: "", email: "", message: "" });
  const [location] = useLocation();

  const quickSubmit = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("Message sent - we'll be in touch within 24 hours.");
      setQuickForm({ name: "", email: "", message: "" });
    },
    onError: (err: { message: string }) => toast.error(err.message || "Submission failed. Please try again."),
  });

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.email || !quickForm.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    quickSubmit.mutate(quickForm);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent border-b-2 border-white/80"
      }`}
    >
      <div className="w-full pr-4 sm:pr-6 lg:pr-8">
        <div className="flex items-center h-16 lg:h-20">
          {/* Logo + Quick Access hamburger, grouped tight at the far left; divider sits after the hamburger */}
          <div className="flex items-center shrink-0 gap-2 lg:gap-3 pr-[39px] lg:pr-[38px] border-r border-white/20">
          <Link href="/" className="flex items-center justify-center shrink-0 h-16 lg:h-20 w-[89px] lg:w-[117px] overflow-hidden bg-[#071428]">
            <img src={daqsLogo} alt="DAQS - Data Analytics & Quantitative Solutions" className="h-full w-full object-cover" />
          </Link>

            <Sheet open={quickOpen} onOpenChange={setQuickOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Quick access menu"
                  className={`shrink-0 !size-11 lg:!size-12 ${scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"}`}
                >
                  <Menu className="size-6 lg:size-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:w-[420px] sm:max-w-[420px] p-0 overflow-y-auto">
                <div className="daqs-gradient p-6 sticky top-0 z-10">
                  <div className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-serif)" }}>Quick Access</div>
                  <div className="text-white/70 text-xs">Jump to any part of the site, or reach our team</div>
                </div>

                <div className="p-5 space-y-6">
                  {/* Quick Links */}
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Links</div>
                    <div className="grid grid-cols-2 gap-2">
                      {quickLinks.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setQuickOpen(false)}>
                          <div className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                            isActive(item.href)
                              ? "border-primary/40 bg-primary/10 text-primary"
                              : "border-border hover:border-primary/30 hover:bg-muted/40 text-foreground"
                          }`}>
                            <item.icon className="w-4 h-4 shrink-0" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link href="/contact" onClick={() => setQuickOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Get a Consultation <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>

                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Follow DAQS</div>
                    <div className="flex gap-2">
                      {[
                        { icon: Linkedin, href: "https://www.linkedin.com/company/134944154/admin/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BtA0mxMwSRCKoUTdLte1z6A%3D%3D", label: "LinkedIn" },
                        { icon: Twitter, href: "#", label: "Twitter" },
                        { icon: Facebook, href: "https://www.facebook.com/share/1DAdgqKZYY/", label: "Facebook" },
                        { icon: Youtube, href: "#", label: "YouTube" },
                      ].map(({ icon: Icon, href, label }) => (
                        <a
                          key={label}
                          href={href}
                          aria-label={label}
                          className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 mb-4">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      We typically respond within 24 hours
                    </div>

                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Talk to Our Team</div>
                    <div className="space-y-3">
                      <a href="tel:+27603431561" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/40 transition-colors group">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">Trymore Ncube</div>
                          <div className="text-xs text-muted-foreground">+27 60 343 1561</div>
                        </div>
                      </a>
                      <a href="tel:+263773278724" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/40 transition-colors group">
                        <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4 text-secondary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">Albert Ncube</div>
                          <div className="text-xs text-muted-foreground">+263 77 327 8724</div>
                        </div>
                      </a>
                      <a href="mailto:Ncube.T@daqstech.com" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/40 transition-colors group">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-sm text-foreground truncate">Ncube.T@daqstech.com</div>
                      </a>
                    </div>
                  </div>

                  {/* Mini contact form */}
                  <div className="border-t border-border pt-5">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Send a Quick Message</div>
                    <form onSubmit={handleQuickSubmit} className="space-y-3">
                      <Input
                        placeholder="Your name"
                        value={quickForm.name}
                        onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                      />
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={quickForm.email}
                        onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                      />
                      <Textarea
                        placeholder="Your message..."
                        rows={3}
                        value={quickForm.message}
                        onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                      />
                      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={quickSubmit.isPending}>
                        {quickSubmit.isPending ? (
                          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                        ) : (
                          <><Send className="w-4 h-4 mr-2" /> Send Message</>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Nav - fills remaining space, links spread evenly across it */}
          <nav className="hidden lg:flex items-center flex-1 px-6">
            <NavigationMenu className="w-full max-w-none justify-start">
              <NavigationMenuList className="w-full justify-between gap-0">
                {navLinks.slice(0, 1).map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href}>
                      <NavigationMenuLink
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors nav-link-underline bg-transparent hover:bg-transparent focus:bg-transparent ${
                          isActive(link.href)
                            ? scrolled ? "text-primary" : "text-sky-400"
                            : scrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-sky-300"
                        }`}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}

                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`px-4 py-2 text-sm font-medium transition-colors bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:text-sky-400 ${
                      isActive("/services")
                        ? scrolled ? "text-primary" : "text-sky-400"
                        : scrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-sky-300"
                    }`}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[480px] p-4 grid grid-cols-2 gap-2">
                      {services.map((s) => (
                        <NavigationMenuLink key={s.href} asChild>
                          <Link href={s.href} className="flex gap-3 p-3 rounded-lg hover:bg-muted transition-colors group cursor-pointer">
                            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                              <img src={logoSmall} alt="DAQS" className="w-5 h-5 object-contain" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-foreground">{s.label}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                      <NavigationMenuLink asChild>
                        <Link href="/services" className="col-span-2 flex items-center justify-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-sm font-medium text-primary cursor-pointer">
                          View All Services <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {navLinks.slice(1).map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href}>
                      <NavigationMenuLink
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors nav-link-underline bg-transparent hover:bg-transparent focus:bg-transparent ${
                          isActive(link.href)
                            ? scrolled ? "text-primary" : "text-sky-400"
                            : scrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-sky-300"
                        }`}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link href="/live-demo">
              <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                scrolled
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                  : "bg-emerald-400/15 text-emerald-300 border-emerald-400/30 hover:bg-emerald-400/25"
              }`}>
                <Zap className="w-3 h-3" /> Live Demo
              </span>
            </Link>
            <Link href="/contact">
              <Button
                size="sm"
                className="rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors shadow-md border-0"
              >
                Get a Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden ml-auto ${scrolled ? "text-foreground" : "text-white"}`}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0 bg-[#071428] [&>button]:text-white/70 [&>button]:hover:text-white">
              <div className="daqs-gradient p-6">
                <img src={daqsLogo} alt="DAQS" className="h-10 w-auto" />
              </div>
              <nav className="p-4 space-y-1">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/") ? "bg-white/15 text-sky-300" : "hover:bg-white/10 text-white/90"}`}>
                    Home
                  </div>
                </Link>
                <Link href="/services" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/services") ? "bg-white/15 text-sky-300" : "hover:bg-white/10 text-white/90"}`}>
                    <BarChart3 className="w-4 h-4" /> Services
                  </div>
                </Link>
                <Link href="/about" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/about") ? "bg-white/15 text-sky-300" : "hover:bg-white/10 text-white/90"}`}>
                    About & Team
                  </div>
                </Link>
                <Link href="/training" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/training") ? "bg-white/15 text-sky-300" : "hover:bg-white/10 text-white/90"}`}>
                    <BookOpen className="w-4 h-4" /> Training
                  </div>
                </Link>
                <Link href="/media" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/media") ? "bg-white/15 text-sky-300" : "hover:bg-white/10 text-white/90"}`}>
                    <Video className="w-4 h-4" /> Media Hub
                  </div>
                </Link>
                <Link href="/projects" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/projects") ? "bg-white/15 text-sky-300" : "hover:bg-white/10 text-white/90"}`}>
                    <TrendingUp className="w-4 h-4" /> Projects
                  </div>
                </Link>
                <Link href="/assessment" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/assessment") ? "bg-white/15 text-sky-300" : "hover:bg-white/10 text-white/90"}`}>
                    <ClipboardCheck className="w-4 h-4" /> Assessment
                  </div>
                </Link>
                <Link href="/documents" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/documents") ? "bg-white/15 text-sky-300" : "hover:bg-white/10 text-white/90"}`}>
                    <FileText className="w-4 h-4" /> Documents
                  </div>
                </Link>
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/contact") ? "bg-white/15 text-sky-300" : "hover:bg-white/10 text-white/90"}`}>
                    <Phone className="w-4 h-4" /> Contact
                  </div>
                </Link>
                <Link href="/live-demo" onClick={() => setMobileOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-emerald-300 hover:bg-white/10">
                    <Zap className="w-4 h-4" /> Live Demo
                  </div>
                </Link>
                <div className="pt-4">
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 border-0">
                      Get a Consultation
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
