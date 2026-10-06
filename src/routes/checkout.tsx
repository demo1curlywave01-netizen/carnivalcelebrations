import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [
    { title: "Checkout — Carnival Celebrations" },
    { name: "description", content: "Checkout at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Checkout — Carnival Celebrations" },
    { property: "og:description", content: "Checkout at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Checkout" /><Prose><p>This page is coming soon.</p></Prose></>),
});
