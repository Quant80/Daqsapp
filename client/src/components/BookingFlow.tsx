import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Calendar, Clock, CheckCircle, Loader2, ArrowRight } from "lucide-react";

const TIME_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

function getNextBusinessDays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (days.length < count) {
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function formatDay(date: Date) {
  return {
    weekday: date.toLocaleDateString("en-GB", { weekday: "short" }),
    day: date.toLocaleDateString("en-GB", { day: "numeric" }),
    month: date.toLocaleDateString("en-GB", { month: "short" }),
  };
}

export default function BookingFlow() {
  const days = useMemo(() => getNextBusinessDays(8), []);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const bookCall = trpc.contact.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err: { message: string }) => toast.error(err.message || "Couldn't send your request. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error("Please pick a date and time.");
      return;
    }
    if (!contact.name || !contact.email) {
      toast.error("Please enter your name and email.");
      return;
    }
    const dateLabel = selectedDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    bookCall.mutate({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || undefined,
      service: "Consultation Booking",
      message: `Requested consultation slot: ${dateLabel} at ${selectedTime} (SAST).`,
    });
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          Request Sent!
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We've received your request for{" "}
          <strong className="text-foreground">
            {selectedDate?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} at {selectedTime}
          </strong>
          . Our team will confirm by email within a few hours.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            setSelectedDate(null);
            setSelectedTime(null);
            setContact({ name: "", email: "", phone: "" });
          }}
          variant="outline"
        >
          Book Another Time
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-primary" /> Pick a Date
        </Label>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {days.map((date) => {
            const { weekday, day, month } = formatDay(date);
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`shrink-0 w-16 rounded-xl border py-2.5 text-center transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary/40 text-foreground"
                }`}
              >
                <div className="text-[10px] uppercase opacity-70">{weekday}</div>
                <div className="text-lg font-bold leading-tight">{day}</div>
                <div className="text-[10px] uppercase opacity-70">{month}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-primary" /> Pick a Time (SAST)
        </Label>
        <div className="flex flex-wrap gap-2">
          {TIME_SLOTS.map((time) => (
            <button
              key={time}
              type="button"
              disabled={!selectedDate}
              onClick={() => setSelectedTime(time)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                selectedTime === time
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/40 text-foreground"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="booking-name">Full Name *</Label>
          <Input
            id="booking-name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            placeholder="Your full name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="booking-email">Email Address *</Label>
          <Input
            id="booking-email"
            type="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            placeholder="your@email.com"
            className="mt-1"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="booking-phone">Phone Number</Label>
        <Input
          id="booking-phone"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          placeholder="+27 xx xxx xxxx"
          className="mt-1"
        />
      </div>

      <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={bookCall.isPending}>
        {bookCall.isPending ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending Request...</>
        ) : (
          <>Request This Slot <ArrowRight className="w-4 h-4 ml-2" /></>
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        This requests a slot — our team will confirm by email, it isn't an instant booking yet.
      </p>
    </form>
  );
}
