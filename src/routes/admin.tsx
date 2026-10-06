import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Admin — Carnival Celebrations" },
    { name: "description", content: "Admin at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Admin — Carnival Celebrations" },
    { property: "og:description", content: "Admin at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Admin" /><Prose><p>This page is coming soon.</p></Prose></>),
});
