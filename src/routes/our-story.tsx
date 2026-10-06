import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/our-story")({
  head: () => ({ meta: [
    { title: "Our Story — Carnival Celebrations" },
    { name: "description", content: "Our Story at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Our Story — Carnival Celebrations" },
    { property: "og:description", content: "Our Story at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Our Story" /><Prose><p>This page is coming soon.</p></Prose></>),
});
