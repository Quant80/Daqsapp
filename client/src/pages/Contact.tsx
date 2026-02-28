import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Phone, Mail, Globe, MapPin, Clock, CheckCircle,
  Send, Loader2, MessageSquare, ArrowRight
} from "lucide-react";

const services = [
  "Data Analysis & Business Intelligence",
  "Machine Learning & AI",
  "Deep Learning",
  "Quantitative Solutions",
  "Accounting Services",
  "Investment Analysis & Advisory",
  "Pension Fund Management",
  "Training Programs",
  "Other / General Enquiry",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    },
    onError: (err: { message: string }) => toast.error(err.message || "Submission failed. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    submitContact.mutate(form);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="daqs-gradient hero-pattern pt-32 pb-20">
        <div className="container text-center">
          <Badge className="mb-4 bg-[oklch(0.72_0.14_75/0.2)] text-[oklch(0.82_0.12_80)] border-[oklch(0.72_0.14_75/0.3)]">
            Contact Us
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Let's Start a Conversation
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Whether you have a project in mind, need expert advice, or want to explore our training programs — we're here to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  Get in Touch
                </h2>
                <p className="text-muted-foreground text-sm">
                  Reach out directly to our CEOs or use the contact form and we'll respond within 24 hours.
                </p>
              </div>

              {/* Trymore */}
              <Card className="border border-border">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white font-bold" style={{ fontFamily: "var(--font-serif)" }}>
                      TN
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Trymore Ncube</div>
                      <div className="text-xs text-muted-foreground">CEO & Director — Data Science & AI</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a href="tel:+27603431561" className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      +27 60 343 1561
                    </a>
                    <a href="mailto:Trymore.N@daqs.co.za" className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      Trymore.N@daqs.co.za
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Albert */}
              <Card className="border border-border">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white font-bold" style={{ fontFamily: "var(--font-serif)" }}>
                      AN
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Albert Ncube</div>
                      <div className="text-xs text-muted-foreground">CEO & Director — Accounting & Finance</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a href="tel:+263773278724" className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      +263 77 327 8724
                    </a>
                    <a href="mailto:A.ncube@daqs.co.za" className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      A.ncube@daqs.co.za
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* General Info */}
              <Card className="border border-border">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Website</div>
                      <div className="text-sm font-medium text-foreground">www.daqs.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Response Time</div>
                      <div className="text-sm font-medium text-foreground">Within 24 hours</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Setup Info */}
              <Card className="border border-secondary/30 bg-secondary/5">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-secondary" /> Official Email Addresses
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Our professional email addresses are hosted on the daqs.co.za domain:
                  </p>
                  <div className="space-y-2">
                    <div className="bg-background rounded-lg px-3 py-2 border border-border">
                      <div className="text-xs text-muted-foreground">CEO — Data Science</div>
                      <div className="text-sm font-mono font-medium text-primary">Trymore.N@daqs.co.za</div>
                    </div>
                    <div className="bg-background rounded-lg px-3 py-2 border border-border">
                      <div className="text-xs text-muted-foreground">CEO — Accounting</div>
                      <div className="text-sm font-mono font-medium text-primary">A.ncube@daqs.co.za</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <Card className="border-0 shadow-lg h-full flex items-center justify-center">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. Our team will review your enquiry and respond within 24 hours.
                    </p>
                    <Button onClick={() => setSubmitted(false)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-serif)" }}>Send Us a Message</h2>
                        <p className="text-muted-foreground text-sm">Fill in the form and we'll get back to you promptly</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your full name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="your@email.com"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+27 xx xxx xxxx"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Company / Organisation</Label>
                          <Input
                            id="company"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            placeholder="Your company name"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Service of Interest</Label>
                        <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select a service..." />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us about your project, requirements, or questions..."
                          rows={5}
                          className="mt-1"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={submitContact.isPending}
                      >
                        {submitContact.isPending ? (
                          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                        ) : (
                          <><Send className="w-4 h-4 mr-2" /> Send Message</>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        By submitting this form, you agree to be contacted by DAQS regarding your enquiry.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Domain & Email Setup Guide */}
      <section className="py-16 bg-muted/40">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                Domain & Email Setup Guide
              </h2>
              <p className="text-muted-foreground text-sm">Steps to activate your DAQS domain and professional email addresses</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  step: "1",
                  title: "Register www.daqs.com",
                  desc: "Visit a domain registrar (GoDaddy, Namecheap, or Google Domains) and register daqs.com or daqs.co.za as your primary domain.",
                },
                {
                  step: "2",
                  title: "Set Up Email Hosting",
                  desc: "Use Google Workspace, Microsoft 365, or Zoho Mail to create Trymore.N@daqs.co.za and A.ncube@daqs.co.za as professional email accounts.",
                },
                {
                  step: "3",
                  title: "Configure DNS Records",
                  desc: "Point your domain's DNS records (MX, CNAME, TXT) to your email provider and this website's hosting server.",
                },
                {
                  step: "4",
                  title: "Go Live",
                  desc: "Once DNS propagates (24-48 hours), your domain and email addresses will be fully active and accessible worldwide.",
                },
              ].map((item) => (
                <div key={item.step} className="bg-background rounded-xl p-5 border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm mb-1">{item.title}</div>
                      <div className="text-muted-foreground text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
