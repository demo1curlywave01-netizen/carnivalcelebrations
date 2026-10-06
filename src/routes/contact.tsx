import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Us — Carnival Celebrations" },
    { name: "description", content: "Contact Us at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Contact Us — Carnival Celebrations" },
    { property: "og:description", content: "Contact Us at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Contact Us" /><div className="mx-auto max-w-3xl px-4 py-12"><EnquiryForm kind="contact" /></div></>),
});
