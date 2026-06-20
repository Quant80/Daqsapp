import { useState } from "react";
import { Link } from "wouter";
import { Database, Brain, Cpu, Bot, Rocket, ChevronDown } from "lucide-react";

const sections = [
  {
    id: "data-science",
    label: "Data Science",
    icon: Database,
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
    links: [
      { label: "Neural Networks & CNNs", href: "/training#courses" },
      { label: "Recurrent Networks & Transformers", href: "/training#courses" },
      { label: "Computer Vision & NLP", href: "/training#courses" },
    ],
  },
  {
    id: "ai",
    label: "AI",
    icon: Bot,
    links: [
      { label: "Generative AI", href: "/training#courses" },
      { label: "Agentic AI", href: "/training#courses" },
      { label: "Orchestration", href: "/training#courses" },
    ],
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-16 lg:top-20 bottom-0 w-56 flex-col bg-[#040c16] border-r border-white/10 z-30 overflow-y-auto">
      <div className="px-4 pt-5 pb-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
        Quick Links
      </div>
      <nav className="flex-1 px-2 pb-4">
        {sections.map((section) => {
          const isOpen = open.has(section.id);
          return (
            <div key={section.id} className="mb-1">
              <button
                type="button"
                onClick={() => toggle(section.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-sm font-medium text-white/85 hover:bg-white/5 transition-colors"
              >
                <section.icon className="w-4 h-4 shrink-0 text-white/60" />
                <span className="flex-1 text-left">{section.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="pl-9 pr-2 py-1 space-y-1.5">
                  {section.links.map((link) => (
                    <Link key={link.label} href={link.href}>
                      <div className="text-xs text-[#58a6ff] hover:text-[#79c0ff] hover:underline leading-snug py-0.5 cursor-pointer">
                        {link.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* N³ Smart Solutions - coming soon, not expandable */}
        <div className="mb-1">
          <div className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-sm font-medium text-white/50">
            <Rocket className="w-4 h-4 shrink-0 text-white/40" />
            <span className="flex-1 text-left">
              N<sup>3</sup> Smart Solutions
            </span>
          </div>
          <div className="pl-9 pr-2">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#58a6ff]/70 bg-[#58a6ff]/10 border border-[#58a6ff]/20 rounded-full px-2 py-0.5">
              Coming Soon
            </span>
          </div>
        </div>
      </nav>
    </aside>
  );
}
