import { Badge } from "@/components/ui/badge";
import { Star, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Chief Investment Officer",
    company: "Global Investment Partners",
    content: "DAQS transformed our portfolio management process with their AI-driven analytics. The insights they provided have been instrumental in achieving our investment objectives.",
    rating: 5,
    initials: "SJ",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Head of Risk Management",
    company: "Premier Bank Corporation",
    content: "The fraud detection system implemented by DAQS has significantly reduced our losses and improved operational efficiency. Their team's expertise is unmatched.",
    rating: 5,
    initials: "MC",
    color: "from-purple-500 to-purple-700",
  },
  {
    id: 3,
    name: "Emma Williams",
    title: "Operations Director",
    company: "Digital Commerce Solutions",
    content: "Working with DAQS on our demand forecasting project was a game-changer. Their quantitative approach and attention to detail delivered exceptional results.",
    rating: 5,
    initials: "EW",
    color: "from-teal-500 to-teal-700",
  },
  {
    id: 4,
    name: "James Thompson",
    title: "Fund Manager",
    company: "National Pension Fund",
    content: "DAQS provided comprehensive analysis that improved our asset allocation strategy. Their team is professional, knowledgeable, and results-oriented.",
    rating: 5,
    initials: "JT",
    color: "from-emerald-500 to-emerald-700",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 bg-[#061726] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[20rem] bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="container relative z-10">
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-sky-400/15 text-sky-300 border-sky-400/30 gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Client Feedback
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            What Our Clients Say
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Trusted by leading organizations across finance, banking, retail, and public sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-blue-400/40 hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300">
              <Quote className="w-6 h-6 text-sky-300/40 mb-3" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/75 text-sm mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                  <p className="text-xs text-white/50">{testimonial.title}</p>
                  <p className="text-xs text-white/50">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
