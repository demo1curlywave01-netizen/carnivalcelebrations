import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Carnival Celebrations" },
      { name: "description", content: "Terms & Conditions for orders, delivery, customization and returns at Carnival Celebrations." },
      { property: "og:title", content: "Terms & Conditions — Carnival Celebrations" },
      { property: "og:description", content: "Terms & Conditions for Carnival Celebrations." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        subtitle="Please read our terms and conditions carefully before placing an order."
      />
      <Prose>
        <div className="space-y-8">
          <ol className="list-decimal space-y-6 pl-5 text-base text-foreground/90 marker:font-bold marker:text-primary">
            <li className="pl-2">
              <strong className="text-foreground">Orders:</strong> All orders are subject to product availability and payment confirmation.
            </li>
            <li className="pl-2">
              <strong className="text-foreground">Payments:</strong> Orders must be paid for as per the agreed payment terms. Additional customization or delivery charges may apply.
            </li>
            <li className="pl-2">
              <strong className="text-foreground">Product Variations:</strong> Product colours, designs and packaging may vary slightly from the images shown. Unavailable items may be replaced with equivalent products after customer communication.
            </li>
            <li className="pl-2">
              <strong className="text-foreground">Cancellation:</strong> Customized and bulk orders cannot be cancelled once processing or production has started.
            </li>
            <li className="pl-2">
              <strong className="text-foreground">Delivery:</strong> Delivery timelines are estimates and may vary due to unforeseen circumstances. Customers must provide accurate delivery details.
            </li>
            <li className="pl-2">
              <strong className="text-foreground">Returns & Refunds:</strong> Damaged, missing or incorrect items must be reported within 24 hours of delivery with supporting photographs. Refunds and replacements are subject to verification and applicable policies.
            </li>
            <li className="pl-2">
              <strong className="text-foreground">Customization:</strong> Any changes to confirmed orders may affect pricing and delivery timelines.
            </li>
            <li className="pl-2">
              <strong className="text-foreground">Food & Beverages:</strong> Customers must follow product storage instructions and check expiry dates, ingredients and allergen information before consumption.
            </li>
            <li className="pl-2">
              <strong className="text-foreground">Liability:</strong> Carnival Celebration is not responsible for delays caused by circumstances beyond its reasonable control.
            </li>
            <li className="pl-2">
              <strong className="text-foreground">Legal Jurisdiction:</strong> These terms are governed by the laws of India, subject to applicable consumer protection laws.
            </li>
          </ol>

          <div className="mt-12 rounded-2xl border border-border/80 bg-secondary/50 p-6 md:p-8">
            <h2 className="!mt-0 text-2xl font-display text-primary">Contact Us</h2>
            <div className="mt-4 space-y-3 text-sm">
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Email:</span>
                <a href="mailto:carnivalcelebrationsordering@gmail.com" className="text-primary hover:underline font-medium">
                  carnivalcelebrationsordering@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Phone:</span>
                <a href="tel:7303480801" className="text-primary hover:underline font-medium">
                  7303480801
                </a>
              </p>
            </div>
            <p className="mt-6 font-display text-lg font-semibold text-primary">
              Carnival Celebration – Make Every Celebration Memorable!
            </p>
          </div>
        </div>
      </Prose>
    </>
  );
}
