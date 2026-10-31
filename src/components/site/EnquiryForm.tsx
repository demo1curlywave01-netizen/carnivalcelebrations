import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WHATSAPP_NUMBER } from "@/lib/images";

export const ENQUIRY_TYPES = [
  { value: "corporate-gifting", label: "Corporate Bulk Gifting" },
  { value: "wedding-gifting", label: "Wedding Gifting" },
  { value: "bulk-purchase", label: "Bulk Purchase" },
  { value: "become-a-partner", label: "Become a Partner" },
] as const;

export function EnquiryForm({
  initialType = "corporate-gifting",
  cta = "Send on WhatsApp",
}: {
  initialType?: string;
  cta?: string;
}) {
  const [selectedType, setSelectedType] = useState(initialType);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (initialType) {
      setSelectedType(initialType);
    }
  }, [initialType]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);

    const typeObj = ENQUIRY_TYPES.find((t) => t.value === selectedType);
    const typeLabel = typeObj ? typeObj.label : selectedType;

    try {
      await supabase.from("enquiries").insert({
        kind: selectedType,
        name,
        phone,
        email,
        city,
        quantity,
        message,
      });
    } catch {
      // Continue to WhatsApp redirect even if offline
    }

    const lines = [
      `*New Enquiry - Carnival Celebrations*`,
      `*Type:* ${typeLabel}`,
      name ? `*Name:* ${name}` : "",
      phone ? `*Phone:* ${phone}` : "",
      email ? `*Email:* ${email}` : "",
      city ? `*City:* ${city}` : "",
      quantity ? `*Approx. Quantity:* ${quantity}` : "",
      message ? `*Requirement:* ${message}` : "",
    ].filter(Boolean);

    const text = lines.join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");

    toast.success("Redirecting to WhatsApp with your enquiry...");
    setBusy(false);
    setName("");
    setPhone("");
    setEmail("");
    setCity("");
    setQuantity("");
    setMessage("");
  };

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-3xl bg-card p-6 shadow-soft sm:grid-cols-2 md:p-8">
      {/* Dropdown for the 4 enquiry types */}
      <label className="space-y-1.5 text-sm font-medium sm:col-span-2">
        <span className="text-foreground">Enquiry Type</span>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          {ENQUIRY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1.5 text-sm font-medium">
        <span className="text-foreground">Full Name *</span>
        <Input
          required
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="space-y-1.5 text-sm font-medium">
        <span className="text-foreground">Phone Number *</span>
        <Input
          required
          type="tel"
          placeholder="10-digit mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>

      <label className="space-y-1.5 text-sm font-medium">
        <span className="text-foreground">Email (Optional)</span>
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="space-y-1.5 text-sm font-medium">
        <span className="text-foreground">City (Optional)</span>
        <Input
          placeholder="City / Location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>

      <label className="space-y-1.5 text-sm font-medium sm:col-span-2">
        <span className="text-foreground">Approx. Quantity (Optional)</span>
        <Input
          placeholder="e.g. 50 boxes, 200 hampers"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>

      <label className="space-y-1.5 text-sm font-medium sm:col-span-2">
        <span className="text-foreground">Tell us about your requirement</span>
        <Textarea
          rows={4}
          placeholder="Describe your budget, occasion, customization needs, or special preferences..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <Button
        disabled={busy}
        size="lg"
        className="sm:col-span-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary-deep"
      >
        <MessageCircle className="h-5 w-5" />
        {busy ? "Opening WhatsApp…" : cta}
      </Button>
    </form>
  );
}
