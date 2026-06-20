import { useState } from "react";
import { Link } from "wouter";
import { Database, Brain, Cpu, Bot, Rocket } from "lucide-react";

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
  const [active, setActive] = useState<string | null>(null);

  const toggle = (id: string) => setActive((prev) => (prev === id ? null : id));

  return (
    <aside className="hidden md:flex fixed left-0 top-16 lg:top-20 bottom-0 w-[89px] lg:w-[117px] flex-col border-r border-white/15 z-30">
      <nav className="flex-1 px-1 pt-3 pb-4">
        {sections.map((section) => {
          const isOpen = active === section.id;
          return (
            <div key={section.id} className="relative mb-1">
              <button
                type="button"
                onClick={() => toggle(section.id)}
                aria-expanded={isOpen}
                className={`w-full flex flex-col items-center gap-1 px-1 py-2.5 rounded-lg transition-colors ${isOpen ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                <section.icon className="w-4 h-4 shrink-0 text-white/60" />
                <span className="text-[10px] leading-tight text-center text-white/80 font-medium break-words">{section.label}</span>
              </button>
              {isOpen && (
                <div className="absolute left-full top-0 ml-1 w-52 rounded-lg border border-white/10 bg-[#0b2540] shadow-xl p-3 space-y-2 z-40">
                  <div className="text-xs font-semibold text-white/70 mb-1">{section.label}</div>
                  {section.links.map((link) => (
                    <Link key={link.label} href={link.href} onClick={() => setActive(null)}>
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
        <div className="flex flex-col items-center gap-1 px-1 py-2.5 rounded-lg">
          <Rocket className="w-4 h-4 shrink-0 text-white/40" />
          <span className="text-[10px] leading-tight text-center text-white/50 font-medium">
            N<sup>3</sup> Smart Solutions
          </span>
          <span className="inline-block text-[8px] font-semibold uppercase tracking-wider text-[#58a6ff]/70 bg-[#58a6ff]/10 border border-[#58a6ff]/20 rounded-full px-1.5 py-0.5 mt-0.5">
            Coming Soon
          </span>
        </div>
      </nav>
    </aside>
  );
}
