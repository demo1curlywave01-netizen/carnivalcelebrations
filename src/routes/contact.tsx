import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Mail, Phone, Instagram } from "lucide-react";
import { PageHero } from "@/components/site/PageShell";
import { EnquiryForm } from "@/components/site/EnquiryForm";

const INSTAGRAM_URL = "https://www.instagram.com/carnival__celebrations?utm_source=qr&exln=azhyMjA1NjcwMTFo";

const searchSchema = z.object({
  type: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Enquiry & Gifting — Carnival Celebrations" },
      { name: "description", content: "Submit your enquiry for corporate bulk gifting, wedding gifts, bulk purchase, and partner opportunities." },
      { property: "og:title", content: "Enquiry & Gifting — Carnival Celebrations" },
      { property: "og:description", content: "Send your enquiry on WhatsApp to Carnival Celebrations." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const search = Route.useSearch();

  return (
    <>
      <PageHero
        title="Gifting & Partner Enquiries"
        subtitle="Looking for corporate gifting, wedding hampers, bulk orders, or partner opportunities? Send us an enquiry on WhatsApp."
      />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">Carnival Celebrations</p>
              <h2 className="mt-1 font-display text-3xl text-primary">Get in Touch with Us</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Select your enquiry type from the form, fill in your details, and submit directly via WhatsApp. Our team will assist you immediately.
              </p>
            </div>

            <div className="space-y-4 rounded-2xl border border-border/80 bg-secondary/50 p-6">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Email</p>
                  <a
                    href="mailto:carnivalcelebrationsordering@gmail.com"
                    className="font-medium text-foreground hover:text-primary transition break-all"
                  >
                    carnivalcelebrationsordering@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Phone</p>
                  <a
                    href="tel:7303480801"
                    className="font-medium text-foreground hover:text-primary transition"
                  >
                    7303480801
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Instagram className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Instagram</p>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline transition"
                  >
                    @carnival__celebrations
                  </a>
                </div>
              </div>
            </div>

            <p className="font-display text-lg font-semibold text-primary">
              Carnival Celebration – Make Every Celebration Memorable!
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 md:p-8 shadow-soft">
            <h3 className="mb-4 font-display text-2xl text-primary">Send Enquiry on WhatsApp</h3>
            <EnquiryForm initialType={search.type || "corporate-gifting"} cta="Send on WhatsApp" />
          </div>
        </div>
      </div>
    </>
  );
}
