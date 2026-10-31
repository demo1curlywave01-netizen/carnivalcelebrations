import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Carnival Celebrations" },
      { name: "description", content: "Privacy Policy for Carnival Celebrations." },
      { property: "og:title", content: "Privacy Policy — Carnival Celebrations" },
      { property: "og:description", content: "Privacy Policy for Carnival Celebrations." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="We take the privacy and security of your personal information seriously."
      />
      <Prose>
        <div className="space-y-8">
          <p className="text-base leading-relaxed text-foreground/90">
            We take the privacy and security of your personal information seriously. This Privacy Policy describes how we collect, use, and share information about you when you use our services.
          </p>

          <div className="space-y-3">
            <h2 className="text-2xl font-display font-semibold text-primary">INFORMATION WE COLLECT</h2>
            <p className="text-base leading-relaxed text-foreground/85">
              We may collect personal information that you provide to us, such as your name, email address, phone number, and payment information. We may also collect information about your use of our services, such as your IP address, browser type, and device type.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-display font-semibold text-primary">SECURITY</h2>
            <p className="text-base leading-relaxed text-foreground/85">
              We take reasonable measures to protect your personal information from unauthorized access, use, and disclosure. However, no method of transmission over the internet or method of electronic storage is completely secure, so we cannot guarantee the absolute security of your information.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-display font-semibold text-primary">CHANGES TO THIS PRIVACY POLICY</h2>
            <p className="text-base leading-relaxed text-foreground/85">
              We may update this Privacy Policy from time to time to reflect changes in our practices or to comply with legal requirements. We will notify you of any material changes by posting the updated policy on our website or by sending you an email.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-border/80 bg-secondary/50 p-6 md:p-8">
            <h2 className="!mt-0 text-2xl font-display text-primary">CONTACT US</h2>
            <p className="mt-2 text-sm text-foreground/80">
              If you have any questions or concerns about our privacy practices or this Privacy Policy, please contact us at:
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
