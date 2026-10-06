import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [
    { title: "Your Cart — Carnival Celebrations" },
    { name: "description", content: "Your Cart at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Your Cart — Carnival Celebrations" },
    { property: "og:description", content: "Your Cart at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Your Cart" /><Prose><p>This page is coming soon.</p></Prose></>),
});
