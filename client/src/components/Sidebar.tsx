import React, { useState } from "react";
import { Link } from "wouter";
import { Database, Brain, Cpu, Bot, Rocket, ChevronDown, Code2 } from "lucide-react";
import daqsPageBlue from "@/assets/daqs-page-blue.png";

const sections = [
  {
    id: "python-intro",
    label: "Intro to Python",
    icon: Code2,
    color: "text-emerald-400",
    links: [
      { label: "Introduction to Python Programming", href: "/training#courses" },
    ],
  },
  {
    id: "data-science",
    label: "Data Science",
    icon: Database,
    color: "text-pink-400",
    links: [
      { label: "Foundations of Data Science", href: "/training#courses" },
      { label: "Advanced Data Analytics", href: "/training#courses" },
      { label: "Business Intelligence & Dashboards", href: "/training#courses" },
    ],
  },
  {
    id: "machine-learning",
    label: "Machine Learning",
    icon: Brain,
    color: "text-purple-400",
    links: [
      { label: "Supervised & Unsupervised Learning", href: "/training#courses" },
      { label: "Model Evaluation & Validation", href: "/training#courses" },
      { label: "Feature Engineering", href: "/training#courses" },
    ],
  },
  {
    id: "deep-learning",
    label: "Deep Learning",
    icon: Cpu,
    color: "text-indigo-400",
    links: [
      { label: "Neural Networks & CNNs", href: "/training#courses" },
      { label: "Recurrent Networks & Transformers", href: "/training#courses" },
      { label: "Computer Vision & NLP", href: "/training#courses" },
    ],
  },
  {
    id: "agentic-ai",
    label: "Agentic AI",
    icon: Bot,
    color: "text-sky-400",
    links: [
      { label: "Generative AI", href: "/training#courses" },
      { label: "Orchestration", href: "/training#courses" },
    ],
  },
];

export default function Sidebar() {
  const [active, setActive] = useState<string | null>(null);

  const toggle = (id: string) => setActive((prev) => (prev === id ? null : id));

  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-[180px] lg:w-[215px] flex-col border-r-2 border-white/40 z-30"
    >
      {/* Blurred background — overflow-hidden on this wrapper only, so flyout popovers aren't clipped */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${daqsPageBlue}')`,
            backgroundSize: "cover",
            backgroundPosition: "60% center",
            filter: "blur(10px)",
            transform: "scale(1.15)",
          } as React.CSSProperties}
        />
        {/* Dark overlay — enough to keep text readable, light enough to see image */}
        <div className="absolute inset-0 bg-[#071428]/45" />
      </div>
      {/* Nav starts below the nav bar height */}
      <nav className="px-2 pt-3 pb-4 relative z-10 mt-16 lg:mt-20">
        {sections.map((section) => {
          const isOpen = active === section.id;
          return (
            <div key={section.id} className="relative">
              <button
                type="button"
                onClick={() => toggle(section.id)}
                aria-expanded={isOpen}
                className={`w-full flex items-center gap-2 px-2 py-2.5 rounded-lg transition-colors ${isOpen ? "bg-white/10" : "hover:bg-white/8"}`}
              >
                <section.icon className={`w-4 h-4 shrink-0 ${section.color}`} />
                <span className="flex-1 text-left text-sm font-medium text-white/90 leading-tight">{section.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 text-white/35 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="absolute left-full top-0 ml-1 w-52 rounded-lg border border-white/15 bg-[#071428]/75 backdrop-blur-xl shadow-xl p-3 space-y-2 z-40">
                  <div className="text-xs font-semibold text-white/65 mb-1">{section.label}</div>
                  {section.links.map((link) => (
                    <Link key={link.label} href={link.href} onClick={() => setActive(null)}>
                      <div className="text-xs text-[#58a6ff] hover:text-[#79c0ff] hover:underline leading-snug py-0.5 cursor-pointer">
                        {link.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <div className="h-px bg-white/10 mx-2" />
            </div>
          );
        })}

        {/* N³ Smart Solutions - expandable with external links */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggle("smart-solutions")}
            aria-expanded={active === "smart-solutions"}
            className={`w-full flex items-center gap-2 px-2 py-2.5 rounded-lg transition-colors ${active === "smart-solutions" ? "bg-white/10" : "hover:bg-white/8"}`}
          >
            <Rocket className={`w-4 h-4 shrink-0 text-amber-400`} />
            <span className="flex-1 text-left text-sm font-medium text-white/90 leading-tight">
              N<sup>3</sup> Smart Solutions
            </span>
            <ChevronDown className={`w-3.5 h-3.5 shrink-0 text-white/35 transition-transform ${active === "smart-solutions" ? "rotate-180" : ""}`} />
          </button>
          {active === "smart-solutions" && (
            <div className="absolute left-full top-0 ml-1 w-56 rounded-lg border border-white/15 bg-[#071428]/75 backdrop-blur-xl shadow-xl p-3 space-y-3 z-40">
              <div className="text-xs font-semibold text-white/65 mb-1">N³ Smart Solutions</div>
              <a
                href="https://learn.daqstech.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActive(null)}
                className="block"
              >
                <div className="text-xs text-[#58a6ff] hover:text-[#79c0ff] hover:underline leading-snug py-0.5 cursor-pointer">
                  N3 DataPro Solutions
                </div>
                <div className="text-[10px] text-white/40 leading-tight mt-0.5">Corporates &amp; Individuals · Data</div>
              </a>
              <a
                href="https://quant80.github.io/N3_SmartSolutions/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActive(null)}
                className="block"
              >
                <div className="text-xs text-[#58a6ff] hover:text-[#79c0ff] hover:underline leading-snug py-0.5 cursor-pointer">
                  N3 EduTech Solutions
                </div>
                <div className="text-[10px] text-white/40 leading-tight mt-0.5">Educators &amp; Students</div>
              </a>
            </div>
          )}
          <div className="h-px bg-white/10 mx-2" />
        </div>

        <div className="-mx-2 mt-3 border-t border-white/10" />
      </nav>
    </aside>
  );
}
