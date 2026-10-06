import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/corporate-gifting")({
  head: () => ({ meta: [
    { title: "Corporate Bulk Gifting — Carnival Celebrations" },
    { name: "description", content: "Corporate Bulk Gifting at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Corporate Bulk Gifting — Carnival Celebrations" },
    { property: "og:description", content: "Corporate Bulk Gifting at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Corporate Bulk Gifting" /><div className="mx-auto max-w-3xl px-4 py-12"><EnquiryForm kind="corporate-gifting" /></div></>),
});
