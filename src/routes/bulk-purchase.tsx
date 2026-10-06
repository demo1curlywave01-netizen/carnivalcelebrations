import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/bulk-purchase")({
  head: () => ({ meta: [
    { title: "Bulk Purchase — Carnival Celebrations" },
    { name: "description", content: "Bulk Purchase at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Bulk Purchase — Carnival Celebrations" },
    { property: "og:description", content: "Bulk Purchase at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Bulk Purchase" /><div className="mx-auto max-w-3xl px-4 py-12"><EnquiryForm kind="bulk-purchase" /></div></>),
});
