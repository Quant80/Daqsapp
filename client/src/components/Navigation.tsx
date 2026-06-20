import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, ChevronDown, BarChart3, Brain, Calculator, BookOpen, Video, FileText, Phone } from "lucide-react";

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
  { label: "Case Studies", href: "/case-studies" },
  { label: "Media Hub", href: "/media" },
  { label: "Documents", href: "/documents" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

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
          : "bg-transparent border-b border-white/40"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Large and prominent at top left */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center font-bold text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
              D
            </div>
            <div className="hidden sm:block">
              <div className={`font-bold text-xl lg:text-2xl leading-tight transition-colors ${scrolled ? "text-foreground" : "text-white"}`} style={{ fontFamily: "var(--font-serif)" }}>
                DAQS
              </div>
              <div className={`text-xs lg:text-sm leading-tight transition-colors ${scrolled ? "text-muted-foreground" : "text-white/80"}`}>
                Data Analytics & Quantitative Solutions
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.slice(0, 1).map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href}>
                      <NavigationMenuLink
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors nav-link-underline ${
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
                    className={`px-4 py-2 text-sm font-medium transition-colors bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent ${
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
                              <s.icon className="w-4 h-4 text-primary" />
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
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors nav-link-underline ${
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
          <div className="hidden lg:flex items-center gap-3">
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
                className={`lg:hidden ${scrolled ? "text-foreground" : "text-white"}`}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="daqs-gradient p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold" style={{ fontFamily: "var(--font-serif)" }}>D</span>
                    </div>
                    <div>
                      <div className="text-white font-bold" style={{ fontFamily: "var(--font-serif)" }}>DAQS</div>
                      <div className="text-white/70 text-xs">Data Analytics & Quantitative Solutions</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <nav className="p-4 space-y-1">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/") ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}>
                    Home
                  </div>
                </Link>
                <Link href="/services" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/services") ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}>
                    <BarChart3 className="w-4 h-4" /> Services
                  </div>
                </Link>
                <Link href="/about" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/about") ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}>
                    About & Team
                  </div>
                </Link>
                <Link href="/training" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/training") ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}>
                    <BookOpen className="w-4 h-4" /> Training
                  </div>
                </Link>
                <Link href="/media" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/media") ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}>
                    <Video className="w-4 h-4" /> Media Hub
                  </div>
                </Link>
                <Link href="/documents" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/documents") ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}>
                    <FileText className="w-4 h-4" /> Documents
                  </div>
                </Link>
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive("/contact") ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}>
                    <Phone className="w-4 h-4" /> Contact
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
