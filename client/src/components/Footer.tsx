import { Link } from "wouter";
import { Phone, Mail, Globe, Linkedin, Twitter, Facebook, Youtube, MapPin, ArrowRight } from "lucide-react";
import daqsLogo from "@/assets/daqs-logo-final.png";

export default function Footer() {
  return (
    <footer className="bg-[oklch(0.14_0.05_252)] text-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src={daqsLogo} alt="DAQS - Data Analytics & Quantitative Solutions" className="h-12 w-auto" />
            </div>
            <p className="text-white/70 text-xs leading-relaxed mb-6">
              Data Analytics and Quantitative Solutions — delivering world-class expertise in data science, AI, machine learning, and financial analytics.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Facebook, href: "https://www.facebook.com/share/1DAdgqKZYY/", label: "Facebook" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#58a6ff] transition-colors group"
                >
                  <Icon className="w-4 h-4 text-white/70 group-hover:text-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#58a6ff]"></span>
              Services
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Data Analysis", href: "/services#data-analysis" },
                { label: "Machine Learning", href: "/services#ml-ai" },
                { label: "Deep Learning & AI", href: "/services#ml-ai" },
                { label: "Quantitative Solutions", href: "/services#quant" },
                { label: "Accounting Services", href: "/services#accounting" },
                { label: "Investment Analysis", href: "/services#accounting" },
                { label: "Pension Management", href: "/services#accounting" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/60 hover:text-[#58a6ff] text-xs transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#58a6ff]"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Free Assessment", href: "/assessment" },
                { label: "About DAQS", href: "/about" },
                { label: "Our Team", href: "/about#team" },
                { label: "Training Programs", href: "/training" },
                { label: "Media Hub", href: "/media" },
                { label: "Document Library", href: "/documents" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/60 hover:text-[#58a6ff] text-xs transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#58a6ff]"></span>
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#58a6ff] mt-0.5 shrink-0" />
                <div>
                  <div className="text-white/60 text-xs mb-1">Trymore Ncube (CEO)</div>
                  <a href="tel:+27603431561" className="text-white/80 hover:text-white text-xs transition-colors">+27 60 343 1561</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#58a6ff] mt-0.5 shrink-0" />
                <div>
                  <div className="text-white/60 text-xs mb-1">Albert Ncube (CEO)</div>
                  <a href="tel:+263773278724" className="text-white/80 hover:text-white text-xs transition-colors">+263 77 327 8724</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#58a6ff] mt-0.5 shrink-0" />
                <div>
                  <a href="mailto:Ncube.T@daqstech.com" className="text-white/80 hover:text-white text-xs transition-colors block">Ncube.T@daqstech.com</a>
                  <a href="mailto:A.ncube@daqs.co.za" className="text-white/80 hover:text-white text-xs transition-colors block mt-1">A.ncube@daqs.co.za</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-[#58a6ff] mt-0.5 shrink-0" />
                <a href="https://www.daqs.com" className="text-white/80 hover:text-white text-xs transition-colors">www.daqs.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Domain Notice Bar */}
      <div className="border-t border-white/10 bg-[oklch(0.10_0.04_252)]">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <Globe className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>Official domain: <span className="text-[#58a6ff] font-medium">www.daqs.com</span></span>
            </div>
            <div className="text-[#58a6ff] text-xs">
              © {new Date().getFullYear()} DAQS — Data Analytics & Quantitative Solutions. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
