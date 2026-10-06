import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Field = "name" | "email" | "phone" | "city" | "company" | "quantity" | "message";
const LABELS: Record<Field, string> = {
  name: "Full Name", email: "Email", phone: "Phone", city: "City", company: "Company / Business", quantity: "Approx. Quantity", message: "Tell us about your requirement",
};

export function EnquiryForm({ kind, fields = ["name", "email", "phone", "city", "message"], cta = "Send Enquiry" }: { kind: string; fields?: Field[]; cta?: string }) {
  const empty = Object.fromEntries(fields.map((f) => [f, ""])) as Record<Field, string>;
  const [v, setV] = useState(empty);
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("enquiries").insert({ kind, ...v, name: v.name });
    setBusy(false);
    if (error) { toast.error("Could not send. Please try again."); return; }
    toast.success("Thank you! Our team will reach out within 24 hours.");
    setV(empty);
  };
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-3xl bg-card p-6 shadow-soft sm:grid-cols-2 md:p-8">
      {fields.map((f) => (
        <label key={f} className={`space-y-1.5 text-sm font-medium ${f === "message" ? "sm:col-span-2" : ""}`}>
          {LABELS[f]}
          {f === "message" ? (
            <Textarea rows={4} value={v[f]} onChange={(e) => setV({ ...v, [f]: e.target.value })} />
          ) : (
            <Input required={f === "name" || f === "phone"} type={f === "email" ? "email" : f === "phone" ? "tel" : "text"} maxLength={200} value={v[f]} onChange={(e) => setV({ ...v, [f]: e.target.value })} />
          )}
        </label>
      ))}
      <Button disabled={busy} size="lg" className="sm:col-span-2">{busy ? "Sending…" : cta}</Button>
    </form>
  );
}
