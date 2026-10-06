import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/wedding-gifting")({
  head: () => ({ meta: [
    { title: "Wedding Gifting — Carnival Celebrations" },
    { name: "description", content: "Wedding Gifting at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Wedding Gifting — Carnival Celebrations" },
    { property: "og:description", content: "Wedding Gifting at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Wedding Gifting" /><div className="mx-auto max-w-3xl px-4 py-12"><EnquiryForm kind="wedding-gifting" /></div></>),
});
