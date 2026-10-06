import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/become-a-partner")({
  head: () => ({ meta: [
    { title: "Become a Partner — Carnival Celebrations" },
    { name: "description", content: "Become a Partner at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Become a Partner — Carnival Celebrations" },
    { property: "og:description", content: "Become a Partner at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Become a Partner" /><div className="mx-auto max-w-3xl px-4 py-12"><EnquiryForm kind="become-a-partner" /></div></>),
});
