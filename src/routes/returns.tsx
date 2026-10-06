import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/returns")({
  head: () => ({ meta: [
    { title: "Returns & Shipping — Carnival Celebrations" },
    { name: "description", content: "Returns & Shipping at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Returns & Shipping — Carnival Celebrations" },
    { property: "og:description", content: "Returns & Shipping at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Returns & Shipping" /><Prose><p>This page is coming soon.</p></Prose></>),
});
