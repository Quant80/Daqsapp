import { useState } from "react";
import { Link } from "wouter";
import { Database, Brain, Cpu, Bot, Rocket, ChevronDown, Code2 } from "lucide-react";

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
    <aside className="hidden md:flex fixed left-0 top-16 lg:top-20 bottom-0 w-[180px] lg:w-[215px] flex-col border-r border-white/10 bg-[#071428]/55 backdrop-blur-xl z-30">
      <nav className="px-2 pt-3 pb-4">
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

        {/* N³ Smart Solutions - coming soon, not expandable */}
        <div>
          <div className="flex items-center gap-2 px-2 py-2.5 rounded-lg">
            <Rocket className="w-4 h-4 shrink-0 text-white/35" />
            <div className="flex-1">
              <div className="text-sm font-medium text-white/55 leading-tight">
                N<sup>3</sup> Smart Solutions
              </div>
              <span className="inline-block text-[9px] font-semibold uppercase tracking-wider text-[#58a6ff]/70 bg-[#58a6ff]/10 border border-[#58a6ff]/20 rounded-full px-1.5 py-0.5 mt-1">
                Coming Soon
              </span>
            </div>
          </div>
          <div className="h-px bg-white/10 mx-2" />
        </div>

        <div className="-mx-2 mt-3 border-t border-white/10" />
      </nav>
    </aside>
  );
}
