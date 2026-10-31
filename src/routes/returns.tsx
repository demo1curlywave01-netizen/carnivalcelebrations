import { createFileRoute } from "@tanstack/react-router";
import { Phone, AlertCircle } from "lucide-react";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Refunds Policy — Carnival Celebrations" },
      { name: "description", content: "Returns, replacements, and refund policies for Carnival Celebrations." },
      { property: "og:title", content: "Returns & Refunds Policy — Carnival Celebrations" },
      { property: "og:description", content: "Returns, replacements, and refund policies for Carnival Celebrations." },
    ],
  }),
  component: ReturnsPage,
});

function ReturnsPage() {
  return (
    <>
      <PageHero
        title="Returns & Refunds"
        subtitle="Our policy on product replacements, exchanges, and transit damages."
      />
      <Prose>
        <div className="space-y-8">
          <p className="text-base leading-relaxed text-foreground/90 font-medium">
            Carnival Celebrations endeavours to ensure that every transaction at our website is seamless. We take great care in delivering our products and adhere to the highest quality standards.
          </p>

          <div className="space-y-3">
            <h2 className="text-2xl font-display font-semibold text-primary">Returns & Exchanges Policy</h2>
            <p className="text-base leading-relaxed text-foreground/85">
              As a policy, we do not offer returns or exchanges on products, which are delivered in perfect condition as per the order placed. If you’ve had an incorrect product delivered to you (product doesn’t match the item in the order confirmation), or if the product you receive has genuine damage then we will be happy to exchange your product for a replacement. We anyhow do not refund money in any given scenario.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-display font-semibold text-primary">Reporting Damaged or Incorrect Items</h2>
            <p className="text-base leading-relaxed text-foreground/85">
              To report incorrect product or any damages in transit, please get in touch with our customer care within 24 hours of delivery at{" "}
              <a href="tel:7303480801" className="font-semibold text-primary hover:underline">
                7303480801
              </a>
              . Please provide your order number, date of transaction, delivery address and an image of the wrongfully delivered or defective item. Our customer care team will look into the issue and respond to you within 48 working hours. Given the nature of our products, we reserve the sole discretion to provide resolution as we deem fit. Every return or exchange request is treated as an individual case.
            </p>
          </div>

          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
            <h3 className="text-lg font-semibold text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" /> Non-Refundable Scenarios
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              We are unable to offer refunds if we’ve been given an incorrect or incomplete shipping address, or if there are two failed delivery attempts by our shipping agency and/or the package is refused by the recipient.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-border/80 bg-secondary/50 p-6 md:p-8">
            <h2 className="!mt-0 text-2xl font-display text-primary">Contact Customer Care</h2>
            <p className="mt-2 text-sm text-foreground/80">
              For any transit damages or replacement queries, please reach out to us:
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:7303480801" className="font-semibold text-primary hover:underline text-base">
                7303480801
              </a>
            </div>
          </div>
        </div>
      </Prose>
    </>
  );
}
