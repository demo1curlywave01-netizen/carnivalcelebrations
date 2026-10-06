import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/track-order")({
  head: () => ({ meta: [
    { title: "Track Your Order — Carnival Celebrations" },
    { name: "description", content: "Track Your Order at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Track Your Order — Carnival Celebrations" },
    { property: "og:description", content: "Track Your Order at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Track Your Order" /><Prose><p>This page is coming soon.</p></Prose></>),
});
