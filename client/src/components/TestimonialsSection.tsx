import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Chief Investment Officer",
    company: "Global Investment Partners",
    content: "DAQS transformed our portfolio management process with their AI-driven analytics. The insights they provided have been instrumental in achieving our investment objectives.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Head of Risk Management",
    company: "Premier Bank Corporation",
    content: "The fraud detection system implemented by DAQS has significantly reduced our losses and improved operational efficiency. Their team's expertise is unmatched.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: 3,
    name: "Emma Williams",
    title: "Operations Director",
    company: "Digital Commerce Solutions",
    content: "Working with DAQS on our demand forecasting project was a game-changer. Their quantitative approach and attention to detail delivered exceptional results.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
  {
    id: 4,
    name: "James Thompson",
    title: "Fund Manager",
    company: "National Pension Fund",
    content: "DAQS provided comprehensive analysis that improved our asset allocation strategy. Their team is professional, knowledgeable, and results-oriented.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by leading organizations across finance, banking, retail, and public sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground text-sm mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
